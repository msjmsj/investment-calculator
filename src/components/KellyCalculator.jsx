import React, { useState, useEffect } from 'react'
import { Target, TrendingUp, TrendingDown, AlertTriangle, Info } from 'lucide-react'

function KellyCalculator() {
  const [inputs, setInputs] = useState({
    winRate: 60,      // 胜率 (%)
    avgWin: 15,       // 平均盈利 (%)
    avgLoss: 10,      // 平均亏损 (%)
    totalCapital: 100000  // 总资金
  })

  const [results, setResults] = useState({
    kellyPercentage: 0,
    recommendedPosition: 0,
    expectedReturn: 0,
    riskLevel: 'low'
  })

  // 计算凯利公式
  useEffect(() => {
    const { winRate, avgWin, avgLoss } = inputs
    const p = winRate / 100  // 胜率
    const q = 1 - p          // 败率
    const b = avgWin / avgLoss  // 赔率 (盈利/亏损比)

    // 凯利公式: f* = (bp - q) / b = p - q/b
    const kellyPercentage = (b * p - q) / b * 100

    // 限制最大仓位不超过25%（风险控制）
    const safeKellyPercentage = Math.max(0, Math.min(kellyPercentage, 25))
    
    // 建议仓位（通常使用1/4凯利或1/2凯利以降低风险）
    const recommendedPosition = safeKellyPercentage * 0.5

    // 期望收益率
    const expectedReturn = p * avgWin - q * avgLoss

    // 风险评级
    let riskLevel = 'low'
    if (kellyPercentage > 15) riskLevel = 'high'
    else if (kellyPercentage > 8) riskLevel = 'medium'

    setResults({
      kellyPercentage: kellyPercentage,
      recommendedPosition: recommendedPosition,
      expectedReturn: expectedReturn,
      riskLevel: riskLevel
    })
  }, [inputs])

  const handleInputChange = (field, value) => {
    if (value === '') {
      setInputs(prev => ({
        ...prev,
        [field]: ''
      }))
      return
    }
    
    const numericValue = parseFloat(value)
    if (!isNaN(numericValue)) {
      setInputs(prev => ({
        ...prev,
        [field]: numericValue
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

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      default: return 'text-green-600 bg-green-50 border-green-200'
    }
  }

  const getRiskText = (risk) => {
    switch(risk) {
      case 'high': return '高风险'
      case 'medium': return '中等风险'
      default: return '低风险'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Target className="h-6 w-6 text-orange-600" />
        <h2 className="text-xl font-semibold text-gray-900">仓位烤炉管理</h2>
        <div className="ml-auto text-xs text-orange-600 font-medium">
          🔥 凯利公式 · 火力分配术
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 输入参数 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">烤饼历史数据 📊</h3>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-orange-700">
              <strong>烧饼心法：</strong>试错为王，多去尝试。从历史烤饼数据中找到最佳火力分配。
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <TrendingUp className="inline h-4 w-4 mr-1 text-green-600" />
              成功烤饼率 🏆 (%)
            </label>
            <input
              type="number"
              value={inputs.winRate}
              onChange={(e) => handleInputChange('winRate', e.target.value)}
              onFocus={(e) => e.target.select()}
              className="input-field"
              min="0"
              max="100"
              step="1"
              placeholder="香饼出炉成功率"
            />
            <p className="text-xs text-gray-500 mt-1">历史烤饼中成功出炉香饼的比例</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <TrendingUp className="inline h-4 w-4 mr-1 text-green-600" />
              香饼平均利润 💰 (%)
            </label>
            <input
              type="number"
              value={inputs.avgWin}
              onChange={(e) => handleInputChange('avgWin', e.target.value)}
              onFocus={(e) => e.target.select()}
              className="input-field"
              min="0"
              step="0.1"
              placeholder="成功烤饼平均收益"
            />
            <p className="text-xs text-gray-500 mt-1">成功出炉香饼的平均利润率</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <TrendingDown className="inline h-4 w-4 mr-1 text-red-600" />
              烧焦平均损失 💸 (%)
            </label>
            <input
              type="number"
              value={inputs.avgLoss}
              onChange={(e) => handleInputChange('avgLoss', e.target.value)}
              onFocus={(e) => e.target.select()}
              className="input-field"
              min="0"
              step="0.1"
              placeholder="烤焦饼的平均损失"
            />
            <p className="text-xs text-gray-500 mt-1">火候不当烤焦饼的平均损失率（输入正数）</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Target className="inline h-4 w-4 mr-1 text-blue-600" />
              总面粉资金 🏦
            </label>
            <input
              type="number"
              value={inputs.totalCapital}
              onChange={(e) => handleInputChange('totalCapital', e.target.value)}
              onFocus={(e) => e.target.select()}
              className="input-field"
              min="0"
              step="10000"
              placeholder="烤炉总投资资金"
            />
            <p className="text-xs text-gray-500 mt-1">用于分配火力的总资金量</p>
          </div>
        </div>

        {/* 计算结果 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">凯利公式计算结果</h3>
          
          {/* 凯利百分比 */}
          <div className="p-4 rounded-lg border-2 border-blue-200 bg-blue-50">
            <div className="text-sm font-medium text-blue-800 mb-1">理论最优仓位 (凯利%)</div>
            <div className="text-2xl font-bold text-blue-900">
              {results.kellyPercentage.toFixed(2)}%
            </div>
            <p className="text-xs text-blue-700 mt-1">
              理论上能最大化长期收益的仓位比例
            </p>
          </div>

          {/* 推荐仓位 */}
          <div className={`p-4 rounded-lg border-2 ${getRiskColor(results.riskLevel)}`}>
            <div className="text-sm font-medium mb-1">实际建议仓位 (1/2凯利)</div>
            <div className="text-2xl font-bold">
              {results.recommendedPosition.toFixed(2)}%
            </div>
            <div className="text-sm mt-1">
              建议资金: {formatCurrency((inputs.totalCapital || 0) * results.recommendedPosition / 100)}
            </div>
          </div>

          {/* 期望收益 */}
          <div className={`p-4 rounded-lg border-2 ${
            results.expectedReturn > 0 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="text-sm font-medium text-gray-700 mb-1">期望收益率</div>
            <div className={`text-2xl font-bold ${
              results.expectedReturn > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {results.expectedReturn > 0 ? '+' : ''}{results.expectedReturn.toFixed(2)}%
            </div>
          </div>

          {/* 风险评级 */}
          <div className={`p-4 rounded-lg border-2 ${getRiskColor(results.riskLevel)}`}>
            <div className="flex items-center space-x-2 mb-1">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">风险评级</span>
            </div>
            <div className="text-lg font-bold">
              {getRiskText(results.riskLevel)}
            </div>
          </div>
        </div>
      </div>

      {/* 凯利公式说明 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-2 mb-3">
          <Info className="h-5 w-5 text-blue-600" />
          <h4 className="text-md font-medium text-gray-900">凯利公式说明</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="formula-box">
              <div className="text-xs text-gray-600 mb-1">凯利公式</div>
              <div className="text-sm font-mono">f* = (bp - q) / b</div>
              <div className="text-xs text-gray-600 mt-1">
                其中: p=胜率, q=败率, b=盈亏比
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 space-y-2">
            <h5 className="font-medium text-gray-900">使用建议:</h5>
            <ul className="space-y-1">
              <li>• <strong>保守策略</strong>：使用1/4凯利或1/2凯利</li>
              <li>• <strong>最大仓位</strong>：建议不超过25%</li>
              <li>• <strong>数据要求</strong>：至少100次交易的历史数据</li>
              <li>• <strong>动态调整</strong>：定期根据新数据重新计算</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>重要提醒：</strong>
            凯利公式基于历史数据，实际市场情况可能发生变化。建议结合其他风险管理工具使用，
            并根据个人风险承受能力调整仓位。
          </p>
        </div>
      </div>
    </div>
  )
}

export default KellyCalculator
