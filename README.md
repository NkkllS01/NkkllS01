# 个人主页维护说明（GitHub Profile + Hugo 双仓库）

这个仓库目前可作为你的 **Profile 仓库**（通常是 `用户名/用户名`），用于展示主页简介；
你提到的另一个 `hugo` 仓库通常是 **网站源码仓库**，负责生成并部署真正的个人网站。

## 先判断你要改的是哪一类内容

### 1) 改 GitHub 个人主页卡片（README 页面）
如果你要改的是 GitHub 个人首页（头像下方那块 README 内容），
直接修改本仓库的 `README.md` 即可：

```bash
git add README.md
git commit -m "Update profile README"
git push
```

> 生效位置：`https://github.com/<你的用户名>`

---

### 2) 改 Hugo 网站页面（博客、项目页、关于页）
如果你要改的是你部署出来的网站（通常在 `username.github.io` 或自定义域名），
应该去 `hugo` 仓库改内容：

常见目录：
- `content/`：文章与页面内容
- `layouts/`：模板
- `themes/`：主题
- `static/`：静态资源（图片、下载文件等）
- `config.toml` / `config.yaml` / `config.json`：站点配置

典型流程：

```bash
# 在 hugo 仓库
hugo server -D            # 本地预览
# 修改内容后
git add .
git commit -m "Update site content"
git push
```

如果你的部署方式是 GitHub Pages / Actions，push 后会自动构建上线。

---

## 两仓库“联动”的常见模式

你现在说“这个仓库和 hugo 仓库链接在一起”，一般有两种实现：

### 模式 A：README 放网站入口链接（最常见）
- 这个仓库只放自我介绍和链接
- Hugo 仓库负责网站内容
- 二者并不会自动同步，只是通过链接关联

### 模式 B：Hugo 构建产物发布到另一个仓库
- `hugo` 仓库存源码
- 构建后的 `public/` 被发布到 `username.github.io` 仓库
- 这时你改网站必须在 `hugo` 源码仓库改，不建议直接改产物仓库

---

## 建议你现在这样做（最稳妥）

1. 先确认你要改的是“GitHub 首页简介”还是“完整网站页面”。
2. 若改简介：改本仓库 `README.md`。
3. 若改网站：改 `hugo` 仓库中的 `content/` 与配置文件。
4. 在 `hugo` 仓库本地预览后再 push，避免线上改坏。

---

## 快速自检命令（在各自仓库执行）

```bash
git remote -v
```

看 remote URL 就能确认当前仓库到底对应哪个 GitHub 仓库。

如果你愿意，我下一步可以直接给你一份：
- “改一个新页面（About/Projects）”的 Hugo 最短操作清单；
- 或者按你现在主题结构，告诉你**具体改哪个文件**。
