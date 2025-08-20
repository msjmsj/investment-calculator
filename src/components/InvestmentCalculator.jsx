import React, { useState, useEffect } from 'react'
import { Calculator, DollarSign, Percent, TrendingUp, TrendingDown } from 'lucide-react'
import KellyCalculator from './KellyCalculator'

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
          <Calculator className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">投资收益计算器</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 输入参数 */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">输入参数</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="inline h-4 w-4 mr-1" />
                初始本金 (P)
              </label>
              <input
                type="number"
                value={inputs.principal}
                onChange={(e) => handleInputChange('principal', e.target.value)}
                onFocus={(e) => e.target.select()}
                className="input-field"
                min="0"
                step="1000"
                placeholder="输入本金金额"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <TrendingUp className="inline h-4 w-4 mr-1 text-green-600" />
                先上涨 (r) %
              </label>
              <input
                type="number"
                value={inputs.risePercent}
                onChange={(e) => handleInputChange('risePercent', e.target.value)}
                onFocus={(e) => e.target.select()}
                className="input-field"
                min="0"
                step="1"
                placeholder="涨幅百分比"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Percent className="inline h-4 w-4 mr-1 text-blue-600" />
                卖出比例 (x) %
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
                placeholder="卖出百分比"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <TrendingDown className="inline h-4 w-4 mr-1 text-red-600" />
                后下跌 (d) %
              </label>
              <input
                type="number"
                value={inputs.fallPercent}
                onChange={(e) => handleInputChange('fallPercent', e.target.value)}
                onFocus={(e) => e.target.select()}
                className="input-field"
                min="0"
                step="1"
                placeholder="跌幅百分比"
              />
            </div>
          </div>

          {/* 计算结果 */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">计算结果</h3>
            
            {/* 最终资产 */}
            <div className={`p-4 rounded-lg border-2 ${results.isProfit ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="text-sm font-medium text-gray-700 mb-1">最终资产</div>
              <div className="text-2xl font-bold">
                {formatCurrency(results.finalAsset)}
              </div>
            </div>

            {/* 收益率 */}
            <div className={`p-4 rounded-lg border-2 ${results.isProfit ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="text-sm font-medium text-gray-700 mb-1">总收益率 (ROI)</div>
              <div className={`text-2xl font-bold ${results.isProfit ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercent(results.roi)}
              </div>
            </div>

            {/* 保本分析 */}
            <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-lg">
              <div className="text-sm font-medium text-gray-700 mb-2">保本分析</div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">保本所需卖出比例:</span>
                  <span className="font-semibold ml-2">{results.breakEvenSellPercent.toFixed(1)}%</span>
                </div>
                <div>
                  <span className="text-gray-600">防归零所需卖出比例:</span>
                  <span className="font-semibold ml-2">{results.antiZeroSellPercent.toFixed(1)}%</span>
                </div>
                <div className={`font-medium ${results.isProfitable ? 'text-green-600' : 'text-red-600'}`}>
                  {results.isProfitable ? '✅ 当前设置可保本' : '❌ 当前设置将亏损'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 公式展示 */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="text-md font-medium text-gray-900 mb-3">使用的公式</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="formula-box">
              <div className="text-xs text-gray-600 mb-1">最终资产</div>
              <div className="text-sm">A = P[(1-d) + x(r+d)]</div>
            </div>
            <div className="formula-box">
              <div className="text-xs text-gray-600 mb-1">收益率</div>
              <div className="text-sm">ROI = -d + x(r+d)</div>
            </div>
            <div className="formula-box">
              <div className="text-xs text-gray-600 mb-1">保本线</div>
              <div className="text-sm">x* = d/(r+d)</div>
            </div>
            <div className="formula-box">
              <div className="text-xs text-gray-600 mb-1">防归零线</div>
              <div className="text-sm">x ≥ 1/(1+r)</div>
            </div>
          </div>
        </div>
      </div>

      {/* 凯利公式仓位管理 */}
      <KellyCalculator />
    </div>
  )
}

export default InvestmentCalculator
