'use client';

import React, { use } from 'react';
import { CustomerDetailHeader } from '@/components/customer-information/customer-detail-header';
import { CustomerDetailsCard } from '@/components/customer-information/customer-details-card';
import { CustomerStatsCard } from '@/components/customer-information/customer-stats-card';
import { CustomerTransactionTable } from '@/components/customer-information/customer-transaction-table';

interface CustomerDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const CustomerDetailPage: React.FC<CustomerDetailPageProps> = ({ params }) => {
  const { id: userId } = use(params);

  return (
    <div className="min-h-screen w-full bg-white p-5">
      {/* Header with back button */}
      <CustomerDetailHeader userId={userId} />

      {/* Main content cards */}
      <div className="mb-7 grid grid-cols-1 gap-5 lg:grid-cols-7">
        {/* Left card - Customer details */}
        <div className="lg:col-span-2">
          <CustomerDetailsCard userId={userId} />
        </div>

        {/* Right card - Stats and history */}
        <div className="lg:col-span-5">
          <CustomerStatsCard userId={userId} />
        </div>
      </div>

      {/* Transaction table */}
      <CustomerTransactionTable userId={userId} />
    </div>
  );
};

export default CustomerDetailPage;
