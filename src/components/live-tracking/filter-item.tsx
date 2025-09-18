'use client'

import React from 'react'

export type FilterType = 'online' | 'offline' | 'switch-station'

interface FilterItemProps {
  type: FilterType
  label: string
  icon: React.ReactNode
  isActive: boolean
  onClick: (type: FilterType) => void
  className?: string
}

export const FilterItem: React.FC<FilterItemProps> = ({
  type,
  label,
  icon,
  isActive,
  onClick,
  className = ''
}) => {
  // Icon background colors based on type
  const getIconBgColor = () => {
    if (type === 'online' || type === 'switch-station') {
      return 'bg-green-500'
    }
    return 'bg-gray-500'
  }

  return (
    <div
      className={`
        flex items-center gap-2 bg-white px-2 py-2 rounded-full cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md hover:translate-y-[-1px]
        ${isActive ? 'ring-2 ring-green-600' : ''}
        ${className}
      `}
      onClick={() => onClick(type)}
    >
      {/* Icon */}
      <div className={`
        w-8 h-8 flex items-center justify-center rounded-full text-white
        ${getIconBgColor()}
      `}>
        {icon}
      </div>
      
      {/* Label */}
      <span className="text-sm font-normal text-gray-600 pr-1">{label}</span>
    </div>
  )
}