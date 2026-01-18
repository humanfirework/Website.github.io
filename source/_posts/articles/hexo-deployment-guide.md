---
title: 手把手教你部署 Hexo 静态博客到 GitHub Pages
date: 2026-01-16 18:07:50
tags: [Hexo, GitHub, 教程, 博客搭建]
categories: [文章, 建立网站教程]
cover: /covers/posts/伊蕾娜-白发-窗边.png
---

想拥有一个属于自己的个人博客吗？本文将手把手教你如何使用 Hexo 框架搭建静态博客，并免费部署到 GitHub Pages 上。

<!-- more -->

## 1. 环境准备

在开始之前，我们需要安装两个核心工具：Node.js 和 Git。

### 1.1 安装 Node.js

Hexo 是基于 Node.js 的，所以必须先安装它。

*   **下载地址**：[Node.js 官网 (推荐下载 LTS 版本)](https://nodejs.org/)
*   **验证安装**：打开终端（cmd 或 PowerShell），输入以下命令：
    ```bash
    node -v
    npm -v
    ```
    如果有版本号输出（例如 `v18.x.x`），说明安装成功。

### 1.2 安装 Git

Git 用于版本控制和将代码推送到 GitHub。

*   **下载地址**：[Git 官网](https://git-scm.com/downloads)
*   **验证安装**：
    ```bash
    git --version
    ```

### 1.3 配置 Git 用户信息（重要）

安装完 Git 后，必须配置用户名和邮箱，否则无法提交代码。

```bash
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的GitHub注册邮箱"
```

---

## 2. 准备 GitHub 仓库与 SSH Key

### 2.1 创建仓库

1.  注册并登录 [GitHub](https://github.com/)。
2.  点击右上角的 `+` 号，选择 **New repository**。
3.  **Repository name**（关键）：必须填写为 `你的用户名.github.io`。
    *   例如：如果你的用户名是 `firefly`，仓库名必须是 `firefly.github.io`。
    *   *注意：必须完全匹配，大小写最好也一致。*
4.  选择 **Public**（公开）。
5.  建议勾选 **Add a README file**（初始化仓库）。
6.  点击 **Create repository**。

### 2.2 配置 SSH Key

为了让你的电脑能安全地向 GitHub 推送代码，我们需要配置 SSH 密钥。

1.  **生成密钥**：
    在终端（或 Git Bash）中输入以下命令（替换为你注册 GitHub 的邮箱）：
    ```bash
    ssh-keygen -t ed25519 -C "your_email@example.com"
    ```
    出现提示时一直按回车即可。

2.  **获取公钥**：
    找到生成的公钥文件（通常在 `C:\Users\你的用户名\.ssh\id_ed25519.pub` 或 `id_rsa.pub`），用记事本打开并复制里面的内容。
    或者在终端使用命令查看：
    ```bash
    # Windows PowerShell
    cat ~/.ssh/id_ed25519.pub
    ```

3.  **添加到 GitHub**：
    *   进入 GitHub -> 点击右上角头像 -> **Settings**。
    *   点击左侧 **SSH and GPG keys** -> **New SSH key**。
    *   **Title** 随便填（如 `My Laptop`），**Key** 粘贴刚才复制的内容。
    *   点击 **Add SSH key**。

4.  **验证连接**：
    ```bash
    ssh -T git@github.com
    ```
    输入 `yes` 确认指纹。如果看到 `Hi username! You've successfully authenticated...`，说明配置成功。

---

## 3. 安装与初始化 Hexo

接下来我们在本地创建博客。

1.  **安装 Hexo CLI**：
    ```bash
    npm install -g hexo-cli
    ```

2.  **初始化博客**：
    找一个文件夹（例如 `F:\MyBlog`），在此处打开终端（Shift + 右键 -> 在此处打开 PowerShell 窗口），执行：
    ```bash
    hexo init blog
    cd blog
    npm install
    ```
    *提示：如果报错权限不足，请尝试以管理员身份运行终端。*

3.  **本地预览**：
    ```bash
    hexo server
    # 或者简写为
    hexo s
    ```
    打开浏览器访问 `http://localhost:4000`，你应该能看到默认的 Hexo 页面了。按 `Ctrl + C` 停止服务。

---

## 4. 更换主题

默认主题比较简单，我们可以更换为更好看的主题（例如 Reimu）。

1.  **下载主题**：
    在博客根目录下运行：
    ```bash
    git clone https://github.com/D-Sketon/hexo-theme-reimu.git themes/reimu
    ```

2.  **启用主题**：
    打开博客根目录下的 `_config.yml` 文件，找到 `theme` 字段，修改为：
    ```yaml
    theme: reimu
    ```

---

## 5. 部署到 GitHub (关键步骤)

最后一步，将博客发布到互联网！为了防止源码丢失，我们采用 **源码与静态页面分离** 的策略。

### 5.1 安装部署插件

```bash
npm install hexo-deployer-git --save
```

### 5.2 配置部署信息

打开根目录下的 `_config.yml`，拉到最底部，修改 `deploy` 部分。
**建议使用 `gh-pages` 分支部署静态页面**，这样不会覆盖仓库里的源码（如果以后你把源码也传上去的话）。

```yaml
deploy:
  type: git
  repo: git@github.com:你的用户名/你的用户名.github.io.git
  branch: gh-pages  # 推荐推送到 gh-pages 分支
```

*注意：请将 `你的用户名` 替换为你实际的 GitHub 用户名。*

### 5.3 一键部署

执行以下命令三连：

```bash
hexo clean    # 清除缓存
hexo generate # 生成静态文件 (简写 hexo g)
hexo deploy   # 部署到 GitHub (简写 hexo d)
```

### 5.4 开启 GitHub Pages

部署成功后，还需要告诉 GitHub 从哪个分支展示网页。

1.  回到你的 GitHub 仓库页面。
2.  点击上方的 **Settings** (设置)。
3.  在左侧菜单栏找到 **Pages**。
4.  在 **Build and deployment** 下的 **Source**，选择 `Deploy from a branch`。
5.  在 **Branch** 选项里，选择 **gh-pages** 分支，目录选 `/(root)`，然后点击 **Save**。
6.  稍等几分钟（顶部会显示 "Your site is live at..."），此时再访问 `https://你的用户名.github.io`，你的博客就上线啦！

---

## 常用命令速查

| 命令 | 简写 | 说明 |
| :--- | :--- | :--- |
| `hexo server` | `hexo s` | 启动本地预览 |
| `hexo generate` | `hexo g` | 生成静态文件 |
| `hexo deploy` | `hexo d` | 部署到远程 |
| `hexo clean` | `hexo cl` | 清理缓存（遇到问题时先执行这个） |
| `hexo new "文章标题"` | `hexo n` | 新建文章 |

希望这篇教程能帮到你，快去搭建属于你的个人博客吧！
