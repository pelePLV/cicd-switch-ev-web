import { useQuery } from '@tanstack/react-query';
import { OverviewFilters } from '@/lib/validations/filter-validation';
import { getOverviewStats } from '@/lib/api/get-overview-stats';

export const useOverview = (initialParams?: OverviewFilters) => {
  // Build complete params with pagination, search, and filters
  const queryParams: OverviewFilters = {
    ...initialParams,
  };

  return useQuery({
    queryKey: ['overview', queryParams],
    queryFn: () => getOverviewStats(queryParams),
  });
};
