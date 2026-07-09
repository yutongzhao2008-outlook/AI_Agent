# CODEX 配置 / 代码 / Build / Release 解析

## 一、优化后的 Prompt（下次复用模板）

**角色：** 你是一名顶级 Node.js + TypeScript 架构师、Build/Release 专家和 Code Agent 工程师。

请基于当前仓库的真实文件，系统解析所有配置文件与源码、测试、构建、发布之间的关系。要求：

1. 先盘点所有配置类文件：package.json、package-lock.json、tsconfig.json、.env/.env.example、测试配置、工具/Agent 指令配置、README/prompt 等项目约束文档。
2. 对每一个配置项说明：
   - 它控制什么行为；
   - 它和哪些源码文件、依赖、命令或生成物相关；
   - 它在 build/test/dev/release 链路中的作用；
   - 修改它可能带来的影响和风险。
3. 说明同一配置文件内字段之间的关系，以及不同配置文件之间的关系。
4. 结合源码入口、依赖加载、TypeScript 编译、Jest 测试、环境变量、生成目录 dist、lockfile 可复现安装等维度，给出 Build/Release 视角的完整链路。
5. 参考 Node/TS Code Agent 学习范围，特别关注 async/await、JSON Schema、dotenv、Jest、ts-node、tsc、ESM/CJS、Zod/Bun 是否已使用或是否适合作为后续演进方向。
6. 不泄露 .env 中的真实密钥，只说明变量名和用途。
7. 最后输出：
   - 当前仓库配置-代码-Build-Release 关系图；
   - 关键风险；
   - 推荐优化项；
   - 可执行验证命令及当前验证结果。

## 二、Response：仓库总体判断

这是一个最小化 Node.js + TypeScript Code Agent 项目。运行时主链路是：

- `.env / ANTHROPIC_API_KEY`
- `src/index.ts` 通过 `dotenv/config` 加载环境变量
- `new CodeAgent()`
- `src/agent.ts` 调用 `@anthropic-ai/sdk`
- `src/tools.ts` 暴露 `read_file` / `write_file` / `run_bash`
- Anthropic `tool_use` 循环返回结果

构建链路是：

- `package.json` 中 `scripts.build = tsc`
- `tsconfig.json` 决定 `rootDir=src`、`outDir=dist`、`module=commonjs`、`target=ES2020`
- 输出 `dist/*.js`、`dist/*.d.ts`、`dist/*.map`
- `package.json` 中 `main = dist/index.js`
- `npm start` 运行发布产物

测试链路是：

- `package.json` 中 `scripts.test = jest`
- `package.json` 中 `jest.preset = ts-jest`
- `ts-jest` 读取 TypeScript/Jest 环境
- `testMatch = src/__tests__/**/*.test.ts`
- `src/__tests__/tools.test.ts` 覆盖 `tools.ts`

## 三、配置文件盘点

| 文件 | 类型 | 主要作用 | Build/Release 关系 |
|---|---|---|---|
| `package.json` | npm 项目清单 | 定义包名、入口、脚本、依赖、Jest 配置 | 是 build/test/start 的总入口 |
| `package-lock.json` | npm 锁文件 | 固定依赖解析版本和完整依赖树 | 支持 `npm ci` 可复现安装 |
| `tsconfig.json` | TypeScript 编译配置 | 决定源码范围、输出目录、模块格式、类型严格度 | 直接控制 `npm run build` 的产物 |
| `.env.example` | 环境变量模板 | 声明 `ANTHROPIC_API_KEY` | 指导本地/发布环境配置密钥 |
| `.env` | 本地环境配置 | 提供真实 `ANTHROPIC_API_KEY`，内容应保密 | 仅本地运行需要，不应进入 release 包 |
| `.claude/settings.local.json` | 本地 Agent 工具权限 | 允许 Claude 本地执行 npm 相关 Bash 命令 | 影响 AI 开发工作流，不影响应用运行 |
| `AGENTS.md` | Agent/贡献者指令 | 说明项目结构、命令、测试、协作规范 | 影响后续 AI/人类改动质量，不参与编译 |
| `CLAUDE.md` | LLM 行为规范 | 约束实现方式：简单、谨慎、可验证 | 影响开发流程，不参与运行 |
| `prompt.md` | 生成项目的原始/优化 prompt | 记录项目设计意图和验收标准 | 是需求来源，可用于审计实现是否偏离 |
| `README.md` | 项目说明文档 | 说明架构、使用、测试、扩展 | Release 文档资产，不参与编译 |

