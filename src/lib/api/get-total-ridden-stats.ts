import { get } from '@/lib/helpers/ky-api-client';
import ApiRoutes from '@/lib/constants/api-routes';
import { ApiResponse } from '@/types/response.types';
import {
  TotalRiddenFilters,
  totalRiddenFiltersSchema,
} from '../validations/filter-validation';
import { TotalRidden } from '@/types/total-ridden.types';

export const getTotalRiddenStats = async (filters?: TotalRiddenFilters) => {
  try {
    // Validate filters if provided
    const validatedFilters = filters
      ? totalRiddenFiltersSchema.parse(filters)
      : {};
    // Call Spring Boot API with ky wrapper
    const response: ApiResponse<TotalRidden[]> = await get(
      `${ApiRoutes.TOTAL_RIDDEN}`,
      {
        searchParams: validatedFilters,
        credentials: 'include',
      }
    );

    return response.data;
  } catch (error) {
    console.error('Switch API Error:', error);
    throw error;
  }
};
