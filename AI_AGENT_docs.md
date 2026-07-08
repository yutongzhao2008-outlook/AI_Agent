# AI Code CLI Agent 技术栈 — 全面官方资料索引

> 整理日期：2026-07-08 | 覆盖：agentskills / MCP / Claude Code / Qwen Code /
> Node.js / TypeScript / npm / Lil'Log / Agent Harness

> 本文件由 `docs.md` 清洗重排生成：修复终端转录缩进，封装 ASCII 表格与路径图，保留官方链接索引，便于长期维护与网页化展示。

## 快速导航

- [零、Agent Skills 规范（置顶）](#零-agent-skills-规范-置顶)
- [一、核心标准层：MCP（Model Context Protocol）](#一-核心标准层-mcp-model-context-protocol)
- [二、Agent Skill 创建、评估与发布 — 完整操作手册](#二-agent-skill-创建-评估与发布-完整操作手册)
- [三、Claude Code CLI（Anthropic 官方）](#三-claude-code-cli-anthropic-官方)
- [四、Claude Agent SDK + API（Anthropic Platform）](#四-claude-agent-sdk-api-anthropic-platform)
- [五、Qwen Code CLI Agent（阿里 / QwenLM 官方）](#五-qwen-code-cli-agent-阿里-qwenlm-官方)
- [六、底层技术层：Node.js + TypeScript + npm](#六-底层技术层-node-js-typescript-npm)
- [七、中文专项资料](#七-中文专项资料)
- [八、Lil'Log — Lilian Weng 技术博客](#八-lil-log-lilian-weng-技术博客)
- [九、Agent Harness — 架构原理与工程实现](#九-agent-harness-架构原理与工程实现)
- [官方 GitHub 资源总览](#官方-github-资源总览)
- [推荐学习路径](#推荐学习路径)

---

## 零、Agent Skills 规范（置顶）

> agentskills 是 AI Agent 技能的开放标准格式，由 Anthropic
> 发起，定义了如何将专业知识和可复用工作流打包为可跨产品移植的 Skill。这是理解
> Claude Code Skills / Qwen Code Skills / 任意兼容 Agent 扩展机制的底层规范。

```text
┌──────────────────────────┬────────────────────────────────────────────┐
│           资源           │                    链接                    │
├──────────────────────────┼────────────────────────────────────────────┤
│ GitHub 主仓库（22.6k ★） │ https://github.com/agentskills/agentskills │
├──────────────────────────┼────────────────────────────────────────────┤
│ 官方文档                 │ https://agentskills.io                     │
├──────────────────────────┼────────────────────────────────────────────┤
│ Skill 规范详细说明       │ https://agentskills.io/specification       │
├──────────────────────────┼────────────────────────────────────────────┤
│ 官方示例集               │ https://github.com/anthropics/skills       │
├──────────────────────────┼────────────────────────────────────────────┤
│ 完整文档索引             │ https://agentskills.io/llms.txt            │
└──────────────────────────┴────────────────────────────────────────────┘
```

核心机制：

一个 Skill = 一个文件夹 + 一个 SKILL.md
```text
┌─ SKILL.md          ← 元数据 + 指令（必须）
├─ scripts/          ← 可运行代码（可选）
├─ references/       ← 参考文档（可选）
└─ assets/           ← 资产文件（可选）
```

三阶段加载（Progressive Disclosure）：

```text
┌────────────┬─────────────┬────────────────────────┐
│    阶段    │  加载内容   │          作用          │
├────────────┼─────────────┼────────────────────────┤
│ Discovery  │ 名称 + 描述 │ Agent 发现技能是否适用 │
├────────────┼─────────────┼────────────────────────┤
│ Activation │ 完整指令    │ 匹配后加载执行逻辑     │
├────────────┼─────────────┼────────────────────────┤
│ Execution  │ 脚本 / 文件 │ 运行捆绑代码           │
└────────────┴─────────────┴────────────────────────┘
```

许可证： 代码 Apache 2.0 · 文档 CC-BY-4.0

---
## 一、核心标准层：MCP（Model Context Protocol）

> MCP 是 AI Agent 时代的 USB-C 接口协议，是所有 AI Code CLI Agent 的互联基础。

```text
┌─────────────┬───────────────────────────────────────────────────────────┐
│    资源     │                           链接                            │
├─────────────┼───────────────────────────────────────────────────────────┤
│ 官方入门    │ https://modelcontextprotocol.io/introduction              │
├─────────────┼───────────────────────────────────────────────────────────┤
│ 完整规范 (2 │ https://modelcontextprotocol.io/specification/2025-11-25/ │
│ 025-11-25)  │ index.md                                                  │
├─────────────┼───────────────────────────────────────────────────────────┤
│ 架构设计    │ https://modelcontextprotocol.io/docs/learn/architecture.m │
│             │ d                                                         │
├─────────────┼───────────────────────────────────────────────────────────┤
│ 构建 MCP    │ https://modelcontextprotocol.io/docs/develop/build-server │
│ Server      │ .md                                                       │
├─────────────┼───────────────────────────────────────────────────────────┤
│ 构建 MCP    │ https://modelcontextprotocol.io/docs/develop/build-client │
│ Client      │ .md                                                       │
├─────────────┼───────────────────────────────────────────────────────────┤
│ TypeScript/ │ https://modelcontextprotocol.io/docs/sdk.md               │
│ Python SDK  │                                                           │
├─────────────┼───────────────────────────────────────────────────────────┤
│ 传输层 (Tra │ https://modelcontextprotocol.io/specification/2025-11-25/ │
│ nsports)    │ basic/transports.md                                       │
├─────────────┼───────────────────────────────────────────────────────────┤
│ 授权 OAuth  │ https://modelcontextprotocol.io/specification/2025-11-25/ │
│ 2.1         │ basic/authorization.md                                    │
├─────────────┼───────────────────────────────────────────────────────────┤
│ Server      │ https://modelcontextprotocol.io/specification/2025-11-25/ │
│ Tools 原语  │ server/tools.md                                           │
├─────────────┼───────────────────────────────────────────────────────────┤
│ Server      │ https://modelcontextprotocol.io/specification/2025-11-25/ │
│ Resources   │ server/resources.md                                       │
├─────────────┼───────────────────────────────────────────────────────────┤
│ Server      │ https://modelcontextprotocol.io/specification/2025-11-25/ │
│ Prompts     │ server/prompts.md                                         │
├─────────────┼───────────────────────────────────────────────────────────┤
│ Client      │ https://modelcontextprotocol.io/specification/2025-11-25/ │
│ Sampling    │ client/sampling.md                                        │
├─────────────┼───────────────────────────────────────────────────────────┤
│ MCP         │                                                           │
│ Inspector   │ https://modelcontextprotocol.io/docs/tools/inspector.md   │
│ 调试        │                                                           │
├─────────────┼───────────────────────────────────────────────────────────┤
│ 安全最佳实  │ https://modelcontextprotocol.io/docs/tutorials/security/s │
│ 践          │ ecurity_best_practices.md                                 │
├─────────────┼───────────────────────────────────────────────────────────┤
│ Schema 参考 │ https://modelcontextprotocol.io/specification/2025-11-25/ │
│             │ schema.md                                                 │
├─────────────┼───────────────────────────────────────────────────────────┤
│ 完整文档索  │ https://modelcontextprotocol.io/llms.txt                  │
│ 引          │                                                           │
└─────────────┴───────────────────────────────────────────────────────────┘
```

---
## 二、Agent Skill 创建、评估与发布 — 完整操作手册

### 2.1 核心结构（官方规范）

my-skill/
```text
├── SKILL.md          ← 必须：元数据 + 指令
├── scripts/          ← 可选：可执行脚本（Python/Bash/JS）
├── references/       ← 可选：按需加载的详细参考文档
└── assets/           ← 可选：模板、图片、数据文件
```

SKILL.md 完整字段参考：

```text
┌─────────────────┬─────┬────────────────────────────────┬─────────────────┐
│      字段       │ 必  │              约束              │      说明       │
│                 │ 须  │                                │                 │
├─────────────────┼─────┼────────────────────────────────┼─────────────────┤
│ name            │ ✅  │ 1-64字符，仅小写字母/数字/连字 │ Skill 标识符    │
│                 │     │ 符，须与文件夹同名             │                 │
├─────────────────┼─────┼────────────────────────────────┼─────────────────┤
│ description     │ ✅  │ 1-1024字符                     │ Agent 用它判断  │
│                 │     │                                │ 何时激活        │
├─────────────────┼─────┼────────────────────────────────┼─────────────────┤
│ license         │ ❌  │ —                              │ 如 Apache-2.0   │
├─────────────────┼─────┼────────────────────────────────┼─────────────────┤
│ compatibility   │ ❌  │ 1-500字符                      │ 环境要求        │
├─────────────────┼─────┼────────────────────────────────┼─────────────────┤
│ metadata        │ ❌  │ 键值对                         │ 自定义元数据    │
├─────────────────┼─────┼────────────────────────────────┼─────────────────┤
│ allowed-tools   │ ❌  │ 空格分隔                       │ 预批准工具，无  │
│                 │     │                                │ 需用户确认      │
├─────────────────┼─────┼────────────────────────────────┼─────────────────┤
│ disallowed-tool │ ❌  │ —                              │ 此 Skill 激活时 │
│ s               │     │                                │ 禁用的工具      │
├─────────────────┼─────┼────────────────────────────────┼─────────────────┤
│ disable-model-i │     │                                │ 禁止 Claude 自  │
│ nvocation       │ ❌  │ true/false                     │ 动触发，仅手动  │
│                 │     │                                │ /name           │
├─────────────────┼─────┼────────────────────────────────┼─────────────────┤
│ user-invocable  │ ❌  │ true/false                     │ 是否出现在 /    │
│                 │     │                                │ 菜单            │
├─────────────────┼─────┼────────────────────────────────┼─────────────────┤
│ context         │ ❌  │ fork                           │ 在隔离子 Agent  │
│                 │     │                                │ 中运行          │
├─────────────────┼─────┼────────────────────────────────┼─────────────────┤
│                 │     │                                │ context: fork   │
│ agent           │ ❌  │ Explore/Plan 等                │ 时指定 Agent    │
│                 │     │                                │ 类型            │
├─────────────────┼─────┼────────────────────────────────┼─────────────────┤
│ model           │ ❌  │ —                              │ 覆盖当前        │
│                 │     │                                │ Session 的模型  │
├─────────────────┼─────┼────────────────────────────────┼─────────────────┤
│ effort          │ ❌  │ low/medium/high/xhigh/max      │ 覆盖推理强度    │
├─────────────────┼─────┼────────────────────────────────┼─────────────────┤
│ when_to_use     │ ❌  │ —                              │ 补充触发场景    │
├─────────────────┼─────┼────────────────────────────────┼─────────────────┤
│                 │     │                                │ 自动补全提示，  │
│ argument-hint   │ ❌  │ —                              │ 如              │
│                 │     │                                │ [issue-number]  │
├─────────────────┼─────┼────────────────────────────────┼─────────────────┤
│ arguments       │ ❌  │ 空格分隔或列表                 │ 命名位置参数    │
├─────────────────┼─────┼────────────────────────────────┼─────────────────┤
│                 │     │                                │ 限制 Skill      │
│ paths           │ ❌  │ Glob 模式                      │ 仅在特定文件路  │
│                 │     │                                │ 径激活          │
└─────────────────┴─────┴────────────────────────────────┴─────────────────┘
```

### 2.2 方式一：npx skills init — 脚手架生成器

> 定位： 纯命令行，生成最小化 SKILL.md
> 模板（"毛坯房"），适合熟悉手写的开发者。前置条件：Node.js 22+

\# 基础用法
npx skills init

\# 指定名称
npx skills init my-skill-name

\# 其他 CLI 命令
npx skills add obra/superpowers          # 从 GitHub 安装
npx skills add obra/superpowers -g       # 全局安装
npx skills list                          # 查看已安装
npx skills update                        # 更新
npx skills remove my-skill-name          # 删除

生成的模板（毛坯房）：

---
name: my-skill-name
description: A description of what this skill does and when to use it.
---

<!-- Add your skill instructions here -->

### 2.3 方式二：手动从零创建

安装路径速查表：

```text
┌───────────────────┬──────────────────────────────────┐
│      作用域       │               路径               │
├───────────────────┼──────────────────────────────────┤
│ 个人（全部项目）  │ ~/.claude/skills/<name>/SKILL.md │
├───────────────────┼──────────────────────────────────┤
│ 项目              │ .claude/skills/<name>/SKILL.md   │
├───────────────────┼──────────────────────────────────┤
│ VS Code / Copilot │ .agents/skills/<name>/SKILL.md   │
├───────────────────┼──────────────────────────────────┤
│ Cursor            │ ~/.cursor/skills/<name>/SKILL.md │
└───────────────────┴──────────────────────────────────┘
```

模板 A：最简 Skill（5分钟上手）

mkdir -p ~/.claude/skills/roll-dice

---
name: roll-dice
description: Roll dice using a random number generator. Use when asked to roll
 a die (d6, d20, etc.), roll dice, or generate a random dice roll.
---

To roll a die, use the following command:

echo $((RANDOM % <sides> + 1))

Replace <sides> with the number of sides (e.g., 6 for d6, 20 for d20).

**模板 B：带动态上下文注入**

> 核心技巧：`` !`command` `` 在 Skill 加载时预执行，将输出内联到 Prompt 中。

---
name: summarize-changes
description: Summarizes uncommitted changes and flags anything risky. Use when
 the user asks what changed, wants a commit message, or asks to review their
diff.
---

\## Current changes

!`git diff HEAD`

\## Instructions

Summarize the changes above in 2-3 bullet points, then list any risks:
- Missing error handling
- Hardcoded values
- Tests that need updating

If the diff is empty, say there are no uncommitted changes.

模板 C：带参数 + 手动触发

---
name: fix-issue
description: Fix a GitHub issue by number
disable-model-invocation: true
argument-hint: [issue-number]
allowed-tools: Bash(gh *) Read Grep
---

Fix GitHub issue $ARGUMENTS following our coding standards.

1. Read the issue: `gh issue view $ARGUMENTS`
2. Understand requirements
3. Implement the fix
4. Write tests
5. Create a commit with message: `fix: resolve issue #$ARGUMENTS`

用法：/fix-issue 123

模板 D：带子目录的完整 Skill（精装房）

~/.claude/skills/code-review/
```text
├── SKILL.md
├── references/
│   └── standards.md
└── scripts/
    └── check_patterns.py
```

---
name: code-review
description: Perform a thorough code review. Use when reviewing PRs, checking
code quality, or asked to review files.
context: fork
agent: Explore
allowed-tools: Bash(git *) Read Grep
---

\## PR Context
- Diff: !`gh pr diff`
- Changed files: !`gh pr diff --name-only`

\## Review Checklist

1. Check for security issues (SQL injection, XSS, auth bypasses)
2. Verify error handling on all external calls
3. Confirm tests exist for new logic
4. Check against our standards: see
[references/standards.md](references/standards.md)

Run pattern check:
python3 ${CLAUDE_SKILL_DIR}/scripts/check_patterns.py .

Output Format

\## Code Review

\### Summary
[2-3 sentence overview]

\### Issues Found
- 🔴 Critical: [issue]
- 🟡 Warning: [issue]
- 🟢 Suggestion: [issue]

\### Verdict
[ ] Approved  [ ] Needs Changes

### 2.4 方式三：`skill-creator` — 智能元技能（推荐）

> 定位：Claude Code 插件驱动的 Skill 生成、评估与触发描述优化工具，适合生产级 Skill 设计与迭代。

安装与启用：

```bash
# 安装
/plugin install skill-creator@claude-plugins-official

# 若找不到，先更新 marketplace
/plugin marketplace update claude-plugins-official

# 或首次添加 marketplace
/plugin marketplace add anthropics/claude-plugins-official

# 重载插件
/reload-plugins
```

使用方式：

```text
# 创建新 Skill
"我想做一个将 Word 文档转换为 PPT 的 Skill"

# 评估已有 Skill
"evaluate my summarize-changes skill with skill-creator"

# 优化触发描述
"optimize the description of my code-review skill"
```

skill-creator 自动执行：

- 生成完整目录结构（含 `scripts/`、`references/` 等）
- 创建测试用例，写入 `evals/evals.json`
- 运行隔离评估，结果写入 `grading.json`
- 聚合对比数据到 `benchmark.json`（有/无 Skill 的通过率、耗时、token 数）
- 生成 HTML 可视化报告

### 2.5 方式对比总表

```text
┌────────────┬────────────────────┬─────────────┬──────────────────────┐
│    维度    │  npx skills init   │  手动创建   │    skill-creator     │
├────────────┼────────────────────┼─────────────┼──────────────────────┤
│ 门槛       │ Node.js 22+        │ 零依赖      │ Claude Code + 插件   │
├────────────┼────────────────────┼─────────────┼──────────────────────┤
│ 产物完整度 │ 最小模板（毛坯房） │ 按需完整    │ 精装房（含测试体系） │
├────────────┼────────────────────┼─────────────┼──────────────────────┤
│ 自动评估   │ ❌                 │ ❌          │ ✅                   │
├────────────┼────────────────────┼─────────────┼──────────────────────┤
│ 触发词调优 │ ❌                 │ 手动        │ ✅ 自动 A/B 测试     │
├────────────┼────────────────────┼─────────────┼──────────────────────┤
│ 子目录生成 │ ❌                 │ 手动        │ ✅ 自动规划          │
├────────────┼────────────────────┼─────────────┼──────────────────────┤
│ 适合场景   │ 熟悉结构的开发者   │ 学习 / 定制 │ 生产级 Skill         │
└────────────┴────────────────────┴─────────────┴──────────────────────┘
```

### 2.6 发布到 GitHub 并让他人安装

第一步：整理目录

```text
my-skill-repo/
├── README.md
├── SKILL.md
├── scripts/
└── references/
```

本仓库已提供一个可安装的本地示例：

```text
exmaples/
└── skill1/
    └── SKILL.md
```

第二步：推送

```bash
git init && git add . && git commit -m "feat: add my-skill"
git remote add origin https://github.com/<用户名>/<仓库名>
git push -u origin main
```

第三步：他人安装

```bash
# 命令行安装（推荐）
npx skills add <用户名>/<仓库名>
npx skills add <用户名>/<仓库名> -g   # 全局

# 本地示例安装
npx skills add ./exmaples/skill1

# 手动安装（无 Node.js 环境）
cp -r my-skill/ ~/.claude/skills/my-skill/          # Claude Code 个人
cp -r my-skill/ .claude/skills/my-skill/            # Claude Code 项目
cp -r my-skill/ .agents/skills/my-skill/            # VS Code
cp -r my-skill/ ~/.cursor/skills/my-skill/          # Cursor
```

`exmaples/skill1/SKILL.md` 是完整示例本体，可直接作为仓库根目录发布，也可通过本地路径先验证安装流程。

### 2.7 官方资源

```text
┌────────────────┬────────────────────────────────────────────────────────┐
│      资源      │                          链接                          │
├────────────────┼────────────────────────────────────────────────────────┤
│ 规范（完整字段 │ https://agentskills.io/specification                   │
│ 参考）         │                                                        │
├────────────────┼────────────────────────────────────────────────────────┤
│ Quickstart     │ https://agentskills.io/skill-creation/quickstart       │
│ 教程           │                                                        │
├────────────────┼────────────────────────────────────────────────────────┤
│ Best Practices │ https://agentskills.io/skill-creation/best-practices.m │
│                │ d                                                      │
├────────────────┼────────────────────────────────────────────────────────┤
│ 评估方法       │ https://agentskills.io/skill-creation/evaluating-skill │
│                │ s                                                      │
├────────────────┼────────────────────────────────────────────────────────┤
│ 优化触发描述   │ https://agentskills.io/skill-creation/optimizing-descr │
│                │ iptions                                                │
├────────────────┼────────────────────────────────────────────────────────┤
│ 脚本使用       │ https://agentskills.io/skill-creation/using-scripts    │
├────────────────┼────────────────────────────────────────────────────────┤
│ Claude Code    │                                                        │
│ Skills         │ https://code.claude.com/docs/en/skills.md              │
│ 完整文档       │                                                        │
├────────────────┼────────────────────────────────────────────────────────┤
│ 官方示例 Skill │ https://github.com/anthropics/skills                   │
│  仓库          │                                                        │
├────────────────┼────────────────────────────────────────────────────────┤
│ skill-creator  │ https://github.com/anthropics/claude-plugins-official/ │
│ 插件源码       │ tree/main/plugins/skill-creator                        │
├────────────────┼────────────────────────────────────────────────────────┤
│ 兼容客户端全列 │ https://agentskills.io/clients                         │
│ 表（35+）      │                                                        │
└────────────────┴────────────────────────────────────────────────────────┘
```

---
## 三、Claude Code CLI（Anthropic 官方）

入门

```text
┌───────────────┬──────────────────────────────────────────────────────────┐
│     资源      │                           链接                           │
├───────────────┼──────────────────────────────────────────────────────────┤
│ Quickstart    │ https://code.claude.com/docs/en/quickstart.md            │
├───────────────┼──────────────────────────────────────────────────────────┤
│ How Claude    │ https://code.claude.com/docs/en/how-claude-code-works.md │
│ Code Works    │                                                          │
├───────────────┼──────────────────────────────────────────────────────────┤
│ Features      │ https://code.claude.com/docs/en/features-overview.md     │
│ Overview      │                                                          │
├───────────────┼──────────────────────────────────────────────────────────┤
│ CLI Reference │ https://code.claude.com/docs/en/cli-reference.md         │
├───────────────┼──────────────────────────────────────────────────────────┤
│ Best          │ https://code.claude.com/docs/en/best-practices.md        │
│ Practices     │                                                          │
├───────────────┼──────────────────────────────────────────────────────────┤
│ Common        │ https://code.claude.com/docs/en/common-workflows.md      │
│ Workflows     │                                                          │
└───────────────┴──────────────────────────────────────────────────────────┘
```

Agentic 核心

```text
┌─────────────────┬────────────────────────────────────────────────────┐
│      资源       │                        链接                        │
├─────────────────┼────────────────────────────────────────────────────┤
│ Subagents       │ https://code.claude.com/docs/en/sub-agents.md      │
├─────────────────┼────────────────────────────────────────────────────┤
│ Agent Teams     │ https://code.claude.com/docs/en/agent-teams.md     │
├─────────────────┼────────────────────────────────────────────────────┤
│ Workflows       │ https://code.claude.com/docs/en/workflows.md       │
├─────────────────┼────────────────────────────────────────────────────┤
│ Worktrees       │ https://code.claude.com/docs/en/worktrees.md       │
├─────────────────┼────────────────────────────────────────────────────┤
│ Hooks Guide     │ https://code.claude.com/docs/en/hooks-guide.md     │
├─────────────────┼────────────────────────────────────────────────────┤
│ Hooks Reference │ https://code.claude.com/docs/en/hooks.md           │
├─────────────────┼────────────────────────────────────────────────────┤
│ Sessions        │ https://code.claude.com/docs/en/sessions.md        │
├─────────────────┼────────────────────────────────────────────────────┤
│ Headless Mode   │ https://code.claude.com/docs/en/headless.md        │
├─────────────────┼────────────────────────────────────────────────────┤
│ Scheduled Tasks │ https://code.claude.com/docs/en/scheduled-tasks.md │
└─────────────────┴────────────────────────────────────────────────────┘
```

MCP 集成

```text
┌───────────────────┬──────────────────────────────────────────────────────┐
│       资源        │                         链接                         │
├───────────────────┼──────────────────────────────────────────────────────┤
│ MCP Quickstart    │ https://code.claude.com/docs/en/mcp-quickstart.md    │
├───────────────────┼──────────────────────────────────────────────────────┤
│ MCP Complete      │ https://code.claude.com/docs/en/mcp.md               │
│ Guide             │                                                      │
├───────────────────┼──────────────────────────────────────────────────────┤
│ Skills Guide      │ https://code.claude.com/docs/en/skills.md            │
├───────────────────┼──────────────────────────────────────────────────────┤
│ Plugin            │ https://code.claude.com/docs/en/plugins.md           │
│ Development       │                                                      │
├───────────────────┼──────────────────────────────────────────────────────┤
│ Plugin Reference  │ https://code.claude.com/docs/en/plugins-reference.md │
└───────────────────┴──────────────────────────────────────────────────────┘
```

CI/CD & 集成

```text
┌───────────────────┬───────────────────────────────────────────────────┐
│       资源        │                       链接                        │
├───────────────────┼───────────────────────────────────────────────────┤
│ GitHub Actions    │ https://code.claude.com/docs/en/github-actions.md │
├───────────────────┼───────────────────────────────────────────────────┤
│ GitLab CI/CD      │ https://code.claude.com/docs/en/gitlab-ci-cd.md   │
├───────────────────┼───────────────────────────────────────────────────┤
│ VS Code Extension │ https://code.claude.com/docs/en/vs-code.md        │
├───────────────────┼───────────────────────────────────────────────────┤
│ JetBrains         │ https://code.claude.com/docs/en/jetbrains.md      │
└───────────────────┴───────────────────────────────────────────────────┘
```

配置与权限

```text
┌─────────────────────┬────────────────────────────────────────────────────┐
│        资源         │                        链接                        │
├─────────────────────┼────────────────────────────────────────────────────┤
│ Settings Reference  │ https://code.claude.com/docs/en/settings.md        │
├─────────────────────┼────────────────────────────────────────────────────┤
│ Permissions         │ https://code.claude.com/docs/en/permissions.md     │
├─────────────────────┼────────────────────────────────────────────────────┤
│ Memory System       │ https://code.claude.com/docs/en/memory.md          │
│ (CLAUDE.md)         │                                                    │
├─────────────────────┼────────────────────────────────────────────────────┤
│ Environment         │ https://code.claude.com/docs/en/env-vars.md        │
│ Variables           │                                                    │
├─────────────────────┼────────────────────────────────────────────────────┤
│ Tools Reference     │ https://code.claude.com/docs/en/tools-reference.md │
└─────────────────────┴────────────────────────────────────────────────────┘
```

> 完整文档索引： https://code.claude.com/docs/llms.txt

---
## 四、Claude Agent SDK + API（Anthropic Platform）

Agent SDK

```text
┌───────────┬─────────────────────────────────────────────────────────────┐
│   资源    │                            链接                             │
├───────────┼─────────────────────────────────────────────────────────────┤
│ Agent SDK │ https://code.claude.com/docs/en/agent-sdk/overview.md       │
│  Overview │                                                             │
├───────────┼─────────────────────────────────────────────────────────────┤
│ Agent SDK │                                                             │
│  Quicksta │ https://code.claude.com/docs/en/agent-sdk/quickstart.md     │
│ rt        │                                                             │
├───────────┼─────────────────────────────────────────────────────────────┤
│ Agent     │ https://code.claude.com/docs/en/agent-sdk/agent-loop.md     │
│ Loop      │                                                             │
├───────────┼─────────────────────────────────────────────────────────────┤
│ Sessions  │                                                             │
│ Managemen │ https://code.claude.com/docs/en/agent-sdk/sessions.md       │
│ t         │                                                             │
├───────────┼─────────────────────────────────────────────────────────────┤
│ Session   │ https://code.claude.com/docs/en/agent-sdk/session-storage.m │
│ Storage   │ d                                                           │
└───────────┴─────────────────────────────────────────────────────────────┘
```

Managed Agents（平台级）

```text
┌───────────┬─────────────────────────────────────────────────────────────┐
│   资源    │                            链接                             │
├───────────┼─────────────────────────────────────────────────────────────┤
│ Overview  │ https://platform.claude.com/docs/en/managed-agents/overview │
│           │ .md                                                         │
├───────────┼─────────────────────────────────────────────────────────────┤
│ Quickstar │ https://platform.claude.com/docs/en/managed-agents/quicksta │
│ t         │ rt.md                                                       │
├───────────┼─────────────────────────────────────────────────────────────┤
│ Multi-Age │ https://platform.claude.com/docs/en/managed-agents/multi-ag │
│ nt        │ ent.md                                                      │
│ Systems   │                                                             │
├───────────┼─────────────────────────────────────────────────────────────┤
│ Tools Int │ https://platform.claude.com/docs/en/managed-agents/tools.md │
│ egration  │                                                             │
├───────────┼─────────────────────────────────────────────────────────────┤
│ Memory    │ https://platform.claude.com/docs/en/managed-agents/memory.m │
│           │ d                                                           │
├───────────┼─────────────────────────────────────────────────────────────┤
│ Files API │ https://platform.claude.com/docs/en/managed-agents/files.md │
├───────────┼─────────────────────────────────────────────────────────────┤
│ Webhooks  │ https://platform.claude.com/docs/en/managed-agents/webhooks │
│           │ .md                                                         │
├───────────┼─────────────────────────────────────────────────────────────┤
│ MCP       │ https://platform.claude.com/docs/en/managed-agents/mcp-conn │
│ Connector │ ector.md                                                    │
├───────────┼─────────────────────────────────────────────────────────────┤
│ API       │ https://platform.claude.com/docs/en/managed-agents/referenc │
│ Reference │ e.md                                                        │
└───────────┴─────────────────────────────────────────────────────────────┘
```

核心 API 特性

```text
┌─────────┬───────────────────────────────────────────────────────────────┐
│  资源   │                             链接                              │
├─────────┼───────────────────────────────────────────────────────────────┤
│ Tool    │ https://platform.claude.com/docs/en/agents-and-tools/tool-use │
│ Use Ove │ /overview.md                                                  │
│ rview   │                                                               │
├─────────┼───────────────────────────────────────────────────────────────┤
│ Paralle │ https://platform.claude.com/docs/en/agents-and-tools/tool-use │
│ l Tool  │ /parallel-tool-use.md                                         │
│ Use     │                                                               │
├─────────┼───────────────────────────────────────────────────────────────┤
│ Structu │ https://platform.claude.com/docs/en/build-with-claude/structu │
│ red     │ red-outputs.md                                                │
│ Outputs │                                                               │
├─────────┼───────────────────────────────────────────────────────────────┤
│ Extende │ https://platform.claude.com/docs/en/build-with-claude/extende │
│ d Think │ d-thinking.md                                                 │
│ ing     │                                                               │
├─────────┼───────────────────────────────────────────────────────────────┤
│ Prompt  │ https://platform.claude.com/docs/en/build-with-claude/prompt- │
│ Caching │ caching.md                                                    │
├─────────┼───────────────────────────────────────────────────────────────┤
│ Streami │ https://platform.claude.com/docs/en/build-with-claude/streami │
│ ng      │ ng.md                                                         │
├─────────┼───────────────────────────────────────────────────────────────┤
│ Files   │ https://platform.claude.com/docs/en/build-with-claude/files.m │
│ API     │ d                                                             │
├─────────┼───────────────────────────────────────────────────────────────┤
│ Batch   │ https://platform.claude.com/docs/en/build-with-claude/batch-p │
│ Process │ rocessing.md                                                  │
│ ing     │                                                               │
├─────────┼───────────────────────────────────────────────────────────────┤
│ Vision  │ https://platform.claude.com/docs/en/build-with-claude/vision. │
│         │ md                                                            │
├─────────┼───────────────────────────────────────────────────────────────┤
│ PDF     │ https://platform.claude.com/docs/en/build-with-claude/pdf-sup │
│ Support │ port.md                                                       │
└─────────┴───────────────────────────────────────────────────────────────┘
```

API Reference（端点）

```text
┌─────────┬───────────────────────────────────────────────────────────────┐
│  资源   │                             链接                              │
├─────────┼───────────────────────────────────────────────────────────────┤
│ Create  │ https://platform.claude.com/docs/en/api/messages/create.md    │
│ Message │                                                               │
├─────────┼───────────────────────────────────────────────────────────────┤
│ Batch M │ https://platform.claude.com/docs/en/api/messages/batches.md   │
│ essages │                                                               │
├─────────┼───────────────────────────────────────────────────────────────┤
│ Agents  │ https://platform.claude.com/docs/en/api/beta/agents.md        │
│ API     │                                                               │
├─────────┼───────────────────────────────────────────────────────────────┤
│ Session │ https://platform.claude.com/docs/en/api/beta/sessions/create. │
│ s API   │ md                                                            │
├─────────┼───────────────────────────────────────────────────────────────┤
│ Skills  │ https://platform.claude.com/docs/en/api/beta/skills/create.md │
│ API     │                                                               │
├─────────┼───────────────────────────────────────────────────────────────┤
│ Files   │ https://platform.claude.com/docs/en/api/beta/files.md         │
│ API     │                                                               │
└─────────┴───────────────────────────────────────────────────────────────┘
```

> 完整 API 文档索引： https://platform.claude.com/llms.txt

---
## 五、Qwen Code CLI Agent（阿里 / QwenLM 官方）

```text
┌─────────────┬───────────────────────────────────────────────────────────┐
│    资源     │                           链接                            │
├─────────────┼───────────────────────────────────────────────────────────┤
│ GitHub      │ https://github.com/QwenLM/qwen-code                       │
│ 主仓库      │                                                           │
├─────────────┼───────────────────────────────────────────────────────────┤
│ 官方文档    │ https://qwenlm.github.io/qwen-code-docs/en/users/overview │
├─────────────┼───────────────────────────────────────────────────────────┤
│ Qwen        │ https://qwen.readthedocs.io/en/latest/                    │
│ 模型文档    │                                                           │
├─────────────┼───────────────────────────────────────────────────────────┤
│ Qwen-Agent  │ https://github.com/QwenLM/Qwen-Agent                      │
│ 框架        │                                                           │
├─────────────┼───────────────────────────────────────────────────────────┤
│ npm 安装包  │ npm install -g @qwen-code/qwen-code@latest（需 Node.js    │
│             │ 22+）                                                     │
└─────────────┴───────────────────────────────────────────────────────────┘
```

CLI 命令速查：

```text
┌───────────────┬───────────────────────────────────┐
│     命令      │               说明                │
├───────────────┼───────────────────────────────────┤
│ qwen          │ 交互式 TUI                        │
├───────────────┼───────────────────────────────────┤
│ qwen -p "..." │ Headless/脚本模式                 │
├───────────────┼───────────────────────────────────┤
│ qwen serve    │ Daemon 模式（HTTP+SSE，ACP 协议） │
├───────────────┼───────────────────────────────────┤
│ qwen channel  │ 连接 IM 平台（钉钉/微信/飞书）    │
├───────────────┼───────────────────────────────────┤
│ /auth         │ 会话内配置 Provider 和 API Key    │
└───────────────┴───────────────────────────────────┘
```

多 Provider 支持： OpenAI / Anthropic / Gemini / Qwen / Ollama / vLLM

---
## 六、底层技术层：Node.js + TypeScript + npm

Node.js（官方）

```text
┌───────────────┬─────────────────────────────────────────────────────────┐
│     资源      │                          链接                           │
├───────────────┼─────────────────────────────────────────────────────────┤
│ 介绍 & 入门   │ https://nodejs.org/en/learn/getting-started/introductio │
│               │ n-to-nodejs                                             │
├───────────────┼─────────────────────────────────────────────────────────┤
│ 运行脚本      │ https://nodejs.org/learn/command-line/run-nodejs-script │
│               │ s-from-the-command-line                                 │
├───────────────┼─────────────────────────────────────────────────────────┤
│ 命令行输入    │ https://nodejs.org/learn/command-line/accept-input-from │
│               │ -the-command-line-in-nodejs                             │
├───────────────┼─────────────────────────────────────────────────────────┤
│ 读取环境变量  │ https://nodejs.org/learn/command-line/how-to-read-envir │
│               │ onment-variables-from-nodejs                            │
├───────────────┼─────────────────────────────────────────────────────────┤
│ TS 原生运行（ │ https://nodejs.org/learn/typescript/run-natively        │
│ 无需编译）    │                                                         │
├───────────────┼─────────────────────────────────────────────────────────┤
│ 发布 TS 包    │ https://nodejs.org/learn/typescript/publishing-a-ts-pac │
│               │ kage                                                    │
├───────────────┼─────────────────────────────────────────────────────────┤
│ Event Loop    │ https://nodejs.org/learn/asynchronous-work/event-loop-t │
│               │ imers-and-nexttick                                      │
├───────────────┼─────────────────────────────────────────────────────────┤
│ Promises      │ https://nodejs.org/learn/asynchronous-work/discover-pro │
│               │ mises-in-nodejs                                         │
├───────────────┼─────────────────────────────────────────────────────────┤
│ 流处理        │ https://nodejs.org/learn/modules/how-to-use-streams     │
├───────────────┼─────────────────────────────────────────────────────────┤
│ WebSocket     │ https://nodejs.org/learn/getting-started/websocket      │
├───────────────┼─────────────────────────────────────────────────────────┤
│ Fetch API     │ https://nodejs.org/learn/getting-started/fetch          │
├───────────────┼─────────────────────────────────────────────────────────┤
│ 测试运行器    │ https://nodejs.org/learn/test-runner/introduction       │
└───────────────┴─────────────────────────────────────────────────────────┘
```

TypeScript（官方）

```text
┌────────────────┬────────────────────────────────────────────────────────┐
│      资源      │                          链接                          │
├────────────────┼────────────────────────────────────────────────────────┤
│ 官方文档首页   │ https://www.typescriptlang.org/docs/                   │
├────────────────┼────────────────────────────────────────────────────────┤
│ TS for JS      │ https://www.typescriptlang.org/docs/handbook/typescrip │
│ Programmers    │ t-in-5-minutes.html                                    │
├────────────────┼────────────────────────────────────────────────────────┤
│ Handbook（完整 │ https://www.typescriptlang.org/docs/handbook/intro.htm │
│ 手册）         │ l                                                      │
├────────────────┼────────────────────────────────────────────────────────┤
│ TSConfig 参考  │ https://www.typescriptlang.org/tsconfig/               │
├────────────────┼────────────────────────────────────────────────────────┤
│ 在线           │ https://www.typescriptlang.org/play/                   │
│ Playground     │                                                        │
├────────────────┼────────────────────────────────────────────────────────┤
│ 泛型           │ https://www.typescriptlang.org/docs/handbook/2/generic │
│                │ s.html                                                 │
├────────────────┼────────────────────────────────────────────────────────┤
│ 条件类型       │ https://www.typescriptlang.org/docs/handbook/2/conditi │
│                │ onal-types.html                                        │
├────────────────┼────────────────────────────────────────────────────────┤
│ Mapped Types   │ https://www.typescriptlang.org/docs/handbook/2/mapped- │
│                │ types.html                                             │
└────────────────┴────────────────────────────────────────────────────────┘
```

npm（官方）

```text
┌──────────┬──────────────────────────────────────────────────────────────┐
│   资源   │                             链接                             │
├──────────┼──────────────────────────────────────────────────────────────┤
│ 官方文档 │ https://docs.npmjs.com/                                      │
├──────────┼──────────────────────────────────────────────────────────────┤
│ CLI      │ https://docs.npmjs.com/cli/v11/commands                      │
│ 命令参考 │                                                              │
├──────────┼──────────────────────────────────────────────────────────────┤
│ package. │ https://docs.npmjs.com/cli/v11/configuring-npm/package-json  │
│ json     │                                                              │
├──────────┼──────────────────────────────────────────────────────────────┤
│ Workspac │ https://docs.npmjs.com/cli/v11/using-npm/workspaces          │
│ es       │                                                              │
├──────────┼──────────────────────────────────────────────────────────────┤
│ 安全审计 │ https://docs.npmjs.com/auditing-package-dependencies-for-sec │
│          │ urity-vulnerabilities                                        │
└──────────┴──────────────────────────────────────────────────────────────┘
```

---
## 七、中文专项资料

npm 中文官方文档

```text
┌─────────────┬───────────────────────────────────────────────────────────┐
│    页面     │                           链接                            │
├─────────────┼───────────────────────────────────────────────────────────┤
│ 关于        │ https://npm.nodejs.cn/about-npm                           │
│ npm（入口） │                                                           │
├─────────────┼───────────────────────────────────────────────────────────┤
│ CLI         │ https://npm.nodejs.cn/cli/v11/commands                    │
│ 命令参考    │                                                           │
├─────────────┼───────────────────────────────────────────────────────────┤
│ package.jso │ https://npm.nodejs.cn/cli/v11/configuring-npm/package-jso │
│ n 配置      │ n                                                         │
├─────────────┼───────────────────────────────────────────────────────────┤
│ .npmrc 配置 │ https://npm.nodejs.cn/cli/v11/configuring-npm/npmrc       │
├─────────────┼───────────────────────────────────────────────────────────┤
│ Workspaces  │ https://npm.nodejs.cn/cli/v11/using-npm/workspaces        │
└─────────────┴───────────────────────────────────────────────────────────┘
```

知乎专栏 — AI 前端技术

```text
┌───────────────────────┬──────────────────────────────────────────────────┐
│         资源          │                       链接                       │
├───────────────────────┼──────────────────────────────────────────────────┤
│ AI                    │ https://zhuanlan.zhihu.com/p/2004291018753864363 │
│ 时代前端技术专栏文章  │                                                  │
└───────────────────────┴──────────────────────────────────────────────────┘
```

菜鸟教程 — Claude Code 系列

```text
┌───────────────┬─────────────────────────────────────────────────────────┐
│     页面      │                          链接                           │
├───────────────┼─────────────────────────────────────────────────────────┤
│ Claude Code   │ https://www.runoob.com/claude-code/claude-code-symbols. │
│ 符号与图标说  │ html                                                    │
│ 明            │                                                         │
├───────────────┼─────────────────────────────────────────────────────────┤
│ Claude Code   │ https://www.runoob.com/claude-code/claude-code-tutorial │
│ 教程首页      │ .html                                                   │
└───────────────┴─────────────────────────────────────────────────────────┘
```

---
## 八、Lil'Log — Lilian Weng 技术博客

> Lilian Weng（OpenAI 前研究副总裁）的个人技术博客，以长文深度综述著称，是理解
> AI Agent 系统架构、LLM 对齐、强化学习等核心机制的学术级参考资料。

```text
┌──────────┬───────────────────────────────┐
│   资源   │             链接              │
├──────────┼───────────────────────────────┤
│ 博客首页 │ https://lilianweng.github.io/ │
└──────────┴───────────────────────────────┘
```

核心文章索引

```text
┌─────────────────────────────────────────────┬──────┬────────────────────┐
│                    文章                     │ 日期 │      关键主题      │
├─────────────────────────────────────────────┼──────┼────────────────────┤
│ Harness Engineering for Self-Improvement    │ 2026 │ AI 自我改进、递归  │
│ (https://lilianweng.github.io/posts/2026-07 │ -07  │ 反馈循环           │
│ -04-harness/)                               │      │                    │
├─────────────────────────────────────────────┼──────┼────────────────────┤
│ Scaling Laws, Carefully (https://lilianweng │ 2026 │ Compute/Loss/模型  │
│ .github.io/posts/2026-06-24-scaling-laws/)  │ -06  │ 规模关系           │
├─────────────────────────────────────────────┼──────┼────────────────────┤
│ Why We Think (https://lilianweng.github.io/ │ 2025 │ 测试时计算、Chain- │
│ posts/2025-05-01-thinking/)                 │ -05  │ of-Thought         │
├─────────────────────────────────────────────┼──────┼────────────────────┤
│ Reward Hacking in RL (https://lilianweng.gi │ 2024 │ RL                 │
│ thub.io/posts/2024-11-28-reward-hacking/)   │ -11  │ 对齐失效、奖励欺骗 │
├─────────────────────────────────────────────┼──────┼────────────────────┤
│ Extrinsic Hallucinations in LLMs            │ 2024 │                    │
│ (https://lilianweng.github.io/posts/2024-07 │ -07  │ 幻觉成因、事实性   │
│ -07-hallucination/)                         │      │                    │
├─────────────────────────────────────────────┼──────┼────────────────────┤
│                                             │      │ Agent              │
│ LLM Powered Autonomous Agents (https://lili │ 2023 │ 架构全景：规划 +   │
│ anweng.github.io/posts/2023-06-23-agent/)   │ -06  │ 记忆 + 工具调用 ←  │
│                                             │      │ 必读               │
├─────────────────────────────────────────────┼──────┼────────────────────┤
│ Prompt Engineering (https://lilianweng.gith │ 2023 │ In-Context         │
│ ub.io/posts/2023-03-15-prompt-engineering/) │ -03  │ 提示策略           │
├─────────────────────────────────────────────┼──────┼────────────────────┤
│ Adversarial Attacks on LLMs                 │ 2023 │ Jailbreak、安全攻  │
│ (https://lilianweng.github.io/posts/2023-10 │ -10  │ 防                 │
│ -25-adv-attack-llm/)                        │      │                    │
└─────────────────────────────────────────────┴──────┴────────────────────┘
```

---
## 九、Agent Harness — 架构原理与工程实现

> 核心公式：Agent = Model + Harness
> 模型提供智能，Harness 让智能变得可用。

### 9.1 LangChain 博客 — Agent Harness 解剖

资源: The Anatomy of an Agent Harness
链接: https://www.langchain.com/blog/the-anatomy-of-an-agent-harness

```text
行为 → Harness 组件映射：
```

```text
┌────────────────────┬─────────────────────────────────────────────┐
│      期望行为      │              Harness 解决方案               │
├────────────────────┼─────────────────────────────────────────────┤
│ 持久化状态         │ 文件系统 + fs-ops 工具                      │
├────────────────────┼─────────────────────────────────────────────┤
│ 自主解题           │ Bash + 代码执行沙箱                         │
├────────────────────┼─────────────────────────────────────────────┤
│ 大规模安全执行     │ Sandboxes                                   │
├────────────────────┼─────────────────────────────────────────────┤
│ 超出训练截止的知识 │ Memory 文件、Web Search、MCP 工具           │
├────────────────────┼─────────────────────────────────────────────┤
│ 防止上下文退化     │ Compaction、Tool-call offloading、Skills    │
├────────────────────┼─────────────────────────────────────────────┤
│ 长周期复杂任务     │ Git、Ralph Loops、Planning 文件、自验证循环 │
└────────────────────┴─────────────────────────────────────────────┘
```

### 9.2 OpenHarness — 开源 Agent Harness 框架

```text
┌─────────────────────────┬────────────────────────────────────────────────┐
│          资源           │                      链接                      │
├─────────────────────────┼────────────────────────────────────────────────┤
│ GitHub 主仓库（14.6k    │ https://github.com/HKUDS/OpenHarness/tree/main │
│ ★）                     │                                                │
├─────────────────────────┼────────────────────────────────────────────────┤
│ 安装                    │ pip install openharness-ai                     │
└─────────────────────────┴────────────────────────────────────────────────┘
```

10 大子系统：

```text
┌──────────────┬───────────────────────────────────────────┐
│    子系统    │                   作用                    │
├──────────────┼───────────────────────────────────────────┤
│ engine/      │ Agent 循环 — stream → tool-call → iterate │
├──────────────┼───────────────────────────────────────────┤
│ tools/       │ 43+ 工具（文件、Shell、搜索、Web、MCP）   │
├──────────────┼───────────────────────────────────────────┤
│ skills/      │ 按需加载 .md 知识文件                     │
├──────────────┼───────────────────────────────────────────┤
│ plugins/     │ Commands / Hooks / Agents / MCP Server    │
├──────────────┼───────────────────────────────────────────┤
│ permissions/ │ 多级安全与路径规则                        │
├──────────────┼───────────────────────────────────────────┤
│ hooks/       │ PreToolUse / PostToolUse 生命周期事件     │
├──────────────┼───────────────────────────────────────────┤
│ commands/    │ 54 条斜杠命令                             │
├──────────────┼───────────────────────────────────────────┤
│ mcp/         │ MCP 协议客户端                            │
├──────────────┼───────────────────────────────────────────┤
│ memory/      │ 跨 Session 持久化记忆                     │
├──────────────┼───────────────────────────────────────────┤
│ coordinator/ │ 子 Agent 生成与团队协调                   │
└──────────────┴───────────────────────────────────────────┘
```

多 Provider 支持：

```text
┌────────────────┬───────────────────────────────────────────────────────┐
│      风格      │                       Provider                        │
├────────────────┼───────────────────────────────────────────────────────┤
│ Anthropic 兼容 │ Claude、Kimi、GLM、MiniMax                            │
├────────────────┼───────────────────────────────────────────────────────┤
│ OpenAI 兼容    │ OpenAI、DeepSeek、Groq、Ollama、Gemini、GitHub Models │
├────────────────┼───────────────────────────────────────────────────────┤
│ 特殊           │ GitHub Copilot（OAuth 设备流，无需 API Key）          │
└────────────────┴───────────────────────────────────────────────────────┘
```

### 9.3 论文 — Code as Agent Harness

```text
┌────────────┬────────────────────────────────────────────────────────────┐
│    资源    │                            链接                            │
├────────────┼────────────────────────────────────────────────────────────┤
│ 论文原文   │ https://arxiv.org/abs/2605.18747                           │
├────────────┼────────────────────────────────────────────────────────────┤
│ 相关论文列 │ https://github.com/YennNing/Awesome-Code-as-Agent-Harness- │
│ 表         │ Papers                                                     │
└────────────┴────────────────────────────────────────────────────────────┘
```

三层架构：

```text
┌─────────────────────────────────┐
│  Layer 3: Scaling               │  单 Agent → 多 Agent 协调
├─────────────────────────────────┤
│  Layer 2: Harness Mechanisms    │  规划、记忆、工具调用、反馈控制
├─────────────────────────────────┤
│  Layer 1: Harness Interface     │  代码作为推理与环境建模的接口
└─────────────────────────────────┘
```

---
## 官方 GitHub 资源总览

```text
┌──────────────────────────────────────────────────────┬──────────────────┐
│                         仓库                         │       说明       │
├──────────────────────────────────────────────────────┼──────────────────┤
│ https://github.com/agentskills/agentskills           │ Agent Skills     │
│                                                      │ 开放规范         │
├──────────────────────────────────────────────────────┼──────────────────┤
│ https://github.com/anthropics/skills                 │ 官方 Skill       │
│                                                      │ 示例集           │
├──────────────────────────────────────────────────────┼──────────────────┤
│ https://github.com/anthropics/skills.git             │ 官方 Skill       │
│                                                      │ 示例集 Git URL   │
├──────────────────────────────────────────────────────┼──────────────────┤
│ https://github.com/anthropics/financial-services     │ 金融服务行业     │
│                                                      │ Agent 示例       │
├──────────────────────────────────────────────────────┼──────────────────┤
│ https://github.com/anthropics/claude-cookbooks       │ Claude           │
│                                                      │ Cookbooks        │
├──────────────────────────────────────────────────────┼──────────────────┤
│ https://github.com/datawhalechina/hello-agents.git   │ 中文 Agent       │
│                                                      │ 入门教程         │
├──────────────────────────────────────────────────────┼──────────────────┤
│ https://github.com/anthropics/anthropic-sdk-python   │ Claude Python    │
│                                                      │ SDK              │
├──────────────────────────────────────────────────────┼──────────────────┤
│                                                      │ Claude           │
│ https://github.com/anthropics/anthropic-sdk-js       │ TypeScript/JS    │
│                                                      │ SDK              │
├──────────────────────────────────────────────────────┼──────────────────┤
│                                                      │ 官方示例（Tool   │
│ https://github.com/anthropics/anthropic-cookbook     │ Use、Vision、Cac │
│                                                      │ hing 等）        │
├──────────────────────────────────────────────────────┼──────────────────┤
│ https://github.com/QwenLM/qwen-code                  │ Qwen Code CLI    │
│                                                      │ Agent            │
├──────────────────────────────────────────────────────┼──────────────────┤
│ https://github.com/QwenLM/Qwen-Agent                 │ Qwen Agent 框架  │
├──────────────────────────────────────────────────────┼──────────────────┤
│ https://github.com/modelcontextprotocol/typescript-s │ MCP TypeScript   │
│ dk                                                   │ SDK              │
├──────────────────────────────────────────────────────┼──────────────────┤
│ https://github.com/modelcontextprotocol/python-sdk   │ MCP Python SDK   │
├──────────────────────────────────────────────────────┼──────────────────┤
│ https://github.com/modelcontextprotocol/servers      │ MCP 官方 Server  │
│                                                      │ 示例集           │
├──────────────────────────────────────────────────────┼──────────────────┤
│ https://github.com/HKUDS/OpenHarness                 │ OpenHarness      │
│                                                      │ 框架（14.6k ★）  │
├──────────────────────────────────────────────────────┼──────────────────┤
│ https://github.com/YennNing/Awesome-Code-as-Agent-Ha │ Code as Agent    │
│ rness-Papers                                         │ Harness 论文集   │
└──────────────────────────────────────────────────────┴──────────────────┘
```

---
## 推荐学习路径

```text
系统编程基础 → Node.js 异步模型 → TypeScript 类型系统
           ↓
```

      MCP 协议规范（架构 + 传输 + 工具原语）
```text
           ↓
   agentskills 规范 → SKILL.md 格式 → npx skills init / skill-creator
           ↓
   Claude Code CLI（用户视角 → Hooks → Skills → 自定义 MCP Server）
           ↓
   Claude Agent SDK（编程控制 Agent → 多 Agent 系统）
           ↓
```

     Qwen Code（对比阿里生态，多 Provider 策略）
```text
           ↓
```

   Lil'Log（学术理论：Agent 架构 / Harness / 对齐）
```text
           ↓
```

    OpenHarness（生产级开源实现，对照理论验证工程细节）
```text
           ↓
```

    生产部署：CI/CD Hooks + Headless 模式 + Gateway 配置

---
整理日期：2026-07-08 | 全部链接均为官方一手资料
