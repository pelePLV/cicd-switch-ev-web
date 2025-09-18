import { getSwitches } from '@/lib/api/get-switches';
import { useQuery } from '@tanstack/react-query';
import { SwitchFilters } from '@/lib/validations/filter-validation';
import { useState, useCallback } from 'react';
import TABLE_CONSTANTS from '@/lib/constants/table-constants';


export const useSwitches = (
  initialParams?: Omit<SwitchFilters, 'pageNumber'>
) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [filters, setFilters] = useState<Partial<SwitchFilters>>({});

  // Build complete params with pagination, search, and filters
  const queryParams: SwitchFilters = {
    ...initialParams,
    pageNumber: pageNumber,
    limit: initialParams?.limit || TABLE_CONSTANTS.PAGINATION.ITEMS_PER_PAGE,
    ...filters, // Direct spread - no manual mapping needed
  };

  const queryResult = useQuery({
    queryKey: ['switchs', queryParams],
    queryFn: () => getSwitches(queryParams),
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
  const onFilter = useCallback((filters: Partial<SwitchFilters>) => {
    setFilters(filters);
    setPageNumber(1); // Reset to first page when filtering
  }, []);

  return {
    ...queryResult,
    pageNumber,
    nextPage,
    previousPage,
    goToPage,
    onFilter,
    // Applied filters for export
    filters: queryParams,
    // Convenient data access
    switches: queryResult.data?.list || [],
    totalCount: queryResult.data?.count || 0,
  };
};

// export const useOneSwitch = (switchId: string, deptId?: number) => {
//   const queryResult = useQuery({
//     queryKey: ['oneSwitch', switchId, deptId],
//     queryFn: () => getOneSwitchApi({ devId: switchId, deptId }),
//     enabled: !!switchId, // Only run query if switchId is provided
//   });

//   return {
//     ...queryResult,
//     // Convenient data access
//     switchData: queryResult.data,
//     batteries: queryResult.data?.switchCab?.doors || [],
//   };
// };
