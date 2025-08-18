import React, { useState } from 'react'
import { Calculator, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react'
import InvestmentCalculator from './components/InvestmentCalculator'
import FormulaDisplay from './components/FormulaDisplay'
import ExampleCases from './components/ExampleCases'
import StrategyGuide from './components/StrategyGuide'

function App() {
  const [activeTab, setActiveTab] = useState('calculator')

  const tabs = [
    { id: 'calculator', label: '计算器', icon: Calculator },
    { id: 'formula', label: '公式详解', icon: TrendingUp },
    { id: 'examples', label: '案例分析', icon: TrendingDown },
    { id: 'strategy', label: '策略指南', icon: AlertTriangle }
  ]

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
              先涨后跌模型 · 止盈策略分析
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'calculator' && <InvestmentCalculator />}
        {activeTab === 'formula' && <FormulaDisplay />}
        {activeTab === 'examples' && <ExampleCases />}
        {activeTab === 'strategy' && <StrategyGuide />}
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
