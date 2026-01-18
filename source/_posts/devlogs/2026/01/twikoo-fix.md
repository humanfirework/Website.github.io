---
title: Twikoo 评论系统加载失败修复
date: 2026-01-18 13:30:00
categories:
  - 文章
  - 日志
tags: [Bug修复, Twikoo, 故障排查]
layout: post
---

### [2026-01-18] Twikoo 评论系统加载失败修复

- **🔍 现象**:
  - 博客文章底部的 Twikoo 评论区无法加载。
  - 仅显示 "说些什么吧！" 提示语和 Twikoo 图标。
  - 没有输入框和评论列表。
- **🧐 原因**:
  - 主题配置文件 (`themes/twilight/_config.yml`) 中引用的 Twikoo 核心 JS 文件 CDN 链接失效 (404 Not Found)。
  - 失效链接: `https://npm.elemecdn.com/twikoo@1.6.44/dist/twikoo.all.min.js`
- **✅ 解决**:
  - **修改文件**: `themes/twilight/_config.yml` (约第 715 行)
  - **操作**: 将失效的 `elemecdn` 替换为稳定的 `jsDelivr` 源。
  - **代码变更**:
    ```yaml
    twikoo:
      # src: https://npm.elemecdn.com/twikoo@1.6.44/dist/twikoo.all.min.js  <-- 旧链接 (失效)
      src: https://cdn.jsdelivr.net/npm/twikoo@1.6.44/dist/twikoo.all.min.js  <-- 新链接 (可用)
    ```
- **⚠️ 警示**:
  - **不要随意修改此 CDN 链接**，除非确认新链接可用。
  - 如果评论区再次消失，首先检查此 JS 文件链接是否能正常访问。
