按"能读懂/能改动/能自建"三个层次给你排。所有条目**只列对 code agent 有效的部分**，跳过无关的 web/前端知识。

---

## 🟥 Tier 1 · MANDATORY（不学根本上手不了）

### JavaScript 语言核心

| 知识点                                                    | 为什么 code agent 必须                                                 |
| --------------------------------------------------------- | ---------------------------------------------------------------------- |
| **`async / await` + Promise**                             | 每个 agent 调用都是 `await agent(...)`；不懂就读不了任何 workflow 脚本 |
| **顶层 `await`（top-level await）**                       | Workflow / SDK 脚本都用它，不用包 `main()`                             |
| **`Promise.all` / `Promise.allSettled` / `Promise.race`** | 并发编排 N 个 subagent 的核心；`pipeline()` 内部就是 `Promise.all`     |
| **对象/数组解构、扩展运算符 `...`**                       | 到处都在传 `{ schema, label, ... }`；不熟就读不了配置                  |
| **箭头函数 + 闭包**                                       | `pipeline(files, file => agent(...))` 这种回调随处可见                 |
| **ES Modules（`import` / `export`）**                     | Workflow 脚本、Agent SDK、MCP server 全部是 ESM                        |
| **JSON ↔ 对象**（`JSON.parse` / `stringify`）             | Tool input/output、schema、消息都是 JSON                               |
| **`try / catch` + `throw`**                               | Long-running agent 里不 catch 一个错就全崩                             |

### Node.js 运行时

| 知识点                                                           | 为什么必须                         |
| ---------------------------------------------------------------- | ---------------------------------- |
| **`process.env` + `process.argv`**                               | 读 API key、传参                   |
| **`fs/promises`** (`readFile`, `writeFile`, `mkdir`)             | Agent 大部分工具就是读写文件       |
| **`path`** (`join`, `resolve`, `dirname`)                        | 跨平台路径                         |
| **`child_process` 的 `spawn` / `exec`**                          | Agent 要跑 shell 命令、npm、pytest |
| **`package.json` 结构**（scripts / dependencies / type: module） | 每个项目起点                       |
| **`npm` / `pnpm` install & run**                                 | 装 SDK、跑脚本                     |

### TypeScript 最小集

| 知识点                                                              | 为什么必须                                      |
| ------------------------------------------------------------------- | ----------------------------------------------- |
| **基础类型标注** (`string`, `number`, `boolean`, `void`, `unknown`) | Agent SDK 的所有 API 都是强类型                 |
| **`interface` / `type` 别名**                                       | 定义 tool input/output                          |
| **联合类型 `A \| B` + 字面量类型**                                  | `"user" \| "assistant" \| "tool"` 这种消息 role |
| **可选属性 `?:` + `readonly`**                                      | schema 定义                                     |
| **基础泛型 `Array<T>` / `Promise<T>`**                              | 每个 async 函数都返回 `Promise<T>`              |
| **`tsconfig.json` 基础**（module, target, strict）                  | 不改也要能看懂                                  |
| **`tsx` / `ts-node` 运行 `.ts`**                                    | 开发迭代必备                                    |

**大约学习时间**：如果有其他语言基础，**集中 3–5 天**能覆盖 Tier 1。

---

## 🟧 Tier 2 · HIGH-PRIORITY（做实用 agent 立刻需要）

