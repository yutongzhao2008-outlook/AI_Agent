/**
 * tools.ts — 工具层
 *
 * 负责：
 *   1. 声明工具的 JSON Schema（告诉 LLM 有哪些工具可用）
 *   2. 实现工具的具体逻辑（真正执行文件读写 / Shell 命令）
 *
 * Agent 架构中的位置：
 *   用户输入 → Agent 循环 → [本文件] 执行工具 → 结果返回给 LLM
 */
import Anthropic from '@anthropic-ai/sdk';
/**
 * toolDefinitions: Anthropic.Tool[]
 *
 * 每个元素对应一个工具，字段含义：
 *   name        — 工具唯一标识，LLM 用它来选择调用哪个工具
 *   description — 自然语言描述，LLM 据此决定何时调用该工具
 *   input_schema — 参数的 JSON Schema，LLM 生成的参数必须符合此结构
 */
export declare const toolDefinitions: Anthropic.Tool[];
/**
 * executeTool(name, input) → string
 *
 * 根据 LLM 选择的工具名称和它生成的参数，分派到对应的工具实现。
 * 始终返回字符串——这个字符串会作为 tool_result 发回给 LLM。
 *
 * @param name  — 工具名称（必须是 toolDefinitions 中的 name 之一）
 * @param input — LLM 生成的参数对象
 * @returns      工具执行结果（成功输出或错误消息）
 */
export declare function executeTool(name: string, input: Record<string, string>): string;
//# sourceMappingURL=tools.d.ts.map