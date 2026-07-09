# 顶级 AI Skill 开源项目排名分析
> 数据核查日期：2026-07-09 | 所有 Star 数均通过 GitHub 实时页面验证

---

## 排名总览

| 排名 | 项目 | Stars | 定位 | URL |
|------|------|-------|------|-----|
| 🥇 1 | obra/superpowers | ⭐ 250k | 跨平台技能框架 | https://github.com/obra/superpowers |
| 🥈 2 | mattpocock/skills | ⭐ 161k | 工程师工作流工具集 | https://github.com/mattpocock/skills |
| 🥉 3 | anthropics/claude-code | ⭐ 137k | 官方 CLI（内建技能系统） | https://github.com/anthropics/claude-code |
| 4 | addyosmani/agent-skills | ⭐ 74k | 全生命周期生产级技能 | https://github.com/addyosmani/agent-skills |
| 5 | PatrickJS/awesome-cursorrules | ⭐ 40.3k | Cursor 规则精选合集 | https://github.com/PatrickJS/awesome-cursorrules |
| 6 | agentskills/agentskills | ⭐ 22.7k | 官方 Skill 格式标准规范 | https://github.com/agentskills/agentskills |
| 7 | anthropics/claude-code-action | ⭐ 8.3k | GitHub Actions 集成 | https://github.com/anthropics/claude-code-action |
| 大类 A | karpathy/autoresearch | — | Autonomous Research / 自动实验循环 | https://github.com/karpathy/autoresearch |
| 大类 B | multica-ai/andrej-karpathy-skills | — | Karpathy-style Agent Discipline / Agent 行为准则 | https://github.com/multica-ai/andrej-karpathy-skills |

---

## 详细分析

---

### 🥇 第1名：obra/superpowers
**URL：** https://github.com/obra/superpowers  
**Stars：** ⭐ 250,000 | Forks: 22.2k | 最新版本: v6.1.1 (2026-07-02) | License: MIT

**核心定位：** 跨平台 AI Agent 技能规范框架（Framework）

**为什么排第一：**
- Stars 最多（250k），是 AI 技能类中体量最大的项目
- 被 Anthropic 官方 Plugin Marketplace 纳入推广
- 兼容 Claude Code、Cursor、Codex 等主流 Agent 工具，跨平台通用性无可匹敌
- 活跃维护：628 commits，v6.1.1 为最新，社区规模庞大（157 open issues, 187 PRs）

**核心特色：**
- 结构化工作流覆盖从需求讨论到上线合并的完整研发链路
- 子 Agent 驱动开发（Subagent-Driven Development）：多 Agent 并行协作
- 强制 TDD 循环（RED-GREEN-REFACTOR）
- Git worktree 隔离：每个 feature branch 在独立 worktree 运行，避免状态污染
- 技能库覆盖：调试、规划、代码审查、协作、meta-workflow 等

**适用场景：** 需要跨工具通用规范、追求系统化开发流程的个人/团队

---

### 🥈 第2名：mattpocock/skills
**URL：** https://github.com/mattpocock/skills  
**Stars：** ⭐ 161,000 | Forks: 13.9k | 最新版本: v1.1.0 (2026-07-08) | License: MIT

**核心定位：** 高级工程师工作流工具集（Library）

**为什么排第二：**
- 161k stars，增长曲线陡峭，社区认可度极高
- 由 TypeScript 社区知名工程师 Matt Pocock 打造，工程质量有保证
- 专注解决 AI 辅助开发的真实痛点（非"vibe coding"，而是工程纪律）
- 安装极简：`npx skills@latest add mattpocock/skills`

**核心特色：**
- `/grill-with-docs`：对话驱动的需求对齐 + 共建领域语言 → 更新 `CONTEXT.md`
- `/tdd`：强制 red-green-refactor 测试驱动开发循环
- `/diagnosing-bugs`：结构化调试流程（复现 → 最小化 → 假设 → 修复 → 回归测试）
- `/improve-codebase-architecture`：扫描设计缺陷，生成 HTML 分析报告
- `/to-spec` / `/to-tickets`：将对话转化为规格说明或分解为任务票
- `/wayfinder`：将大型多会话工作规划为调查票据序列

**适用场景：** 高频使用 AI 编码 Agent 的工程师，希望将工作流标准化的团队

---

