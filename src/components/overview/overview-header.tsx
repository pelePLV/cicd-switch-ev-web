// src/components/overview/overview-header.tsx
'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FaCalendarAlt } from 'react-icons/fa';
import { useOverviewDateStore } from '@/store/use-overview-date-store';
import { DateRangePickerModal } from './date-range-picker-modal';
import { DateOption } from '@/types/date-filter.types';

export const OverviewHeader = () => {
  // Date store
  const { startDate, endDate, selectedDateOption, setDateRange, setCustomDateRange } = useOverviewDateStore();

  // Local state for UI only
  const [isDateRangeModalOpen, setIsDateRangeModalOpen] = useState(false);

  const handleDateOptionChange = (value: string) => {
    const option = value as DateOption;

    if (option === 'pick-range') {
      setIsDateRangeModalOpen(true);
    } else {
      setDateRange(option);
    }
  };

  const handleDateRangeSelect = (start: Date | null, end: Date | null) => {
    setCustomDateRange(start, end);
  };

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="hidden sm:block">
          <h1 className="text-2xl font-normal text-gray-700 sm:text-3xl lg:text-4xl">
            Dashboard
          </h1>
        </div>

        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-6">
          {/* Select Date */}
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
            <p className="text-base font-light text-gray-700">Select Date:</p>
            <div className="relative w-full sm:w-auto">
              <Select
                value={selectedDateOption}
                onValueChange={handleDateOptionChange}
              >
                <SelectTrigger className="bg-white hover:bg-gray-50 w-full rounded-full border border-gray-300 px-6 py-6 text-sm font-medium text-gray-700 hover:cursor-pointer focus:ring-2 focus:ring-gray-300 sm:min-w-[220px] sm:w-auto">
                  <div className="flex items-center gap-2">
                    <SelectValue placeholder="This Month" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                  <SelectItem value="all-time">All time</SelectItem>
                  <SelectItem value="pick-range">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-xs" />
                      Pick date range
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Date Range Picker Modal */}
      <DateRangePickerModal
        isOpen={isDateRangeModalOpen}
        onClose={() => setIsDateRangeModalOpen(false)}
        onSelect={handleDateRangeSelect}
        initialStartDate={startDate}
        initialEndDate={endDate}
      />
    </>
  );
};
