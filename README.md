# 影享家 - 电影流媒体网站

一个现代化的视频流媒体网站，允许用户浏览、搜索和观看电影、电视剧和动漫内容。

## 功能特性

- 分类浏览：电影、电视剧、动漫三大分类
- 搜索功能：按名称搜索影视内容
- 排序功能：按评分或年份排序
- 视频播放：模态框式视频播放器
- 响应式设计：适配各种屏幕尺寸
- 现代化UI：使用Tailwind CSS构建的美观界面

## 技术栈

- HTML5
- CSS3 (Tailwind CSS v3)
- JavaScript
- Font Awesome
- Vite (构建工具)

## 项目结构

```
├── src/
│   ├── main.js        # 主JavaScript文件，包含所有功能实现
│   ├── styles.css     # Tailwind CSS配置和自定义样式
├── index.html         # 主HTML文件
├── package.json       # 项目配置和依赖
├── tailwind.config.js # Tailwind CSS配置
├── vite.config.js     # Vite配置
└── README.md          # 项目文档
```

## 快速开始

### 前提条件
- Node.js 14+ 和 npm 6+

### 安装依赖

```bash
npm install
```

### 开发模式

启动开发服务器，在浏览器中查看效果：

```bash
npm run dev
```

服务器将运行在 http://localhost:3000/

### 构建生产版本

```bash
npm run build
```

构建后的文件将位于 `dist` 目录中。

### 预览生产版本

```bash
npm run preview
```

## 使用说明

1. 在首页选择您感兴趣的分类（电影、电视剧、动漫）
2. 浏览内容，或使用搜索框查找特定影视
3. 使用排序按钮按评分或年份排序
4. 点击影视卡片打开视频播放器
5. 使用播放器控制按钮播放、暂停或调整音量

## 模拟数据

该项目使用模拟数据来展示电影、电视剧和动漫内容。所有图片均来自 Picsum Photos，视频链接使用 YouTube 嵌入式播放器。

## 响应式设计

网站在各种设备上都能良好工作：
- 桌面设备（>1024px）
- 平板设备（768px-1024px）
- 移动设备（<768px）

## 自定义

如需自定义颜色、字体或其他配置，可以编辑 `tailwind.config.js` 文件。