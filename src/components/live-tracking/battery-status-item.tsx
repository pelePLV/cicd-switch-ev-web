'use client'

import React from 'react'

interface BatteryStatusItemProps {
  batteryNumber: number
  percentage: number
  className?: string
}

export const BatteryStatusItem: React.FC<BatteryStatusItemProps> = ({
  batteryNumber,
  percentage,
  className = ''
}) => {
  // Get battery level class based on percentage
  const getBatteryLevelClass = () => {
    if (percentage >= 70) return 'bg-[#D8F1E2]' // High - Light green
    if (percentage >= 40) return 'bg-[#FEF3C7]' // Medium - Light yellow  
    return 'bg-[#FFF5EE]' // Low - Light orange
  }

  return (
    <div className={`flex items-center justify-center rounded-xl p-0 px-0.5 ${className}`}>
      <div className="flex items-center rounded-lg relative p-1">
        {/* Battery Terminal */}
        <div 
          className="w-1.5 h-5 rounded-l-md absolute -left-0.5 top-1/2 transform -translate-y-1/2 border border-white/30"
          style={{
            background: 'linear-gradient(to right, #119C47, #4CBF7B)'
          }}
        />
        
        {/* Battery Body */}
        <div 
          className="flex items-center rounded-md px-2 py-1 gap-2 h-9"
          style={{
            background: 'linear-gradient(to right, #119C47, #4CBF7B)'
          }}
        >
          {/* Battery Number */}
          <span className="text-sm font-semibold text-white">
            {batteryNumber}
          </span>
          
          {/* Battery Level Fill */}
          <div className={`
            rounded-sm flex items-center justify-center px-2 py-1 h-7 flex-grow
            ${getBatteryLevelClass()}
          `}>
            <span className="text-base font-semibold text-[#316A48]">
              {percentage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}