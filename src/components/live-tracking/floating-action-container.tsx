'use client'

import React, { useState } from 'react'
import { FilterItem, FilterType } from './filter-item'
import { FaMotorcycle, FaBatteryFull } from 'react-icons/fa'

interface FloatingActionContainerProps {
  onFilterChange?: (activeFilters: FilterType[]) => void
  className?: string
}

export const FloatingActionContainer: React.FC<FloatingActionContainerProps> = ({
  onFilterChange,
  className = ''
}) => {
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([])

  const handleFilterClick = (type: FilterType) => {
    let newFilters: FilterType[]
    
    // Check if the clicked button is already active
    const isCurrentlyActive = activeFilters.includes(type)
    
    // Guard clause: if already active, deactivate and return
    if (isCurrentlyActive) {
      newFilters = activeFilters.filter(filter => filter !== type)
      setActiveFilters(newFilters)
      onFilterChange?.(newFilters)
      return
    }
    
    // Guard clause: if 2 buttons are already active, clear all and return
    if (activeFilters.length >= 2) {
      newFilters = []
      setActiveFilters(newFilters)
      onFilterChange?.(newFilters)
      return
    }
    
    // Normal case: add active class and apply filters
    newFilters = [...activeFilters, type]
    setActiveFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  // Filter data
  const filterData = [
    {
      type: 'online' as FilterType,
      label: 'Online',
      icon: <FaMotorcycle className="w-4 h-4" />
    },
    {
      type: 'offline' as FilterType,
      label: 'Offline', 
      icon: <FaMotorcycle className="w-4 h-4" />
    },
    {
      type: 'switch-station' as FilterType,
      label: 'Switch Station',
      icon: <FaBatteryFull className="w-4 h-4" />
    }
  ]

  return (
    <div className={`absolute top-7 hidden lg:flex left-10 z-10 w-fit min-h-[40px] bg-white rounded-full shadow-lg items-center p-2 gap-4 ${className}`}>
      {filterData.map((filter) => (
        <FilterItem
          key={filter.type}
          type={filter.type}
          label={filter.label}
          icon={filter.icon}
          isActive={activeFilters.includes(filter.type)}
          onClick={handleFilterClick}
        />
      ))}
    </div>
  )
}