`debug.log` 是运行/调试日志，不是配置文件；`node_modules/` 是安装结果；`dist/` 是构建产物。

## 四、`package.json`：项目、依赖、命令的中心配置

### 基本字段

| 配置项 | 当前值 | 与源码关系 | Build/Release 关系 |
|---|---|---|---|
| `name` | `simple-code-agent` | 不被源码直接读取 | npm 包/日志/发布身份 |
| `version` | `1.0.0` | 不被源码直接读取 | 发布版本号，应随 release 递增 |
| `description` | 中文项目描述 | 文档元信息 | npm metadata |
| `main` | `dist/index.js` | 对应 `src/index.ts` 编译产物 | `npm start` 和包消费者默认入口 |

`main` 与 `tsconfig.outDir` 强耦合：`main=dist/index.js` 只有在 `outDir=./dist` 且 `src/index.ts` 成功编译时才有效。如果将 `outDir` 改为 `build`，必须同步修改 `main` 和 `start`。

### scripts

| script | 命令 | 源码/配置关系 | Build/Release 作用 |
|---|---|---|---|
| `build` | `tsc` | 读取 `tsconfig.json`，编译 `src/**/*` | 生成 `dist/` 发布产物 |
| `start` | `node dist/index.js` | 运行 `src/index.ts` 的 JS 产物 | 模拟 release 后运行 |
| `dev` | `ts-node src/index.ts` | 直接运行 TS 源码，依赖 `ts-node` | 本地快速开发，不生成产物 |
| `test` | `jest` | 使用 `package.json.jest` 配置 | CI gate / release 前质量门 |

`dev` 和 `start` 的差异很重要：`dev` 验证源码即时运行，`start` 验证 build 产物可运行。Release 前两者至少应保证 `build` 和 `test` 通过，必要时再手动验证 `start`。

### dependencies

| 依赖 | 与源码关系 | Build/Release 关系 |
|---|---|---|
| `@anthropic-ai/sdk` | `src/agent.ts` 创建 `Anthropic` client；`src/tools.ts` 使用 `Anthropic.Tool` 类型 | 运行时必需，缺失会导致 agent 无法调用 Claude API |
| `dotenv` | `src/index.ts` 的 `import 'dotenv/config'` 自动加载 `.env` | 本地运行必需；生产环境可直接注入 env，不一定需要 `.env` 文件 |

### devDependencies

| 依赖 | 与源码/配置关系 | Build/Release 关系 |
|---|---|---|
| `typescript` | `npm run build` 调用 `tsc` | 编译器，决定 TS 到 JS 的转换 |
| `ts-node` | `npm run dev` 调用 | 开发期运行 TS |
| `jest` | `npm test` 调用 | 测试 runner |
| `ts-jest` | `jest.preset=ts-jest` | 让 Jest 执行 `.ts` 测试 |
| `@types/node` | 支持 `fs/path/child_process/process/readline` 类型 | 编译期类型正确性 |
| `@types/jest` | 支持 `describe/test/expect` 类型 | 测试编译期类型正确性 |

### jest 配置

| 配置项 | 当前值 | 关系 |
|---|---|---|
| `preset` | `ts-jest` | Jest 运行 TS 测试，不需要先单独编译测试文件 |
| `testEnvironment` | `node` | 测试中使用 `fs/os/path/child_process` 等 Node API |
| `testMatch` | `["**/__tests__/**/*.test.ts"]` | 匹配 `src/__tests__/tools.test.ts` |

