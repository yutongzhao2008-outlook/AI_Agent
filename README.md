# AI_Agent

AI Code CLI Agent 技术栈资料索引与可安装 Skill 示例。

## 文件说明

- `AI_AGENT_docs.md`：由 `docs.md` 清洗重排后的 Markdown 阅读版。
- `AI_AGENT_docs.html`：自包含视觉化 HTML 阅读版，可直接用浏览器打开。
- `exmaples/skill1/SKILL.md`：最小可安装 Agent Skill 示例。

## 推送到 GitHub

本地仓库目标：

```bash
git remote add origin https://github.com/yutongzhao2008-outlook/AI_Agent
git branch -M main
git add .
git commit -m "feat: add AI agent docs and installable skill example"
git push -u origin main
```

如果 remote 已存在，改用：

```bash
git remote set-url origin https://github.com/yutongzhao2008-outlook/AI_Agent
git push -u origin main
```

## 安装 Skill

仓库 push 后，可以通过 `npx skills add` 从 GitHub 安装：

```bash
npx skills add https://github.com/yutongzhao2008-outlook/AI_Agent
```

为避免仓库后续增加多个 Skill 时产生选择歧义，推荐指定 skill 名称：

```bash
npx skills add https://github.com/yutongzhao2008-outlook/AI_Agent --skill skill1
```

这里不需要在 GitHub URL 后追加 `exmaples`。`npx skills add` 的参数是仓库来源，CLI 会扫描仓库中的 `SKILL.md`；`--skill skill1` 选择的是 `SKILL.md` frontmatter 里的 `name: skill1`，不是目录路径。

只有本地按目录直接安装时才需要写到示例目录：

```bash
npx skills add ./exmaples/skill1
```

全局安装：

```bash
npx skills add https://github.com/yutongzhao2008-outlook/AI_Agent --skill skill1 -g
```

全局安装后验证：

```bash
npx skills ls -g
npx skills ls -g --json
```

在输出中确认存在：

```text
"name": "skill1"
"scope": "global"
```

PowerShell 下也可以直接筛选：

```powershell
npx.cmd --yes skills ls -g --json | Select-String '"name": "skill1"'
```

如果安装给 Codex，本机通常还可以检查：

```powershell
Test-Path "$env:USERPROFILE\.agents\skills\skill1\SKILL.md"
```

## Response

问题：`npx skills add https://github.com/yutongzhao2008-outlook/AI_Agent --skill skill1` 确定可以吗？不用加 `exmaples` 吗？

答复：确定可以，不需要在 GitHub URL 后加 `exmaples`。远程安装时 URL 指向仓库根目录，`skills` CLI 会扫描仓库里的 `SKILL.md` 文件；`--skill skill1` 选择的是 skill 名称，也就是 `exmaples/skill1/SKILL.md` frontmatter 中的 `name: skill1`。

推荐安装命令：

```bash
npx skills add https://github.com/yutongzhao2008-outlook/AI_Agent --skill skill1
```

全局安装命令：

```bash
npx skills add https://github.com/yutongzhao2008-outlook/AI_Agent --skill skill1 -g
```

全局安装后验证：

```bash
npx skills ls -g
npx skills ls -g --json
```

PowerShell 精确检查：

```powershell
npx.cmd --yes skills ls -g --json | Select-String '"name": "skill1"'
Test-Path "$env:USERPROFILE\.agents\skills\skill1\SKILL.md"
```

本地验证：

```bash
npx skills add . --list
npx skills add ./exmaples/skill1 --list --full-depth
```

当前仓库可发现的 Skill：

```text
skill1
```
