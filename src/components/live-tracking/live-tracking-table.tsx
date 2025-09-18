'use client';

import React, { useState, useCallback } from 'react';
import { DataTable, DataTableColumn } from '@/components/ui/data-table';
import { SwitchButton } from './switch-button';
import { Vehicle } from '@/types/vehicle.types';
import { SwitchCabinet } from '@/types/switch-cabinets.types';
import { FaCog } from 'react-icons/fa';
import { BatteryStatusIndicator } from '@/components/switch-station/battery-status-indicator';
import { VehicleControlModal } from '@/components/vehicle/vehicle-control-modal';
import { VehicleConditionModal } from '@/components/vehicle/vehicle-condition-modal';
import { Button } from '../ui/button';
import {
  VehicleFilters,
  SwitchFilters,
} from '@/lib/validations/filter-validation';
import { useVehicle } from '@/hooks/use-vehicle';
import { useSwitches } from '@/hooks/use-switches';
import {
  formatTimeAgo,
  dateToISOString,
  formatPriceByDeptMark,
} from '@/lib/helpers/format';
import { TABLE_CONSTANTS } from '@/lib/constants/table-constants';
import { VehicleTrackingTable } from './vehicle-tracking-table';
import { useLocationStore, DeptId } from '@/store/use-location-store';
import { getDepartmentFilter } from '@/lib/helpers/department-filter';

type LiveTrackingTableProps = object;

