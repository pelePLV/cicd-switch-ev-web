import { getVehicles } from '@/lib/api/get-vehicles';
import { useQuery } from '@tanstack/react-query';
import { VehicleFilters } from '@/lib/validations/filter-validation';
import { useState, useCallback } from 'react';
import TABLE_CONSTANTS from '@/lib/constants/table-constants';

export const useVehicle = (
  initialParams?: Omit<VehicleFilters, 'pageNumber'>
) => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Partial<VehicleFilters>>({});

  // Build complete params with pagination, search, and filters
  const queryParams: VehicleFilters = {
    ...initialParams,
    pageNumber: page,
    limit: initialParams?.limit || TABLE_CONSTANTS.PAGINATION.ITEMS_PER_PAGE,
    ...filters, // Direct spread - no manual mapping needed
  };

  const queryResult = useQuery({
    queryKey: ['vehicles', queryParams],
    queryFn: () => getVehicles(queryParams),
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

  // Handle search and filter changes (receives VehicleFilters format)
  const onFilter = useCallback((filters: Partial<VehicleFilters>) => {
    setFilters(filters);
    setPage(1); // Reset to first page when filtering
  }, []);

  return {
    ...queryResult,
    page,
    nextPage,
    previousPage,
    goToPage,
    onFilter,
    // Applied filters for export
    filters: queryParams,
    // Convenient data access
    vehicles: queryResult.data?.vehicles || [],
    totalCount: queryResult.data?.count || 0,
  };
};
