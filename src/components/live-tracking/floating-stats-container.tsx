'use client'

import React from 'react'
import { InfoStatsItem } from './info-stats-item'
import { useMarker } from '@/hooks/use-marker'

interface FloatingStatsContainerProps {
  className?: string
}

export const FloatingStatsContainer: React.FC<FloatingStatsContainerProps> = ({
  className = ''
}) => {
  // Get real marker data from hook
  const { 
    onlineCarMarkers, 
    offlineCarMarkers, 
    switchMarkers, 
    isLoading, 
    error 
  } = useMarker()

  // Calculate stats from real data
  const stats = {
    totalVehicles: onlineCarMarkers.length + offlineCarMarkers.length,
    onlineVehicles: onlineCarMarkers.length,
    offlineVehicles: offlineCarMarkers.length,
    switchStations: switchMarkers.length
  }

  // Show loading state if data is still loading
  if (isLoading) {
    return (
      <div className={`
        absolute top-[110px] hidden lg:flex left-10 z-10 w-fit bg-white rounded-2xl shadow-lg p-5 flex-col gap-3
        ${className}
      `}>
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#10B981]"></div>
          <span className="text-sm text-gray-600">Loading stats...</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`
      absolute top-[110px] hidden lg:flex left-10 z-10 w-fit bg-white rounded-2xl shadow-lg p-5 flex-col gap-3
      ${className}
    `}>
      {/* Title */}
      <h3 className="text-sm font-semibold text-[#4F5D52] mb-1">
        All Switch: {stats.totalVehicles} e-bikes
      </h3>
      
      {/* Stats Items */}
      <InfoStatsItem
        type="online"
        count={stats.onlineVehicles}
        label="e-bikes online."
      />
      
      <InfoStatsItem
        type="offline"
        count={stats.offlineVehicles}
        label="e-bikes offline."
      />
      
      <InfoStatsItem
        type="switch-station"
        count={stats.switchStations}
        label="Switch Stations."
      />
    </div>
  )
}