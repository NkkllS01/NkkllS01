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
- `config.toml|yaml|json`：站点配置

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

## 为什么“我改了但页面没变化”？（排障清单）

按下面顺序检查，基本都能定位问题：

1. **是否只在本地提交、没有 push**
   ```bash
   git status
   git log --oneline -n 3
   git push
   ```
2. **是否改错仓库**（改了 profile 仓库，但你看的其实是 Hugo 网站，或反过来）
   ```bash
   git remote -v
   ```
3. **是否在错误分支提交**（例如改在 `work` 分支，但线上读取 `main`）
   ```bash
   git branch
   git push -u origin <你的分支>
   # 然后到 GitHub 发 PR 合并到默认分支
   ```
4. **是否不是用户名同名仓库**（GitHub Profile README 只认 `用户名/用户名`）
5. **GitHub Pages 是否还在构建**（Actions 没跑完前页面不会更新）
6. **浏览器缓存**（强制刷新 `Ctrl/Cmd + Shift + R`）

---

## 建议你现在这样做（最稳妥）

1. 先确认你要改的是“GitHub 首页简介”还是“完整网站页面”。
2. 若改简介：改本仓库 `README.md`。
3. 若改网站：改 `hugo` 仓库中的 `content/` 与配置文件。
4. 在 `hugo` 仓库本地预览后再 push，避免线上改坏。

---

## 我这次帮你定位到的关键点

你现在这个本地仓库目前处于 `work` 分支，且没有配置任何远程仓库（`origin`）。
在这种状态下，即使我本地提交成功，GitHub 页面也不会有任何变化。

要让线上变化生效，至少需要：

1. 先配置远程仓库：
   ```bash
   git remote add origin <你的仓库URL>
   ```
2. 推送分支：
   ```bash
   git push -u origin work
   ```
3. 在 GitHub 上把 `work` 合并到默认分支（通常 `main`）
4. 如果是 Hugo 站点，再等待 Pages/Actions 部署完成

---

如果你愿意，我可以下一步按你真实仓库名给你一套“可直接复制执行”的命令（包含 profile 仓库和 hugo 仓库两套）。
