import { get } from '@/lib/helpers/ky-api-client';
import ApiRoutes from '@/lib/constants/api-routes';
import { ApiResponse } from '@/types/response.types';
import { VehicleDetail } from '@/types/vehicle-detail.types';
import {
  VehicleDetailFilters,
  vehicleDetailFiltersSchema,
} from '@/lib/validations/filter-validation';

export const getVehicleDetail = async (filters: VehicleDetailFilters) => {
  try {
    // Validate filters
    const validatedFilters = vehicleDetailFiltersSchema.parse(filters);
    const { devId, ...searchParams } = validatedFilters;

    // Call Spring Boot API with ky wrapper
    const response: ApiResponse<VehicleDetail> = await get(
      `${ApiRoutes.DEVICE_BY_ID}${devId}`,
      {
        searchParams,
        credentials: 'include',
      }
    );

    return response.data;
  } catch (error) {
    console.error('Vehicle API Error:', error);
    throw error;
  }
};
