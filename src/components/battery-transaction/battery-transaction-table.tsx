'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { DataTable, DataTableColumn } from '@/components/ui/data-table';
import { BatteryTransactionLog } from '@/types/battery-transaction.types';
import { BatteryTransactionFilters } from '@/lib/validations/filter-validation';
import TABLE_CONSTANTS from '@/lib/constants/table-constants';
import { useBatteryTransaction } from '@/hooks/use-battery-transaction';
import {
  formatPriceByDeptMark,
  formatTimeAgo,
  dateToISOString,
} from '@/lib/helpers/format';
import { useBatteryTransactionExport } from '@/hooks/use-battery-transaction-export';
import { ExportButton } from '../common/export-button';
import { useSearchParams } from 'next/navigation';
import { useLocationStore, DeptId } from '@/store/use-location-store';
import { getDepartmentFilter } from '@/lib/helpers/department-filter';

export const BatteryTransactionTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>(
    []
  );
  const searchParams = useSearchParams();
  const userId = searchParams.get('searchQuery') || ''; // returns string | null

  // Get selected department from location store (it's select location from navbar) to make table filter by location LA or TH
  const { selectedDeptId } = useLocationStore();

  const {
    isFetching,
    filters: appliedFilters,
    error,
    page,
    goToPage,
    onFilter,
    transactions,
    totalCount,
  } = useBatteryTransaction({
    size: TABLE_CONSTANTS.PAGINATION.ITEMS_PER_PAGE,
    // only include deptId if not "All"
    ...getDepartmentFilter(selectedDeptId),
  });

  const exportMutation = useBatteryTransactionExport();

  useEffect(() => {
    if (userId) {
      onFilter({
        searchText: userId,
      });
    }
  }, [onFilter, userId]);

  const handleExportClick = () => {
    exportMutation.mutate({
      ...appliedFilters,
      // only include deptId if not "All"
      ...getDepartmentFilter(selectedDeptId),
    });
  };

  // Define columns configuration
  const columns: DataTableColumn<BatteryTransactionLog>[] = [
    {
      title: 'Log ID',
      dataIndex: 'logId',
      key: 'logId',
      width: '100px',
      render: (value: string) => (
        <span className="font-semibold text-gray-900">{value}</span>
      ),
    },
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      width: '140px',
      render: (value: string) => (
        <span className="font-mono text-xs text-gray-700">{value}</span>
      ),
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
      width: '100px',
      render: (value: number) => (
        <span className="font-mono text-xs text-gray-700">{value}</span>
      ),
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
      width: '160px',
      render: (value: string) => (
        <span className="font-medium text-gray-900">{value}</span>
      ),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '140px',
      render: (value: string) => (
        <span className="font-mono text-xs text-gray-700">{value}</span>
      ),
    },
    {
      title: 'Department',
      dataIndex: 'deptName',
      key: 'deptName',
      width: '120px',
      render: (value: string) => (
        <span className="text-xs font-medium text-gray-700">{value}</span>
      ),
    },
    {
      title: 'Switch Cab ID',
      dataIndex: 'switchCabId',
      key: 'switchCabId',
      width: '120px',
    },
    {
      title: 'Virtual Amount',
      dataIndex: 'virtualAmount',
      key: 'virtualAmount',
      width: '120px',
      render: (value: number, record: BatteryTransactionLog) => (
        <span className="font-semibold text-emerald-600">
          {formatPriceByDeptMark(value, record.mark)}
        </span>
      ),
    },
    {
      title: 'Get Battery ID',
      dataIndex: 'getBatteryId',
      key: 'getBatteryId',
      width: '120px',
    },
    {
      title: 'Put Battery ID',
      dataIndex: 'putBatteryId',
      key: 'putBatteryId',
      width: '120px',
    },
    {
      title: 'Success Time',
      dataIndex: 'successTime',
      key: 'successTime',
      width: '150px',
      ellipsis: true,
      render: (value: string) => (
        <div className="cursor-help text-sm text-gray-600" title={value}>
          {formatTimeAgo(value)}
        </div>
      ),
    },
    {
      title: 'Transaction Status',
      dataIndex: 'logStatus',
      key: 'logStatus',
      width: '130px',
      render: (value: string) => (
        <span
          className={`inline-block min-w-[120px] rounded-full px-6 py-1.5 text-center text-sm font-normal ${
            value === '3'
              ? 'bg-green-100 text-green-700'
              : value === '2'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
          }`}
        >
          {value === '3' ? 'Success' : value === '2' ? 'Processing' : 'Failed'}
        </span>
      ),
    },
  ];

  // Define filters configuration
  const filters = [
    {
      key: 'logStatus',
      label: 'Transaction Status',
      type: 'select' as const,
      placeholder: 'All statuses',
      options: [
        { label: 'All statuses', value: 'all' },
        { label: 'Success', value: '3' },
        { label: 'Processing', value: '2' },
        { label: 'Failed', value: '1' },
      ],
    },
    {
      key: 'logType',
      label: 'Transaction Type',
      type: 'select' as const,
      placeholder: 'All types',
      options: [
        { label: 'All types', value: 'all' },
        { label: 'Swap', value: '2' },
        { label: 'Return', value: '1' },
      ],
    },
    {
      key: 'successTime',
      label: 'Success Date',
      type: 'date' as const,
      placeholder: 'Select success date',
    },
  ];

  // Handle filter callback - convert DataTable format to BatteryTransactionFilters format
  const handleFilter = useCallback(
    (filters: Record<string, any>) => {
      const convertedFilters: Partial<BatteryTransactionFilters> = {
        searchText: filters.searchQuery || '',
        // Direct mapping from filters
        ...(filters.logStatus &&
          filters.logStatus !== 'all' && { logStatus: filters.logStatus }),
        ...(filters.logType &&
          filters.logType !== 'all' && { logType: filters.logType }),
        ...(filters.successTime && {
          successTime: dateToISOString(filters.successTime),
        }),
      };

      onFilter(convertedFilters);
    },
    [onFilter]
  );

  return (
    <>
      <DataTable
        title="Battery Transactions"
        columns={columns}
        dataSource={transactions}
        loading={isFetching}
        error={error?.message}
        rowKey="logId"
        searchable={true}
        searchPlaceholder="Log ID, Order ID, User ID, or Battery ID"
        initSearchQuery={userId}
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
          current: page,
          pageSize: TABLE_CONSTANTS.PAGINATION.ITEMS_PER_PAGE,
          total: totalCount,
          onChange: pageNumber => {
            goToPage(pageNumber);
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
          onClick: () => {}
        })}
      />
    </>
  );
};
