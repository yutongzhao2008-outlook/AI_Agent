# Prompt: Minimal Self-Contained TypeScript Code Agent

## 原始 Prompt

```
写一个 SELF_CONTAINED RUNNABLE 最小化的 CODE AGENT WITH TYPESCRIPT
（使用当前 LLM PROVIDER）。
代码里给出详细中文注释，
提供 README.MD，包含 设计、架构、UML 等软件工程信息，
STEP BY STEP 如何编译、测试、使用。
```

## 优化版 Prompt

```
用 TypeScript 实现一个最小化、自包含、可直接运行的 Code Agent，要求如下：

### 技术约束
- LLM 后端：Anthropic Claude API（@anthropic-ai/sdk），模型 claude-sonnet-4-6
- 运行环境：Node.js，入口为 REPL 命令行交互界面
- 依赖最小化：仅允许 @anthropic-ai/sdk + dotenv + 标准库

### Agent 能力（工具）
- read_file(file_path)   — 读取本地文件内容
- write_file(file_path, content) — 写入文件（自动创建目录）
- run_bash(command)      — 执行 shell 命令，返回 stdout/stderr

### 代码结构（三层，共 3 个源文件）
src/index.ts   — 交互层：readline REPL，处理 exit / reset 命令
src/agent.ts   — Agent 层：ReAct 循环，管理 messages[]，调用 Claude API
src/tools.ts   — 工具层：工具 JSON Schema 定义 + executeTool() 执行逻辑

### 代码质量
- 每个文件顶部写模块职责注释（中文）
- 关键逻辑写行内注释（中文），说明 WHY 而非 WHAT
- 启用 Prompt Caching（系统提示加 cache_control: ephemeral）
- 工具层所有异常 catch 后转字符串返回，不抛出
- MAX_ITERATIONS 防止死循环

### 配套文件
- package.json（含 build / start / dev / test 脚本）
- tsconfig.json（strict 模式，outDir: dist）
- .env.example（ANTHROPIC_API_KEY 模板）
- src/__tests__/tools.test.ts（Jest 单元测试，不依赖 API Key，覆盖正常路径和错误路径）
- README.md（中文，包含：设计原则、三层架构图、类图、时序图、工具数据流图、
  快速开始、编译步骤、测试步骤、使用示例、扩展指南）

最后：编译（npm run build）和测试（npm test）均须零错误通过。
```

## Prompt 设计说明

| 要素 | 作用 |
|------|------|
| **技术约束明确** | 避免 LLM 自选框架，锁定 SDK 版本和模型 |
| **工具签名列出** | LLM 直接生成符合预期的工具定义，无需猜测 |
| **三层结构指定** | 控制文件数量，防止过度拆分 |
| **注释语言指定** | 统一中文注释风格 |
| **质量细节显式** | Prompt Caching、错误隔离、防死循环——不写就可能被忽略 |
| **验收标准结尾** | "编译和测试均须零错误"——驱动 LLM 自我验证输出 |
