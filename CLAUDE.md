# 烧饼教 (shaobing-dao) - 项目指南

## 项目概述

**烧饼教** 是一个投资哲学工具，核心理念是"技以载道，试错为王"。帮助投资者通过数学模型制定科学的投资策略。

### 主题特色
- **投资哲学**: 投资如烤饼，火候定成败
- **核心心法**: 学(筑基) → 试(试错) → 择(筛选) → 守(坚持)
- **视觉风格**: 橙色/暖色调主题，与"烧饼"主题呼应

## 技术栈

| 类别 | 技术 |
|------|------|
| 前端框架 | React 18 |
| 构建工具 | Vite |
| 样式 | Tailwind CSS |
| 图标 | Lucide React |
| 语言 | JavaScript (JSX) |
| 部署 | GitHub Pages (GitHub Actions) |

## 项目结构

```
investment-calculator/
├── src/
│   ├── App.jsx                           # 主应用入口，标签页导航
│   ├── main.jsx                          # React 入口
│   ├── index.css                         # 全局样式
│   └── components/
│       ├── InvestmentCalculator.jsx      # 保本策略分析器
│       ├── KellyCalculator.jsx           # 最优仓位分析器(凯利公式)
│       └── FibonacciCalculator.jsx       # 斐波那契回撤计算器
├── index.html                            # HTML 入口
├── vite.config.js                        # Vite 配置
├── tailwind.config.js                    # Tailwind 配置
├── package.json                          # 依赖配置
└── .github/workflows/deploy.yml          # GitHub Pages 部署
```

## 核心功能模块

### 1. 保本策略分析器 (InvestmentCalculator)

基于"先涨后跌"数学模型，帮助投资者计算止盈策略。

**核心公式**:
- 最终资产: `A = P[(1-d) + x(r+d)]`
- 收益率: `ROI = -d + x(r+d)`
- 保本线: `x* = d/(r+d)`
- 防归零线: `x ≥ 1/(1+r)`

**参数说明**:
- P: 初始本金
- r: 上涨百分比
- x: 卖出比例
- d: 下跌百分比

### 2. 最优仓位分析器 (KellyCalculator)

基于凯利公式计算最优仓位比例。

**核心公式**:
- 凯利公式: `f* = (bp - q) / b`
- 其中: p=胜率, q=败率(1-p), b=盈亏比(平均盈利/平均亏损)

**安全机制**:
- 负期望收益时建议仓位为0
- 最大仓位限制25%
- 推荐使用1/2凯利降低风险

### 3. 斐波那契回撤计算器 (FibonacciCalculator)

基于斐波那契数列计算市值回撤的支撑位。

**核心公式**:
- 回撤值: `回撤值 = 市值 × (1 - 回撤比例)`

**主要回撤比例**:
- 23.6% - 浅回撤
- 38.2% - 中等回撤
- 50.0% - 半回撤
- 61.8% - 黄金分割（最重要）
- 78.6% - 深回撤

**应用场景**:
- 技术分析中的支撑/阻力位预测
- 入场时机判断
- 止损位设置参考

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器 (端口 3000)
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 部署配置

- **部署目标**: GitHub Pages
- **Base URL**: `/investment-calculator/`
- **构建输出**: `dist/` 目录
- **触发条件**: push 到 main 分支

## 代码规范

### 组件结构
- 使用函数式组件 + React Hooks
- useState 管理本地状态
- useEffect 处理计算逻辑

### 样式规范
- 使用 Tailwind CSS 工具类
- 橙色系为主色调 (`orange-*`)
- 支持响应式布局 (`sm:`, `md:`, `lg:`)

### 命名约定
- 组件: PascalCase (如 `InvestmentCalculator`)
- 函数: camelCase (如 `handleInputChange`)
- CSS 类: Tailwind 工具类

## 注意事项

1. **Logo 加载**: 使用 `import.meta.env.BASE_URL` 动态路径，带有备用方案(emoji)
2. **数值输入**: 支持空值处理，避免 NaN 问题
3. **负值处理**: 凯利公式已正确处理负期望收益情况
4. **页面代码限制**: 每个页面代码不超过500行
