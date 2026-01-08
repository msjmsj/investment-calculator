import React, { useState, useEffect } from 'react'
import { TrendingDown, Info } from 'lucide-react'

function FibonacciCalculator() {
  const [marketCap, setMarketCap] = useState(128)
  const [results, setResults] = useState([])

  const levels = [
    { id: 'level236', ratio: 0.236, label: '23.6% 回撤', color: 'bg-green-50 border-green-200' },
    { id: 'level382', ratio: 0.382, label: '38.2% 回撤', color: 'bg-blue-50 border-blue-200' },
    { id: 'level500', ratio: 0.500, label: '50.0% 回撤', color: 'bg-yellow-50 border-yellow-200' },
    { id: 'level618', ratio: 0.618, label: '61.8% 回撤 (黄金分割)', color: 'bg-orange-50 border-orange-200' },
    { id: 'level786', ratio: 0.786, label: '78.6% 回撤', color: 'bg-red-50 border-red-200' }
  ]

  useEffect(() => {
    const cap = parseFloat(marketCap) || 0
    if (cap > 0) {
      const calculated = levels.map(level => ({
        ...level,
        value: cap * (1 - level.ratio)
      }))
      setResults(calculated)
    } else {
      setResults([])
    }
  }, [marketCap])

  const handleInputChange = (value) => {
    if (value === '') {
      setMarketCap('')
      return
    }
    const numericValue = value.replace(/[^0-9.]/g, '')
    if (!isNaN(numericValue) && numericValue !== '') {
      setMarketCap(parseFloat(numericValue))
    } else if (numericValue === '') {
      setMarketCap('')
    }
  }

  const formatValue = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return Math.round(num).toString()
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingDown className="h-6 w-6 text-orange-600" />
        <h2 className="text-xl font-semibold text-gray-900">斐波那契回撤计算器</h2>
        <div className="ml-auto text-xs text-orange-600 font-medium">
          支撑位预测 · 黄金分割
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 输入参数 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">市值输入</h3>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-orange-700">
              <strong>烧饼教心法：</strong>斐波那契回撤如烤饼的火候把控，找准支撑位才能稳中求进。
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <TrendingDown className="inline h-4 w-4 mr-1 text-orange-600" />
              当前市值 (K)
            </label>
            <input
              type="number"
              value={marketCap}
              onChange={(e) => handleInputChange(e.target.value)}
              onClick={() => setMarketCap('')}
              className="input-field"
              min="0"
              step="1"
              placeholder="输入市值，例如: 128"
            />
            <p className="text-xs text-gray-500 mt-1">输入当前市值（单位：K），实时计算各回撤水平</p>
          </div>

          {/* 斐波那契说明 */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Info className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">斐波那契数列</span>
            </div>
            <p className="text-xs text-gray-600 mb-2">
              1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89...
            </p>
            <p className="text-xs text-gray-600">
              相邻两数之比趋近于 0.618（黄金分割比），广泛应用于技术分析。
            </p>
          </div>
        </div>

        {/* 计算结果 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">回撤水平</h3>

          {results.length > 0 ? (
            <div className="space-y-3">
              {results.map((level) => (
                <div
                  key={level.id}
                  className={`p-4 rounded-lg border-2 ${level.color} transition-transform hover:translate-x-1`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{level.label}</span>
                    <span className="text-lg font-bold text-gray-900">
                      {formatValue(level.value)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    回撤后剩余 {((1 - level.ratio) * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-gray-50 rounded-lg text-center text-gray-500">
              请输入有效市值以查看回撤水平
            </div>
          )}

          {/* 重点提示 */}
          {results.length > 0 && (
            <div className="mt-4 p-3 bg-orange-100 border border-orange-300 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>黄金分割 (61.8%)</strong> 是最重要的回撤水平，常作为强支撑/阻力位参考。
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 公式展示 */}
      <div className="mt-8 pt-6 border-t border-orange-200">
        <h4 className="text-md font-medium text-orange-800 mb-3">斐波那契回撤公式</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="formula-box bg-orange-50 border-orange-200">
            <div className="text-xs text-orange-600 mb-1">回撤价位</div>
            <div className="text-sm font-mono">回撤值 = 市值 × (1 - 回撤比例)</div>
          </div>
          <div className="formula-box bg-orange-50 border-orange-200">
            <div className="text-xs text-orange-600 mb-1">主要比例</div>
            <div className="text-sm font-mono">23.6%, 38.2%, 50%, 61.8%, 78.6%</div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg">
          <p className="text-sm text-orange-800">
            <strong>烧饼教心法：</strong>回撤有度，进退有方。61.8%黄金位，是烤饼翻面的最佳时机。
          </p>
        </div>
      </div>
    </div>
  )
}

export default FibonacciCalculator
