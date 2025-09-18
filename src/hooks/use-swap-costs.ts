import { useQuery } from '@tanstack/react-query';
import { getSwapCostStats } from '@/lib/api/get-swap-cost-stats';
import { SwapCostFilters } from '@/lib/validations/filter-validation';

export const useSwapCosts = (initialParams?: SwapCostFilters) => {
  // Build complete params with pagination, search, and filters
  const queryParams: SwapCostFilters = {
    ...initialParams,
  };

  return useQuery({
    queryKey: ['swapCosts', queryParams],
    queryFn: () => getSwapCostStats(queryParams),
  });
};
