'use client';

import React, { useCallback, useState } from 'react';
import { DataTable, DataTableColumn } from '@/components/ui/data-table';
import TABLE_CONSTANTS from '@/lib/constants/table-constants';
import { Button } from '@/components/ui/button';
import { useUsers } from '@/hooks/use-users';
import { UserFilters } from '@/lib/validations/filter-validation';
import { dateToISOString, formatTimeAgo } from '@/lib/helpers/format';
import { CustomerInformationDto } from '@/dto/customer-information.dto';
import { useIntlRouter } from '@/lib/navigation';
import { useUsersExport } from '@/hooks/use-users-export';
import { ExportButton } from '../common/export-button';
import { useLocationStore, DeptId } from '@/store/use-location-store';
import { getDepartmentFilter } from '@/lib/helpers/department-filter';

export const CustomerInformationTable: React.FC = () => {
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
    users,
    totalCount,
    filters,
  } = useUsers({
    limit: TABLE_CONSTANTS.PAGINATION.ITEMS_PER_PAGE,
    // only include deptId if not "All"
    ...getDepartmentFilter(selectedDeptId),
  });
  const exportMutation = useUsersExport();

  const handleViewClick = (customer: CustomerInformationDto) => {
    router.push(`/customer-information/${customer.userId}`);
  };

  const handleExportClick = () => {
    exportMutation.mutate({
      ...filters,
      // only include deptId if not "All"
      ...getDepartmentFilter(selectedDeptId),
    });
  };

  // Define columns configuration
  const columns: DataTableColumn<CustomerInformationDto>[] = [
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
      width: '100px',
      render: (value: string) => (
        <span className="font-semibold text-gray-900">{value}</span>
      ),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '140px',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '160px',
      render: (value: string) => (
        <span className="font-medium text-gray-900">{value}</span>
      ),
    },
    {
      title: 'Balance Account',
      dataIndex: 'balanceAccount',
      key: 'balanceAccount',
      width: '130px',
      render: (value: string) => (
        <span className="block text-right font-medium text-emerald-600">
          {value}
        </span>
      ),
    },
    {
      title: 'Virtual Account',
      dataIndex: 'virtualAccount',
      key: 'virtualAccount',
      width: '130px',
      render: (value: string) => (
        <span className="block text-right font-medium text-emerald-600">
          {value}
        </span>
      ),
    },
    {
      title: 'Auth Status',
      dataIndex: 'authStatus',
      key: 'authStatus',
      width: '120px',
      render: (value: string) => {
        const getStatusStyles = (status: string) => {
          switch (status) {
            case 'Verified':
              return 'bg-emerald-100 text-emerald-700';
            case 'No Auth':
              return 'bg-red-100 text-red-700';
            case 'Pending':
              return 'bg-yellow-100 text-yellow-700';
            default:
              return 'bg-gray-100 text-gray-700';
          }
        };

        return (
          <span
            className={`inline-block min-w-[80px] rounded-full px-3 py-1 text-center text-xs font-medium ${getStatusStyles(value)}`}
          >
            {value}
          </span>
        );
      },
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      width: '120px',
      render: (value: string) => (
        <span className="text-sm font-medium text-gray-700">{value}</span>
      ),
    },
    {
      title: 'Monthly Amount',
      dataIndex: 'monthlyAmount',
      key: 'monthlyAmount',
      width: '140px',
      render: (value: string) => (
        <span className="block text-right font-semibold text-emerald-600">
          {value}
        </span>
      ),
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: '130px',
      render: (value: string) => (
        <span className="block text-right font-semibold text-emerald-600">
          {value}
        </span>
      ),
    },
    {
      title: 'Total KM',
      dataIndex: 'totalKm',
      key: 'totalKm',
      width: '120px',
      render: (value: string) => (
        <span className="block text-right font-sm text-gray-800">
          {value}
        </span>
      ),
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      width: '150px',
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
      width: '160px',
      render: (_, record: CustomerInformationDto) => (
        <Button
          size="sm"
          onClick={() => handleViewClick(record)}
          className="min-w-[80px] rounded-full bg-emerald-500 px-4 py-2 text-xs font-medium text-white transition-all hover:translate-y-[-1px] hover:bg-emerald-600"
        >
          View
        </Button>
      ),
    },
  ];

  // Handle filter callback (includes search and filters)
  const handleFilter = useCallback(
    (filters: Record<string, any>) => {
      const convertedFilters: Partial<UserFilters> = {
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
        className="mt-6"
        title={<div className="text-gray-700">Customer Data</div>}
        columns={columns}
        dataSource={users}
        rowKey="userId"
        searchable={true}
        searchPlaceholder="User ID, Username, Nationality, or Vehicle ID"
        loading={isFetching}
        error={error?.message}
        showFilters={false}
        maxTableHeight={600}
        pagination={{
          current: pageNumber,
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
        headerButton={
          <ExportButton
            onClick={handleExportClick}
            isLoading={exportMutation.isPending}
            label="Export"
          />
        }
        onFilter={handleFilter}
        onRow={record => ({
          onClick: () => {},
        })}
      />
    </>
  );
};
