---
title: Vercel 自动化部署标准流程备忘录
date: 2025-12-25 21:44:21（圣诞节哦！）
tags: [Vercel, Hexo, 部署]
---

这份指南用来搭建 Hexo 博客。

## 一、 核心原理

不要手动上传 public 文件夹，public 文件是 Hexo 生成的静态文件，Vercel 会自动处理。
Vercel 的工作逻辑是：你上传源代码（Source Code）到 GitHub -> Vercel 监测到更新 -> Vercel 在云端自动执行 hexo g -> Vercel 把生成的网页发布出去。

## 二、 首次部署检查清单 (配置篇)

在上传代码前，请确保项目里_config.yml和_config_reimu.yml这两个文件配置正确，否则会出现“只有文字没样式”或者上传失败等问题，意思就是要把源代码上传到 GitHub 仓库，而不是用hexo 上传public 文件.

### 1. 检查 _config.yml (站点配置文件)

Root 路径：必须设为 /，除非你的博客在子目录。

```yaml
url: `https://你的域名.vercel.app`   # 这里填Vercel分配的域名，或者留空
root: /                         # 关键！必须是斜杠
```

### 2. 检查 package.json (依赖文件)

Build 脚本：Vercel 需要知道用什么命令来生成网页。确保 scripts 里有 build。

```json
"scripts": {
  "build": "hexo generate",  // 或者是 hexo g
  "clean": "hexo clean"
}
```

还有记得检擦Setting里面Build & Development（后面还会提）
- Framework Preset: Hexo
- Build Command: hexo generate (或者 npm run build)
- Output Directory: public


## 三、 日常更新流程 (操作篇)

当你写完新文章或修改了配置，只需要做这三步，Vercel 会自动处理剩下的事情。

### 第一步：本地预览（可选）

先在本地看看效果对不对，防止把错误推送到线上。

```bash
hexo clean && hexo g && hexo s
# 浏览器打开 localhost:4000 确认无误后，按 Ctrl+C 停止
```

### 第二步：提交代码到 GitHub

注意：不需要执行 hexo g 生成静态文件，直接提交源码即可。

```bash
git status  # 确认所有文件都被添加
git add .   # 添加所有修改过的文件
git commit -m "更新了一篇新文章: 文章标题"  # 提交修改，文章标题替换为你实际的文章标题
git push    # 推送到 GitHub 仓库
```

### 第三步：喝杯茶，等待自动更新 ☕️

当你执行完 git push 后，Vercel 会在 1-2 分钟内自动检测到，并开始构建。

你可以访问你的网址查看更新。

## 四、 Vercel 后台设置备忘 (如果需要重新建项目)

如果你以后删除了项目要重新部署，请记住最关键的 "Build & Development Settings"：

### Framework Preset (框架预设):

选 Hexo (如果没有 Hexo 选项，选 Other 也可以)。

### Build Command (构建命令):

填 hexo generate (或者 npm run build)。

### Output Directory (输出目录) [最容易出错的地方]:

- Hexo 项目必须填：public
- Vue/Vite 项目填：dist

### Environment Variables (环境变量):

如果有用到特殊插件需要 Token，记得在这里配置。

## 五、 常见故障自救

| 现象 | 可能原因 | 解决方法 |
|------|----------|----------|
| 页面只有文字，没有样式 | 1. 输出目录配置错<br>2. _config.yml 里 root 不是 / | 检查 Vercel 的 Output Directory 是否为 public。 |
| 文章没更新 | 你可能只在本地生成了，没 Push 源码 | 确保执行了 git push。 |
| Vercel 构建报错 (Build Failed) | 缺少依赖 | 检查 package.json 里是否有 hexo 和相关插件，重新 npm install 再推。 |
| 图片加载不出来 | 路径大小写问题 | Windows 不区分大小写，但 Linux (Vercel) 区分。检查图片文件名大小写是否完全一致。 |

## 祝你的博客运营顺利！