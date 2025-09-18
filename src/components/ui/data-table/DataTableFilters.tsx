'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { DataTableFilter } from '@/types/data-table.types';

interface DataTableFiltersProps {
  filters: DataTableFilter[];
  values: Record<string, any>;
  onChange: (values: Record<string, any>) => void;
}

/**
 * DataTableFilters Component
 *
 * Renders dynamic filter inputs based on filter configuration
 * Supports: text input, select dropdown, date picker, date range picker
 */
export const DataTableFilters: React.FC<DataTableFiltersProps> = ({
  filters,
  values,
  onChange,
}) => {
  // ========== FILTER CHANGE HANDLER ==========
  // Handles all filter value changes and cleans up empty/default values
  const handleFilterChange = (key: string, value: any) => {
    const newValues = { ...values };

    // Remove filter if value is 'all' or empty (represents "show all" option)
    if (value === 'all' || value === '') {
      delete newValues[key];
    } else {
      newValues[key] = value;
    }

    // Notify parent component about filter changes
    onChange(newValues);
  };

  // ========== RENDER FILTERS ==========
  return (
    <div className="grid grid-cols-1 gap-5 border-b border-gray-200 pb-7 transition-all duration-300 md:grid-cols-2 lg:grid-cols-5">
      {filters.map(filter => (
        <div key={filter.key} className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            {filter.label}
          </label>

          {/* Text Input Filter */}
          {filter.type === 'text' && (
            <Input
              className="h-12 w-full rounded-lg px-4 py-5 text-sm font-normal text-gray-800"
              placeholder={filter.placeholder}
              value={values[filter.key] || ''}
              onChange={e => handleFilterChange(filter.key, e.target.value)}
            />
          )}

          {/* Select Dropdown Filter */}
          {filter.type === 'select' && (
            <Select
              value={values[filter.key] || ''}
              onValueChange={value => handleFilterChange(filter.key, value)}
            >
              <SelectTrigger className="h-12 w-full rounded-lg px-4 py-5 text-sm font-normal text-gray-800">
                <SelectValue placeholder={filter.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {filter.options?.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Single Date Picker Filter */}
          {filter.type === 'date' && (
            <DatePicker
              date={values[filter.key]}
              onDateChange={date => handleFilterChange(filter.key, date)}
              placeholder={filter.placeholder}
              className="w-full rounded-lg px-4 py-2.5 font-normal text-gray-500"
            />
          )}

          {/* Date Range Picker Filter */}
          {filter.type === 'dateRange' && (
            <div className="flex gap-2">
              <DatePicker
                date={values[filter.key]?.start}
                onDateChange={date =>
                  handleFilterChange(filter.key, {
                    ...values[filter.key],
                    start: date,
                  })
                }
                placeholder="Start date"
                className="w-full rounded-lg px-4 py-2.5 font-normal text-gray-500"
              />
              <DatePicker
                date={values[filter.key]?.end}
                onDateChange={date =>
                  handleFilterChange(filter.key, {
                    ...values[filter.key],
                    end: date,
                  })
                }
                placeholder="End date"
                className="w-full rounded-lg px-4 py-2.5 font-normal text-gray-500"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
