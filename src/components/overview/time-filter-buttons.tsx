import React from 'react'
import { Button } from '../ui/button'

// Time Filter Types
export type TimeFilterType = 'month' | 'year' | 'alltime'

export const TIME_FILTER_OPTIONS: TimeFilterType[] = ['month', 'year', 'alltime']

interface TimeFilterButtonsProps {
  activeFilter: TimeFilterType
  onFilterChange: (filter: TimeFilterType) => void
  className?: string
}

export const TimeFilterButtons: React.FC<TimeFilterButtonsProps> = ({ 
  activeFilter, 
  onFilterChange, 
  className = '' 
}) => {
  const getButtonLabel = (filter: TimeFilterType): string => {
    switch (filter) {
      case 'month':
        return 'Month'
      case 'year':
        return 'Year'
      case 'alltime':
        return 'All Time'
      default:
        return filter
    }
  }

  return (
    <div className={`flex gap-1 bg-transparent rounded-3xl p-1 ${className}`}>
      {TIME_FILTER_OPTIONS.map((filter) => (
        <Button
          key={filter}
          variant={activeFilter === filter ? 'default' : 'ghost'}
          size="sm"
          className={`rounded-2xl px-4 py-2 text-sm font-normal min-w-[60px] transition-all duration-200 ${
            activeFilter === filter 
              ? 'bg-switch-green-primary text-white hover:bg-switch-green-primary-hover shadow-sm' 
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
          }`}
          onClick={() => onFilterChange(filter)}
        >
          {getButtonLabel(filter)}
        </Button>
      ))}
    </div>
  )
}