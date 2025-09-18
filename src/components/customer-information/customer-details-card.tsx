'use client';

import { useUserDetail } from '@/hooks/use-user-detail';
import {
  formatDateTime,
  formatEmpty,
  formatPriceByDeptMark,
} from '@/lib/helpers/format';
import React from 'react';

interface CustomerDetailsCardProps {
  userId: string;
}

export const CustomerDetailsCard: React.FC<CustomerDetailsCardProps> = ({
  userId,
}) => {
  const { data, error, isLoading } = useUserDetail(userId);

  if (isLoading) {
    return <CustomerDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-red-600 bg-red-50 p-6 text-red-700">
        <span className="text-sm font-medium">
          Failed to load user details.
        </span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-yellow-600 bg-yellow-50 p-6 text-yellow-700">
        <span className="text-sm font-medium">No user data available.</span>
      </div>
    );
  }

  const userName = formatEmpty(data.userName);
  const phoneNumber = formatEmpty(data.phoneNumber);
  const virtualAccount = formatPriceByDeptMark(data.virtualAccount, data.mark);
  const balanceAccount = formatPriceByDeptMark(data.balanceAccount, data.mark);
  const lastUpdate = formatDateTime(data.loginDate);
  const isOnline = data.status;

  return (
    <div className="min-h-[250px] rounded-xl border border-green-600 bg-green-50 p-4 text-gray-700 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-green-600/30 sm:p-6">
      <div className="flex flex-col gap-4">
        <Row
          label="User:"
          value={
            <span className="flex items-center gap-2 text-sm text-gray-600">
              {userName}
              <span
                className={`inline-block h-2 w-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-red-500'}`}
              />
            </span>
          }
        />
        <Row label="Phone number:" value={phoneNumber} />
        <Row label="Virtual Account:" value={virtualAccount} />
        <Row label="Balance Account:" value={balanceAccount} />
        <Row label="Last Update:" value={lastUpdate} />
      </div>
    </div>
  );
};

const Row: React.FC<{ label: string; value: React.ReactNode }> = ({
  label,
  value,
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
    <span className="min-w-[110px] text-sm font-medium text-gray-700">
      {label}
    </span>
    <span className="text-sm text-gray-600">{value}</span>
  </div>
);

const CustomerDetailsSkeleton = () => (
  <div className="min-h-[250px] animate-pulse rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-6">
    <div className="flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col sm:flex-row sm:items-center sm:gap-2"
        >
          <div className="h-4 min-w-[110px] rounded-md bg-gray-200" />
          <div className="mt-2 h-4 w-3/4 rounded-md bg-gray-200 sm:mt-0" />
        </div>
      ))}
    </div>
  </div>
);
