'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable, DataTableColumn } from '@/components/ui/data-table';
import { SwitchCabinet } from '@/types/switch-cabinets.types';
import { SwitchFilters } from '@/lib/validations/filter-validation';
import { BatteryStatusIndicator } from './battery-status-indicator';
import TABLE_CONSTANTS from '@/lib/constants/table-constants';
import { useSwitches } from '@/hooks/use-switches';
import {
  formatPriceByDeptMark,
  formatTimeAgo,
  dateToISOString,
} from '@/lib/helpers/format';
import { useIntlRouter } from '@/lib/navigation';
import { useLocationStore, DeptId } from '@/store/use-location-store';
import { getDepartmentFilter } from '@/lib/helpers/department-filter';
import { useSwitchExport } from '@/hooks/use-switch-export';
import { ExportButton } from '@/components/common/export-button';

export const SwitchStationTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>(
    []
  );
  const router = useIntlRouter();

  // Get selected department from location store (it's select location from navbar) to make table filter by location LA or TH
  const { selectedDeptId } = useLocationStore();

  const {
    isFetching,
    error,
    pageNumber,
    goToPage,
    onFilter,
    switches,
    totalCount,
    filters: appliedFilters,
  } = useSwitches({
    limit: TABLE_CONSTANTS.PAGINATION.ITEMS_PER_PAGE,
    // only include deptId if not "All"
    ...getDepartmentFilter(selectedDeptId),
  });

  const exportMutation = useSwitchExport();

  const handleExportClick = () => {
    exportMutation.mutate({
      ...appliedFilters,
      // only include deptId if not "All"
      ...getDepartmentFilter(selectedDeptId),
    });
  };

  // Define columns configuration
  const columns: DataTableColumn<SwitchCabinet>[] = [
    {
      title: 'Switch ID',
      dataIndex: 'devId',
      key: 'devId',
      width: '150px',
      ellipsis: true,
    },
    {
      title: 'Department Name',
      dataIndex: 'deptName',
      key: 'deptName',
      width: '150px',
    },
    {
      title: 'Online Status',
      dataIndex: 'onlineStatus',
      key: 'onlineStatus',
      render: (value: string) => (
        <span
          className={`inline-block min-w-[120px] rounded-full px-6 py-1.5 text-center text-sm font-normal ${
            value === '1'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {value === '1' ? 'Online' : 'Offline'}
        </span>
      ),
    },
    {
      title: 'Temperature',
      dataIndex: 'temp',
      key: 'temp',
      render: (value: number) => (
        <span className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-normal text-gray-700">
          {value}°C
        </span>
      ),
    },
    {
      title: 'Battery Count',
      dataIndex: 'batteryNum',
      key: 'batteryNum',
      render: (value: number) => (
        <div className="flex items-center justify-center">
          <span className="rounded-xl bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700">
            {value}
          </span>
        </div>
      ),
    },
    {
      title: 'Available Batteries',
      key: 'availableBatteries',
      render: (_, record: SwitchCabinet) => {
        const batteryPercentages = record.iotSwitchCabDoor.map(
          door => door.batterySoc || 0
        );
        const availableBatteries = batteryPercentages.filter(
          percentage => percentage > 0
        ).length;
        return (
          <div className="flex flex-col items-center gap-2">
            <span className="min-w-6 rounded-lg bg-emerald-50 px-2 py-1 text-center text-sm font-medium text-emerald-600">
              {availableBatteries}
            </span>
            <BatteryStatusIndicator batteryPercentages={batteryPercentages} />
          </div>
        );
      },
    },
    {
      title: 'Monthly Amount',
      key: 'totalCurrentMonthPrice',
      render: (_, record: SwitchCabinet) => (
        <div className="flex items-center justify-start">
          <span className="text-sm font-semibold text-emerald-600">
            {formatPriceByDeptMark(record.totalCurrentMonthPrice, record.mark)}
          </span>
        </div>
      ),
    },
    {
      title: 'Total Amount',
      key: 'totalPrice',
      render: (_, record: SwitchCabinet) => (
        <div className="flex items-center justify-start">
          <span className="text-sm font-semibold text-emerald-600">
            {formatPriceByDeptMark(record.totalPrice, record.mark)}
          </span>
        </div>
      ),
    },
    {
      title: 'Last Update',
      dataIndex: 'updateTime',
      key: 'updateTime',
      ellipsis: true,
      render: (value: string) => (
        <div className="cursor-help text-sm text-gray-600" title={value}>
          {formatTimeAgo(value)}
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: '120px',
      render: (_, record: SwitchCabinet) => (
        <Button
          size="sm"
          onClick={() => router.push(`/switch-station/${record.devId}`)}
          className="min-w-[100px] rounded-full bg-emerald-500 px-4 py-2 text-xs font-medium text-white transition-all hover:translate-y-[-1px] hover:bg-emerald-600"
        >
          View
        </Button>
      ),
    },
  ];

  // Define filters configuration (using SwitchParams keys)
  const filters = [
    {
      key: 'switchStatus',
      label: 'Station Status',
      type: 'select' as const,
      placeholder: 'All statuses',
      options: [
        { label: 'All statuses', value: 'all' },
        { label: 'Online', value: '1' },
        { label: 'Offline', value: '2' },
      ],
    },
    {
      key: 'startingDate',
      label: 'Starting Date',
      type: 'date' as const,
      placeholder: 'Select starting date',
    },
    {
      key: 'endDate',
      label: 'End Date',
      type: 'date' as const,
      placeholder: 'Select end date',
    },
  ];

  // Handle filter callback - convert DataTable format to SwitchParams format
  const handleFilter = useCallback(
    (filters: Record<string, any>) => {
      const convertedFilters: Partial<SwitchFilters> = {
        searchText: filters.searchQuery || '',
        // Direct mapping from filters
        ...(filters.startingDate && {
          startingDate: dateToISOString(filters.startingDate),
        }),
        ...(filters.endDate && { endDate: dateToISOString(filters.endDate) }),
        ...(filters.switchStatus && { switchStatus: filters.switchStatus }),
      };

      onFilter(convertedFilters);
    },
    [onFilter]
  );

  return (
    <>
      <DataTable
        title="Switch Station"
        columns={columns}
        dataSource={switches}
        loading={isFetching}
        error={error?.message}
        rowKey="devId"
        searchable={true}
        searchPlaceholder="Search switch stations..."
        filters={filters}
        showFilters={false}
        maxTableHeight={600}
        headerButton={
          <ExportButton
            onClick={handleExportClick}
            isLoading={exportMutation.isPending}
            label="Export"
          />
        }
        pagination={{
          current: pageNumber,
          pageSize: TABLE_CONSTANTS.PAGINATION.ITEMS_PER_PAGE,
          total: totalCount,
          onChange: page => {
            goToPage(page);
          },
        }}
        selection={{
          selectedRowKeys,
          onChange: (keys, rows) => {
            setSelectedRowKeys(keys);
          },
        }}
        onFilter={handleFilter}
        onRow={record => ({
          onClick: () => {},
        })}
      />
    </>
  );
};
