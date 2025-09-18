'use client'

import React from 'react'
import { FilterType } from './filter-item'

interface InfoStatsItemProps {
  type: FilterType
  count: number
  label: string
  className?: string
}

export const InfoStatsItem: React.FC<InfoStatsItemProps> = ({
  type,
  count,
  label,
  className = ''
}) => {
  // Dot colors based on type (from CSS)
  const getDotColor = () => {
    switch (type) {
      case 'online':
        return 'bg-[#3DBB6F]' // Green
      case 'offline':
        return 'bg-[#6D726E]' // Gray
      case 'switch-station':
        return 'bg-[#3DBB6F]' // Green
      default:
        return 'bg-gray-400'
    }
  }

  return (
    <div className={`flex items-center gap-2 text-[13px] text-[#4B5563] font-light ${className}`}>
      {/* Dot */}
      <div className={`w-3 h-3 rounded-full ${getDotColor()}`} />
      
      {/* Text */}
      <span>{count} {label}</span>
    </div>
  )
}