### 🥉 第3名：anthropics/claude-code
**URL：** https://github.com/anthropics/claude-code  
**Stars：** ⭐ 137,000 | Forks: 22k | License: MIT

**核心定位：** 官方 Claude Code CLI（内建技能系统）

**为什么排第三：**
- Anthropic 官方出品，生态内的权威标准
- Claude Code 本身内建了完整的 Skills 架构（`/skills` 命令，Plugin Marketplace）
- 137k stars，是整个 AI Skills 生态的基础设施
- 支持 IDE 集成、GitHub Actions、桌面应用等多端

**核心特色：**
- 内建技能触发系统（自动匹配相关技能）
- Plugin Marketplace：官方认证的第三方技能市场
- Hooks 系统：Pre/Post 工具调用钩子，实现自动化行为
- MCP（Model Context Protocol）原生支持
- 支持 Claude Opus 4.7 / Sonnet 4.6 / Haiku 4.5

**适用场景：** 所有使用 Claude 进行 AI 辅助开发的用户

---

### 第4名：addyosmani/agent-skills
**URL：** https://github.com/addyosmani/agent-skills  
**Stars：** ⭐ 74,000 | Forks: 8k | 最新版本: v0.6.3 (2026-07-03)

**核心定位：** 生产级全生命周期 AI 编程技能集（Production-Grade Library）

**为什么排第四：**
- 74k stars，v0.6.3 活跃迭代
- 由 Google Chrome 团队的 Addy Osmani 出品，以 Web 性能和工程最佳实践著称
- 兼容性最广：Claude Code、Cursor、Codex、Copilot、Gemini CLI 等 70+ Agent

**核心特色：**
- **24 个技能**，按 6 阶段组织：Define / Plan / Build / Verify / Review / Ship
- **8 个斜杠命令**：`/spec`, `/plan`, `/build`, `/test`, `/review`, `/webperf`, `/code-simplify`, `/ship`
- **4 种专家 Agent 角色**：代码审查员、测试工程师、安全审计员、性能审计员
- 内置参考清单：安全、性能、可访问性、可观测性
- 反合理化表（Anti-rationalization tables）：防止 Agent 跳过关键步骤
- 专项 Web 性能技能（`/webperf`）：Addy 深厚背景加持

**适用场景：** 需要全流程编码辅助、追求高质量代码输出的专业开发者

---

### 第5名：PatrickJS/awesome-cursorrules
**URL：** https://github.com/PatrickJS/awesome-cursorrules  
**Stars：** ⭐ 40,300 | Forks: 3.4k | License: CC0-1.0（公共领域）

**核心定位：** Cursor AI 编辑器规则精选合集（Collection）

**为什么排第五：**
- 40.3k stars，聚焦 Cursor 用户群体
- 覆盖主流技术栈的 `.mdc` 规则文件，开箱即用
- 公共领域许可，无使用限制

**核心特色：**
- 规则分类：前端框架、后端全栈、移动端、测试、安全、数据库/API 等
- 现代 `.mdc` 格式（YAML frontmatter + `description/globs/alwaysApply`）
- 覆盖：Next.js, React, Vue, SvelteKit, FastAPI, Go, Laravel, Flutter 等
- 反幻觉守卫（NestJS）、Supabase 认证安全、反谄媚编码纪律等专项规则

**适用场景：** Cursor 用户，希望快速获得框架/语言特定最佳实践

---

### 第6名：agentskills/agentskills
**URL：** https://github.com/agentskills/agentskills  
**Stars：** ⭐ 22,700 | Forks: 1.4k | License: Apache 2.0（代码）/ CC-BY-4.0（文档）

**核心定位：** 官方 Skill 格式标准规范（Standard/Spec）

**为什么排第六：**
- 由 Anthropic 发布的官方开放标准，定义 Skill 的规范格式
- 不是工具集合，而是跨平台 Skill 互通的"语言规范"
- 为整个生态提供标准化基础，所有上层项目均遵循此规范

**核心特色：**
- Skill = 以 `SKILL.md` 为核心的文件夹结构
- 渐进式披露（3 阶段）：Discovery（名称/描述）→ Activation（加载 SKILL.md）→ Execution（运行脚本）
- 极小上下文占用设计
- 跨平台兼容：任何支持技能的 Agent 均可使用

**适用场景：** 想要构建标准化、跨平台兼容技能的开发者和工具作者