这里的 `testMatch` 与 `tsconfig.exclude=["src/__tests__"]` 是互补关系：构建时排除测试，测试时专门包含测试。

## 五、`package-lock.json`：依赖可复现性

当前 `lockfileVersion=3`。`package.json` 给出 semver 范围，例如 `typescript: ^5.4.5`；`package-lock.json` 固定实际解析版本，例如当前解析到 `typescript 5.9.3`、`@anthropic-ai/sdk 0.52.0`、`jest 29.7.0`、`ts-jest 29.4.11`。

关系如下：

```text
package.json 说明想要什么范围
package-lock.json 记录 npm 实际装了什么
node_modules/ 是 lockfile 安装后的物理结果
```

Build/Release 建议使用 `npm ci` 而不是 `npm install`，因为 `npm ci` 严格按 lockfile 安装，能减少“本地能跑、CI 不能跑”的版本漂移。

## 六、`tsconfig.json`：源码到发布产物的规则

| 配置项 | 当前值 | 与源码关系 | Build/Release 影响 |
|---|---|---|---|
| `target` | `ES2020` | 允许输出 ES2020 级别 JS | 需要 Node 运行时支持 ES2020 |
| `module` | `commonjs` | 编译 `import/export` 为 CJS | 与 `package.json` 未设置 `type: module` 保持一致 |
| `lib` | `["ES2020"]` | 提供 ES2020 类型库 | 支持 Promise、现代 JS API |
| `outDir` | `./dist` | 所有编译产物进入 `dist/` | 必须匹配 `package.json.main/start` |
| `rootDir` | `./src` | 只以 `src` 为源码根 | 输出目录结构与 `src` 对齐 |
| `strict` | `true` | 强制严格类型检查 | Release 前更早发现类型风险 |
| `esModuleInterop` | `true` | 改善 CJS/ESM 默认导入互操作 | 让 SDK/依赖导入更稳 |
| `skipLibCheck` | `true` | 跳过依赖 `.d.ts` 检查 | 加快构建，但可能隐藏第三方类型问题 |
| `forceConsistentCasingInFileNames` | `true` | 防止大小写路径不一致 | 避免 Windows/Linux CI 差异 |
| `resolveJsonModule` | `true` | 允许 TS import JSON | 当前源码未使用，但未来可读配置 JSON |
| `declaration` | `true` | 生成 `.d.ts` | 有利于作为库发布 |
| `declarationMap` | `true` | 生成 `.d.ts.map` | 改善 IDE 跳转 |
| `sourceMap` | `true` | 生成 `.js.map` | 方便调试发布产物 |
| `include` | `src/**/*` | 编译所有 src 文件 | 保证 agent/tools/index 进入 build |
| `exclude` | `node_modules`, `dist`, `src/__tests__` | 排除依赖、产物、测试 | 避免 build 包含测试和循环编译产物 |

核心关系：

```text
src/index.ts -> dist/index.js -> package.json main/start
src/agent.ts -> dist/agent.js
src/tools.ts -> dist/tools.js
src/__tests__/tools.test.ts -> 不进入 dist，只由 Jest/ts-jest 执行
```

## 七、环境配置：`.env.example` 与 `.env`

`.env.example` 声明：

```text
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx
```

`.env` 中存在同名变量，但真实值已在本报告中屏蔽。

源码关系：

```text
src/index.ts
  import 'dotenv/config'
  -> process.env.ANTHROPIC_API_KEY
  -> new CodeAgent()
  -> src/agent.ts constructor(apiKey?: string)
  -> new Anthropic({ apiKey })
```

如果 `ANTHROPIC_API_KEY` 缺失，`src/index.ts` 会早失败并提示复制 `.env.example`。Release 时不建议打包 `.env`，而应由部署平台注入环境变量。

