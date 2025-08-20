import React, { useState, useEffect } from 'react'
import { Calculator, DollarSign, Percent, TrendingUp, TrendingDown } from 'lucide-react'

function InvestmentCalculator() {
  const [inputs, setInputs] = useState({
    principal: 10000, // 初始本金
    risePercent: 30,  // 上涨百分比
    sellPercent: 50,  // 卖出百分比
    fallPercent: 30   // 下跌百分比
  })

  const [results, setResults] = useState({
    finalAsset: 0,
    roi: 0,
    breakEvenSellPercent: 0,
    antiZeroSellPercent: 0,
    isProfit: false,
    isProfitable: false
  })

  // 计算结果
  useEffect(() => {
    const { principal, risePercent, sellPercent, fallPercent } = inputs
    // 使用默认值处理空输入
    const P = principal || 0
    const r = (risePercent || 0) / 100
    const x = (sellPercent || 0) / 100
    const d = (fallPercent || 0) / 100

    // 最终资产: A = P[(1-d) + x(r+d)]
    const finalAsset = P * ((1 - d) + x * (r + d))
    
    // 收益率: ROI = -d + x(r+d)
    const roi = -d + x * (r + d)
    
    // 保本所需卖出比例: x* = d/(r+d)
    const breakEvenSellPercent = (d / (r + d)) * 100
    
    // 防归零所需卖出比例: x >= 1/(1+r)
    const antiZeroSellPercent = (1 / (1 + r)) * 100

    setResults({
      finalAsset: finalAsset,
      roi: roi * 100,
      breakEvenSellPercent: breakEvenSellPercent,
      antiZeroSellPercent: antiZeroSellPercent,
      isProfit: roi > 0,
      isProfitable: sellPercent >= breakEvenSellPercent
    })
  }, [inputs])

  const handleInputChange = (field, value) => {
    // 如果输入为空字符串，保持为空，不转换为0
    if (value === '') {
      setInputs(prev => ({
        ...prev,
        [field]: ''
      }))
      return
    }
    
    // 只允许数字和小数点
    const numericValue = value.replace(/[^0-9.]/g, '')
    
    // 如果是有效数字，更新状态
    if (!isNaN(numericValue) && numericValue !== '') {
      setInputs(prev => ({
        ...prev,
        [field]: parseFloat(numericValue)
      }))
    } else if (numericValue === '') {
      // 如果清空了，设为空字符串
      setInputs(prev => ({
        ...prev,
        [field]: ''
      }))
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

  const formatPercent = (percent) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Calculator className="h-6 w-6 text-orange-600" />
          <h2 className="text-xl font-semibold text-gray-900">烤饼收益计算器</h2>
          <div className="ml-auto text-xs text-orange-600 font-medium">
            🔥 先涨后跌模型 · 火候掌控术
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 输入参数 */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">烤饼参数 🥞</h3>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-orange-700">
                <strong>烧饼哲学：</strong>投资如烤饼，火候定成败。先热后冷，恰到好处方能香飘四溢。
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="inline h-4 w-4 mr-1" />
                面粉本金 💰
              </label>
              <input
                type="number"
                value={inputs.principal}
                onChange={(e) => handleInputChange('principal', e.target.value)}
                onFocus={(e) => e.target.select()}
                className="input-field"
                min="0"
                step="1000"
                placeholder="投入的面粉资金"
              />
              <p className="text-xs text-gray-500 mt-1">做饼的本钱，多少面粉做多少饼</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <TrendingUp className="inline h-4 w-4 mr-1 text-green-600" />
                升温阶段 🔥 %
              </label>
              <input
                type="number"
                value={inputs.risePercent}
                onChange={(e) => handleInputChange('risePercent', e.target.value)}
                onFocus={(e) => e.target.select()}
                className="input-field"
                min="0"
                step="1"
                placeholder="火力上升幅度"
              />
              <p className="text-xs text-gray-500 mt-1">烤饼前期升温，香味渐起</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Percent className="inline h-4 w-4 mr-1 text-orange-600" />
                出饼比例 📤 %
              </label>
              <input
                type="number"
                value={inputs.sellPercent}
                onChange={(e) => handleInputChange('sellPercent', e.target.value)}
                onFocus={(e) => e.target.select()}
                className="input-field"
                min="0"
                max="100"
                step="1"
                placeholder="香饼出炉比例"
              />
              <p className="text-xs text-gray-500 mt-1">趁热出炉多少比例的香饼</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <TrendingDown className="inline h-4 w-4 mr-1 text-red-600" />
                降温阶段 ❄️ %
              </label>
              <input
                type="number"
                value={inputs.fallPercent}
                onChange={(e) => handleInputChange('fallPercent', e.target.value)}
                onFocus={(e) => e.target.select()}
                className="input-field"
                min="0"
                step="1"
                placeholder="火力下降幅度"
              />
              <p className="text-xs text-gray-500 mt-1">烤饼后期降温，考验火候掌控</p>
            </div>
          </div>

          {/* 计算结果 */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">烤饼成果 🍯</h3>
            
            {/* 最终资产 */}
            <div className={`p-4 rounded-lg border-2 ${results.isProfit ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="text-sm font-medium text-gray-700 mb-1">最终收获 🏆</div>
              <div className="text-2xl font-bold">
                {formatCurrency(results.finalAsset)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {results.isProfit ? '香飘四溢，收获满满' : '火候不够，继续磨练'}
              </div>
            </div>

            {/* 收益率 */}
            <div className={`p-4 rounded-lg border-2 ${results.isProfit ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="text-sm font-medium text-gray-700 mb-1">烤饼成效 📈</div>
              <div className={`text-2xl font-bold ${results.isProfit ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercent(results.roi)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {results.isProfit ? '火候恰当，技艺精进' : '需再练习，掌握火候'}
              </div>
            </div>

            {/* 保本分析 */}
            <div className="bg-orange-50 border-2 border-orange-200 p-4 rounded-lg">
              <div className="text-sm font-medium text-orange-800 mb-2">🔥 火候掌控心法</div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">保本出饼比例:</span>
                  <span className="font-semibold ml-2 text-orange-600">{results.breakEvenSellPercent.toFixed(1)}%</span>
                </div>
                <div>
                  <span className="text-gray-600">防烧焦出饼比例:</span>
                  <span className="font-semibold ml-2 text-orange-600">{results.antiZeroSellPercent.toFixed(1)}%</span>
                </div>
                <div className={`font-medium ${results.isProfitable ? 'text-green-600' : 'text-red-600'}`}>
                  {results.isProfitable ? '✅ 火候恰当，不亏本钱' : '❌ 火候不当，恐有损失'}
                </div>
              </div>
              <div className="mt-3 p-2 bg-orange-100 rounded text-xs text-orange-700">
                💡 <strong>烧饼心得：</strong>火候过头必烧焦，适时出炉保收成
              </div>
            </div>
          </div>
        </div>

        {/* 公式展示 */}
        <div className="mt-8 pt-6 border-t border-orange-200">
          <h4 className="text-md font-medium text-orange-800 mb-3">🧮 烧饼数学心法</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="formula-box bg-orange-50 border-orange-200">
              <div className="text-xs text-orange-600 mb-1">最终收获</div>
              <div className="text-sm font-mono">A = P[(1-d) + x(r+d)]</div>
            </div>
            <div className="formula-box bg-orange-50 border-orange-200">
              <div className="text-xs text-orange-600 mb-1">烤饼成效</div>
              <div className="text-sm font-mono">ROI = -d + x(r+d)</div>
            </div>
            <div className="formula-box bg-orange-50 border-orange-200">
              <div className="text-xs text-orange-600 mb-1">保本出饼线</div>
              <div className="text-sm font-mono">x* = d/(r+d)</div>
            </div>
            <div className="formula-box bg-orange-50 border-orange-200">
              <div className="text-xs text-orange-600 mb-1">防烧焦线</div>
              <div className="text-sm font-mono">x ≥ 1/(1+r)</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg">
            <p className="text-sm text-orange-800">
              <strong>🥞 烧饼教心法：</strong>技以载道，无技不成饼。掌握数学，方能掌控火候。
              先涨后跌如烤饼过程，适时出炉是关键所在。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvestmentCalculator
