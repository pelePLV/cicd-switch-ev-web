'use client'

import React from 'react'

interface VehicleBatteryItemProps {
  batteryNumber: number
  batteryId: string
  percentage: number
  className?: string
}

export const VehicleBatteryItem: React.FC<VehicleBatteryItemProps> = ({
  batteryNumber,
  batteryId,
  percentage,
  className = ''
}) => {
  // Get battery pill color based on percentage
  const getBatteryPillClass = () => {
    if (percentage >= 60) return 'bg-[#10B981]' // Green
    if (percentage >= 30) return 'bg-[#F59E0B]' // Orange  
    return 'bg-[#EF4444]' // Red
  }

  return (
    <div className={`flex items-center bg-[#F0F3F1] rounded-[25px] p-1 px-2 gap-3 ${className}`}>
      {/* Battery Number Circle */}
      <div className="w-8 h-8 bg-[#10B981] text-white rounded-full flex items-center justify-center text-sm font-normal flex-shrink-0">
        {batteryNumber}
      </div>
      
      {/* Battery ID */}
      <div className="flex-1 text-sm font-normal text-[#374151] overflow-hidden text-ellipsis whitespace-nowrap">
        ID: {batteryId}
      </div>
      
      {/* Battery Percentage Pill */}
      <div className={`text-white px-4 py-1.5 rounded-[20px] text-sm font-medium flex-shrink-0 ${getBatteryPillClass()}`}>
        {percentage}%
      </div>
    </div>
  )
}