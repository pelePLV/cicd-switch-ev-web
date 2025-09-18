import { useQuery } from '@tanstack/react-query';
import { BatteryTransactionFilters } from '@/lib/validations/filter-validation';
import { useState, useCallback } from 'react';
import TABLE_CONSTANTS from '@/lib/constants/table-constants';
import { getBatteryTransactionsByStation } from '@/lib/api/get-battery-transactions-by-station';

export const useBatteryTransactionByStation = (
  stationId: string,
  initialParams?: Omit<BatteryTransactionFilters, 'page'>
) => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Partial<BatteryTransactionFilters>>(
    {}
  );

  // Build complete params with pagination, search, and filters
  const queryParams: BatteryTransactionFilters = {
    ...initialParams,
    page: page,
    size: initialParams?.size || TABLE_CONSTANTS.PAGINATION.ITEMS_PER_PAGE,
    ...filters, // Direct spread - no manual mapping needed
  };

  const queryResult = useQuery({
    queryKey: [`batteryTransactionsByStation/${stationId}`, queryParams],
    queryFn: () => getBatteryTransactionsByStation(stationId, queryParams),
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

  // Handle search and filter changes (receives BatteryTransactionFilters format)
  const onFilter = useCallback(
    (filters: Partial<BatteryTransactionFilters>) => {
      setFilters(filters);
      setPage(1); // Reset to first page when filtering
    },
    []
  );

  return {
    ...queryResult,
    page,
    nextPage,
    previousPage,
    goToPage,
    onFilter,
    // Convenient data access
    transactions: queryResult.data?.list || [],
    totalCount: queryResult.data?.count || 0,
  };
};
