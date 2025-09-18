'use client';

import React, { useState, useCallback } from 'react';
import {
  DataTable,
  DataTableColumn,
  DataTableFilter,
} from '@/components/ui/data-table';
import { VehicleTrack } from '@/types/vehicle-tracking.types';
import { FaTimes } from 'react-icons/fa';
import { Button } from '../ui/button';
import { VehicleTrackingFilters } from '@/lib/validations/filter-validation';
import { useVehicleTracking } from '@/hooks/use-vehicle-tracking';
import { useVehicleTrackingStore } from '@/store/use-vehicle-tracking-store';
import { formatTimeAgo, dateToISOString } from '@/lib/helpers/format';
import { useVehicleTrackingExport } from '@/hooks/use-vehicle-tracking-export';
import { ExportButton } from '../common/export-button';
import { TABLE_CONSTANTS } from '@/lib/constants/table-constants';

interface VehicleTrackingTableProps {
  vehicleId: string;
  onClose: () => void;
}

export const VehicleTrackingTable: React.FC<VehicleTrackingTableProps> = ({
  vehicleId,
  onClose,
}) => {
  const [selectedTrackings, setSelectedTrackings] = useState<VehicleTrack[]>(
    []
  );

  // Vehicle tracking store
  const { set: setVehicleTracks, clear: clearVehicleTracks } =
    useVehicleTrackingStore();

  // Vehicle tracking data for selected vehicle
  const {
    isFetching: trackingLoading,
    error: trackingError,
    page: trackingPage,
    filters: trackingFilter,
    goToPage: goToTrackingPage,
    onFilter: onTrackingFilter,
    tracks,
    totalCount: trackingTotalCount,
    deviceInfo,
  } = useVehicleTracking({
    devId: vehicleId,
    limit: TABLE_CONSTANTS.PAGINATION.ITEMS_PER_PAGE,
  });

  const exportMutation = useVehicleTrackingExport();

  // Vehicle tracking columns for detail table
  const vehicleTrackingColumns: DataTableColumn<VehicleTrack>[] = [
    {
      title: 'Track ID',
      dataIndex: 'trackId',
      key: 'trackId',
      width: '120px',
      render: (value: string) => (
        <span className="font-semibold text-gray-900">{value}</span>
      ),
    },
    {
      title: 'Distance (km)',
      key: 'distance',
      width: '120px',
      render: (_, record: VehicleTrack) => {
        const distance = (record.endTotalMile - record.startTotalMile).toFixed(
          1
        );
        return <span className="text-sm text-gray-700">{distance} km</span>;
      },
    },
    {
      title: 'Avg Speed',
      dataIndex: 'avgCarSpeed',
      key: 'avgCarSpeed',
      width: '120px',
      render: (value: number) => (
        <span className="text-sm text-gray-700">{value.toFixed(1)} km/h</span>
      ),
    },
    {
      title: 'Max Speed',
      dataIndex: 'maxCarSpeed',
      key: 'maxCarSpeed',
      width: '120px',
      render: (value: number) => (
        <span className="text-sm text-gray-700">{value} km/h</span>
      ),
    },
    {
      title: 'Battery Change',
      key: 'batteryChange',
      width: '140px',
      render: (_, record: VehicleTrack) => {
        const change = record.endBatterySoc - record.startBatterySoc;
        const changeColor = change >= 0 ? 'text-green-600' : 'text-red-600';
        return (
          <span className={`text-sm font-medium ${changeColor}`}>
            {change > 0 ? '+' : ''}
            {change}%
            <span className="ml-1 text-gray-500">
              ({record.startBatterySoc}% → {record.endBatterySoc}%)
            </span>
          </span>
        );
      },
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      width: '150px',
      ellipsis: true,
      render: (value: string) => (
        <div className="cursor-help text-sm text-gray-600" title={value}>
          {formatTimeAgo(value)}
        </div>
      ),
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      width: '150px',
      ellipsis: true,
      render: (value: string) => (
        <div className="cursor-help text-sm text-gray-600" title={value}>
          {formatTimeAgo(value)}
        </div>
      ),
    },
  ];

  // Vehicle tracking filters
  const vehicleTrackingFilters: DataTableFilter[] = [
    {
      key: 'startDate',
      label: 'Start Date',
      type: 'date',
      placeholder: 'Select start date',
    },
    {
      key: 'endDate',
      label: 'End Date',
      type: 'date',
      placeholder: 'Select end date',
    },
  ];

  // Handle filter callback for vehicle tracking - convert DataTable format to VehicleTrackingFilters format
  const handleTrackingFilter = useCallback(
    (filters: Record<string, any>) => {
      const convertedFilters: Partial<VehicleTrackingFilters> = {
        // Direct mapping from filters
        ...(filters.startDate && {
          startDate: dateToISOString(filters.startDate),
        }),
        ...(filters.endDate && { endDate: dateToISOString(filters.endDate) }),
      };

      onTrackingFilter(convertedFilters);
    },
    [onTrackingFilter]
  );

  // Handle export vehicle route data
  const handleExportClick = () => {
    exportMutation.mutate(trackingFilter);
  };

  return (
    <div className="absolute right-6 bottom-6 left-6 z-20 rounded-xl shadow-lg">
      <DataTable<VehicleTrack>
        className="mx-auto max-w-[1200px]"
        title={
          <div>
            <span className="text-xl font-semibold text-gray-900">
              Vehicle ID: {vehicleId}
            </span>
            {deviceInfo && (
              <>
                <span className="ml-4 text-base font-light text-gray-600">
                  License plate: {deviceInfo.car.licensePlate || 'N/A'}
                </span>
                <span className="ml-4 text-sm text-gray-500">
                  User: {deviceInfo.car.username} | Phone:{' '}
                  {deviceInfo.car.phoneNumber}
                </span>
              </>
            )}
          </div>
        }
        headerButton={
          <div className="flex items-center gap-2">
            <ExportButton
              onClick={handleExportClick}
              isLoading={exportMutation.isPending}
              label="Export"
            />
            <Button
              onClick={() => {
                clearVehicleTracks();
                onClose();
              }}
              className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200"
            >
              <FaTimes className="h-4 w-4" />
            </Button>
          </div>
        }
        columns={vehicleTrackingColumns}
        dataSource={tracks}
        loading={trackingLoading}
        error={trackingError?.message}
        rowKey="trackId"
        searchable={false}
        filters={vehicleTrackingFilters}
        showFilters={true}
        maxTableHeight={200}
        pagination={{
          current: trackingPage,
          pageSize: TABLE_CONSTANTS.PAGINATION.ITEMS_PER_PAGE,
          total: trackingTotalCount,
          onChange: pageNumber => {
            goToTrackingPage(pageNumber);
            clearVehicleTracks();
          },
        }}
        selection={{
          selectedRowKeys: selectedTrackings.map(t => t.trackId),
          onChange: (keys, rows) => {
            setSelectedTrackings(rows);
            // Update global store with selected vehicle tracks
            setVehicleTracks(rows);
          },
        }}
        onFilter={handleTrackingFilter}
        onRow={record => ({
          onClick: () => {},
        })}
      />
    </div>
  );
};
