import React from 'react';
import { OverviewStatistics } from '@/components/overview/overview-statistics';
import { OverviewHeader } from '@/components/overview/overview-header';
import { OverviewCharts } from '@/components/overview/overview-charts';
import { CustomerInformationTable } from '@/components/customer-information/customer-infomation-table';

const Overview = () => {
  return (
    <div className="min-h-screen bg-white p-5">
      {/* Overview Header */}
      <OverviewHeader />

      {/* Overview Statistics */}
      <OverviewStatistics />

      {/* Overview Charts */}
      <OverviewCharts />

      {/* Customer Information Table */}
      <CustomerInformationTable />
    </div>
  );
};

export default Overview;