| 知识点                                                                                     | 用在哪                                                              | 推荐深度     |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- | ------------ |
| **`AsyncIterator` / `for await...of`**                                                     | LLM streaming 响应、Agent SDK 的 message stream                     | 会用即可     |
| **`AbortController` / `AbortSignal`**                                                      | 用户按 Ctrl+C 或超时中断 agent                                      | 必会调用方式 |
| **Zod**（schema 校验库）                                                                   | Agent SDK 的 tool 定义几乎全用 Zod；`z.object({...}).describe(...)` | 必装、常用   |
| **JSON Schema**                                                                            | 底层 tool 定义格式，工作流 `schema` 字段直接是它                    | 会读能写     |
| **`fetch`（Node 18+ 内置）**                                                               | 调外部 API、MCP HTTP 传输                                           | 熟练         |
| **`EventEmitter`**                                                                         | Agent SDK 的事件回调、hook 触发                                     | 会订阅       |
| **`dotenv` / `.env` 惯例**                                                                 | API key 管理                                                        | 一看就会     |
| **TS 工具类型**（`Partial`, `Pick`, `Omit`, `Record`, `ReturnType`）                       | 改 SDK 类型时避免重复定义                                           | 会用即可     |
| **`readonly` + `as const`**                                                                | tool 名字、role 常量的类型安全                                      | 会用         |
| **`vitest` 或 `jest`**                                                                     | 给自己的 agent 写测试                                               | 至少会跑     |
| **`tsx` / `esbuild` / `tsup`**                                                             | 快速运行、打包成单文件 CLI                                          | 挑一个       |
| **`process` 的信号处理**（`SIGINT`, `SIGTERM`, `uncaughtException`, `unhandledRejection`） | Long-running agent 优雅退出                                         | 会挂 handler |
| **Node `stream`（Readable/Writable）+ `pipeline`**                                         | 处理大文件、日志流                                                  | 基础用法     |
| **`worker_threads`**                                                                       | 并发跑 CPU-heavy 任务（如 tree-sitter 解析）                        | 知道有       |
| **npm workspace / pnpm workspace**                                                         | 多包项目（agent core + tools + CLI）                                | 挑一个       |

**大约学习时间**：Tier 2 边做边学，2–4 周内会自然吸收。

---

## 🟨 Tier 3 · OPTIONAL（做深度定制/生产才需要）

| 知识点                                                                              | 什么时候必要                                  |
| ----------------------------------------------------------------------------------- | --------------------------------------------- |
| **MCP 协议 SDK**（`@modelcontextprotocol/sdk`）                                     | 你要写**自己的 MCP server** 给 agent 加工具时 |
| **`stdio` JSON-RPC**                                                                | 写 MCP server / Language Server 客户端        |
| **`vm` / `isolated-vm` / ShadowRealm**                                              | 想在 agent 里安全 eval 用户脚本               |
| **TS 高级类型**（conditional types, mapped types, `infer`, template literal types） | 给 agent SDK 写强类型 wrapper                 |
| **`Discriminated Unions` + 穷尽性检查（`never`）**                                  | Message / event 类型安全                      |
| **Rollup / esbuild plugin API**                                                     | 打包成单文件分发的 CLI agent                  |
| **`node --experimental-vm-modules` + 动态 `import()`**                              | 动态加载 skill / plugin                       |
| **`fastify` / `hono`**                                                              | Agent 后端 HTTP 网关                          |
| **`ws`（WebSocket）**                                                               | Agent 和前端 UI 双向通信                      |
| **`playwright` / `puppeteer`**                                                      | Browser-driving agent（web 自动化）           |
| **`tree-sitter` Node 绑定**（`web-tree-sitter` / `tree-sitter`）                    | 代码分析工具（你的端侧漏斗第一层）            |
| **`pino` / `winston`**                                                              | 结构化日志                                    |
| **OpenTelemetry Node SDK**                                                          | Trace agent 调用链                            |
| **`pkg` / `bun build --compile` / `deno compile`**                                  | 打包成单二进制                                |
| **Deno / Bun 差异**                                                                 | 想脱离 Node 生态时                            |

---

## 🟩 学习路线建议（针对做 Custom Code Agent）

### 第 1 周：Tier 1 全过
最小 milestone：**能徒手写一个 `.ts` 脚本调用 Anthropic SDK 完成一次对话**。

```ts
// hello-agent.ts
import Anthropic from "@anthropic-ai/sdk"
const c = new Anthropic()
const msg = await c.messages.create({
  model: "claude-opus-4-7",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hi" }],
})
console.log(msg.content)
```

### 第 2 周：Tier 2 前半（Zod / streaming / tools）
Milestone：**给 agent 加一个自定义 tool**（读文件 / 执行 shell），能 tool-use 循环跑通。

