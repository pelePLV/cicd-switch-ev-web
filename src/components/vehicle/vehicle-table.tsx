'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { FaCog, FaChartLine, FaEye } from 'react-icons/fa';
import { DataTable, DataTableColumn } from '@/components/ui/data-table';
import { VehicleConditionModal } from './vehicle-condition-modal';
import { VehicleControlModal } from './vehicle-control-modal';
import { Vehicle } from '@/types/vehicle.types';
import { VehicleFilters } from '@/lib/validations/filter-validation';
import TABLE_CONSTANTS from '@/lib/constants/table-constants';
import { useVehicle } from '@/hooks/use-vehicle';
import { formatTimeAgo, dateToISOString } from '@/lib/helpers/format';
import { useIntlRouter } from '@/lib/navigation';
import { useLocationStore, DeptId } from '@/store/use-location-store';
import { getDepartmentFilter } from '@/lib/helpers/department-filter';
import { useVehicleExport } from '@/hooks/use-vehicle-export';
import { ExportButton } from '@/components/common/export-button';

export const VehicleTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>(
    []
  );
  const [showControlModal, setShowControlModal] = useState(false);
  const [showConditionModal, setShowConditionModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const router = useIntlRouter();

  // Get selected department from location store (it's select location from navbar) to make table filter by location LA or TH
  const { selectedDeptId } = useLocationStore();

  const { isFetching, error, page, goToPage, onFilter, vehicles, totalCount, filters: appliedFilters } =
    useVehicle({
      limit: TABLE_CONSTANTS.PAGINATION.ITEMS_PER_PAGE,
      // only include deptId if not "All"
      ...getDepartmentFilter(selectedDeptId),
    });

  const exportMutation = useVehicleExport();

  const handleControlClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowControlModal(true);
  };

  const handleConditionClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowConditionModal(true);
  };

  const handleViewClick = (vehicle: Vehicle) => {
    router.push(`/live-tracking?vehicleId=${vehicle.devId}`);
  };

  const handleExportClick = () => {
    exportMutation.mutate({
      ...appliedFilters,
      // only include deptId if not "All"
      ...getDepartmentFilter(selectedDeptId),
    });
  };

  // Define columns configuration
  const columns: DataTableColumn<Vehicle>[] = [
    {
      title: 'Device ID',
      dataIndex: 'devId',
      key: 'devId',
      width: '120px',
      render: (value: string) => (
        <span className="font-semibold text-gray-900">{value}</span>
      ),
    },
    {
      title: 'Car ID',
      dataIndex: 'carId',
      key: 'carId',
      width: '140px',
      render: (value: string) => (
        <span className="font-mono text-xs text-gray-700">{value}</span>
      ),
    },
    {
      title: 'License Plate',
      dataIndex: 'licensePlate',
      key: 'licensePlate',
      width: '120px',
      render: (value: string) => (
        <span className="font-medium text-gray-900">{value || 'N/A'}</span>
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
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
      width: '120px',
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
      title: 'Vehicle Status',
      dataIndex: 'onlineStatus',
      key: 'onlineStatus',
      width: '120px',
      render: (value: string) => (
        <span
          className={`inline-block min-w-[100px] rounded-full px-6 py-1 text-center text-sm font-light ${
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
      title: 'Battery SOC',
      dataIndex: 'batterySoc',
      key: 'batterySoc',
      width: '120px',
      render: (value: number) => (
        <div className="flex min-w-max gap-1">
          <span className="flex min-w-[60px] items-center justify-center rounded-xl bg-emerald-500 px-2 py-0.5 text-xs font-light text-white">
            {value}%
          </span>
        </div>
      ),
    },
    {
      title: 'Total Km',
      dataIndex: 'totalMile',
      key: 'totalMile',
      width: '100px',
      render: (value: number) => (
        <span className="text-sm text-gray-700">{value} km</span>
      ),
    },
    {
      title: 'Online Time',
      dataIndex: 'onlineTime',
      key: 'onlineTime',
      width: '150px',
      ellipsis: true,
      render: (value: string) => (
        <div className="cursor-help text-sm text-gray-600" title={value}>
          {formatTimeAgo(value)}
        </div>
      ),
    },
    {
      title: 'Login Time',
      dataIndex: 'loginTime',
      key: 'loginTime',
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
      width: '300px',
      render: (_, record: Vehicle) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => handleControlClick(record)}
            className="min-w-[100px] rounded-full bg-emerald-500 px-4 py-2 text-xs font-light text-white transition-all hover:translate-y-[-1px] hover:bg-emerald-600"
          >
            <FaCog /> Control
          </Button>
          <Button
            size="sm"
            onClick={() => handleConditionClick(record)}
            className="min-w-[100px] rounded-full bg-blue-500 px-4 py-2 text-xs font-light text-white transition-all hover:translate-y-[-1px] hover:bg-blue-600"
          >
            <FaChartLine /> Condition
          </Button>
          <Button
            size="sm"
            onClick={() => handleViewClick(record)}
            className="min-w-[100px] rounded-full bg-gradient-to-r from-green-700 to-green-500 px-4 py-2 text-xs font-light text-white transition-all hover:translate-y-[-1px] hover:bg-emerald-600"
          >
            <FaEye /> View
          </Button>
        </div>
      ),
    },
  ];

  // Define filters configuration
  const filters = [
    {
      key: 'vehicleStatus',
      label: 'Vehicle Status',
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

  // Handle filter callback - convert DataTable format to VehicleFilters format
  const handleFilter = useCallback(
    (filters: Record<string, any>) => {
      const convertedFilters: Partial<VehicleFilters> = {
        searchText: filters.searchQuery || '',
        // Direct mapping from filters
        ...(filters.vehicleStatus &&
          filters.vehicleStatus !== 'all' && {
            vehicleStatus: filters.vehicleStatus,
          }),
        ...(filters.startingDate && {
          startingDate: dateToISOString(filters.startingDate),
        }),
        ...(filters.endDate && { endDate: dateToISOString(filters.endDate) }),
      };

      onFilter(convertedFilters);
    },
    [onFilter]
  );

  return (
    <>
      <DataTable
        title="Vehicle"
        columns={columns}
        dataSource={vehicles}
        loading={isFetching}
        error={error?.message}
        rowKey="devId"
        searchable={true}
        searchPlaceholder="Search vehicles, user names, car IDs..."
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
          onClick: () => {},
        })}
      />

      <VehicleControlModal
        vehicle={selectedVehicle}
        open={showControlModal}
        onClose={() => setShowControlModal(false)}
      />

      <VehicleConditionModal
        vehicle={selectedVehicle}
        open={showConditionModal}
        onClose={() => setShowConditionModal(false)}
      />
    </>
  );
};
