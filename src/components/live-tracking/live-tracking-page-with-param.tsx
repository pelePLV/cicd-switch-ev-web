'use client';

import React, { useState } from 'react';
import {
  GoogleMap,
  FloatingViewTableButton,
  FilterType,
} from '@/components/live-tracking';
import { VehicleTrackingTable } from '@/components/live-tracking/vehicle-tracking-table';
import { useIntlRouter } from '@/lib/navigation';

interface LiveTrackingPageWithParamProps {
  vehicleId: string;
}

export const LiveTrackingPageWithParam: React.FC<LiveTrackingPageWithParamProps> = ({
  vehicleId,
}) => {
  const [isFullMap, setIsFullMap] = useState(false);
  const [isStreetView, setIsStreetView] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);
  const router = useIntlRouter();

  const handleToggleFullMap = (fullMap: boolean) => {
    setIsFullMap(fullMap);
  };

  const handleStreetView = (streetView: boolean) => {
    setIsStreetView(streetView);
  };

  const handleCloseVehicleTracking = () => {
    router.back();
  };

  return (
    // 100vh - 70px(navbar) = 93vh
    <div className="relative max-h-[calc(100vh-70px)] w-full bg-gray-100">
      {/* Google Map - Full screen */}
      <GoogleMap
        activeFilters={activeFilters}
        onStreetView={handleStreetView}
      />

      {/* All floating components - Hide in street view */}
      {!isStreetView && (
        <>
          {/* Floating View Table Button */}
          <FloatingViewTableButton
            isFullMap={isFullMap}
            onToggleFullMap={handleToggleFullMap}
          />

          {/* Vehicle Tracking Table - Hide when full map mode */}
          {!isFullMap && (
            <VehicleTrackingTable
              vehicleId={vehicleId}
              onClose={handleCloseVehicleTracking}
            />
          )}
        </>
      )}
    </div>
  );
};