## 八、`.claude/settings.local.json`：本地 Agent 权限配置

当前允许：

```json
{
  "permissions": {
    "allow": [
      "Bash(npm install *)",
      "Bash(npm run *)",
      "Bash(npm test *)"
    ]
  }
}
```

它不影响 Node 程序运行，也不影响 `tsc` 或 Jest 本身。它影响的是本地 Claude/Agent 工具能否代替开发者执行 npm 命令。该文件名含 `local`，更偏本地开发配置；团队 release 流程不应依赖它。

## 九、文档/Agent 指令类配置

`AGENTS.md`、`CLAUDE.md`、`prompt.md`、`README.md` 不参与编译，但它们影响“人和 AI 如何修改仓库”。

| 文件 | 关系 |
|---|---|
| `prompt.md` | 定义最初生成目标：最小化、自包含、三层结构、build/test 通过 |
| `README.md` | 描述架构、UML、快速开始、扩展指南，是 release 文档 |
| `CLAUDE.md` | 约束 AI 修改代码时保持简单、谨慎、可验证 |
| `AGENTS.md` | 新增贡献者指南，固化项目结构、命令、测试、提交规范 |

这些文件与 Build/Release 的关系是“流程质量”而非“机器执行”：它们能减少错误改动，但不会被 `tsc` 或 `jest` 读取。

## 十、源码关系与架构边界

```text
交互层：src/index.ts
  - 加载 dotenv
  - 校验 ANTHROPIC_API_KEY
  - 创建 readline REPL
  - 处理 exit/reset
  - 调用 CodeAgent.run()

Agent 层：src/agent.ts
  - MODEL = claude-sonnet-4-6
  - MAX_TOKENS = 4096
  - MAX_ITERATIONS = 20
  - SYSTEM_PROMPT + cache_control
  - 调用 Anthropic messages.create()
  - 分派 tool_use 到 executeTool()

工具层：src/tools.ts
  - toolDefinitions: read_file/write_file/run_bash 的 JSON Schema
  - executeTool(): fs/path/child_process 的同步实现
```

`package.json.dependencies` 与源码 import 对应清晰；`devDependencies` 与 scripts/test/build 对应清晰。当前没有 Zod、Bun、ESLint、Prettier、CI、Docker、发布脚本。

## 十一、配置项之间的关键关系

1. `package.json.main` 必须与 `tsconfig.outDir` 和 `src/index.ts` 对齐。
2. `package.json.scripts.build=tsc` 必须依赖 `typescript` devDependency。
3. `package.json.scripts.dev=ts-node src/index.ts` 必须依赖 `ts-node`，并绕过 `dist/`。
4. `package.json.scripts.test=jest` 必须依赖 `jest`，且 `jest.preset=ts-jest` 必须依赖 `ts-jest`。
5. `tsconfig.exclude=src/__tests__` 与 `jest.testMatch=**/__tests__/**/*.test.ts` 共同实现“构建不带测试、测试专门找测试”。
6. `module=commonjs` 与未设置 `package.json.type=module` 保持一致；如果未来改 ESM，需要同步调整 `module`、运行命令、Jest/ts-jest 配置。
7. `.env.example` 的变量名必须与 `src/index.ts` 读取的 `process.env.ANTHROPIC_API_KEY` 完全一致。
8. `package-lock.json` 必须与 `package.json` 同步提交，否则 CI/release 安装不可预测。

## 十二、Build/Release 验证结果

本次在当前环境中执行：

| 命令 | 结果 | 说明 |
|---|---|---|
| `npm run build` | PowerShell 拦截 | `npm.ps1` 未签名，被执行策略拒绝；不是项目代码问题 |
| `npm.cmd run build` | 通过 | `tsc` exit 0，`dist/` 已生成 JS、类型声明、source map |
| `npm test` | PowerShell 拦截 | 同样因为 `npm.ps1` 执行策略 |
| `npm.cmd test` | 失败 | Jest worker `spawn EPERM`，测试尚未执行 |
| `npm.cmd test -- --runInBand` | 9/10 通过，1 失败 | Jest 进入测试；`run_bash` 测试失败，因为 Node `child_process.execSync` spawn `cmd.exe` 被环境拦截 |

