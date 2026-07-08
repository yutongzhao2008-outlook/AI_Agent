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
