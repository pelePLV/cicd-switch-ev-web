import { useQuery } from '@tanstack/react-query';
import { TotalRiddenFilters } from '@/lib/validations/filter-validation';
import { getTotalRiddenStats } from '@/lib/api/get-total-ridden-stats';

export const useTotalRiddens = (initialParams?: TotalRiddenFilters) => {
  // Build complete params with pagination, search, and filters
  const queryParams: TotalRiddenFilters = {
    ...initialParams,
  };

  return useQuery({
    queryKey: ['totalRiddens', queryParams],
    queryFn: () => getTotalRiddenStats(queryParams),
  });
};