---

### 第7名：anthropics/claude-code-action
**URL：** https://github.com/anthropics/claude-code-action  
**Stars：** ⭐ 8,300 | Forks: 2k | 最新版本: v1.0 (2025-08-26)

**核心定位：** GitHub Actions 集成（Integration）

**核心特色：**
- 通过 `@claude` mention 在 PR/Issue 中触发 Claude
- 支持 Anthropic API、AWS Bedrock、Google Vertex AI、Microsoft Foundry
- 代码审查、代码实现、问题回答一体化
- 进度追踪（动态 checkboxes）

---

## AI Skill 设计方法论核心要点

当前业界最佳实践（源自 Anthropic + Perplexity 的上下文工程实践）：

### 三层成本模型（Token 经济学）
```
Index 层  (~100 tokens)  ← 每次对话都加载，必须极精简
  ↓ 触发
Load 层   (~5000 tokens) ← SKILL.md 主体，加载时付费
  ↓ 运行时需要
Runtime 层 (按需加载)    ← scripts/, references/ 重资产
```

### Skill 设计四大原则
1. **信号密度最大化**：每个 Token 都必须有价值，删除所有"显而易见"的内容
2. **渐进式披露**：在 description 定义边界，SKILL.md 写流程，scripts/ 放执行脚本
3. **自由度分级**：高自由度任务（启发式策略）→ 中（模板框架）→ 低（固定脚本）
4. **明确边界**：Skill ≠ Prompt ≠ 脚本 ≠ 知识库 ≠ MCP

---

## 选型建议

| 需求 | 推荐项目 |
|------|---------|
| 跨平台通用性、系统化开发方法论 | obra/superpowers |
| 工程师个人/团队工作流标准化 | mattpocock/skills |
| 全流程编码辅助、多工具兼容 | addyosmani/agent-skills |
| Cursor 用户，框架最佳实践 | PatrickJS/awesome-cursorrules |
| 构建标准化跨平台技能 | agentskills/agentskills |
| GitHub CI/CD 中集成 Claude | anthropics/claude-code-action |

---

*数据来源：GitHub 实时页面验证（2026-07-09）*

---

## `/goal` 最佳实践：把 Agent 从“执行指令”升级为“达成可验证目标”

> 更新日期：2026-07-09
> 参考来源：OpenAI Codex Goal 官方文档 / Cookbook、multica-ai/andrej-karpathy-skills、karpathy/autoresearch。知乎链接 `https://zhuanlan.zhihu.com/p/2035288538678288989` 当前访问返回 403，未将其不可验证内容写入结论。

### 核心结论

`/goal` 不是“让 Agent 无限自动跑”，而是给当前线程绑定一个**可验证的完成契约**：目标是什么、用什么证据证明完成、哪些约束不能破坏、失败或受阻时如何停止并汇报。

一句话模板：

```text
/goal 达成 <明确终态>，由 <测试/基准/日志/产物/报告> 验证，同时保持 <不可破坏约束>。
仅使用 <允许的文件/工具/数据/边界>。每轮迭代记录 <变更、证据、下一步>。
如果无法验证或没有合理路径，停止并报告 <尝试过什么、证据、阻塞点、需要的输入>。
```

### 何时适合用 `/goal`

| 适合使用 | 不适合使用 |
|---|---|
| 任务需要多轮尝试，且下一步取决于刚刚跑出来的证据 | 一行修改、简单解释、短代码审查 |
| 有明确成功条件：测试通过、指标达标、产物生成、报告完成 | “让它更好”“优化一下”这类没有完成标准的目标 |
| 可以形成验证循环：改代码 -> 跑检查 -> 看证据 -> 决定继续/完成/停止 | 互不相关的任务清单 |
| 迁移、性能优化、flaky test、bug 复现、提示词/eval 优化、研究复现 | 没有数据、没有命令、没有可检查产物的开放式探索 |

### 强目标的六个要素

1. **Outcome（终态）**：完成后世界应该是什么样。
2. **Verification surface（验证面）**：用哪个测试、benchmark、日志、截图、构建产物或报告证明。
3. **Constraints（约束）**：哪些行为、API、视觉、性能、兼容性、安全要求不能回退。
4. **Boundaries（边界）**：允许改哪些文件、用哪些工具、读哪些数据，哪些东西禁止改。
5. **Iteration policy（迭代策略）**：每轮失败后如何选择下一步，是否要保持改动最小、记录 checkpoint。
6. **Blocked stop condition（阻塞停止条件）**：什么时候不能继续猜，必须停下来汇报证据和下一步需要什么。

