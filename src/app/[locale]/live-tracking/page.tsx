'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { LiveTrackingPage, LiveTrackingPageWithParam } from '@/components/live-tracking';

const LiveTracking = () => {
  const searchParams = useSearchParams();
  const vehicleId = searchParams.get('vehicleId') || '';

  // If vehicleId is provided, show the vehicle tracking page with parameter
  // Example: When click view vehicle track from other page will send vehicleId as param, then will show page with only vehicle track table
  if (vehicleId) {
    return <LiveTrackingPageWithParam vehicleId={vehicleId} />;
  }

  // If no vehicleId then show normal page
  return <LiveTrackingPage />;
};

export default LiveTracking;
