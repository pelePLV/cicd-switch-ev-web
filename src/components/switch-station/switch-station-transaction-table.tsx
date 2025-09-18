'use client';

import React, { useCallback, useState } from 'react';
import { DataTable, DataTableColumn } from '@/components/ui/data-table';
import TABLE_CONSTANTS from '@/lib/constants/table-constants';
import { Button } from '@/components/ui/button';
import { useIntlRouter } from '@/lib/navigation';
import { BatteryTransactionDto } from '@/dto/battery-transaction.dto';
import { BatteryTransactionFilters } from '@/lib/validations/filter-validation';
import { dateToISOString, formatTimeAgo } from '@/lib/helpers/format';
import { useBatteryTransactionByStation } from '@/hooks/use-battery-transaction-by-station';

interface SwitchStationTransactionTableProps {
  stationId: string;
}

export const SwitchStationTransactionTable: React.FC<
  SwitchStationTransactionTableProps
> = ({ stationId }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>(
    []
  );
  const router = useIntlRouter();

  const {
    isFetching,
    error,
    page,
    goToPage,
    onFilter,
    transactions,
    totalCount,
  } = useBatteryTransactionByStation(stationId, {
    size: TABLE_CONSTANTS.PAGINATION.ITEMS_PER_PAGE,
  });

  const handleGoBatteryTransaction = () => {
    router.push(`/battery-transaction?searchQuery=${stationId}`);
  };

  // Define columns configuration
  const columns: DataTableColumn<BatteryTransactionDto>[] = [
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
      dataIndex: 'department',
      key: 'department',
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
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '100px',
      render: (value: string) => (
        <span className="font-semibold text-emerald-600">{value}</span>
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

  // Handle filter callback (includes search and filters)
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
    <DataTable
      className="mt-7"
      title={`Transaction List (${totalCount} transactions)`}
      columns={columns}
      dataSource={transactions}
      rowKey="logId"
      searchable={true}
      searchPlaceholder="Log ID, Order ID, Switch Cab ID, or Battery ID"
      filters={filters}
      loading={isFetching}
      error={error?.message}
      showFilters={false}
      maxTableHeight={600}
      headerButton={
        <Button
          onClick={handleGoBatteryTransaction}
          className="rounded-lg bg-gradient-to-r from-green-700 to-green-500 px-5 py-2 text-sm font-medium text-white transition-all hover:from-green-800 hover:to-green-600"
        >
          Go to Battery Transaction
        </Button>
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
        onClick: () => {},
      })}
    />
  );
};
