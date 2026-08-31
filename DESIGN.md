---
name: "AI 项目实验室"
description: "一条为 AI 初学者准备的、清楚而友好的项目学习路线。"
colors:
  route-blue: "#1d5fd1"
  route-blue-hover: "#174ea6"
  route-blue-soft: "#eaf2ff"
  soft-blue-field: "#f8f8ff"
  ink-blue: "#27304a"
  ink-blue-strong: "#252c48"
  body-muted: "#697086"
  white-paper: "#ffffff"
  sunny-yellow: "#ffe1b5"
  coral-marker: "#ff8066"
  coral-field: "#fff0ec"
  slate-blue-marker: "#315f9f"
  slate-blue-field: "#eaf2ff"
typography:
  display:
    fontFamily: '"PingFang SC", "Microsoft YaHei", system-ui, sans-serif'
    fontSize: "clamp(48px, 5.5vw, 66px)"
    fontWeight: 760
    lineHeight: 0.99
    letterSpacing: "-0.04em"
  headline:
    fontFamily: '"PingFang SC", "Microsoft YaHei", system-ui, sans-serif'
    fontSize: "clamp(32px, 4vw, 48px)"
    fontWeight: 760
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  title:
    fontFamily: '"PingFang SC", "Microsoft YaHei", system-ui, sans-serif'
    fontSize: "21px"
    fontWeight: 760
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: '"PingFang SC", "Microsoft YaHei", system-ui, sans-serif'
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: '"PingFang SC", "Microsoft YaHei", system-ui, sans-serif'
    fontSize: "13px"
    fontWeight: 700
    lineHeight: 1.55
    letterSpacing: "normal"
rounded:
  control: "12px"
  nav: "14px"
  icon: "17px"
  card: "22px"
  feature-card: "28px"
  round: "50%"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "20px"
  xl: "28px"
  section-mobile: "62px"
  section-desktop: "76px"
components:
  button-primary:
    backgroundColor: "{colors.route-blue}"
    textColor: "{colors.white-paper}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.route-blue-hover}"
    textColor: "{colors.white-paper}"
  button-secondary:
    backgroundColor: "{colors.white-paper}"
    textColor: "{colors.route-blue-hover}"
    rounded: "{rounded.control}"
    padding: "10px 15px"
  navigation-active:
    backgroundColor: "{colors.white-paper}"
    textColor: "{colors.route-blue-hover}"
    rounded: "10px"
    padding: "8px 12px"
  card-route-map:
    backgroundColor: "{colors.white-paper}"
    textColor: "{colors.ink-blue}"
    rounded: "{rounded.feature-card}"
    padding: "26px 26px 22px"
---

# Design System: AI 项目实验室

## Overview

**Creative North Star: "欢迎式学习路线"**

界面像一张摆在初学者面前的友好路线图：先用宽松的留白和一句清楚的承诺接住紧张感，再只给出一个明确的下一步。它把手机学习陪伴产品的亲近感翻译为响应式网页旅程，避免开发者控制台式的信息密度。

柔和的浅蓝场景、墨蓝文字和白色纸张卡片构成底层世界；晴黄色胶带、珊瑚色与沉静蓝色路线标记负责提示进度和分流。轻微旋转、不规则背景色块和环境阴影带来手工纸张感，但信息结构始终稳定、易扫读。

**Key Characteristics:**

- 每个首屏只突出一个推荐动作。
- 大面积浅色底承载内容，冷蓝用于路线、状态和主行动。
- 圆角纸张卡片配合柔和环境阴影，避免硬边工具感。
- 珊瑚与沉静蓝只标记不同学习方向，不与主蓝色争夺行动层级。
- 中文系统字体优先，字重和紧凑字距建立清楚层级，不依赖外部字体资产。

## Colors

色彩以冷静的浅蓝和墨蓝为骨架，用阳光黄、珊瑚和沉静蓝制造温暖、可辨认的路线标记。

### Primary

- **路线蓝** (`#1d5fd1`)：主按钮、品牌符号、链接、当前路线和关键编号。
- **深路线蓝** (`#174ea6`)：主按钮悬停、强调链接及白底控件文字。
- **浅路线蓝** (`#eaf2ff`)：导航底、标签、步骤编号和低强度选中面。

### Secondary

- **阳光黄** (`#ffe1b5`)：胶带、项目提示和深色项目票据中的主行动。
- **珊瑚标记** (`#ff8066`) 与 **珊瑚底** (`#fff0ec`)：第一条分支路线及其低强度容器。
- **沉静蓝标记** (`#315f9f`) 与 **沉静蓝底** (`#eaf2ff`)：完成状态、第二条分支路线及其低强度容器。

### Neutral

- **墨蓝** (`#27304a`) 与 **浓墨蓝** (`#252c48`)：正文主色、标题和页脚深色背景。
- **正文灰蓝** (`#697086`)：常规说明文字；更深的 `#626a80` 用于 12–13px 的首页行动提示和学习路线正文，确保小字号对比度。`#6c7388` 与 `#73798e` 只用于尺寸或位置已有足够辨识度的次级信息。
- **冷白蓝纸底** (`#f8f8ff`)：consumer 页面主背景。
- **白纸** (`#ffffff`)：导航选中面、路线图和内容卡片。

