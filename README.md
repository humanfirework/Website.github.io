
# 个人博客网站项目

这是一个基于 Hexo 搭建的个人博客网站，使用 reimu 主题，包含文章发布、目录导航、评论系统等功能，支持静态页面生成与部署。

## 项目特点

- **基于 Hexo**：快速高效的静态站点生成器，支持 Markdown 写作
- **reimu 主题**：集成目录（TOC）、社交链接、评论系统等功能
- **功能丰富**：
  - 自动生成文章目录（支持多级标题）
  - 支持 Open Graph 协议，优化社交分享体验
  - 集成评论系统（Valine、Waline 等，可配置）
  - 自动生成站点地图（sitemap）
  - 响应式设计，适配不同设备

## 快速开始

### 环境要求

- Node.js (v14+)
- Hexo CLI (`npm install -g hexo-cli`)

### 安装步骤

1. 克隆仓库
   ```bash
   git clone https://github.com/your-username/Website.github.io.git
   cd Website.github.io
   ```

2. 安装依赖
   ```bash
   npm install
   ```

3. 本地预览
   ```bash
   hexo server
   ```
   访问 `http://localhost:4000` 查看网站

## 配置说明

主要配置文件为 `_config_reimu.yml`，可自定义以下内容：

- **目录（TOC）**：控制文章目录显示，支持设置层级范围
- **社交链接**：配置 GitHub、Bilibili 等社交平台链接
- **评论系统**：支持 Valine、Waline 等，需在配置中启用并填写对应密钥
- **Open Graph**：设置默认分享图片、站点信息等
- **版权信息**：自定义页脚版权声明

## 文章发布

1. 创建新文章
   ```bash
   hexo new "文章标题"
   ```

2. 在 `source/_posts` 目录下编辑 Markdown 文章

3. 生成静态文件
   ```bash
   hexo generate
   ```

## 部署

生成的静态文件位于 `public` 目录，可部署到 GitHub Pages、Netlify 等平台。

## 许可证

本项目版权信息可在 `_config_reimu.yml` 的 `copyright` 字段配置，建议选择合适的开源许可证（如 MIT、CC BY-NC-SA 等）。

## 联系方式

- GitHub: [humanfirework](https://github.com/humanfirework)
- Bilibili: [https://space.bilibili.com/3494381157878384](https://space.bilibili.com/3494381157878384)
