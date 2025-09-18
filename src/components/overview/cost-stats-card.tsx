import React from 'react'
import { FaMoneyBillWave } from 'react-icons/fa'

export const CostStatsCard = () => {
  return (
    <div className="lg:col-span-3 bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h3 className="text-sm font-normal text-gray-700 mb-2 leading-relaxed">Cost of Battery Swap</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="text-lg lg:text-2xl font-semibold text-gray-900">₭1,176,000</div>
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-2xl">+15%</span>
                <span className="text-gray-500 font-normal hidden sm:inline">from last month</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-lg lg:text-2xl font-semibold text-gray-900">฿1,176,000</div>
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-2xl">+15%</span>
                <span className="text-gray-500 font-normal hidden sm:inline">from last month</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-20 h-20 bg-switch-soft-green-background rounded-full flex items-center justify-center ml-4 flex-shrink-0">
          <FaMoneyBillWave className="text-4xl text-switch-green-primary" />
        </div>
      </div>
    </div>
  )
}