### Named Rules

**The One Clear Route Rule.** 路线蓝只负责当前路径与主行动；珊瑚、沉静蓝和黄色承担分类或提示，不生成同等级的竞争按钮。

## Typography

**Display Font:** `PingFang SC`，后备为 `Microsoft YaHei`, `system-ui`, `sans-serif`  
**Body Font:** 与 Display 共用同一系统中文字体栈  
**Label/Mono Font:** 代码场景才使用 `SFMono-Regular`, `Consolas`, `Liberation Mono`, `monospace`

**Character:** 单一中文无衬线字体栈保持亲切和低门槛。标题依靠较重字重、紧字距与短行宽获得明确性，正文依靠舒展行高降低学习压力。

### Hierarchy

- **Display**（760，`clamp(48px, 5.5vw, 66px)`，0.99）：桌面首页承诺；移动端收敛为 `clamp(38px, 10.7vw, 43px)`。
- **Headline**（760，`clamp(32px, 4vw, 48px)`，1.08）：章节标题与项目邀请；移动端通常为 `34px`。
- **Title**（750–760，17–21px，约 1.2）：路线节点、学习目标和卡片标题。
- **Body**（400，16–18px，1.7–1.75）：解释文本，正文块限制在约 570–650px 以保持短行。
- **Label**（650–800，12–14px，1.55）：导航、状态、按钮和路线编号；不强制全大写。项目路径编号继续使用中文 UI 字体栈和路线蓝标签样式，不切换为等宽字体。

### Named Rules

**The Calm Chinese Type Rule.** 不引入未部署的品牌字体；通过系统中文字体、紧凑标题字距和宽松正文行高维持清楚、可靠的阅读节奏。

## Layout

页面使用居中的 1180px 最大宽度容器，桌面横向内边距为 28px。首屏采用 `1.06fr / .94fr` 双栏，承诺与主行动面对三站学习路线图；目标区内容宽度按 1124px 计算，项目邀请区使用内容栏加 360px 票据栏。主章节垂直节奏约 76–96px，卡片内部常用 20–28px。

在 980px 以下，头部收起中央导航与右侧按钮，改用 42px 菜单控件；内容仍保留桌面式比例。到 760px 以下，所有主要内容改为单栏，页面横向内边距收为 20px（头部为 18px），首屏、目标区和项目区分别使用约 50–72px 的纵向留白。主按钮在移动首屏占满可用宽度，目标卡片的行动移至第二列下方，页脚改为纵向排列。实现必须继续适配 390px 宽度。

## Elevation & Depth

系统采用“浅色分层 + 环境阴影”的混合深度。大区块主要靠背景色分开，阴影集中在白纸卡片、浮层、主按钮和深色项目票据上；阴影颜色偏冷蓝或对应标记色，边缘保持柔和，不使用硬黑描边制造层级。

### Shadow Vocabulary

- **品牌浮标** (`0 8px 20px rgb(29 95 209 / .22)`)：旋转的品牌图标。
- **主行动** (`0 12px 28px rgb(29 95 209 / .24)`)：唯一主按钮。
- **纸张高层** (`0 28px 70px rgb(43 45 98 / .14)`)：首页学习路线图。
- **内容浮层** (`0 18px 45px rgb(43 45 98 / .16)`)：移动导航菜单。
- **票据高层** (`0 24px 56px rgb(28 35 67 / .2)`)：深墨蓝项目票据。
- **交互抬升** (`0 16px 30px rgb(43 45 98 / .11)`)：目标路线悬停反馈。

### Named Rules

**The Soft Paper Depth Rule.** 静态信息优先通过浅色纸面分层；只给可行动或明显悬浮的元素添加柔和阴影。

## Shapes

圆角从 10–14px 的控件、15–18px 的图标容器、19–24px 的内容卡片递进到 26–28px 的主特征卡片。品牌图标、路线图、项目符号和项目票据可旋转约 `-4deg` 到 `1.4deg`，形成轻微手作感。圆形只用于路线节点与背景装饰，不作为通用卡片形状。边框保持低对比，导航分隔线使用淡蓝实线，路线图内部使用淡灰蓝虚线。

## Components

### Buttons

- **Shape:** 标准和大按钮均为 12px 圆角；大按钮高 48px、水平内边距 20px。
- **Primary:** 路线蓝底、白字、蓝色环境阴影；首页首屏设最小宽度 150px，移动端占满宽度。
- **Hover / Focus:** 悬停变为深路线蓝；键盘焦点使用 `3px solid rgb(29 95 209 / .28)` 与 3–4px 外偏移。全局减少动态偏好把过渡压缩到 `0.01ms`。
- **Secondary:** 白底、深路线蓝文字、`#d7d4f3` 细边框；悬停时边框加深且背景变为 `#f5f3ff`。
- **Ticket action:** 深墨蓝票据内改用阳光黄底与深棕字，无阴影；悬停为 `#ffc98c`。

