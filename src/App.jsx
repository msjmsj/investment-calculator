import React, { useState } from 'react'
import { Calculator, Target, Flame } from 'lucide-react'
import InvestmentCalculator from './components/InvestmentCalculator'
import KellyCalculator from './components/KellyCalculator'

function App() {
  const [activeTab, setActiveTab] = useState('calculator')

  const tabs = [
    { id: 'calculator', label: '烤饼计算器', icon: Calculator, desc: '先涨后跌模型 · 火候掌控' },
    { id: 'kelly', label: '仓位烤炉', icon: Target, desc: '凯利公式 · 火力分配' }
  ]
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="烧饼教" className="h-10 w-10 rounded-lg" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">烧饼教</h1>
                <p className="text-xs text-orange-600 font-medium">技以载道 · 试错为王</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-700">火不灭，饼常香</div>
              <div className="text-xs text-gray-500">投资如烤饼，火候定成败</div>
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
                  className={`flex flex-col items-center space-y-1 py-3 px-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600 bg-orange-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </div>
                  <span className="text-xs text-gray-400">{tab.desc}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'calculator' && <InvestmentCalculator />}
        {activeTab === 'kelly' && <KellyCalculator />}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-orange-50 to-yellow-50 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Flame className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-bold text-gray-800">烧饼教四大心法</h3>
              <Flame className="h-5 w-5 text-orange-500" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="font-medium text-orange-600">【学】筑基</div>
                <div className="text-xs text-gray-600">技以载道，无技不成饼</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="font-medium text-orange-600">【试】试错</div>
                <div className="text-xs text-gray-600">多去尝试，试错为王</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="font-medium text-orange-600">【择】筛选</div>
                <div className="text-xs text-gray-600">需求导向，找到最好味道</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="font-medium text-orange-600">【守】坚持</div>
                <div className="text-xs text-gray-600">长期主义，日复一日坚持烤</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-medium text-orange-700">"这个地方刚好缺一个烧饼摊，而你恰好会做烧饼"</p>
              <p className="mt-2 text-xs">⚠️ 投资有风险，烤饼需谨慎 · 火候自把握，盈亏自负责</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App