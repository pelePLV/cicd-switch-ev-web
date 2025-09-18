import { get } from '@/lib/helpers/ky-api-client';
import ApiRoutes from '@/lib/constants/api-routes';
import { ApiResponse } from '@/types/response.types';
import { SwitchCabinet } from '@/types/switch-cabinets.types';

export const getSwitchDetail = async (stationId: string) => {
  try {
    // Call Spring Boot API with ky wrapper
    const response: ApiResponse<SwitchCabinet> = await get(`${ApiRoutes.SWITCH_CABINET_BY_ID}${stationId}`, {
      credentials: 'include',
    });

    return response.data;
  } catch (error) {
    console.error('Switch API Error:', error);
    throw error;
  }
};
