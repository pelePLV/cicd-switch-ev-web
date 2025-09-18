import { useQuery } from '@tanstack/react-query';
import { UserFilters } from '@/lib/validations/filter-validation';
import { useState, useCallback } from 'react';
import TABLE_CONSTANTS from '@/lib/constants/table-constants';
import { getUsers } from '@/lib/api/get-users';

export const useUsers = (initialParams?: UserFilters) => {
  const [pageNumber, setPageNumber] = useState(initialParams?.pageNumber ?? 1);
  const [filters, setFilters] = useState<Partial<UserFilters>>({});
  // Build complete params with pagination, search, and filters
  const queryParams: UserFilters = {
    ...initialParams,
    pageNumber: pageNumber,
    limit: initialParams?.limit || TABLE_CONSTANTS.PAGINATION.ITEMS_PER_PAGE,
    ...filters, // Direct spread - no manual mapping needed
  };

  const queryResult = useQuery({
    queryKey: ['users', queryParams],
    queryFn: () => getUsers(queryParams),
  });

  // Pagination functions
  const nextPage = useCallback(() => {
    setPageNumber(prev => prev + 1);
  }, []);

  const previousPage = useCallback(() => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  }, []);

  const goToPage = useCallback((page: number) => {
    setPageNumber(Math.max(page, 1));
  }, []);

  // Handle search and filter changes (receives SwitchFilters format)
  const onFilter = useCallback((filters: Partial<UserFilters>) => {
    setFilters(filters);
    setPageNumber(1); // Reset to first page when filtering
  }, []);

  return {
    ...queryResult,
    pageNumber,
    nextPage,
    previousPage,
    goToPage,
    filters,
    onFilter,
    // Convenient data access
    users: queryResult.data?.list || [],
    totalCount: queryResult.data?.count || 0,
  };
};