因此当前结论是：TypeScript build 可通过；测试失败点不是 TypeScript/Jest 配置错误，而是当前环境禁止 Node 子进程 spawn，这会直接影响 `src/tools.ts` 的 `run_bash` 工具能力。

## 十三、关键风险

1. **无 `.gitignore` 风险**：仓库中存在 `.env`、`debug.log`、`node_modules/`、`dist/`。如果未被外部忽略规则保护，release/commit 可能误带密钥、日志和生成物。
2. **`run_bash` 环境依赖强**：源码使用 `execSync`，在当前环境中出现 `spawnSync C:\WINDOWS\system32\cmd.exe EPERM`。这会导致 agent 的 shell 工具不可用。
3. **工具输入缺少运行时 schema 校验**：`executeTool(name, input as Record<string,string>)` 信任 LLM 输入。学习文件中提到的 Zod/JSON Schema 校验是后续重要增强点。
4. **模型 ID 硬编码**：`MODEL='claude-sonnet-4-6'` 在源码内，不受配置文件控制。换模型需要改代码并重新 build。
5. **缺少 CI/release 配置**：没有 GitHub Actions、npm publish、Docker、版本发布脚本或 release checklist。
6. **无 lint/format gate**：没有 ESLint/Prettier，代码风格主要依赖人工和文档约束。

## 十四、推荐优化项

优先级 P0：

- 增加 `.gitignore`，至少忽略 `.env`、`node_modules/`、`debug.log`、可选忽略 `dist/`。
- 明确 release 安装命令使用 `npm ci`。
- 在 CI 或本地验证中使用能允许 Node child_process 的环境；否则 `run_bash` 工具无法被证明可用。

优先级 P1：

- 引入 Zod 校验 tool input：JSON Schema 用于 LLM，`safeParse` 用于运行时防御。
- 将 `MODEL`、`MAX_TOKENS`、`MAX_ITERATIONS` 配置化，例如读取环境变量并提供默认值。
- 把 Jest 配置从 `package.json` 拆到 `jest.config.ts` 或 `jest.config.js`，当测试配置变复杂时更清晰。

优先级 P2：

- 增加 ESLint/Prettier 或至少 `npm run lint`。
- 增加 GitHub Actions：`npm ci -> npm run build -> npm test`。
- 如果要分发 CLI，可评估 `bin` 字段、`tsup`/`esbuild` 打包，或学习文件中提到的 Bun `--compile`，但当前项目保持 Node + tsc 更简单。

## 十五、最终关系图

```text
开发输入
  package.json
  tsconfig.json
  .env.example/.env
  .claude/settings.local.json
  README.md / prompt.md / CLAUDE.md / AGENTS.md

安装
  package.json + package-lock.json
    -> npm install / npm ci
    -> node_modules

开发运行
  npm run dev
    -> ts-node
    -> src/index.ts
    -> dotenv/config
    -> src/agent.ts
    -> src/tools.ts

构建
  npm run build
    -> tsc
    -> tsconfig.json
    -> dist/index.js, dist/agent.js, dist/tools.js
    -> .d.ts / .map

发布运行
  npm start
    -> node dist/index.js
    -> ANTHROPIC_API_KEY from environment

测试
  npm test
    -> jest + ts-jest
    -> src/__tests__/tools.test.ts
    -> src/tools.ts
```

总体评价：该仓库配置少、链路短、适合作为教学型 TypeScript Code Agent。当前 build 配置是闭环的，test 配置设计也是合理的；真正需要关注的是本地执行策略/子进程权限、密钥与日志忽略、tool input 运行时校验、以及后续 release 自动化。
