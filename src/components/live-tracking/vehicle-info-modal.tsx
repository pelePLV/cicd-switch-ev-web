'use client'

import React from 'react'
import { FaUser, FaPhone, FaCircle } from 'react-icons/fa'
import { VehicleBatteryItem } from './vehicle-battery-item'
import { useVehicleDetail } from '@/hooks/use-vehicle-detail'

interface VehicleInfoModalProps {
  vehicleId: string | null
  position: { top: number; left: number }
  isVisible: boolean
  isLoading?: boolean
  onClose?: () => void
  className?: string
}

export const VehicleInfoModal: React.FC<VehicleInfoModalProps> = ({
  vehicleId,
  position,
  isVisible,
  isLoading = false,
  onClose,
  className = ''
}) => {
  // Fetch vehicle data using the hook
  const { data: vehicleData, isLoading: isVehicleLoading, error } = useVehicleDetail({
    devId: vehicleId || '',
  })

  if (!isVisible) return null

  // Process vehicle data from API response
  const vehicle = vehicleData ? {
    id: vehicleData.devId,
    licensePlate: vehicleData.car.licensePlate || vehicleData.devId,
    userName: vehicleData.car.username || 'Unknown User',
    phoneNumber: vehicleData.car.phoneNumber || 'N/A',
    userStatus: vehicleData.onlineStatus === '1' ? 'online' as const : 'offline' as const,
    batteries: (() => {
      const batteryIds = vehicleData.car.batteryIds ? vehicleData.car.batteryIds.split(',') : []
      const batterySocs = vehicleData.car.batterySocs ? vehicleData.car.batterySocs.split(',') : []
      
      return batteryIds.map((id, index) => ({
        number: index + 1,
        id: id.trim(),
        percentage: parseInt(batterySocs[index]?.trim() || '0', 10)
      }))
    })()
  } : null

  // Combine loading states
  const combinedLoading = isLoading || isVehicleLoading

  return (
    <div 
      className={`
        absolute z-10 w-[340px] bg-white rounded-[20px] shadow-xl border border-[#10B981] overflow-hidden
        ${className}
      `}
      style={{ 
        top: `${position.top}px`, 
        left: `${position.left}px`,
        display: isVisible ? 'flex' : 'none',
        flexDirection: 'column'
      }}
    >
      {/* Loading State */}
      {combinedLoading && (
        <div className="w-full p-5 flex items-center justify-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#10B981]"></div>
          <span className="text-sm text-gray-600">Loading car info...</span>
        </div>
      )}

      {/* Error State */}
      {error && !combinedLoading && (
        <div className="w-full p-5 flex items-center justify-center gap-2">
          <span className="text-sm text-red-600">Failed to load vehicle data</span>
        </div>
      )}

      {/* Vehicle Content */}
      {!combinedLoading && !error && vehicle && (
        <>
          {/* Header Section */}
          <div className="bg-white p-5 pb-3 rounded-t-[20px]">
            <div className="flex gap-3 justify-between">
              {/* User Badge */}
              <div className="bg-[#F0F3F1] rounded-[25px] p-2 flex items-center gap-2 flex-1">
                <FaUser className="text-base text-[#CED8D0]" />
                <span className="text-sm font-light text-[#4F5D52] flex-1">{vehicle.userName}</span>
                <div className="flex items-center ml-auto">
                  <FaCircle className={`text-[10px] ${
                    vehicle.userStatus === 'online' ? 'text-[#4DC07B]' : 'text-[#6D726E]'
                  }`} />
                </div>
              </div>
              
              {/* Phone Badge */}
              <div className="bg-[#F0F3F1] rounded-[25px] p-2 flex items-center gap-2 flex-1">
                <FaPhone className="text-base text-[#CED8D0]" />
                <span className="text-sm font-light text-[#4F5D52] flex-1">{vehicle.phoneNumber}</span>
              </div>
            </div>
          </div>

          {/* Car Details Section */}
          <div className="px-5 py-1 bg-white">
            <div className="mb-0">
              <span className="text-sm text-[#4B5563] font-normal">ID: {vehicle.id}</span>
            </div>
            <div className="mt-2 mb-3">
              <span className="text-sm text-[#4B5563] font-normal">License Plate: {vehicle.licensePlate}</span>
            </div>
          </div>

          {/* Battery Level Section */}
          <div className="px-5 py-1 pb-5 bg-white">
            <span className="text-sm text-[#374151] font-normal block mb-3">Battery level:</span>
            {/* Empty state when no batteries */}
            {vehicle.batteries.length === 0 && (
              <div className="flex items-center justify-center py-4">
                <span className="text-sm text-[#9CA3AF] font-normal">No battery data</span>
              </div>
            )}
            {/* Battery list */}
            <div className="flex flex-col gap-2">
              {vehicle.batteries.map((battery) => (
                <VehicleBatteryItem
                  key={battery.number}
                  batteryNumber={battery.number}
                  batteryId={battery.id}
                  percentage={battery.percentage}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}