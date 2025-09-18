'use client'

import React from 'react'

export interface StatData {
  title: string
  value: string | number
  changeValue: string
  changeText: string
  icon: React.ReactNode
  isPositive?: boolean
}

interface StatsCardProps {
  stat: StatData
}

export const StatsCard: React.FC<StatsCardProps> = ({ stat }) => {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 flex-1 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md h-full flex items-center">
      <div className="flex justify-between items-center w-full">
        <div className="flex-1">
          <h3 className="text-[11px] font-normal text-gray-600 m-0 mb-1.5 leading-tight">
            {stat.title}
          </h3>
          <div className="text-xl font-semibold text-gray-900 m-0 mb-2 leading-tight">
            {stat.value}
          </div>
          <div className="flex items-center gap-1 text-[9px] font-medium">
            <span className={`text-[9px] font-medium py-1 px-1.5 rounded-xl min-w-[30px] text-center ${
              stat.isPositive ? 'text-emerald-500 bg-emerald-100' : 'text-red-500 bg-red-100'
            }`}>
              {stat.changeValue}
            </span>
            <span className="text-gray-500 font-normal">{stat.changeText}</span>
          </div>
        </div>
        <div className="w-[45px] h-[45px] rounded-full flex items-center justify-center bg-green-100 ml-2 flex-shrink-0">
          <div className="text-xl text-emerald-500">
            {stat.icon}
          </div>
        </div>
      </div>
    </div>
  )
}
