# TypeScript Code Agent

基于 **Anthropic Claude Sonnet** API 的最小化、自包含、可运行的 Code Agent。

Agent 能够自主完成代码编写、文件读写、Shell 命令执行等任务，通过工具调用循环实现"思考→行动→观察"的 ReAct 模式。

---

## 目录

- [设计原则](#设计原则)
- [架构设计](#架构设计)
- [UML 图](#uml-图)
- [目录结构](#目录结构)
- [快速开始](#快速开始)
- [编译](#编译)
- [测试](#测试)
- [使用示例](#使用示例)
- [扩展指南](#扩展指南)

---

## 设计原则

| 原则 | 说明 |
|------|------|
| **最小化** | 3 个源文件，无多余抽象层 |
| **自包含** | 只依赖 Anthropic SDK + Node 标准库 |
| **可观测** | 每次工具调用实时打印调用名称和结果摘要 |
| **安全** | 工具层捕获所有异常，以字符串形式返回错误而非崩溃 |
| **可扩展** | 新增工具只需在 `tools.ts` 添加定义 + case 分支 |

---

## 架构设计

### 三层结构

```
┌─────────────────────────────────────────┐
│  交互层  index.ts                        │
│  REPL：readline 接收用户输入，调用 Agent  │
└──────────────────┬──────────────────────┘
                   │ agent.run(userMessage)
┌──────────────────▼──────────────────────┐
│  Agent 层  agent.ts                      │
│  维护 messages[]，循环调用 Claude API    │
│  解析 tool_use 响应，分派工具调用         │
└──────────────────┬──────────────────────┘
                   │ executeTool(name, input)
┌──────────────────▼──────────────────────┐
│  工具层  tools.ts                        │
│  read_file / write_file / run_bash       │
└─────────────────────────────────────────┘
```

### Agent 主循环（ReAct 模式）

```
用户输入
   │
   ▼
messages.push({role:'user', content})
   │
   ▼  ┌──────────────────────────────┐
   └──►│  调用 Claude API             │
       │  (model + tools + messages) │
       └──────────┬───────────────────┘
                  │ response
         ┌────────▼──────────┐
         │ stop_reason?       │
         └──┬────────────┬───┘
            │end_turn    │tool_use
            ▼            ▼
         返回文字    执行工具列表
         响应       │
                    ▼
               messages.push(tool_results)
                    │
                    └───► 继续循环
```

---

## UML 图

### 类图

```
┌──────────────────────────────────────────────┐
│                  CodeAgent                   │
├──────────────────────────────────────────────┤
│ - client: Anthropic                          │
│ - messages: MessageParam[]                   │
├──────────────────────────────────────────────┤
│ + constructor(apiKey?: string)               │
│ + run(userMessage: string): Promise<string>  │
│ + reset(): void                              │
│ + turnCount: number  (getter)                │
└────────────────┬─────────────────────────────┘
                 │ uses
    ┌────────────▼─────────────┐
    │       tools.ts           │
    ├──────────────────────────┤
    │ toolDefinitions: Tool[]  │
    ├──────────────────────────┤
    │ executeTool(             │
    │   name: string,          │
    │   input: Record<str,str> │
    │ ): string                │
    └──────────────────────────┘

    ┌──────────────────────────┐
    │       index.ts           │
    ├──────────────────────────┤
    │ main(): Promise<void>    │
    └──────────┬───────────────┘
               │ creates & calls
               └─► CodeAgent
```

### 时序图

```
用户(REPL)        index.ts          CodeAgent         Claude API      工具层
   │                 │                  │                  │              │
   │ 输入文字        │                  │                  │              │
   │────────────────►│                  │                  │              │
   │                 │ agent.run(msg)   │                  │              │
   │                 │─────────────────►│                  │              │
   │                 │                  │ messages.create() │              │
   │                 │                  │─────────────────►│              │
   │                 │                  │                  │              │
   │                 │                  │◄─────────────────│              │
   │                 │                  │ {stop:'tool_use'} │              │
   │                 │                  │                  │              │
   │                 │                  │ executeTool()    │              │
   │                 │                  │─────────────────────────────►  │
   │                 │                  │◄────────────────────────────── │
   │                 │                  │ tool result       │              │
   │                 │                  │                  │              │
   │                 │                  │ messages.create() │              │
   │                 │                  │─────────────────►│              │
   │                 │                  │◄─────────────────│              │
   │                 │                  │ {stop:'end_turn'} │              │
   │                 │ return text      │                  │              │
   │                 │◄─────────────────│                  │              │
   │ 打印结果        │                  │                  │              │
   │◄────────────────│                  │                  │              │
```

### 工具调用数据流

```
LLM 返回 ToolUseBlock:
  {
    type: 'tool_use',
    id:   'toolu_01xxx',
    name: 'write_file',
    input: { file_path: 'hello.py', content: 'print("hello")' }
  }
         │
         ▼
executeTool('write_file', { file_path: ..., content: ... })
         │
         ▼
返回字符串 "已成功写入文件: hello.py"
         │
         ▼
ToolResultBlockParam:
  {
    type:        'tool_result',
    tool_use_id: 'toulu_01xxx',
    content:     '已成功写入文件: hello.py'
  }
         │
         ▼
messages.push({ role: 'user', content: [ToolResultBlockParam] })
         │
         ▼
下一轮 Claude API 调用（LLM 看到工具执行结果，继续推理）
```

---

## 目录结构

```
simple_code_agent/
├── src/
│   ├── index.ts          # 入口：REPL 交互界面
│   ├── agent.ts          # Agent 核心：循环 + 对话历史管理
│   ├── tools.ts          # 工具定义 + 工具执行逻辑
│   └── __tests__/
│       └── tools.test.ts # 工具层单元测试（无需 API Key）
├── .env.example          # 环境变量模板
├── package.json
├── tsconfig.json
└── README.md
```

---

## 快速开始

### 前置要求

- Node.js ≥ 18
- npm ≥ 9
- Anthropic API Key（[获取地址](https://console.anthropic.com/)）

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 API Key

```bash
# 复制模板
cp .env.example .env

# 编辑 .env，填入你的 API Key
# ANTHROPIC_API_KEY=sk-ant-xxxxxxxx
```

### 3. 直接运行（开发模式，无需编译）

```bash
npm run dev
```

---

## 编译

### 编译为 JavaScript

```bash
npm run build
```

编译产物输出到 `dist/` 目录。

### 运行编译产物

```bash
npm start
# 等价于 node dist/index.js
```

### 清理编译产物

```bash
# macOS/Linux
rm -rf dist/

# Windows
rmdir /s /q dist
```

---

## 测试

工具层测试**不需要 API Key**，直接测试文件读写和命令执行逻辑。

```bash
# 运行所有测试
npm test

# 监听模式（修改文件自动重跑）
npx jest --watch

# 查看覆盖率
npx jest --coverage
```

期望输出：

```
 PASS  src/__tests__/tools.test.ts
  toolDefinitions
    ✓ 应包含 3 个工具
    ✓ 每个工具都有 name / description / input_schema
    ✓ 工具名称应为 read_file / write_file / run_bash
  executeTool: write_file
    ✓ 应成功写入文件并返回成功消息
    ✓ 目录不存在时应自动创建
  executeTool: read_file
    ✓ 应成功读取已存在文件
    ✓ 文件不存在时返回错误消息（不抛异常）
  executeTool: run_bash
    ✓ 应执行命令并返回 stdout
    ✓ 命令失败时返回错误消息（不抛异常）
  executeTool: 未知工具
    ✓ 应返回"未知工具"提示

Tests: 10 passed, 10 total
```

---

## 使用示例

启动后进入 REPL 界面：

```
╔══════════════════════════════════════════════╗
║    TypeScript Code Agent  (Claude Sonnet)    ║
╚══════════════════════════════════════════════╝
可用命令: exit（退出）| reset（重置对话）
输入任务描述，Agent 将自动规划并使用工具完成。

你 >
```

### 示例 1：写一个 Python 脚本并运行

```
你 > 写一个 Python 脚本，计算并打印斐波那契数列前 10 项，保存为 fib.py 并运行
```

Agent 会：
1. 调用 `write_file` 写入 `fib.py`
2. 调用 `run_bash` 执行 `python fib.py`
3. 返回运行结果

### 示例 2：读取并分析文件

```
你 > 读取 package.json，告诉我这个项目有哪些脚本命令
```

### 示例 3：多步骤代码任务

```
你 > 创建一个 TypeScript 函数 add(a,b) 保存为 math.ts，再写测试文件 math.test.ts，用 tsc 编译检查类型
```

### 示例 4：重置对话

```
你 > reset
[系统] 对话历史已清空，开始新任务。
```

---

## 扩展指南

### 添加新工具

在 `src/tools.ts` 中：

1. **添加工具定义**（LLM 会看到这个描述来决定何时调用）：

```typescript
{
  name: 'fetch_url',
  description: '发起 HTTP GET 请求并返回响应体',
  input_schema: {
    type: 'object' as const,
    properties: {
      url: { type: 'string', description: '要请求的 URL' }
    },
    required: ['url']
  }
}
```

2. **添加执行逻辑**（在 `executeTool` 的 switch 中）：

```typescript
case 'fetch_url': {
  const res = await fetch(input.url);
  return await res.text();
}
```

就这两步——Agent 会自动学会何时使用这个新工具。

---

## 技术说明

- **Prompt Caching**：系统提示附带 `cache_control: {type:'ephemeral'}`，相同系统提示的多轮对话可命中 Anthropic 缓存，降低延迟和成本。
- **工具调用格式**：遵循 Anthropic Tool Use API 规范——`tool_use` 块由 assistant 返回，`tool_result` 块作为下一轮 user 消息发送。
- **错误隔离**：工具层所有异常被捕获并转为字符串返回，LLM 可根据错误信息自动调整策略（例如路径错误时自动修正后重试）。
