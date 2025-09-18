import { get } from '@/lib/helpers/ky-api-client';
import ApiRoutes from '@/lib/constants/api-routes';
import { ApiResponse } from '@/types/response.types';
import {
  SwapCostFilters,
  swapCostFiltersSchema,
} from '../validations/filter-validation';
import { SwapCost } from '@/types/swap-cost.types';

export const getSwapCostStats = async (filters?: SwapCostFilters) => {
  try {
    // Validate filters if provided
    const validatedFilters = filters
      ? swapCostFiltersSchema.parse(filters)
      : {};
    // Call Spring Boot API with ky wrapper
    const response: ApiResponse<SwapCost[]> = await get(`${ApiRoutes.SWAP_COST}`, {
      searchParams: validatedFilters,
      credentials: 'include',
    });

    return response.data;
  } catch (error) {
    console.error('Switch API Error:', error);
    throw error;
  }
};
