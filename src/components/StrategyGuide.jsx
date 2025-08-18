import React from 'react'
import { Lightbulb, Shield, Target, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'

function StrategyGuide() {
  const strategies = [
    {
      icon: Target,
      title: '保本策略',
      formula: 'x* = d/(r+d)',
      description: '想在"跌到 -d"时不亏，就在任一到达的止盈点，至少按此比例卖出。',
      tips: [
        '涨得越多，所需卖出比例越小',
        '容忍回撤越小，所需卖出比例越大',
        '这是最基础的风险控制线'
      ],
      color: 'green'
    },
    {
      icon: Shield,
      title: '防归零策略',
      formula: 'x ≥ 1/(1+r)',
      description: '铁壁"反诈"策略，后面哪怕清零也不亏。',
      tips: [
        '最保守的策略，适合极度风险厌恶者',
        '一旦执行，后续操作完全无风险',
        '牺牲部分收益换取绝对安全'
      ],
      color: 'red'
    },
    {
      icon: TrendingUp,
      title: '分批止盈策略',
      formula: 'Σxi(ri+d) ≥ d',
      description: '多次分批卖出，让加权强度覆盖回撤幅度。',
      tips: [
        '优先在更高价位卖出，效率更高',
        '可以根据市场情况灵活调整',
        '适合对市场有一定判断能力的投资者'
      ],
      color: 'blue'
    }
  ]

  const practicalTips = [
    {
      icon: CheckCircle,
      title: '制定计划',
      content: '在投资前就确定好止盈点和卖出比例，避免情绪化决策。'
    },
    {
      icon: AlertTriangle,
      title: '严格执行',
      content: '一旦触发止盈条件，必须严格按计划执行，不要贪心。'
    },
    {
      icon: Target,
      title: '资金管理',
      content: '只用闲钱投资，单笔投资不要超过总资产的一定比例。'
    },
    {
      icon: TrendingUp,
      title: '持续学习',
      content: '定期复盘投资结果，总结经验，不断优化策略。'
    }
  ]

  const scenarios = [
    {
      title: '牛市初期',
      description: '市场情绪乐观，可采用较为激进的策略',
      recommendation: '采用分批止盈，保本线+10-20%卖出',
      risk: '低'
    },
    {
      title: '牛市后期',
      description: '市场过热，波动加大',
      recommendation: '接近防归零线操作，优先保证本金安全',
      risk: '高'
    },
    {
      title: '震荡市场',
      description: '涨跌无明确方向，波动频繁',
      recommendation: '严格按保本线操作，快进快出',
      risk: '中'
    },
    {
      title: '熊市反弹',
      description: '短期反弹，但整体趋势向下',
      recommendation: '保守策略，接近防归零线卖出',
      risk: '高'
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: 'text-green-600',
        accent: 'text-green-600'
      },
      red: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        icon: 'text-red-600',
        accent: 'text-red-600'
      },
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'text-blue-600',
        accent: 'text-blue-600'
      }
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="space-y-6">
      {/* 核心策略 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Lightbulb className="h-6 w-6 text-yellow-600" />
          <h2 className="text-xl font-semibold text-gray-900">核心投资策略</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {strategies.map((strategy, index) => {
            const Icon = strategy.icon
            const colors = getColorClasses(strategy.color)
            
            return (
              <div key={index} className={`${colors.bg} ${colors.border} border-2 rounded-lg p-6`}>
                <div className="flex items-center space-x-2 mb-4">
                  <Icon className={`h-6 w-6 ${colors.icon}`} />
                  <h3 className="text-lg font-medium text-gray-900">{strategy.title}</h3>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-3 mb-4">
                  <div className="font-mono text-center text-lg">{strategy.formula}</div>
                </div>
                
                <p className="text-gray-700 mb-4">{strategy.description}</p>
                
                <div className="space-y-2">
                  {strategy.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="flex items-start space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${colors.accent.replace('text-', 'bg-')} mt-2 flex-shrink-0`}></div>
                      <p className="text-sm text-gray-600">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 实战要点 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">实战要点</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {practicalTips.map((tip, index) => {
            const Icon = tip.icon
            return (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <Icon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">{tip.title}</h4>
                  <p className="text-sm text-gray-600">{tip.content}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 市场环境应对 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">不同市场环境的应对策略</h3>
        <div className="space-y-4">
          {scenarios.map((scenario, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{scenario.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  scenario.risk === '低' ? 'bg-green-100 text-green-800' :
                  scenario.risk === '中' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  风险：{scenario.risk}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{scenario.description}</p>
              <div className="bg-blue-50 border border-blue-200 rounded p-3">
                <p className="text-sm font-medium text-blue-900">建议策略：{scenario.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 风险提示 */}
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="h-6 w-6 text-yellow-600" />
          <h3 className="text-lg font-medium text-gray-900">重要风险提示</h3>
        </div>
        <div className="space-y-3 text-sm text-gray-700">
          <p>• <strong>理论模型</strong>：本工具基于数学模型，实际市场存在更多不确定因素。</p>
          <p>• <strong>历史不代表未来</strong>：过往的涨跌规律不能保证未来会重现。</p>
          <p>• <strong>黑天鹅事件</strong>：极端市场事件可能使任何策略失效。</p>
          <p>• <strong>执行风险</strong>：实际交易中可能存在滑点、流动性问题等。</p>
          <p>• <strong>心理因素</strong>：情绪化决策是投资失败的主要原因之一。</p>
        </div>
        <div className="mt-4 p-3 bg-yellow-100 rounded">
          <p className="text-sm font-medium text-yellow-800">
            ⚠️ 投资有风险，入市需谨慎。本工具仅供学习参考，不构成投资建议。
          </p>
        </div>
      </div>

      {/* 快速查询卡片 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">快速查询卡片</h3>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-2">x* = d/(r+d)</div>
              <div className="text-sm text-gray-600">保本卖出线</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600 mb-2">x ≥ 1/(1+r)</div>
              <div className="text-sm text-gray-600">防归零线</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 mb-2">ROI = -d + x(r+d)</div>
              <div className="text-sm text-gray-600">直接算收益</div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">建议打印并贴在显示器旁，随时参考</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StrategyGuide
