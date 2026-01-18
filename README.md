<div align = center>
  <h1>Twilight Breeze</h1>
  <p align="center">
  💘 Some regrets are what make things perfect. 💘
  </p>

[演示网站](https://humanfireworks-web.netlify.app)

</div>

---

这是一个基于 [Hexo](https://hexo.io/) 搭建，并使用深度定制的 [Reimu](https://github.com/D-Sketon/hexo-theme-reimu) 主题（私有化命名为 **Twilight**）的个人博客项目。记录技术心得、生活感悟与分享。

## 特性

### 基础功能
- ✨ 完整的博客功能（文章、分类、标签、归档）
- 🔄 兼容 Hexo 7.x 版本
- 📱 响应式布局，完美适配移动端
- 🌙 暗黑模式支持（自动/手动切换）
- ⚡ 深度性能优化（国内 CDN 加速、资源压缩）

### 交互与媒体
- 💬 **Waline** 评论系统（支持表情、Markdown、邮件通知）
- 🖱️ 个性化鼠标特效与 Reimu 指针
- 🖼️ 图片懒加载与灯箱效果
- 🔄 PJAX 无刷新跳转
- 📊 实时访客统计与阅读量统计

### 技术栈
- **核心框架**: Hexo
- **主题基底**: hexo-theme-reimu (Twilight)
- **部署平台**: Netlify
- **评论后端**: Vercel + LeanCloud/MongoDB

## 安装与配置

### 环境要求
- Node.js (v14+)
- Git

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/humanfirework/Website.github.io.git
   cd Website.github.io
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **本地预览**
   ```bash
   hexo clean && hexo s
   ```
   访问 `http://localhost:4000` 查看效果。

## 使用说明

### 常用命令

| 命令 | 说明 |
| --- | --- |
| `hexo new "title"` | 创建新文章（默认 layout 为 post） |
| `hexo new page "name"` | 创建新页面 |
| `hexo clean` | 清除缓存文件 (db.json) 和已生成的静态文件 (public) |
| `hexo g` | 生成静态文件 |
| `hexo s` | 启动本地服务器 |
| `hexo d` | 部署到远程站点（本项目使用 GitHub Actions/Netlify 自动部署，无需手动执行） |

### 写作规范

文章位于 `source/_posts/` 目录下，文件名建议使用**英文连字符**格式（如 `my-new-post.md`）。

**Front-matter 示例：**

```yaml
---
title: 文章标题
date: 2026-01-01 12:00:00
updated: 2026-01-02 12:00:00
tags: [Hexo, 教程]
categories: 技术分享
cover: /covers/my-cover.webp # 可选，自定义封面
sticky: true # 可选，置顶文章
---
```

### 目录结构

```
.
├── _config.yml          # 站点配置文件
├── package.json         # 项目依赖配置
├── source/              # 博客源码
│   ├── _posts/          # 文章目录
│   ├── _data/           # 数据文件（头像、封面图等）
│   ├── about/           # 关于页面
│   └── friend/          # 友链页面
└── themes/
    └── twilight/        # 私有化主题目录（核心样式与逻辑）
```

## 贡献指南

本项目为个人博客，暂不接受外部代码贡献。如果您对主题感兴趣，推荐关注原主题 [hexo-theme-reimu](https://github.com/D-Sketon/hexo-theme-reimu)。

如有任何问题或建议，欢迎在 [Issues](https://github.com/humanfirework/Website.github.io/issues) 中提出。

## 维护记录

- 详细的故障排查与更新日志已迁移至 `source/_posts/devlogs` 目录，或访问博客 **开发日志** 栏目。

## 许可证

本项目内容采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 协议进行许可。
主题代码遵循 [MIT License](https://opensource.org/licenses/MIT)。

## 联系方式

- **Blog**: [Twilight Breeze](https://humanfireworks-web.netlify.app)
- **GitHub**: [humanfirework](https://github.com/humanfirework)
- **Bilibili**: [Space](https://space.bilibili.com/3494381157878384)
