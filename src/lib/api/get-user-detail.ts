import { get } from '@/lib/helpers/ky-api-client';
import ApiRoutes from '@/lib/constants/api-routes';
import { UserReponse } from '@/types/customer-information.types';
import { ApiResponse } from '@/types/response.types';

export const getUserDetail = async (userId: string) => {
  try {
    // Call Spring Boot API with ky wrapper
    const response: ApiResponse<UserReponse> = await get(`${ApiRoutes.USER_BY_ID}${userId}`, {
      credentials: 'include',
    });

    return response.data;
  } catch (error) {
    console.error('Switch API Error:', error);
    throw error;
  }
};