export const LiveTrackingTable: React.FC<LiveTrackingTableProps> = () => {
  const [activeTab, setActiveTab] = useState<
    'vehicle' | 'switch-station' | 'vehicle-detail'
  >('vehicle');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showControlModal, setShowControlModal] = useState(false);
  const [showConditionModal, setShowConditionModal] = useState(false);

  // Selected items for each table
  const [selectedVehicles, setSelectedVehicles] = useState<Vehicle[]>([]);
  const [selectedSwitches, setSelectedSwitches] = useState<SwitchCabinet[]>([]);

  // Get selected department from location store (it's select location from navbar) to make table filter by location LA or TH
  const { selectedDeptId } = useLocationStore();

  const {
    isFetching: vehicleLoading,
    error: vehicleError,
    page,
    goToPage,
    onFilter: onVehicleFilter,
    vehicles,
    totalCount: vehicleTotalCount,
  } = useVehicle({
    limit: TABLE_CONSTANTS.PAGINATION.ITEMS_PER_PAGE,
    // only include deptId if not "All"
    ...getDepartmentFilter(selectedDeptId),
  });

  const {
    isFetching: switchLoading,
    error: switchError,
    pageNumber,
    goToPage: goToSwitchPage,
    onFilter: onSwitchFilter,
    switches,
    totalCount: switchTotalCount,
  } = useSwitches({
    limit: TABLE_CONSTANTS.PAGINATION.ITEMS_PER_PAGE,
    // only include deptId if not "All"
    ...getDepartmentFilter(selectedDeptId),
  });

  // Handler functions for vehicle table
  const handleControlClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowControlModal(true);
  };

  const handleConditionClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowConditionModal(true);
  };

  // Vehicle columns - from vehicle-table.tsx
  const vehicleColumns: DataTableColumn<Vehicle>[] = [
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
      width: '200px',
      render: (_, record: Vehicle) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleViewVehicleDetail(record)}
            className="min-w-[60px] rounded-full bg-blue-500 px-3 py-2 text-xs font-light text-white transition-all hover:translate-y-[-1px] hover:bg-blue-600"
          >
            View
          </button>
          <Button
            size="sm"
            onClick={() => handleControlClick(record)}
            className="min-w-[100px] rounded-full bg-emerald-500 px-4 py-2 text-xs font-light text-white transition-all hover:translate-y-[-1px] hover:bg-emerald-600"
          >
            <FaCog /> Control
          </Button>
        </div>
      ),
    },
  ];

  // Switch Station columns - from switch-station-table.tsx
  const switchStationColumns: DataTableColumn<SwitchCabinet>[] = [
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
  ];

  // Vehicle filters - from vehicle-table.tsx
  const vehicleFilters = [
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

  // Switch Station filters - from switch-station-table.tsx
  const switchStationFilters = [
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

  // Handle view vehicle detail
  const handleViewVehicleDetail = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setActiveTab('vehicle-detail');
  };

  // Handle close vehicle detail
  const handleCloseVehicleDetail = () => {
    setActiveTab('vehicle');
    setSelectedVehicle(null);
  };

  // Handle tab change
  const handleTabChange = (
    tab: 'vehicle' | 'switch-station' | 'vehicle-detail'
  ) => {
    setActiveTab(tab);
  };

  // Handle filter callback for vehicles - convert DataTable format to VehicleFilters format
  const handleVehicleFilter = useCallback(
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

      onVehicleFilter(convertedFilters);
    },
    [onVehicleFilter]
  );

  // Handle filter callback for switch stations - convert DataTable format to SwitchFilters format
  const handleSwitchFilter = useCallback(
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

      onSwitchFilter(convertedFilters);
    },
    [onSwitchFilter]
  );

  return (
    <>
      {/* Main Table */}
      <div className="absolute right-6 bottom-6 left-6 z-20 rounded-xl shadow-lg">
        {/* Vehicle Table */}
        {activeTab === 'vehicle' && (
          <DataTable<Vehicle>
            title={
              <SwitchButton
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            }
            columns={vehicleColumns}
            dataSource={vehicles}
            loading={vehicleLoading}
            error={vehicleError?.message}
            rowKey="devId"
            searchable={true}
            searchPlaceholder="Search vehicles, user names, car IDs..."
            filters={vehicleFilters}
            showFilters={false}
            maxTableHeight={200}
            pagination={{
              current: page,
              pageSize: TABLE_CONSTANTS.PAGINATION.ITEMS_PER_PAGE,
              total: vehicleTotalCount,
              onChange: pageNumber => {
                goToPage(pageNumber);
              },
            }}
            selection={{
              selectedRowKeys: selectedVehicles.map(v => v.devId),
              onChange: (keys, rows) => {
                setSelectedVehicles(rows);
              },
            }}
            onFilter={handleVehicleFilter}
            onRow={record => ({
              onClick: () => {},
            })}
          />
        )}

        {/* Switch Station Table */}
        {activeTab === 'switch-station' && (
          <DataTable<SwitchCabinet>
            title={
              <SwitchButton
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            }
            columns={switchStationColumns}
            dataSource={switches}
            loading={switchLoading}
            error={switchError?.message}
            rowKey="devId"
            searchable={true}
            searchPlaceholder="Search switch stations..."
            filters={switchStationFilters}
            showFilters={false}
            maxTableHeight={200}
            pagination={{
              current: pageNumber,
              pageSize: TABLE_CONSTANTS.PAGINATION.ITEMS_PER_PAGE,
              total: switchTotalCount,
              onChange: page => {
                goToSwitchPage(page);
              },
            }}
            selection={{
              selectedRowKeys: selectedSwitches.map(s => s.devId),
              onChange: (keys, rows) => {
                setSelectedSwitches(rows);
              },
            }}
            onFilter={handleSwitchFilter}
            onRow={record => ({
              onClick: () => {},
            })}
          />
        )}
      </div>

      {/* Vehicle Tracking Table */}
      {activeTab === 'vehicle-detail' && selectedVehicle && (
        <VehicleTrackingTable
          vehicleId={selectedVehicle.devId}
          onClose={handleCloseVehicleDetail}
        />
      )}

      {/* Vehicle Control Modal */}
      <VehicleControlModal
        vehicle={selectedVehicle}
        open={showControlModal}
        onClose={() => setShowControlModal(false)}
      />

      {/* Vehicle Condition Modal */}
      <VehicleConditionModal
        vehicle={selectedVehicle}
        open={showConditionModal}
        onClose={() => setShowConditionModal(false)}
      />
    </>
  );
};
