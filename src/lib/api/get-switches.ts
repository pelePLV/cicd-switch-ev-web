import { get } from '@/lib/helpers/ky-api-client';
import ApiRoutes from '@/lib/constants/api-routes';
import {
  SwitchFilters,
  switchFiltersSchema,
} from '@/lib/validations/filter-validation';
import { ApiResponse, ListResponse } from '@/types/response.types';
import { PaginatedDataResponse } from '@/types/paginated-response.types';
import { SwitchCabinet } from '@/types/switch-cabinets.types';

export const getSwitches = async (filters?: SwitchFilters) => {
  try {
    // Validate filters if provided
    const validatedFilters = filters ? switchFiltersSchema.parse(filters) : {};

    // Call Spring Boot API with ky wrapper
    const response: ApiResponse<PaginatedDataResponse<SwitchCabinet>> = await get(ApiRoutes.SWITCH_CABINETS, {
      searchParams: validatedFilters,
      credentials: 'include',
    });

    const data: ListResponse<SwitchCabinet> = {
      list: response.data.list,
      count: response.data.total,
    };

    return data;
  } catch (error) {
    console.error('Switch API Error:', error);
    throw error;
  }
};
