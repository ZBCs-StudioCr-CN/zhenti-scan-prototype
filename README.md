
# 🎯 真题漏洞扫描 · 高考数学 AI 个性化提分系统

> 上传一张高考数学真题试卷，3 分钟生成你的**考点漏洞分析报告**，并自动生成**专属漏洞修复套卷**，先学后练，精准提分。

![version](https://img.shields.io/badge/version-v1.0.0-blue?style=flat-square)
![license](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![html5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![css3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![ocr](https://img.shields.io/badge/OCR-Tesseract.js-ff6f00?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)

🌐 **[在线预览 Live Demo](https://zbcs-studiocr-cn.github.io/zhenti-scan-prototype/)** — 点击立即体验

---

## ✨ 核心亮点

- **🔍 拍照即扫**：上传试卷照片/截图，Tesseract.js 浏览器端 OCR 自动识别，零后端、零费用
- **🎯 78 精标考点**：基于 2020–2025 新高考全国卷 I/II 卷真题统计，3 大主题 × 16 模块 × 78 二级考点精标体系
- **📊 漏洞雷达图**：5 大维度（掌握率 / 难度敏感度 / 高频丢分 / 模块均衡度 / 压轴突破力）可视化诊断
- **📝 智能组卷**：一键基于 TOP 漏洞生成专属修复套卷，每题前附 3 分钟知识速学卡
- **📚 知识速学卡**：78 考点全覆盖，公式 + 标准解题套路 + 高频陷阱 + 最近考法，3 分钟看完就能做对 70%
- **💾 本地持久化**：所有数据存 localStorage，隐私完全本地，无需登录注册

---

## 🖼️ 产品截图

| 首页 | 真题扫描 |
|:---:|:---:|
| ![首页](docs/screenshots/home.png) | ![真题扫描](docs/screenshots/scan.png) |
| 漏洞报告 | 知识速学卡 |
| ![漏洞报告](docs/screenshots/report.png) | ![知识速学卡](docs/screenshots/learn.png) |
| 考点套题 | 答题练习 |
| ![考点套题](docs/screenshots/practice.png) | ![答题练习](docs/screenshots/quiz.png) |

---

## 🚀 快速开始

### 方式一：直接打开（最简单）

```bash
# 克隆项目
git clone https://github.com/ZBCs-StudioCr-CN/zhenti-scan-prototype.git

# 直接用浏览器打开
cd zhenti-scan-prototype
start index.html    # Windows
open index.html     # macOS
```

### 方式二：本地服务器（推荐，OCR 功能更稳定）

```bash
# 使用 Python 启动
cd zhenti-scan-prototype
python -m http.server 8765
# 浏览器访问 http://localhost:8765
```

```bash
# 或使用 Node.js 的 http-server
npx http-server -p 8765
# 浏览器访问 http://localhost:8765
```

---

## 🧭 完整使用流程

```
上传试卷照片
    ↓
OCR 文字识别 + 分题切割
    ↓
考点匹配 + 精标（主考点 + 关联考点）
    ↓
生成考点漏洞分析报告（雷达图 + TOP 漏洞列表）
    ↓
┌─────────────┬─────────────┐
│ 路径 A 推荐  │ 路径 B       │
│ 先学后练     │ 直接刷题     │
└─────────────┴─────────────┘
    ↓
完成练习 → 查看漏洞修复率 → 继续下一轮
```

---

## 📁 项目结构

```
zhenti-scan-prototype/
├── index.html                  # 主页面（单页应用，所有视图）
├── assets/
│   ├── styles.css              # 全部样式
│   ├── app.js                  # 应用逻辑：路由、渲染、交互
│   ├── data.js                 # 核心数据：78考点字典 + 3套真题 + 312道练习题 + 知识卡
│   └── storage.js              # 本地存储管理
├── images/
│   └── samples/                # 3 张样例试卷 SVG 图（用于演示 OCR 流程）
├── docs/
│   └── screenshots/            # 产品截图
├── README.md
├── CHANGELOG.md
├── LICENSE
└── .gitignore
```

---

## 🧠 考点体系

基于新高考全国卷命题规律，将高中数学划分为 **3 大主题、16 模块、78 个二级精标考点**：

| 主题 | 模块数 | 考点数 | 高考分值 |
|:---|:---:|:---:|:---:|
| 📐 函数与导数 | 5 | 27 | ~60 分 |
| 📏 几何与代数 | 7 | 33 | ~57 分 |
| 📊 概率与统计 | 4 | 18 | ~33 分 |

每个考点包含：
- **核心公式**：本考点关键公式与定义
- **标准解题套路**：①②③ 步标准化解题步骤
- **高频易错陷阱**：学生最常丢分的 3 个坑
- **最近考法**：最近 2 年全国卷哪一卷哪一题考过

---

## 🛠️ 技术栈

| 技术 | 用途 |
|:---|:---|
| 原生 HTML5 / CSS3 / JavaScript | 前端框架（零依赖） |
| [Tesseract.js v5](https://github.com/naptha/tesseract.js) | 浏览器端 OCR 文字识别 |
| Canvas API | 雷达图 / 热力图可视化 |
| LocalStorage | 本地数据持久化 |
| SVG | 样例试卷图矢量渲染 |

---

## 🤝 贡献指南

欢迎贡献代码、报告 Bug、提出新功能建议！

### 开发环境

```bash
# Fork 本仓库后克隆
git clone https://github.com/你的用户名/zhenti-scan-prototype.git
cd zhenti-scan-prototype

# 启动本地开发服务器
python -m http.server 8765
```

### 提交规范

- 使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范
- 例如：`feat: 新增物理学科考点`、`fix: 修复 OCR 识别率低的问题`、`docs: 更新 README`

---

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。

---

## 🙏 致谢

- 考点体系参考新高考全国卷 2020–2025 真题统计
- OCR 引擎基于 [Tesseract.js](https://github.com/naptha/tesseract.js)
- 徽章由 [Shields.io](https://shields.io) 生成

---

<div align="center">

**如果这个项目对你有帮助，欢迎点个 ⭐ Star 支持一下！**

Made with ❤️ by [ZBCs-StudioCr-CN](https://github.com/ZBCs-StudioCr-CN)

</div>