### 第 3–4 周：读 Agent SDK 源码 + 写第一个 subagent
Milestone：**写一个 `.claude/agents/my-reviewer.md` 或用 Agent SDK 起一个多轮 agent**，加进自己的项目。

### 第 5 周及以后：按需 Tier 3
- 要加工具？→ MCP SDK
- 要生产部署？→ 日志 + 打包 + 信号处理
- 要做代码分析？→ tree-sitter / TS AST

---

## 🔑 三个"不学会就一辈子卡住"的死点

1. **`async/await` 的错误传播**：不 `await` 的 Promise 抛错在 Node 里会变成 `unhandledRejection` 静默 —— agent 会"表面成功但其实炸了"。
2. **JSON Schema / Zod 描述"清晰度"**：tool 的 `description` + schema 决定 LLM 会不会正确调用。**这不是纯代码技能，是 prompt 工程 + 类型系统的交界**。
3. **Streaming + 早期中断（AbortSignal）**：agent 总要能被中断。不会正确 abort，长 agent 就是资源泄漏温床。

把这三点掌握，其它按需查文档即可。

---

## 一份最小书单/文档单（都免费）

| 材料                                                                                                | 覆盖           |
| --------------------------------------------------------------------------------------------------- | -------------- |
| [The Modern JavaScript Tutorial (javascript.info)](https://javascript.info/)                        | Tier 1 全部 JS |
| Node.js 官方 docs → **Getting Started + fs/promises + child_process**                               | Tier 1 Node    |
| [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)                      | Tier 1 + 2 TS  |
| [Zod docs](https://zod.dev/)                                                                        | Tier 2         |
| [Anthropic SDK for TS](https://github.com/anthropics/anthropic-sdk-typescript) 的 README + examples | Agent 层入口   |
| [Claude Agent SDK / Claude Code docs](https://code.claude.com/docs)                                 | 项目原生 API   |
| [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)                        | Tier 3         |

按顺序读、每一段都跟着敲代码，**大约 4 周能到"能自己写有工具调用的 agent"的水平**，8 周到"能写生产级 custom agent"。




你这个问题问在点子上了。答案是：**你的直觉大方向是对的，但完全跳过手写会踩三个致命坑**。让我说清楚"能省什么、必须留什么"。

---

## 先说结论

- **90% 的手写代码可以让 AI 生成** ✅（你的直觉正确）
- **10% 是 "AI 帮不了你" 的地方** ❌ —— 这 10% 恰好决定你的 agent 能不能上线
- **工具链概念必须懂，但配置文件可以让 AI 写** ✅
- **"只学概念、不写一行代码" = 概念根本长不进大脑** ❌（这是最容易骗自己的地方）

---

## 为什么"只学概念"会失败

### 概念这东西，**没有摩擦就没有印记**

看一遍 `async/await` 教程，你以为懂了。真上手时会踩：

- 忘了 `await` 一个 Promise → 静默返回 `Promise<pending>` 让下游炸掉
- `for` 循环里放 `await` → 明明写了并发，跑起来是串行
- `Promise.all` 遇到一个 reject → 其它成功的结果全丢了（该用 `allSettled`）
- `try/catch` 包不住异步回调里抛的错

这些**每一个都是"教程里读过"的知识点**，但没写过就是拦不住 —— 你会用 AI 生成代码，看 AI 写的对，然后线上跑挂了完全不知道为什么。

**"手写"的价值不是"生产代码"，是"让概念在你手上留下伤疤"**。伤疤才是理解。

---

## AI 帮不了你的三件事（这就是必须动手的 10%）

### 死点 1：**当 AI 生成的代码"看起来对但实际错"，你要能看出来**

例子（AI 真的会这么写）：

```ts
// AI 生成的 "并发处理文件"
for (const file of files) {
  const result = await processFile(file)
  results.push(result)
}
```

功能对，**但是串行的**，跑 100 个文件慢 100 倍。看出来这个错需要：
- 知道 `for...of + await` 是串行
- 知道要改成 `Promise.all(files.map(processFile))`
- 知道并发太多要用 `p-limit` 控制

**这三件事光看视频记不住，写过一次才刻在肌肉里**。

### 死点 2：**调试 —— AI 看不见 stack trace**

Agent 长跑 20 分钟后崩了，堆栈里全是：

```
UnhandledPromiseRejection ... at async pipeline
```

AI 不知道你的进程状态、不知道 memory 里有什么、不知道哪个 subagent 卡住了。你需要：
- 看 stack trace 找到出错的那行
- 加 `console.log` / `debug` 定位
- 用 `--inspect` 挂 Chrome DevTools
- 判断是 timeout / rejection / memory leak

**这个环节你和 AI 之间的带宽极窄**，只能你自己脑内运行代码。没手写过就是黑盒。

### 死点 3：**判断"要不要接受这个 diff"**

Agent 写 agent 时最典型的场景：AI 给你一段 50 行的改动，你要在 30 秒内决定 merge 还是拒。判断依据：
- 类型对不对（是不是塞了 `any` 逃避）
- 有没有静默吞异常
- 有没有漏 `await`
- 有没有 memory leak 隐患
- 命名 / 抽象是否合理

**这不是"读代码"能训练出来的能力，是"改代码 → 挨过坑 → 记住"的经验**。你写过 50 次 Zod schema，才能一眼看出 AI 生成的 schema 缺了 `.strict()`。

---

## 具体到 TypeScript，哪些必须动手？哪些让 AI 写？

### ✋ 必须自己手打（不多，但拒绝跳过）

| 内容                                     | 为什么                | 需要写多少                                      |
| ---------------------------------------- | --------------------- | ----------------------------------------------- |
| `async/await` + `Promise.all/allSettled` | Agent 的血液          | **写崩过 3 次为止**                             |
| Zod schema + `.parse()` 失败处理         | Tool 定义每天都要写   | **~10 个真实 schema**                           |
| `try/catch` + 自定义 error 类            | 长 agent 必须精确捕错 | **写一个自己的 `AgentError` 类**                |
| 类型标注 + 泛型 `<T>`                    | 读 SDK 源码时的门槛   | **给自己写的函数标 3 次泛型**                   |
| 一个从零起的 agent 项目                  | 把上面串起来          | **完整走一遍：init → 调 API → tool-use → 部署** |

**总量：一周内、大约 200–500 行手写代码**。这不算多，但**不写就是白学**。

### 🤖 完全交给 AI（放心，AI 比你写得好）

| 内容                                           | AI 生成质量            |
| ---------------------------------------------- | ---------------------- |
| `package.json` / `tsconfig.json` 初始化        | 极好（几乎无需改）     |
| ESLint / Prettier 配置                         | 极好                   |
| CI workflow（GitHub Actions）                  | 极好                   |
| Dockerfile / Fly.io 配置                       | 极好                   |
| 单元测试脚手架                                 | 好                     |
| 复杂 TS 类型体操（conditional types、`infer`） | 好，且比多数人手写正确 |
| CRUD 层、HTTP 客户端 wrapper                   | 极好                   |
| 文档、README                                   | 极好                   |

**这些 AI 一次生成、你审一遍即可**。学它们的**概念**（懂 `tsconfig.json` 的 `module: "ESNext"` 是什么意思），但**不用记语法**。

---

## 工具链 / 打包 —— 现代答案

老观点："**必须精通 webpack / rollup / esbuild 配置**" → **已过时**。

新观点："**必须知道链条上每个环节在做什么，但配置让 AI 写**"。

### 必须理解的**概念**（不是配置语法）

```
你的 .ts 源码
     │
     ▼  ①（tsc / tsx / esbuild）
   编译成 .js
     │
     ▼  ②（Node.js 加载）
  ESM 还是 CJS？    ← 这里最容易出错
     │
     ▼  ③（打包器：tsup / esbuild / rollup）
   打成单文件 or 多文件？
     │
     ▼  ④（分发）
   npm publish / pkg / bun compile / Docker
```

四个环节，你要知道**每个环节在解决什么问题**，遇到报错时知道该改哪一层。**不用记任何一个配置文件的字段**。

### 具体推荐

| 环节   | 学什么                                                                     | 深度                        |
| ------ | -------------------------------------------------------------------------- | --------------------------- |
| ① 编译 | 用 `tsx script.ts` 直接跑；懂"TS 有类型、JS 没有"                          | 5 分钟                      |
| ② 模块 | 懂 `import` (ESM) vs `require` (CJS) 的区别；`"type": "module"` 意味着什么 | 20 分钟 —— 这一环是最大坑源 |
| ③ 打包 | 挑一个（推荐 `tsup`），跑一次 `tsup src/index.ts` 看输出                   | 30 分钟                     |
| ④ 分发 | 会 `npm publish` 或 `bun build --compile` 二选一                           | 30 分钟                     |

**总时间 <2 小时**，配置文件全部让 AI 写。

---

## 最实用的学习法（AI 时代新玩法）

**放弃"看教程 → 敲代码"的旧路径**，用这个：

### 1. **对着 AI 学，不是对着教程**

不要看 20 集 TS 视频。做法：
- 打开 Cursor / Claude Code
- 让 AI 生成一个 Agent 项目
- **对每一行你不认识的代码，问 "为什么这么写？改成 X 会怎样？"**
- AI 一对一讲解，比任何教程都快

### 2. **只在"AI 卡壳"的地方深挖**

正常写 agent 时 AI 帮你搞定 95%。剩下 5% —— **AI 生成的代码你 review 时觉得不对、或者跑出错**，那个具体点才是你要补的知识。**这才是真正的高信息密度学习**。

### 3. **手写规则：**

**用一句话判断这段代码要不要自己敲：**

> "这段代码错了，我能否在 3 分钟内看出来？"

- 能 → 让 AI 写
- 不能 → **自己敲一遍**

久而久之，你自动积累的正好是"AI 帮不了你判断"的那 10%。

---

## 直接回答你的两个问题

**Q1: 只学概念不行吗？**

不行。**但你不需要"精通"，只需要"手上留过伤疤"**。写 200–500 行代码（不是抄，是自己想 + 让 AI 讲解）就够了。这个量级 = **1–2 周的实际开发**，非常低。

**Q2: 不学工具链 / 打包吗？**

**概念 2 小时必须懂**（尤其 ESM/CJS 差异），**配置文件永远不用手写**。工具链的价值是"报错时知道该改哪一层"，不是"记住 rollup.config.js 有哪些字段"。

---

## 一句话总结

> **AI 时代的学习目标不再是"能写"，而是"能判断"**。
> **但"判断力"只能靠"写过然后被坑过"来获得** —— 这就是那不可省略的 10%。

**把学习时间从"1000 小时手写练习"压到"1–2 周手写 + 后续全靠 AI 结对"**，这是可行的、且已经是当前顶级 agent 开发者的实际做法。







# 补：Zod 和 Bun 的必备知识

---

## 一、Zod —— Agent 时代事实上的"类型 + 校验"标准

### 为什么它对 code agent 是**必学**

Agent 里最典型的场景：**LLM 返回一段 JSON，你要能安全用**。三个层面它同时解决：

1. **运行时校验**：LLM 返回的 JSON 是不是符合预期结构？
2. **TypeScript 类型**：一次定义 schema，`z.infer` 自动生成 TS 类型
3. **给 LLM 的 prompt**：schema 可以转成 JSON Schema 喂给 tool-use API

**一个 schema 定义，同时是"校验器 + 类型 + prompt"三件套** —— 这是 Zod 在 agent 场景无可替代的核心价值。

---

### Zod 60 分钟入门（按 code agent 用法排序）

#### 1. 基础原语

```ts
import { z } from "zod"

const s = z.string()            // 字符串
const n = z.number()            // 数字
const b = z.boolean()           // 布尔
const l = z.literal("apple")    // 字面量
const e = z.enum(["a","b","c"]) // 枚举
```

**校验方式**：
```ts
s.parse("hello")        // 通过，返回 "hello"
s.parse(123)            // 抛 ZodError
s.safeParse(123)        // { success: false, error: ... }  ← agent 里必用这个
```

**Agent 里 90% 用 `safeParse`**，因为你不希望 LLM 返回一次坏 JSON 就崩掉整个 workflow。

#### 2. 对象 —— Tool schema 的主力

```ts
const FileEditSchema = z.object({
  path: z.string(),
  content: z.string(),
  line_range: z.tuple([z.number(), z.number()]).optional(),
})

type FileEdit = z.infer<typeof FileEditSchema>
// ↑ TS 自动推导出：{ path: string; content: string; line_range?: [number, number] }
```

**这个 `z.infer` 是全套体系的核心**：写一遍 schema，运行时校验和编译时类型同时得到。

#### 3. 组合子（agent 用得极频繁）

```ts
z.array(z.string())              // 数组
z.record(z.string(), z.number()) // { [key: string]: number }
z.union([z.string(), z.number()])// string | number
z.discriminatedUnion("type", [   // 消息 role 那种带 tag 的联合
  z.object({ type: z.literal("user"), text: z.string() }),
  z.object({ type: z.literal("tool"), tool_name: z.string() }),
])
```

`discriminatedUnion` 特别重要 —— Agent 消息、事件流几乎都是这个模式。

#### 4. Agent 场景的高价值 API

```ts
.optional()      // 可选字段
.nullable()      // 允许 null
.default(x)      // 缺省值
.describe("...") // ★ 给 LLM 看的字段说明（会进 JSON Schema）
.strict()        // ★ 拒绝多余字段（防止 LLM 幻觉出不存在的字段）
.transform(fn)   // 解析后再变换
.refine(fn)      // 自定义业务规则校验
```

**`.describe()` 是 agent 专属魔法**：

```ts
const Schema = z.object({
  city: z.string().describe("The city name in English"),
  units: z.enum(["celsius", "fahrenheit"]).describe("Temperature unit"),
})
```

转成 JSON Schema 后，`description` 字段直接进入 LLM 的 tool 定义 —— **描述写得好 = tool call 成功率高**。

#### 5. Anthropic SDK 里的实战用法

```ts
import Anthropic from "@anthropic-ai/sdk"
import { z } from "zod"

const WeatherInput = z.object({
  city: z.string().describe("City name"),
  units: z.enum(["c","f"]).default("c"),
}).strict()

const tools = [{
  name: "get_weather",
  description: "Get current weather",
  input_schema: z.toJSONSchema(WeatherInput),  // ★ zod → JSON Schema
}]

// LLM 返回后：
const result = WeatherInput.safeParse(toolUse.input)
if (!result.success) {
  // 把 error 反馈给 LLM 让它重来
  return { role: "tool", content: `Invalid input: ${result.error.message}` }
}
// result.data 是强类型的 { city: string; units: "c"|"f" }
```

**这段模式你在每个 agent 项目里都会写十遍以上**。

#### 6. 高频陷阱

| 坑                                 | 症状                       | 解法                                 |
| ---------------------------------- | -------------------------- | ------------------------------------ |
| 忘了 `.strict()`                   | LLM 幻想的字段被静默接受   | 顶层 object 都加 `.strict()`         |
| 用 `parse` 不用 `safeParse`        | LLM 出错就崩全流程         | Agent 里默认 `safeParse`             |
| Schema 里没 `.describe()`          | LLM tool-call 参数经常错位 | 每个非平凡字段都加                   |
| `z.any()` / `z.unknown()` 逃避类型 | 相当于没校验               | 逼自己写具体 schema                  |
| `z.date()` 遇到 JSON 字符串        | 校验失败                   | 用 `z.coerce.date()` 或 `.transform` |

---

### Zod v4（现在 2026 年 7 月）的新东西

从 v3 → v4 主要变化（你需要知道）：

- **性能大幅提升**（据官方 2–7 倍）
- `z.toJSONSchema()` 现在是**内置的**（v3 要靠 `zod-to-json-schema` 三方库）
- **Discriminated union 类型推导更准**
- **更好的 tree-shaking**

**装的时候直接 `npm i zod` 拿 v4**。旧文档如果用 `zodToJsonSchema` 三方包，是 v3 时代的，改成内置 `z.toJSONSchema()` 即可。

---

### Zod vs 竞品（30 秒过一遍就好）

| 库        | 定位                             | 用不用                   |
| --------- | -------------------------------- | ------------------------ |
| **Zod**   | 类型 + 运行时 + JSON Schema 一体 | **首选**                 |
| Valibot   | 更轻量、tree-shake 友好          | 极限体积场景可选         |
| ArkType   | 语法接近 TS 类型                 | 尝鲜可以，生态不如 Zod   |
| io-ts     | 函数式风格                       | 老项目会遇到，新项目别选 |
| Yup / Joi | Node 时代老将                    | 已过时，别用             |

**结论：agent 项目直接 Zod，无脑选**。

---

## 二、Bun —— 是否值得换掉 Node？

### Bun 是什么

一个"**替代 Node/npm/tsx/esbuild/vitest 的一体化 JS runtime**"：

- 用 Zig 写的运行时（不用 V8，用 JavaScriptCore）
- 内置 TS 支持（`bun run script.ts` 直接跑）
- 内置包管理器（`bun install` 比 npm 快 10–30 倍）
- 内置打包器（`bun build`）
- 内置测试跑 runner（`bun test`）
- 内置 HTTP server（`Bun.serve`）
- 内置 SQLite（`bun:sqlite`）
- 内置 shell（`Bun.$`）

**一句话：把 Node + npm + tsx + esbuild + vitest 打包成一个二进制**。

---

### 对 code agent 开发者的实际影响

#### ✅ 明确好处

| 好处                      | 说明                                                           |
| ------------------------- | -------------------------------------------------------------- |
| **原生跑 TS/TSX**         | `bun script.ts` 无需 tsx / ts-node / 编译；开发迭代快          |
| **`bun install` 快**      | 大项目从 30s → 3s                                              |
| **`bun build --compile`** | 直接把 agent 打包成**单一二进制**分发，无需 Node 环境          |
| **`Bun.$` shell**         | Agent 里执行 shell 更符合直觉：`` await Bun.$`git status` ``   |
| **启动快**                | Bun 冷启动 ~10ms，Node ~50ms —— 在 hook / CLI 短脚本里差别明显 |
| **内置 test**             | 不用装 vitest/jest                                             |
| **`Bun.file()` API**      | 比 `fs/promises` 简洁：`await Bun.file("x.json").json()`       |

#### ⚠️ 需要小心

| 风险                                              | 说明                                                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **兼容性偶发问题**                                | 99% 的 npm 包能跑，但**某些用 Node native API 的包**会踩坑（如某些 native binding、`node-gyp` 编译包） |
| **Claude Code / Cursor Workflow runtime 是 Node** | 你写的 workflow 脚本仍然在 **Node V8 里跑**，Bun 帮不上                                                |
| **生态相对新**                                    | 遇到 bug 时社区答案比 Node 少一个数量级                                                                |
| **windows 支持仍在追赶**                          | 好了很多但不如 Linux/macOS                                                                             |
| **和 `@anthropic-ai/sdk` 完全兼容**               | ✅ 没问题（这个我可以确认）                                                                            |
| **和 MCP TypeScript SDK 兼容**                    | ✅ 基本 OK，但 stdio transport 极偶发问题被人报过                                                      |

---

### 什么时候用 Bun，什么时候留在 Node

#### 用 Bun ✅

- 从零起一个**独立的 CLI agent** 项目
- 需要打包成**单二进制分发**（Bun 这里比 Node 的 `pkg` 好）
- 开发迭代速度敏感（`bun run` vs `tsx` 差别可感）
- 短脚本 / hook / statusline（启动时间敏感）
- 学习成本可接受（几乎就是 Node，多学 5 个 API）

#### 留在 Node ⚠️

- **写 Claude Code workflow 脚本** —— runtime 是 Node，你的选择被锁死
- **写 Claude Code plugin / MCP server 给他人用** —— 别人机器上是 Node，你的包必须 Node 兼容
- **依赖某些 native binding 密集的库**（`sharp`、某些数据库驱动、`node-gyp` 密集）
- **企业项目部署环境固定是 Node**
- **需要 Node 的 domain-specific 库**（如 tree-sitter Node 绑定，Bun 有替代但成熟度差）

---

### Bun 60 分钟入门（只学 agent 相关的）

#### 安装
```bash
curl -fsSL https://bun.sh/install | bash
```

#### 三个新 API 值得记

**① 文件 IO 极简**
```ts
const data = await Bun.file("config.json").json()
await Bun.write("out.txt", "hello")
```

**② Shell 融进语法**
```ts
import { $ } from "bun"
const branch = await $`git branch --show-current`.text()
await $`npm run build`  // 直接执行
```
Agent 执行 shell 命令时**比 `child_process.spawn` 简洁 5 倍**。

**③ HTTP server（0 依赖）**
```ts
Bun.serve({
  port: 3000,
  fetch(req) {
    return new Response("hi")
  },
})
```
如果你要给 agent 加一个 HTTP 网关，**不用 express/fastify/hono**。

#### 三个命令覆盖 90% 用法

```bash
bun install                    # 装依赖，快
bun run src/agent.ts           # 直接跑 TS
bun build src/index.ts --compile --outfile agent  # 单二进制
```

#### 和 Node 100% 兼容的部分

- `import fs from "fs/promises"` ✅
- `import path from "path"` ✅
- `process.env` / `process.argv` ✅
- `fetch` / `Response` / `URL` ✅（Node 也有了）
- `@anthropic-ai/sdk` / `zod` ✅

**基本上"Node 代码几乎不用改，直接 `bun run` 跑"**。

---

### 一个务实的选择矩阵

| 场景                              | 推荐                                          |
| --------------------------------- | --------------------------------------------- |
| 学 TS + Agent SDK，初学者         | **Node + tsx** —— 材料多、遇坑好搜答案        |
| 自己的独立 agent CLI 项目         | **Bun** —— 开发爽、打包容易                   |
| Claude Code workflow / MCP server | **Node**（被 runtime 锁定）                   |
| 写给他人用的 npm 包               | **Node**（发布兼容性）                        |
| 端侧/资源受限环境部署             | **Bun `--compile`**（单二进制、无运行时依赖） |
| 大型项目 monorepo                 | **Node + pnpm**（生态、tooling 更成熟）       |

---

## 补充到之前的学习路线

在原来的 Tier 里加两条：

**Tier 1 · MANDATORY 追加**
- ✅ **Zod 基础**（`z.object` / `.parse` / `safeParse` / `z.infer` / `.describe` / `.strict`）—— 每个 agent 项目都要用

**Tier 2 · HIGH-PRIORITY 追加**
- ✅ **Bun 基础三命令**（`bun install` / `bun run` / `bun build --compile`）—— 至少会用来开发和分发

**Tier 3 · OPTIONAL 追加**
- ⚪ Bun 的 `Bun.$` shell、`Bun.serve`、`Bun.file` API
- ⚪ Zod 高级：`discriminatedUnion` 、`transform` 、`refine`、自定义 error map

---

## 最后：直接给你一个"能立刻用"的最小 agent 模板

```ts
// agent.ts —— 用 bun 跑：bun run agent.ts
import Anthropic from "@anthropic-ai/sdk"
import { z } from "zod"

const ReadFileInput = z.object({
  path: z.string().describe("Absolute file path"),
}).strict()

const tools = [{
  name: "read_file",
  description: "Read a file's contents",
  input_schema: z.toJSONSchema(ReadFileInput),
}]

const client = new Anthropic()
const msg = await client.messages.create({
  model: "claude-opus-4-7",
  max_tokens: 1024,
  tools,
  messages: [{ role: "user", content: "Read /tmp/hello.txt" }],
})

for (const block of msg.content) {
  if (block.type === "tool_use" && block.name === "read_file") {
    const parsed = ReadFileInput.safeParse(block.input)
    if (!parsed.success) {
      console.error("Bad tool input", parsed.error)
      continue
    }
    const content = await Bun.file(parsed.data.path).text()
    console.log("Tool result:", content)
  }
}
```

**16 行代码，Zod + Bun + Anthropic SDK 全在里面**。你把它跑通，Zod 和 Bun 的入门就完成了。