import React, { useState } from 'react'
import { BarChart, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'

function ExampleCases() {
  const [selectedCase, setSelectedCase] = useState(0)

  const cases = [
    {
      id: 1,
      title: '经典案例：涨30%跌30%',
      scenario: {
        rise: 30,
        fall: 30,
        principal: 10000
      },
      strategies: [
        { sellPercent: 30, roi: -12, description: '卖出不足，最终亏损' },
        { sellPercent: 50, roi: 0, description: '刚好保本' },
        { sellPercent: 70, roi: 12, description: '卖出充分，获得收益' }
      ],
      analysis: '在涨跌幅度相等的情况下，保本线为50%。这是一个对称情况，卖出比例直接决定最终收益。'
    },
    {
      id: 2,
      title: '高收益案例：涨50%跌30%',
      scenario: {
        rise: 50,
        fall: 30,
        principal: 10000
      },
      strategies: [
        { sellPercent: 37.5, roi: 0, description: '保本线' },
        { sellPercent: 40, roi: 2, description: '轻微盈利' },
        { sellPercent: 60, roi: 18, description: '丰厚收益' }
      ],
      analysis: '涨幅大于跌幅时，保本要求较低，只需卖出37.5%即可保本，为追求更高收益留出空间。'
    },
    {
      id: 3,
      title: '极端案例：涨60%跌60%',
      scenario: {
        rise: 60,
        fall: 60,
        principal: 10000
      },
      strategies: [
        { sellPercent: 50, roi: 0, description: '保本线' },
        { sellPercent: 62, roi: 14.4, description: '优秀收益' },
        { sellPercent: 62.5, roi: 15, description: '接近防归零线(62.5%)' }
      ],
      analysis: '大幅波动情况下，虽然保本线仍为50%，但建议接近防归零线操作，确保极端情况下的安全。'
    }
  ]

  const calculateResults = (rise, fall, sellPercent, principal = 10000) => {
    const r = rise / 100
    const d = fall / 100
    const x = sellPercent / 100
    
    const finalAsset = principal * ((1 - d) + x * (r + d))
    const roi = (-d + x * (r + d)) * 100
    const breakEvenLine = (d / (r + d)) * 100
    const antiZeroLine = (1 / (1 + r)) * 100
    
    return {
      finalAsset,
      roi,
      breakEvenLine,
      antiZeroLine
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const currentCase = cases[selectedCase]

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          <BarChart className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">经典案例分析</h2>
        </div>

        {/* 案例选择器 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {cases.map((caseItem, index) => (
            <button
              key={caseItem.id}
              onClick={() => setSelectedCase(index)}
              className={`p-4 rounded-lg border-2 text-left transition-colors ${
                selectedCase === index
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h3 className="font-medium text-gray-900 mb-2">{caseItem.title}</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span>+{caseItem.scenario.rise}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingDown className="h-3 w-3 text-red-600" />
                  <span>-{caseItem.scenario.fall}%</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* 选中案例详情 */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">{currentCase.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <span>初始本金: {formatCurrency(currentCase.scenario.principal)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span>先上涨: +{currentCase.scenario.rise}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingDown className="h-4 w-4 text-red-600" />
                <span>后下跌: -{currentCase.scenario.fall}%</span>
              </div>
            </div>
          </div>

          {/* 策略对比 */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">不同卖出策略对比</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      卖出比例
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      最终资产
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      收益率
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      策略评价
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentCase.strategies.map((strategy, index) => {
                    const results = calculateResults(
                      currentCase.scenario.rise,
                      currentCase.scenario.fall,
                      strategy.sellPercent,
                      currentCase.scenario.principal
                    )
                    const isBreakEven = Math.abs(results.roi) < 0.1
                    const isProfit = results.roi > 0.1
                    
                    return (
                      <tr key={index} className={isBreakEven ? 'bg-yellow-50' : isProfit ? 'bg-green-50' : 'bg-red-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {strategy.sellPercent}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(results.finalAsset)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`font-medium ${
                            isBreakEven ? 'text-yellow-600' : isProfit ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {results.roi >= 0 ? '+' : ''}{results.roi.toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {strategy.description}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* 关键数据 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">保本分析</h5>
              <div className="text-sm space-y-1">
                <div>
                  保本线: {calculateResults(currentCase.scenario.rise, currentCase.scenario.fall, 50).breakEvenLine.toFixed(1)}%
                </div>
                <div>
                  防归零线: {calculateResults(currentCase.scenario.rise, currentCase.scenario.fall, 50).antiZeroLine.toFixed(1)}%
                </div>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">案例启示</h5>
              <p className="text-sm text-gray-600">{currentCase.analysis}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 快速对照表 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">常见组合快速对照表</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">涨幅(r)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">跌幅(d)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">保本线</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">防归零线</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">建议策略</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              <tr>
                <td className="px-4 py-3 text-green-600 font-medium">+30%</td>
                <td className="px-4 py-3 text-red-600 font-medium">-30%</td>
                <td className="px-4 py-3">50.0%</td>
                <td className="px-4 py-3">76.9%</td>
                <td className="px-4 py-3 text-gray-600">平衡型，卖出50-60%</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-green-600 font-medium">+50%</td>
                <td className="px-4 py-3 text-red-600 font-medium">-30%</td>
                <td className="px-4 py-3">37.5%</td>
                <td className="px-4 py-3">66.7%</td>
                <td className="px-4 py-3 text-gray-600">进攻型，卖出40-50%</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-green-600 font-medium">+60%</td>
                <td className="px-4 py-3 text-red-600 font-medium">-60%</td>
                <td className="px-4 py-3">50.0%</td>
                <td className="px-4 py-3">62.5%</td>
                <td className="px-4 py-3 text-gray-600">保守型，卖出60-65%</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-green-600 font-medium">+100%</td>
                <td className="px-4 py-3 text-red-600 font-medium">-50%</td>
                <td className="px-4 py-3">33.3%</td>
                <td className="px-4 py-3">50.0%</td>
                <td className="px-4 py-3 text-gray-600">激进型，卖出35-45%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ExampleCases
