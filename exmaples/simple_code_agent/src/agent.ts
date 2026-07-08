/**
 * agent.ts — Agent 核心层
 *
 * 实现经典的 "ReAct" 循环（Reason + Act）：
 *
 *   ┌──────────────────────────────────────────┐
 *   │  用户消息 → messages[]                    │
 *   │       ↓                                  │
 *   │  调用 Claude API（携带工具定义）           │
 *   │       ↓                                  │
 *   │  stop_reason == 'tool_use'?              │
 *   │    Yes → 执行工具 → 追加结果 → 继续循环   │
 *   │    No  → 返回最终文字响应                 │
 *   └──────────────────────────────────────────┘
 *
 * 关键设计决策：
 *   - 多轮对话历史（messages[]）全部保存在内存中，保证上下文连贯
 *   - MAX_ITERATIONS 防止 LLM 陷入工具调用死循环
 *   - 系统提示使用 cache_control，减少重复传输开销（Prompt Caching）
 */

import Anthropic from '@anthropic-ai/sdk';
import { toolDefinitions, executeTool } from './tools';

// ─────────────────────────────────────────────
// 常量配置
// ─────────────────────────────────────────────

/** 使用的模型 ID（当前最新 Sonnet） */
const MODEL = 'claude-sonnet-4-6';

/** 单次响应最大 token 数 */
const MAX_TOKENS = 4096;

/**
 * 最大工具调用迭代次数
 * 超过此值停止循环，防止异常情况下无限消耗 API 配额
 */
const MAX_ITERATIONS = 20;

/**
 * 系统提示词：定义 Agent 角色与行为准则
 *
 * 包在数组里并加 cache_control，利用 Anthropic Prompt Caching：
 * 相同系统提示的后续请求可命中缓存，节省 token 和延迟。
 */
const SYSTEM_PROMPT: Anthropic.TextBlockParam[] = [
  {
    type: 'text',
    text: `你是一个代码 Agent，拥有读写文件和执行 shell 命令的能力。
工作方式：
1. 仔细分析用户需求，必要时拆解为子任务
2. 调用工具前，用一句话说明你的意图
3. 根据工具返回结果调整下一步策略
4. 所有任务完成后，给出简洁的结果摘要

约束：
- 不执行危险命令（rm -rf /、格式化磁盘等）
- 写文件前确认路径合理
- shell 命令超时 30 秒`,
    // 系统提示固定不变，标记为可缓存
    cache_control: { type: 'ephemeral' },
  },
];

// ─────────────────────────────────────────────
// CodeAgent 类
// ─────────────────────────────────────────────

export class CodeAgent {
  private client: Anthropic;

  /**
   * 对话历史数组
   *
   * Anthropic API 采用"消息列表"方式维护多轮上下文：
   *   [ {role:'user', content:'...'}, {role:'assistant', content:[...]}, ... ]
   *
   * 每次调用 run() 时追加新消息，实现跨轮次记忆。
   * 调用 reset() 清空，开始全新对话。
   */
  private messages: Anthropic.MessageParam[] = [];

  /**
   * @param apiKey 可选。不传则从环境变量 ANTHROPIC_API_KEY 读取。
   */
  constructor(apiKey?: string) {
    this.client = new Anthropic({ apiKey });
  }

  /** 清空对话历史，开始新任务 */
  reset(): void {
    this.messages = [];
  }

  /** 返回当前对话轮次数（用于调试/测试） */
  get turnCount(): number {
    return this.messages.length;
  }

  // ─────────────────────────────────────────
  // 核心方法：run()
  // ─────────────────────────────────────────

  /**
   * 处理一次用户输入，执行 Agent 循环直到得到最终答案。
   *
   * @param userMessage 用户的自然语言指令
   * @returns LLM 的最终文字回复
   */
  async run(userMessage: string): Promise<string> {
    // 1. 将用户消息压入历史
    this.messages.push({ role: 'user', content: userMessage });

    // 2. Agent 主循环
    for (let i = 0; i < MAX_ITERATIONS; i++) {
      // ── 调用 Claude API ──────────────────────
      const response = await this.client.messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: SYSTEM_PROMPT,
        tools: toolDefinitions,
        messages: this.messages,
      });

      // ── 将 assistant 响应存入历史 ────────────
      // content 是 ContentBlock[]，可能同时含 text 块和 tool_use 块
      this.messages.push({ role: 'assistant', content: response.content });

      // ── 打印助手文字（如有）──────────────────
      for (const block of response.content) {
        if (block.type === 'text' && block.text.trim()) {
          process.stdout.write(`\n[Assistant] ${block.text}\n`);
        }
      }

      // ── 判断终止条件 ─────────────────────────

      if (response.stop_reason === 'end_turn') {
        // LLM 认为任务完成，提取最终文字响应返回
        return response.content
          .filter((b): b is Anthropic.TextBlock => b.type === 'text')
          .map((b) => b.text)
          .join('\n');
      }

      if (response.stop_reason === 'tool_use') {
        // LLM 请求调用一个或多个工具
        const toolUseBlocks = response.content.filter(
          (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use'
        );

        // 执行每个工具并收集结果
        const toolResults: Anthropic.ToolResultBlockParam[] = [];
        for (const toolCall of toolUseBlocks) {
          console.log(
            `\n[Tool ▶] ${toolCall.name}  参数: ${JSON.stringify(toolCall.input)}`
          );

          const result = executeTool(
            toolCall.name,
            toolCall.input as Record<string, string>
          );

          // 截断长输出，避免日志刷屏
          const preview =
            result.length > 300
              ? result.substring(0, 300) + `\n…（共 ${result.length} 字符）`
              : result;
          console.log(`[Tool ◀] ${preview}`);

          toolResults.push({
            type: 'tool_result',
            tool_use_id: toolCall.id,
            content: result,
          });
        }

        // 将工具结果追加到历史，作为下一轮的 user 消息（API 规范要求）
        this.messages.push({ role: 'user', content: toolResults });
        continue; // 继续下一轮 LLM 调用
      }

      // stop_reason 为 max_tokens 或其他情况，退出循环
      console.warn(`[Agent] 意外的 stop_reason: ${response.stop_reason}`);
      break;
    }

    return '[Agent] 已达最大迭代次数，任务可能未完成。请检查日志或简化任务。';
  }
}
