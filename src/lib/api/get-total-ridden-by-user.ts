import { get } from '@/lib/helpers/ky-api-client';
import ApiRoutes from '@/lib/constants/api-routes';
import { ApiResponse } from '@/types/response.types';
import { MileageAndCo2Stats } from '@/types/mileage-co2-stats.types';

export const getTotalRiddenByUser = async (userId: string) => {
  try {
    // Call Spring Boot API with ky wrapper
    const response: ApiResponse<MileageAndCo2Stats> = await get(`${ApiRoutes.TOTAL_RIDDEN}${userId}`, {
      credentials: 'include',
    });

    return response.data;
  } catch (error) {
    console.error('Switch API Error:', error);
    throw error;
  }
};
