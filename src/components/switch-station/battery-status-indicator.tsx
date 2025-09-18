import React from 'react'

interface BatteryStatusIndicatorProps {
  batteryPercentages: number[]
}

export const BatteryStatusIndicator: React.FC<BatteryStatusIndicatorProps> = ({ batteryPercentages }) => {
  const getBatteryStatus = (percentage: number): 'high' | 'medium' | 'low' | 'empty' => {
    if (percentage === 0) return 'empty'
    if (percentage >= 80) return 'high'
    if (percentage >= 50) return 'medium'
    return 'low'
  }

  const batteryStatusColors = {
    high: 'bg-emerald-500',
    medium: 'bg-amber-500',
    low: 'bg-red-500',
    empty: 'bg-gray-100'
  } as const

  return (
    <div className="flex gap-0.5 flex-wrap justify-center max-w-20">
      {batteryPercentages.map((percentage, index) => {
        const status = getBatteryStatus(percentage)
        return (
          <div
            title={`${status} (${percentage}%)`}
            key={index}
            className={`w-2 h-3 rounded-xs border border-gray-300 ${batteryStatusColors[status]}`}
          />
        )
      })}
    </div>
  )
} 