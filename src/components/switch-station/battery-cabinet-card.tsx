'use client';

import React from 'react';
import { BatterySlot } from './battery-slot';
import { useSwitchDetail } from '@/hooks/use-swtich-detail';

interface BatteryCabinetCardProps {
  devId: string;
}

export const BatteryCabinetCard: React.FC<BatteryCabinetCardProps> = ({
  devId,
}) => {
  const { data, error, isLoading } = useSwitchDetail(devId);
  const doors = data?.iotSwitchCabDoor ?? [];

  // Slot count logic
  const totalSlots = doors.length;
  const occupiedSlots = doors.filter(
    slot => Number(slot.doorBatteryStatus) !== 1
  ).length; // assuming 1 = "No battery"
  const fullSlots = doors.filter(
    slot => Number(slot.doorBatteryStatus) === 3
  ).length;

  // 🔄 Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-[200px] animate-pulse rounded-xl border border-gray-300 bg-white p-6 text-gray-700">
        <div className="mb-4 h-6 w-1/3 rounded bg-gray-300" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-[100px] rounded-xl bg-gray-200" />
          ))}
        </div>
      </div>
    );
  }

  // ❌ Error state
  if (error || !data) {
    return (
      <div className="min-h-[200px] rounded-xl border border-red-300 bg-red-50 p-6 text-red-700">
        <p className="text-sm font-medium">
          Failed to load battery cabinet data.
        </p>
        {error && (
          <pre className="mt-2 text-xs break-all whitespace-pre-wrap text-red-600">
            {String(error)}
          </pre>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-[200px] rounded-xl border border-gray-300 bg-white p-6 text-gray-700 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md">
      {/* Cabinet Header */}
      <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-3">
        <h3 className="m-0 text-lg font-semibold text-gray-700">
          Battery Cabinet
        </h3>
        <div className="flex gap-2">
          <span className="rounded-full border border-gray-300 bg-white px-3 py-2 text-center text-xs font-medium text-gray-500">
            Battery count: {occupiedSlots}/{totalSlots}
          </span>
          <span className="rounded-full border border-gray-300 bg-white px-3 py-2 text-center text-xs font-medium text-gray-500">
            Available: {fullSlots}
          </span>
        </div>
      </div>

      {/* Battery Grid */}
      {doors.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {doors.map(slot => (
            <BatterySlot key={slot.doorId} slot={slot} />
          ))}
        </div>
      ) : (
        <div className="text-sm text-gray-500">No battery slots found.</div>
      )}
    </div>
  );
};
