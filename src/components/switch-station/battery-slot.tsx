'use client';

import { cn } from '@/lib/helpers/combine-class-name';
import { IotSwitchCabDoor } from '@/types/switch-cabinets.types';
import React from 'react';

export type BatterySlotStatus = 'full' | 'changing' | 'empty';

export interface BatterySlotData {
  slotNumber: number;
  batteryId?: string;
  status: BatterySlotStatus;
  soc: number; // State of Charge percentage
  isActive: boolean;
}

interface BatterySlotProps {
  slot: IotSwitchCabDoor;
}

const BATTERY_STATUS_MAP: Record<number, BatterySlotStatus> = {
  1: 'empty', // No battery
  2: 'changing', // Charging
  3: 'full', // Full
  0: 'empty', // Unknown
  4: 'empty', // Abnormal
};

const STATUS_LABELS: Record<BatterySlotStatus, string> = {
  full: 'Full',
  changing: 'Charging',
  empty: 'No Battery',
};

const ENABLE_STATUS_MAP: Record<number, string> = {
  0: 'Unknown',
  1: 'Active',
  2: 'Disabled',
};

export const BatterySlot: React.FC<BatterySlotProps> = ({ slot }) => {
  const batteryStatusCode = Number(slot.doorBatteryStatus) || 0;
  const enableStatusCode = Number(slot.doorEnableStatus) || 0;
  const status: BatterySlotStatus =
    BATTERY_STATUS_MAP[batteryStatusCode] ?? 'empty';
  const enableStatusText = ENABLE_STATUS_MAP[enableStatusCode] ?? 'Unknown';

  const getSlotBackgroundColor = (status: BatterySlotStatus) => {
    switch (status) {
      case 'full':
        return 'bg-switch-green-primary';
      case 'changing':
        return 'bg-gray-400';
      case 'empty':
      default:
        return 'bg-gray-300';
    }
  };

  const badgeClass =
    enableStatusCode === 1
      ? 'bg-green-100 text-green-700'
      : enableStatusCode === 2
        ? 'bg-red-100 text-red-700'
        : 'bg-gray-100 text-gray-600';

  const dotClass =
    enableStatusCode === 1
      ? 'bg-green-700'
      : enableStatusCode === 2
        ? 'bg-red-700'
        : 'bg-gray-400';

  return (
    <div
      className={`relative min-h-[100px] rounded-xl p-3 text-white ${getSlotBackgroundColor(status)}`}
    >
      {/* Slot Number */}
      <div className="mb-2 text-base font-semibold">{slot.doorId}</div>

      {/* Active Badge */}
      <div className="absolute top-2 right-2">
        <span
          className={cn(
            'flex items-center gap-1 rounded-xl px-2 py-1 text-xs font-medium',
            badgeClass
          )}
        >
          <span className={cn('h-1.5 w-1.5 rounded-full', dotClass)} />
          {enableStatusText}
        </span>
      </div>

      {/* Slot Info */}
      <div className="border-t border-white/30 pt-2">
        <div className="mb-0.5 text-[11px] leading-tight font-normal">
          ID: {slot.batteryId || ''}
        </div>
        <div className="mb-0.5 text-[11px] leading-tight font-normal">
          Status: {STATUS_LABELS[status]}
        </div>
        <div className="text-[11px] leading-tight font-normal">
          SOC: {slot.batterySoc ?? 0}%
        </div>
      </div>
    </div>
  );
};
