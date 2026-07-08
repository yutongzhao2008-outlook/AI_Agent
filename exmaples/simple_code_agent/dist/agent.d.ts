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
export declare class CodeAgent {
    private client;
    /**
     * 对话历史数组
     *
     * Anthropic API 采用"消息列表"方式维护多轮上下文：
     *   [ {role:'user', content:'...'}, {role:'assistant', content:[...]}, ... ]
     *
     * 每次调用 run() 时追加新消息，实现跨轮次记忆。
     * 调用 reset() 清空，开始全新对话。
     */
    private messages;
    /**
     * @param apiKey 可选。不传则从环境变量 ANTHROPIC_API_KEY 读取。
     */
    constructor(apiKey?: string);
    /** 清空对话历史，开始新任务 */
    reset(): void;
    /** 返回当前对话轮次数（用于调试/测试） */
    get turnCount(): number;
    /**
     * 处理一次用户输入，执行 Agent 循环直到得到最终答案。
     *
     * @param userMessage 用户的自然语言指令
     * @returns LLM 的最终文字回复
     */
    run(userMessage: string): Promise<string>;
}
//# sourceMappingURL=agent.d.ts.map