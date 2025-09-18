'use client';

import React, { use } from 'react';
import { SwitchStationDetailHeader } from '@/components/switch-station/switch-station-detail-header';
import { SwitchStationInfoCard } from '@/components/switch-station/switch-station-info-card';
import { BatteryCabinetCard } from '@/components/switch-station/battery-cabinet-card';
import { SwitchStationTransactionTable } from '@/components/switch-station/switch-station-transaction-table';

interface SwitchStationDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const SwitchStationDetailPage: React.FC<SwitchStationDetailPageProps> = ({
  params,
}) => {
  const { id: devId } = use(params);
  return (
    <div className="min-h-screen w-full bg-white p-5">
      {/* Header with back button */}
      <SwitchStationDetailHeader devId={devId} />

      {/* Main content cards */}
      <div className="grid grid-cols-1 gap-7 lg:grid-cols-1">
        {/* Left card - Switch Information */}
        <div>
          <SwitchStationInfoCard devId={devId} />
        </div>

        {/* Right card - Battery Cabinet */}
        <div>
          <BatteryCabinetCard devId={devId} />
        </div>
      </div>

      {/* Transaction table */}
      <SwitchStationTransactionTable stationId={devId} />
    </div>
  );
};

export default SwitchStationDetailPage;
