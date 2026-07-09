# DEBUG: GitHub 上 HTML 不显示

## 问题

`AI_AGENT_docs.html` 在 GitHub 仓库页面里用浏览器打开时没有网页效果，通常是因为打开的是 GitHub 的文件源码预览页面，而不是 GitHub Pages 的网页托管地址。

例如，下面这种地址只是仓库文件查看器：

```text
https://github.com/<user>/<repo>/blob/main/AI_AGENT_docs.html
```

在这个页面里，GitHub 会把 HTML 当作仓库文件展示，不会按你自己的网页入口来发布站点。

## 根因

本仓库里的 `AI_AGENT_docs.html` 是单文件 HTML，CSS 和 JavaScript 都写在文件内部，不依赖外部 JS/CSS 资源。问题不是资源没有上传，而是访问方式不对。

另外，如果仓库根目录没有合适的 `index.html`，即使启用了 GitHub Pages，访问 Pages 根地址时也没有一个清晰的默认入口。

## 解决方案

1. 在仓库根目录保留 `index.html`。
2. 让 `index.html` 作为入口页，列出当前目录和递归子目录里的所有 HTML 文件。
3. 在仓库根目录保留 `.nojekyll`，让 GitHub Pages 按纯静态文件发布。
4. 到 GitHub 仓库设置中启用 Pages：
   - `Settings`
   - `Pages`
   - `Build and deployment`
   - 选择 `Deploy from a branch`
   - Branch 选择 `main`
   - Folder 选择 `/root`
5. 保存后等待 Pages 发布完成。

发布后访问：

```text
https://<user>.github.io/<repo>/
```

或直接访问：

```text
https://<user>.github.io/<repo>/AI_AGENT_docs.html
```

当前仓库对应的 Pages 地址应为：

```text
https://yutongzhao2008-outlook.github.io/AI_Agent/
```

## 本次更新

- 新增 `DEBUG_HTML不显示.md` 保存排查说明。
- 新增/更新 `DEBUG_HTML不显示.html` 保存同样内容的网页版本。
- 更新 `index.html`，作为当前目录及递归子目录所有 HTML 文件的入口索引。
- 保留 `.nojekyll`，用于 GitHub Pages 静态发布。

