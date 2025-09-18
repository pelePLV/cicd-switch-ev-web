import { getVehicleTrackingByVehicleIdApi } from '@/lib/api/get-vehicle-tracking-by-vehicle-id';
import { useQuery } from '@tanstack/react-query';
import { VehicleTrackingFilters } from '@/lib/validations/filter-validation';
import { useState, useCallback } from 'react';
import TABLE_CONSTANTS from '@/lib/constants/table-constants';

export const useVehicleTracking = (
  initialParams: Pick<VehicleTrackingFilters, 'devId'> &
    Partial<Omit<VehicleTrackingFilters, 'devId' | 'page'>> & { limit?: number }
) => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Partial<VehicleTrackingFilters>>({});

  // Build complete params with pagination, search, and filters
  const queryParams: VehicleTrackingFilters = {
    ...initialParams,
    page: page,
    size: initialParams?.limit || TABLE_CONSTANTS.PAGINATION.ITEMS_PER_PAGE,
    ...filters, // Direct spread - no manual mapping needed
  };

  const queryResult = useQuery({
    queryKey: ['vehicleTracking', queryParams],
    queryFn: () => getVehicleTrackingByVehicleIdApi(queryParams),
    enabled: !!queryParams.devId, // Only run query if devId is provided
  });

  // Pagination functions
  const nextPage = useCallback(() => {
    setPage(prev => prev + 1);
  }, []);

  const previousPage = useCallback(() => {
    setPage(prev => Math.max(prev - 1, 1));
  }, []);

  const goToPage = useCallback((pageNumber: number) => {
    setPage(Math.max(pageNumber, 1));
  }, []);

  // Handle search and filter changes (receives VehicleTrackingFilters format)
  const onFilter = useCallback((filters: Partial<VehicleTrackingFilters>) => {
    setFilters(filters);
    setPage(1); // Reset to first page when filtering
  }, []);

  return {
    ...queryResult,
    page,
    nextPage,
    previousPage,
    goToPage,
    filters: queryParams,
    onFilter,
    // Convenient data access
    tracks: queryResult.data?.tracks || [],
    totalCount: queryResult.data?.count || 0,
    deviceInfo: queryResult.data?.deviceInfo,
  };
};