### 弱目标 vs 强目标

| 弱目标 | 强目标 |
|---|---|
| `/goal Improve performance` | `/goal Reduce checkout p95 latency below 120 ms, verified by the checkout benchmark, while keeping the correctness suite green. Keep edits scoped to checkout service and related tests. After each run, record the change, benchmark result, and next experiment. If the benchmark cannot run or no valid path remains, stop with evidence and blockers.` |
| `/goal Fix flaky test` | `/goal Reproduce and fix the flaky checkout test. Verify by running the target test 20 times locally and the related suite once. Do not weaken assertions or skip the test. If reproduction fails, stop with commands run, logs observed, and the most likely missing signal.` |
| `/goal Write docs` | `/goal Produce a docs page for this feature covering lifecycle, command surface, and two examples. Verify the docs build locally and all referenced commands match current behavior.` |
| `/goal Reproduce this paper` | `/goal Produce the strongest evidence-backed reproduction using available materials. Build a claim inventory, attempt feasible headline results, and end with a report separating confirmed mechanics, approximate reconstructions, blocked claims, and remaining uncertainty.` |

### 与 Karpathy 风格 Skill 的对应关系

multica-ai/andrej-karpathy-skills 的有效原型可以压缩成四条工程纪律：

- **Think Before Coding**：先暴露假设、歧义、取舍；不确定时问清楚。
- **Simplicity First**：最少代码解决问题，不加未要求的抽象和配置。
- **Surgical Changes**：只改和目标直接相关的行，不顺手重构无关代码。
- **Goal-Driven Execution**：把“做某事”改写成“达成可验证结果”，并循环到证据满足。

把这些放进 `/goal` 时，目标应尽量写成“成功标准 + 验证命令 + 改动边界”，而不是写成一长串操作步骤。这样 Agent 可以自主选择下一步，但不能绕过完成标准。

### 与 `karpathy/autoresearch` 的对应关系

`autoresearch` 是 `/goal` 思想的极简研究原型：

- 人主要编辑 `program.md`，也就是“研究组织代码”。
- Agent 只改 `train.py`，范围极窄，diff 可审查。
- 每个实验固定 5 分钟训练预算，避免用更长训练时间伪造进步。
- 唯一核心指标是 `val_bpb`，更低才算改进。
- 改动后运行实验，读取日志；指标变好就保留 commit，变差或崩溃就记录并丢弃。
- `results.tsv` 记录所有尝试，避免只保留成功叙事。

这给 `/goal` 的启发是：**优秀目标要有不可篡改的评估面、固定预算、清晰保留/丢弃规则、完整实验日志**。

### 推荐工作流

1. **先用 `/plan` 收敛目标**：当目标模糊时，让 Codex 先访谈你，生成候选 `/goal`。
2. **把长背景放文件里**：`/goal` 目标最长应保持精炼；长需求、设计稿、论文、benchmark 说明放 `PLAN.md`、`program.md` 或 issue 链接。
3. **启动目标**：`/goal <objective>`。
4. **用检查点监督，而非微操**：状态更新应包含当前 checkpoint、已验证证据、剩余工作、是否阻塞。
5. **跑偏时改目标，不要堆提示**：如果报告变模糊，补充验证面、边界或停止条件。
6. **结束时审计证据**：不要只看 Agent 说“完成”，要看测试、日志、benchmark、截图、报告或 diff。

### Codex 命令速查

```text
/goal <objective>   设置目标
/goal               查看当前目标
/goal pause         暂停目标
/goal resume        恢复目标
/goal clear         清除目标
```

如果命令列表里没有 `/goal`，可在 `config.toml` 中启用：

```toml
[features]
goals = true
```

或运行：

```bash
codex features enable goals
```

### 最佳 `/goal` 示例

```text
/goal Implement PLAN.md into a working first version. Verify each milestone with the listed tests or Playwright checks. Keep changes scoped to the files named in PLAN.md unless a dependency is clearly required. After each checkpoint, record what changed, what passed, what failed, and the next smallest useful step. Stop only when all acceptance criteria pass, or when blocked with evidence and the exact input needed.
```
