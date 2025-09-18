'use client';

import React from 'react';
import { BatteryStatusItem } from './battery-status-item';
import { useSwitchDetail } from '@/hooks/use-swtich-detail';

interface SwitchStationModalProps {
  stationId: string | null;
  position: { top: number; left: number };
  isVisible: boolean;
  isLoading?: boolean;
  onClose?: () => void;
  className?: string;
}

export const SwitchStationModal: React.FC<SwitchStationModalProps> = ({
  stationId,
  position,
  isVisible,
  isLoading = false,
  onClose,
  className = '',
}) => {
  const {
    data,
    error,
    isFetching,
  } = useSwitchDetail(stationId || '');

  if (!isVisible) return null;

  // Combine external loading state with hook loading state
  const isActuallyLoading = isLoading || isFetching;

  // Early return for loading state
  if (isActuallyLoading) {
    return (
      <div
        className={`
          absolute z-10 w-[250px] border-2 border-[#3DBB6F] rounded-2xl overflow-hidden
          ${className}
        `}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          boxShadow: '0 0 8px 6px rgba(61, 187, 111, 0.3)'
        }}
      >
        <div className="bg-white p-4 flex items-center justify-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#3DBB6F]"></div>
          <span className="text-sm text-[#6B7280]">Loading battery status...</span>
        </div>
      </div>
    );
  }

  // Transform the door data to match the expected battery format
  const doors = data?.iotSwitchCabDoor ?? [];
  const transformedBatteries = doors.map((door) => ({
    number: door.doorId,
    percentage: door.batterySoc || 0
  }));

  const switchStation = data ? {
    id: data.devId,
    name: `Switch Station ${data.devId}`,
    batteries: transformedBatteries,
    onlineStatus: data.onlineStatus
  } : null;

  return (
    <div
      className={`
        absolute z-10 w-[250px] border-2 border-[#3DBB6F] rounded-2xl overflow-hidden
        ${className}
      `}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        boxShadow: '0 0 8px 6px rgba(61, 187, 111, 0.3)'
      }}
    >
      {/* Switch Station Content */}
      {switchStation && (
        <>
          {/* Header */}
          <div className="bg-[#3DBB6F] px-5 py-4 pb-3 flex flex-col justify-center items-center gap-2">
            <h3 className="text-lg font-normal text-white m-0">
              {switchStation.name}
            </h3>
            <span className="text-sm font-normal text-white opacity-80">
              ID: {switchStation.id}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              switchStation.onlineStatus === '1' 
                ? 'bg-green-100 text-green-600' 
                : 'bg-red-100 text-red-600'
            }`}>
              {switchStation.onlineStatus === '1' ? 'Online' : 'Offline'}
            </span>
          </div>

          {/* Content */}
          <div className="bg-white px-5 py-4 pb-5 flex-grow">
            <p className="text-base font-semibold text-[#4F5D52] text-center mt-1.5 mb-4">
              Battery Status:
            </p>

            {/* Battery Status Grid */}
            <div className="grid grid-cols-2 gap-2.5 gap-x-3 mt-4">
              {switchStation.batteries.map((battery) => (
                <BatteryStatusItem
                  key={battery.number}
                  batteryNumber={battery.number}
                  percentage={battery.percentage}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
