'use client';

import React from 'react';
import Image from 'next/image';
import { useSwitchDetail } from '@/hooks/use-swtich-detail';
import { formatEmpty, formatTimeAgo } from '@/lib/helpers/format';

interface SwitchStationInfoCardProps {
  devId: string;
}

export const SwitchStationInfoCard: React.FC<SwitchStationInfoCardProps> = ({
  devId,
}) => {
  const { data, error, isLoading } = useSwitchDetail(devId);

  if (isLoading) {
    return (
      <div className="min-h-[200px] animate-pulse rounded-xl border border-gray-300 bg-white p-6 text-gray-700">
        <div className="mb-4 h-6 w-1/3 rounded bg-gray-300" />
        <div className="mb-4 h-6 w-1/2 rounded bg-gray-300" />
        <div className="mb-4 h-6 w-1/4 rounded bg-gray-300" />
        <div className="h-[290px] w-full rounded bg-gray-200" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-[200px] rounded-xl border border-red-300 bg-red-50 p-6 text-red-700">
        <p className="text-sm font-medium">
          Failed to load switch station info.
        </p>
        {error && (
          <pre className="mt-2 text-xs text-red-600">{String(error)}</pre>
        )}
      </div>
    );
  }

  const switchStationData = {
    switchId: formatEmpty(data?.devId),
    department: formatEmpty(data?.deptName),
    voltage: data?.voltage,
    current: data?.current,
    temperature: data?.temp,
    imsi: data?.imsi,
    address: data?.address,
    lastUpdate: formatTimeAgo(data?.updateTime),
    image: data.images,
  };

  return (
    <div className="min-h-[200px] rounded-xl border border-gray-300 bg-white p-6 text-gray-700 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md">
      <div className="flex flex-col gap-5 md:flex-row">
        {/* Switch Details */}
        <div className="flex flex-1 flex-col gap-5">
          {[
            ['Switch ID', switchStationData.switchId],
            ['Department', switchStationData.department],
            ['Voltage', switchStationData.voltage],
            ['Current', switchStationData.current],
            ['Temperature', switchStationData.temperature],
            ['IMSI', switchStationData.imsi],
            ['Address', switchStationData.address],
            ['Last update', switchStationData.lastUpdate],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center gap-2">
              <span className="min-w-[100px] text-left text-sm font-medium text-gray-700">
                {label}:
              </span>
              <span className="text-sm font-normal text-gray-500">{value}</span>
            </div>
          ))}
        </div>

        {/* Switch Image */}
        {typeof switchStationData.image === 'string' &&
          switchStationData.image.trim() !== '' && (
            <div className="flex h-[290px] flex-1 items-center justify-center rounded-lg border border-gray-200 bg-gray-100">
              <div className="h-full w-full overflow-hidden rounded-lg">
                <Image
                  src={switchStationData.image}
                  alt="Switch Station Image"
                  width={400}
                  height={290}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            </div>
          )}
      </div>
    </div>
  );
};
