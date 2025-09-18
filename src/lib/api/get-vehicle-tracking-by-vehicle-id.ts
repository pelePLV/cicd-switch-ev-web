import { get } from '@/lib/helpers/ky-api-client';
import ApiRoutes from '@/lib/constants/api-routes';
import {
  VehicleTrackingResponse,
  VehicleTrackingListResponse,
} from '@/types/vehicle-tracking.types';
import {
  VehicleTrackingFilters,
  vehicleTrackingFiltersSchema,
} from '@/lib/validations/filter-validation';

export const getVehicleTrackingByVehicleIdApi = async (
  filters: VehicleTrackingFilters
): Promise<VehicleTrackingListResponse> => {
  try {
    // Validate filters
    const validatedFilters = vehicleTrackingFiltersSchema.parse(filters);

    // Call Spring Boot API with ky wrapper
    const data: VehicleTrackingResponse = await get(ApiRoutes.TRACKING_CAR_TRACK, {
      searchParams: validatedFilters,
      credentials: 'include',
    });

    // Transform the response to match our expected format
    const transformedData: VehicleTrackingListResponse = {
      tracks: data.data.pageInfo.list,
      count: data.data.pageInfo.total,
      deviceInfo: data.data.device,
    };

    return transformedData;
  } catch (error) {
    console.error('Vehicle Tracking API Error:', error);
    throw error;
  }
};
