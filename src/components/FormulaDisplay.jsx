import React from 'react'
import { BookOpen, Target, Shield, Calculator } from 'lucide-react'

function FormulaDisplay() {
  return (
    <div className="space-y-6">
      {/* 核心模型 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">单次「先涨后跌」模型</h2>
        </div>

        <div className="space-y-6">
          {/* 设定参数 */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">设定参数</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <div>• 初始本金 <code className="bg-white px-2 py-1 rounded">P</code></div>
              <div>• 先上涨 <code className="bg-white px-2 py-1 rounded">r</code> (如 30% → r=0.3)，到价位 <code className="bg-white px-2 py-1 rounded">P(1+r)</code></div>
              <div>• 在该价位<strong>卖出比例</strong> <code className="bg-white px-2 py-1 rounded">x</code> (如 50% → x=0.5)</div>
              <div>• 之后价格回落到 <strong>开仓价的 -d</strong> (如 -30% → d=0.3)，即价位 <code className="bg-white px-2 py-1 rounded">P(1-d)</code></div>
              <div>• 剩余仓位 <code className="bg-white px-2 py-1 rounded">(1-x)</code> 在 <code className="bg-white px-2 py-1 rounded">P(1-d)</code> 平掉/止损</div>
            </div>
          </div>

          {/* 核心公式 */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">核心公式</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="formula-box">
                <h4 className="font-medium text-gray-900 mb-2">最终资产</h4>
                <div className="text-lg font-mono">A = P[(1-d) + x(r+d)]</div>
              </div>
              <div className="formula-box">
                <h4 className="font-medium text-gray-900 mb-2">最终收益率</h4>
                <div className="text-lg font-mono">ROI = -d + x(r+d)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 三大心法 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Target className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900">三个「随手算」心法</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 保本卖出线 */}
          <div className="border-2 border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">1</div>
              <h3 className="font-medium text-gray-900">保本卖出线</h3>
            </div>
            <div className="formula-box mb-3">
              <div className="text-lg font-mono text-center">x* = d/(r+d)</div>
            </div>
            <p className="text-sm text-gray-600">
              先涨到 r 再跌到 -d，只要 x ≥ x*，即使后面跌到 -d 也不亏。
            </p>
          </div>

          {/* 极端防归零线 */}
          <div className="border-2 border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold">2</div>
              <h3 className="font-medium text-gray-900">极端防「归零」线</h3>
            </div>
            <div className="formula-box mb-3">
              <div className="text-lg font-mono text-center">x ≥ 1/(1+r)</div>
            </div>
            <p className="text-sm text-gray-600">
              确保后面即使归零也不亏。因为先套现 P(1+r)x ≥ P，后面就算清零也保本。
            </p>
          </div>

          {/* 直接算收益 */}
          <div className="border-2 border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">3</div>
              <h3 className="font-medium text-gray-900">直接算收益</h3>
            </div>
            <div className="formula-box mb-3">
              <div className="text-lg font-mono text-center">ROI = -d + x(r+d)</div>
            </div>
            <p className="text-sm text-gray-600">
              看到 r, d, x 就能一眼算出最终盈亏百分比，不用回代。
            </p>
          </div>
        </div>
      </div>

      {/* 多次分批推广 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Calculator className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">多次分批止盈的推广</h2>
        </div>

        <div className="space-y-4">
          <p className="text-gray-700">
            若分多次在不同涨幅 r<sub>i</sub> 卖出比例 x<sub>i</sub>（总卖出 Σx<sub>i</sub> ≤ 1），之后回落到 -d：
          </p>

          <div className="formula-box">
            <h4 className="font-medium text-gray-900 mb-2">多批次最终资产比</h4>
            <div className="text-lg font-mono">A/P = (1-d) + Σx<sub>i</sub>(r<sub>i</sub> + d)</div>
          </div>

          <div className="warning-box">
            <h4 className="font-medium text-gray-900 mb-2">
              <Shield className="inline h-4 w-4 mr-1" />
              保本条件
            </h4>
            <div className="formula-box mb-2">
              <div className="text-lg font-mono text-center">Σx<sub>i</sub>(r<sub>i</sub> + d) ≥ d</div>
            </div>
            <p className="text-sm text-gray-600">
              白话解释：你在较高位置卖出的"加权强度"要覆盖后续的回撤幅度 d。
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">优化策略</h4>
            <p className="text-sm text-gray-600">
              优先把卖出额度放在<strong>更高的 r<sub>i</sub></strong> 上，效率更高。因为每单位卖出在更高价位的贡献更大。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormulaDisplay
