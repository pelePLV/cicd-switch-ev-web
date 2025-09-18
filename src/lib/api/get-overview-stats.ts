import { get } from '@/lib/helpers/ky-api-client';
import ApiRoutes from '@/lib/constants/api-routes';
import { ApiResponse } from '@/types/response.types';
import {
  OverviewFilters,
  overviewFiltersSchema,
} from '../validations/filter-validation';
import { DashboardStats } from '@/types/dashboard-stats.types';
import { mapDashboardToStats } from '@/dto/overview-stats.dto';

export const getOverviewStats = async (filters?: OverviewFilters) => {
  try {
    // Validate filters if provided
    const validatedFilters = filters
      ? overviewFiltersSchema.parse(filters)
      : {};
    // Call Spring Boot API with ky wrapper
    const response: ApiResponse<DashboardStats> = await get(`${ApiRoutes.OVERVIEW}`, {
      searchParams: validatedFilters,
      credentials: 'include',
    });

    return mapDashboardToStats(response.data);
  } catch (error) {
    console.error('Switch API Error:', error);
    throw error;
  }
};
