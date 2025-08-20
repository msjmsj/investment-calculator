import React from 'react'
import { TrendingUp } from 'lucide-react'
import InvestmentCalculator from './components/InvestmentCalculator'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">投资收益计算器</h1>
            </div>
            <div className="text-sm text-gray-500">
              先涨后跌模型 · 凯利公式仓位管理
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <InvestmentCalculator />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>基于「先涨后跌」数学模型的投资收益分析工具</p>
            <p className="mt-1">⚠️ 仅供参考，投资有风险，决策需谨慎</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App