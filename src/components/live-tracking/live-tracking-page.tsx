'use client';

import React, { useState } from 'react';
import {
  GoogleMap,
  LiveTrackingTable,
  FloatingActionContainer,
  FloatingStatsContainer,
  FloatingViewTableButton,
  FilterType,
} from '@/components/live-tracking';

export const LiveTrackingPage: React.FC = () => {
  const [isFullMap, setIsFullMap] = useState(false);
  const [isStreetView, setIsStreetView] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);

  const handleFilterChange = (newActiveFilters: FilterType[]) => {
    setActiveFilters(newActiveFilters);
  };

  const handleToggleFullMap = (fullMap: boolean) => {
    setIsFullMap(fullMap);
  };

  const handleStreetView = (streetView: boolean) => {
    setIsStreetView(streetView);
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
          {/* Floating Action Container - Filter buttons */}
          <FloatingActionContainer onFilterChange={handleFilterChange} />

          {/* Floating Stats Container - Statistics */}
          <FloatingStatsContainer />

          {/* Floating View Table Button - View Full Map / Exit */}
          <FloatingViewTableButton
            isFullMap={isFullMap}
            onToggleFullMap={handleToggleFullMap}
          />

          {/* Floating Table - Hide when full map mode */}
          {!isFullMap && <LiveTrackingTable />}
        </>
      )}
    </div>
  );
};