### Chips

- **Style:** 标签和说明胶囊使用 10–12px 圆角、浅路线蓝底与路线蓝字；保持小号、短文本，不作为主要行动。
- **State:** 导航选中状态切到白纸底和深路线蓝字，并增加极浅阴影。

### Cards / Containers

- **Corner Style:** 目标路线 22px，项目票据 26px，学习路线图 28px。
- **Background:** 白纸用于主路线与通用内容；珊瑚底、沉静蓝底区分两条学习目标；深墨蓝只用于项目票据和页脚。
- **Shadow Strategy:** 主特征卡片有环境阴影；彩色目标卡片静态时无阴影，只在悬停时抬升 2–3px。
- **Border:** 大多数内容卡片无边框；导航与弹出菜单使用低对比淡蓝边框。
- **Internal Padding:** 常规内容 20–28px，主路线图桌面为 `26px 26px 22px`，移动端为 `23px 20px 19px`。

### Navigation

桌面头部高 72px，使用半透明冷白蓝纸底、16px 背景模糊和淡蓝底边。中央导航放在浅蓝色 14px 圆角轨道内，链接为 13px/650；当前页使用白底、深蓝字和轻阴影。980px 以下替换为带语义标签的 `details/summary` 菜单，菜单宽 230px；移动首要入口置于菜单底部并使用路线蓝。

### Inner Page Hero & Intro Note

内页 Hero 直接以主标题开场，不在标题上方放 eyebrow；页面所属栏目可作为标题与说明之后的低强度路线标签。概念页的“第一次来”介绍使用白色 18px 圆角说明块和 `0 10px 30px rgb(43 45 98 / .09)` 柔和阴影，在双栏 Hero 中靠下对齐。

### Project List

项目列表使用白色 20px 圆角卡片与轻环境阴影。路径编号是 46px、15px 圆角的彩色标签：默认浅路线蓝底与路线蓝字，后续路径依次使用珊瑚、沉静蓝和黄色组合。编号使用当前无衬线 UI 字体与 800 字重，不使用等宽字体。项目页“先体验四个成品 Demo”沿用路线蓝主按钮，而不是另设 Demo 行动色。

### Learning Map

这是系统的签名组件：白纸 28px 圆角卡片轻微顺时针旋转，上沿贴一条半透明暖黄色胶带。三站路线由 3px 浅蓝轨道连接，42px 圆形节点依次使用钴蓝、暖橙和沉静蓝；节点有 5px 白色套边及同色柔光。13px 路线正文固定使用 `#626a80`，标题、说明和行动保持单一路径的阅读顺序。

### Information Architecture

- **首页分级：** 首屏固定展示两步分级器。第一题询问用户真正完成过的最高行为，第二题询问最终目标；结果只给出一个推荐项目和一个主行动。
- **行为证据优先：** 普通对话、Coding 工具、可运行网页和真实 API 是四个分级证据。工具名称只是示例，不作为能力结论。
- **能力与目标分开：** 当前能力决定从哪个项目和哪一步开始，最终目标决定后续路线。结果需要同时解释“为什么从这里开始”和“怎样走到目标”。
- **无历史假设：** 首页不读取登录状态或本地进度来改变分级，每次进入都允许重新选择。
- **项目优先：** 主导航只保留分级、全部项目和成品 Demo。知识专题与学习路径降为项目过程中的辅助内容。

### Goal Lane

整行作为链接，桌面使用“图标 / 说明 / 行动”三列，移动端变为两列并让行动落到说明下方。珊瑚与沉静蓝只负责区分学习目标；悬停整体上移 3px 并出现柔和阴影，内部行动保持半透明白底。

## Do's and Don'ts

### Do:

- **Do** 在每个首屏只保留一个最醒目的主行动，并用路线蓝标识。
- **Do** 用白纸、浅蓝、珊瑚底和沉静蓝底建立大面积低对比分区。
- **Do** 把轻微旋转和柔和阴影留给品牌符号、路线图、提示符号和项目票据。
- **Do** 为链接、按钮、输入和菜单摘要保留 3px 可见键盘焦点。
- **Do** 在 760px 以下切换单栏并保持 20px 页面边距和全宽主按钮。
- **Do** 让内页标题直接开场，并将解释性引导放进清楚的白色说明块。

### Don't:

- **Don't** 把页面压成开发者控制台或密集仪表盘。
- **Don't** 同时使用多个路线蓝主按钮，或让珊瑚、沉静蓝成为竞争性的主行动色。
- **Don't** 引入代码中没有部署的字体、插画或图像资产。
- **Don't** 给每个容器都加阴影；静态层级先用背景色和留白表达。
- **Don't** 省略移动导航、键盘焦点或减少动态偏好支持。
- **Don't** 在内页标题上方恢复 eyebrow，或把项目路径编号改成等宽数字徽章。
