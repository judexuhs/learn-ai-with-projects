# AI 项目实验室

一个面向 AI 初学者的项目式学习网站。用户不需要先学完编程知识，而是通过具体步骤做出可运行作品，并在需要时补充相关概念。

## 当前内容

- 知识专题：从网页基础到 AI 工作流的核心概念
- 学习路径：按“用好 AI、做 AI 工具、做 AI 工作流”组织
- 跟做项目：答案之书、图片反推 Prompt、研究到报告与 HTML Deck、个人内容工作台
- 开始这里：为零基础用户准备 Coding 工具、文件夹和第一个网页
- 四个可运行成品 Demo，可先体验再跟做
- 本地学习进度、逐项 To-Do、可复制任务和完成检查

## 本地运行

需要 Node.js 22.13 或更高版本。

```bash
npm install
npm run dev
```

默认访问 `http://localhost:3000`。开发服务如果使用了其他端口，请以终端输出为准。

## 验证

```bash
npm test
npx tsc --noEmit
npm run lint
npm run build
```

## 部署到 Cloudflare

首次部署先完成登录：

```bash
npx wrangler login
```

随后运行：

```bash
npm run cf:deploy
```

项目基于 vinext 和 Cloudflare Vite 插件构建，部署配置会在构建阶段生成到 `dist/server/wrangler.json`。
