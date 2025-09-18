import { get } from '@/lib/helpers/ky-api-client';
import ApiRoutes from '@/lib/constants/api-routes';
import { VehicleListResponse, Vehicle } from '@/types/vehicle.types';
import {
  VehicleFilters,
  vehicleFiltersSchema,
} from '@/lib/validations/filter-validation';
import { PaginatedDataResponse } from '@/types/paginated-response.types';
import { ApiResponse } from '@/types/response.types';

export const getVehicles = async (
  filters?: VehicleFilters
): Promise<VehicleListResponse> => {
  try {
    // Validate filters if provided
    const validatedFilters = filters ? vehicleFiltersSchema.parse(filters) : {};

    // Call Spring Boot API with ky wrapper
    const response: ApiResponse<PaginatedDataResponse<Vehicle>> = await get(
      ApiRoutes.DEVICE_CARS,
      {
        searchParams: validatedFilters,
        credentials: 'include',
      }
    );

    // Transform the response to match our expected format
    const transformedData: VehicleListResponse = {
      vehicles: response.data.list,
      count: response.data.total,
    };

    return transformedData;
  } catch (error) {
    console.error('Vehicle API Error:', error);
    throw error;
  }
};
