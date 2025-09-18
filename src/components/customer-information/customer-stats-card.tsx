'use client';

import React from 'react';
import Image from 'next/image';
import { FaMapMarker, FaLeaf } from 'react-icons/fa';
import { StatsCard, StatData } from './stats-card';
import { Button } from '@/components/ui/button';
import takeWayIllustration from '@/public/images/take-way-illustration.png';
import { useTotalRiddensByUser } from '@/hooks/use-total-ridden-by-user';
import { MileageAndCo2Stats } from '@/types/mileage-co2-stats.types';
import { Skeleton } from '@/components/ui/skeleton'; // Optional: If using shadcn

interface CustomerStatsCardProps {
  userId: string;
}

export const CustomerStatsCard: React.FC<CustomerStatsCardProps> = ({
  userId,
}) => {
  const { isFetching, error, data } = useTotalRiddensByUser(userId);

  function mapMileageAndCo2StatsToStatData(
    stats?: MileageAndCo2Stats
  ): StatData[] {
    if (!stats) return [];
    const mileageChange = parseFloat(
      stats.percentageMileageChange.replace('%', '')
    );
    const co2Change = parseFloat(stats.percentageCo2Change.replace('%', ''));

    return [
      {
        title: 'Total KM Combined',
        value: stats.currentMonthMileage || 0,
        changeValue: stats.percentageMileageChange,
        changeText: 'from last month',
        icon: <FaMapMarker />,
        isPositive: mileageChange >= 0,
      },
      {
        title: 'Total CO₂ Saved (Kg)',
        value: stats.co2Saved || 0,
        changeValue: stats.percentageCo2Change,
        changeText: 'from last month',
        icon: <FaLeaf />,
        isPositive: co2Change >= 0,
      },
    ];
  }

  const stats: StatData[] = mapMileageAndCo2StatsToStatData(data);

  const handleViewHistory = () => {
    console.log('View history tracking clicked');
    // Implement navigation to history tracking page
  };

  // --- Render loading state ---
  if (isFetching) {
    return (
      <div className="min-h-[200px] rounded-xl border border-green-600 bg-green-50 p-6 text-gray-700 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-green-600/30">
        <div className="flex h-full flex-col items-center justify-between gap-6 2xl:flex-row">
          {/* Stats Section */}
          <div className="flex flex-shrink-0 flex-col items-center gap-3 rounded-xl md:flex-row">
            {/* Skeleton Illustration */}
            <Skeleton className="h-[200px] w-[300px] rounded-xl" />

            {/* Skeleton Stat Cards */}
            <div className="flex flex-col gap-3 md:flex-row">
              <Skeleton className="h-[100px] w-[160px] rounded-xl" />
              <Skeleton className="h-[100px] w-[160px] rounded-xl" />
            </div>
          </div>

          {/* Skeleton Button */}
          <Skeleton className="h-10 w-48 rounded-lg" />
        </div>
      </div>
    );
  }

  // --- Render error state ---
  if (error) {
    return (
      <div className="min-h-[200px] rounded-xl border border-red-600 bg-red-50 p-6 text-center text-red-700">
        <p>Failed to load customer stats. Please try again later.</p>
      </div>
    );
  }

  // --- Render normal state ---
  return (
    <div className="min-h-[200px] rounded-xl border border-green-600 bg-green-50 p-6 text-gray-700 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-green-600/30">
      <div className="flex h-full flex-col items-center justify-between gap-6 2xl:flex-row">
        {/* Stats Section */}
        <div className="flex flex-shrink-0 flex-col items-center gap-3 rounded-xl md:flex-row">
          {/* Illustration */}
          <div className="h-[200px] w-[300px] overflow-hidden rounded-xl">
            <Image
              src={takeWayIllustration}
              alt="Take Way Illustration"
              className="h-full w-full rounded-xl object-cover"
              width={300}
              height={200}
              priority
            />
          </div>

          {/* Stat Cards */}
          {stats.map((stat, index) => (
            <StatsCard key={index} stat={stat} />
          ))}
        </div>

        {/* History Button */}
        {/* <Button
          onClick={handleViewHistory}
          className="rounded-lg bg-gradient-to-r from-green-700 to-green-500 px-5 py-3 text-sm font-medium whitespace-nowrap text-white transition-all duration-200 hover:from-green-800 hover:to-green-600"
        >
          View History tracking
        </Button> */}
      </div>
    </div>
  );
};
