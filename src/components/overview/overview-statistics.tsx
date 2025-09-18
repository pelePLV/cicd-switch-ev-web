'use client';

import React, { useMemo } from 'react';
import { StatsCard } from './stats-card';
import { useOverview } from '@/hooks/use-overview';
import { OverviewFilters } from '@/lib/validations/filter-validation';
import {
  DeptId,
  useLocationStore,
} from '@/store/use-location-store';
import { useOverviewDateStore } from '@/store/use-overview-date-store';
import { OverviewStatId } from '@/dto/overview-stats.dto';
import { dateToISOString } from '@/lib/helpers/format';
import { differenceInDays } from 'date-fns';

export const OverviewStatistics = () => {
  // Subscribe to location store
  const { selectedDeptId } = useLocationStore();
  
  // Date store
  const { startDate, endDate, selectedDateOption } = useOverviewDateStore();

  // map enum to number | undefined for the hook
  const numericDeptId = useMemo(
    () => selectedDeptId === DeptId.All ? undefined : Number(selectedDeptId),
    [selectedDeptId]
  );

  // stable params for hook typing (not strictly required for react-query)
  const params = useMemo<OverviewFilters>(() => {
    const baseParams: OverviewFilters = numericDeptId ? { deptId: numericDeptId } : {};
    
    // Add startDate and endDate if they exist
    if (startDate) {
      baseParams.startDate = dateToISOString(startDate);
    }
    if (endDate) {
      baseParams.endDate = dateToISOString(endDate);
    }
    
    return baseParams;
  }, [numericDeptId, startDate, endDate]);

  // Generate compare text based on selected date option
  const compareText = useMemo(() => {
    switch (selectedDateOption) {
      case 'this-week':
        return 'from last week';
      case 'this-month':
        return 'from last month';
      case 'this-year':
        return 'from last year';
      case 'all-time':
        return undefined; // Hide percentage section
      case 'pick-range':
        if (startDate && endDate) {
          const daysDiff = differenceInDays(endDate, startDate);
          return `from ${daysDiff} days ago`;
        }
        return undefined;
      default:
        return undefined;
    }
  }, [selectedDateOption, startDate, endDate]);

  const { data, error, isLoading, isError } = useOverview(params);

  // Function to determine if a stat should be shown
  const shouldShowStat = (statId: OverviewStatId): boolean => {
    if (!numericDeptId) return true;
    
    if (selectedDeptId === DeptId.Laos && statId === OverviewStatId.CostBatterySwapBaht) {
      return false;
    }
    
    if (selectedDeptId === DeptId.Thailand && statId === OverviewStatId.CostBatterySwapLak) {
      return false;
    }
    
    return true;
  };

  // Function to calculate colSpan value
  const getColSpan = (statId: OverviewStatId, originalColSpan: string): string => {
    if (!numericDeptId) return originalColSpan;
    
    if (statId === OverviewStatId.CostBatterySwapBaht || statId === OverviewStatId.CostBatterySwapLak) {
      return '6';
    }
    
    return originalColSpan;
  };

  if (isLoading) {
    return (
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="col-span-2 h-24 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mb-8 rounded-lg bg-red-100 p-4 text-red-800 dark:bg-red-900 dark:text-red-200">
        Failed to load statistics: {error?.message || 'Unknown error'}
      </div>
    );
  }

  return (
    <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
      {data?.map(stat => (
        <StatsCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          percentage={stat.percentage}
          percentageType={stat.percentageType}
          icon={stat.icon}
          colSpan={getColSpan(stat.id, stat.colSpan)}
          show={shouldShowStat(stat.id)}
          compareText={compareText}
        />
      ))}
    </div>
  );
};
