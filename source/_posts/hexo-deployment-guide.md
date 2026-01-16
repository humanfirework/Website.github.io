---
title: 手把手教你部署 Hexo 静态博客到 GitHub Pages
date: 2026-01-16 18:07:50
tags: [Hexo, GitHub, 教程, 博客搭建]
categories: [技术教程]
cover: /covers/伊蕾娜-白发-窗边.png
---

想拥有一个属于自己的炫酷个人博客吗？本文将手把手教你如何使用 Hexo 框架搭建静态博客，并免费部署到 GitHub Pages 上。

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
    如果有版本号输出，说明安装成功。

### 1.2 安装 Git
Git 用于版本控制和将代码推送到 GitHub。
*   **下载地址**：[Git 官网](https://git-scm.com/downloads)
*   **验证安装**：
    ```bash
    git --version
    ```

---

## 2. 准备 GitHub 仓库与 SSH Key

### 2.1 创建仓库
1.  注册并登录 [GitHub](https://github.com/)。
2.  点击右上角的 `+` 号，选择 **New repository**。
3.  **Repository name**（关键）：必须填写为 `你的用户名.github.io`。
    *   例如：如果你的用户名是 `firefly`，仓库名必须是 `firefly.github.io`。
4.  选择 **Public**（公开）。
5.  有必要的话可以勾上REMADER
6.  点击 **Create repository**。

### 2.2 配置 SSH Key
为了让你的电脑能向 GitHub 推送代码，我们需要配置 SSH 密钥。

1.  **生成密钥**：
    在终端（或 Git Bash）中输入以下命令（替换为你注册 GitHub 的邮箱）：
    ```bash
    ssh-keygen -t ed25519 -C "your_email@example.com"  #你的邮箱
    ```
    一直按回车即可。

2.  **获取公钥**：
    找到生成的公钥文件（通常在 `C:\Users\你的用户名\.ssh\id_rsa.pub`），用记事本打开并复制里面的内容。
    或者在终端使用命令查看：
    ```bash
    cat ~/.ssh/id_rsa.pub
    ```

3.  **添加到 GitHub**：
    *   进入 GitHub -> 点击右上角头像 -> **Settings**。
    *   点击左侧 **SSH and GPG keys** -> **New SSH key**。
    *   **Title** 随便填（如 `My Website`），**Key** 粘贴刚才复制的内容。
    *   点击 **Add SSH key**。

4.  **验证连接**：
    ```bash
    ssh -T git@github.com
    ```
    如果看到 `Hi username! You've successfully authenticated...`，说明配置成功。

---

## 3. 安装与初始化 Hexo

接下来我们在本地创建博客。

1.  **安装 Hexo CLI**：
    ```bash
    npm install -g hexo-cli
    ```

2.  **初始化博客**：
    找一个文件夹（例如 `F:\MyBlog`），用win+r输入cmd打开终端（或者右键开始菜单打开终端管理员），执行：
    ```bash
    hexo init blog
    cd blog
    npm install
    ```
    如果没有用大概率是权限不够，启动终端管理员即可

3.  **本地预览**：
    ```bash
    hexo server
    # 或者简写为
    hexo s
    ```
    打开浏览器访问 `http://localhost:4000`，你应该能看到默认的 Hexo 页面了。

---

## 4. 更换主题

默认主题比较简单，我们可以更换为更好看的主题（例如 Reimu / Butterfly / Twilight（这个是主播的））。

1.  **下载主题**：
    在博客根目录下运行（其他的hexo主题安装也是一样的，选择一个自己喜欢的主题安装）：
    ```bash
    git clone https://github.com/D-Sketon/hexo-theme-reimu.git themes/reimu
    ```

2.  **启用主题**：
    打开博客根目录下的 `_config.yml` 文件，找到 `theme` 字段，修改为：
    ```yaml
    theme: reimu
    ```

---

## 5. 部署到 GitHub

最后一步，将博客发布到互联网！

1.  **安装部署插件**：
    ```bash
    npm install hexo-deployer-git --save
    ```

2.  **配置部署信息**：
    打开根目录下的 `_config.yml`，拉到最底部，修改 `deploy` 部分：
    ```yaml
    deploy:
      type: git
      repo: git@github.com:你的用户名/你的用户名.github.io.git
      branch: main
    ```
    *注意：现在 GitHub 默认分支通常是 `main`，如果你的仓库显示是 `master`，请相应修改。*

3.  **一键部署**：
    执行以下命令三连：
    ```bash
    hexo clean   # 清除缓存
    hexo generate # 生成静态文件 (简写 hexo g)
    hexo deploy   # 部署到 GitHub (简写 hexo d)
    ```

稍等片刻，访问 `https://你的用户名.github.io`，你的博客就上线啦！

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
