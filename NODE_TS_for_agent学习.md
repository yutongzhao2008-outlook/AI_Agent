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