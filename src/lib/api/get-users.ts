import { get } from '@/lib/helpers/ky-api-client';
import ApiRoutes from '@/lib/constants/api-routes';
import {
  UserFilters,
  userFiltersSchema,
} from '@/lib/validations/filter-validation';
import { UserReponse } from '@/types/customer-information.types';
import { PaginatedDataResponse } from '@/types/paginated-response.types';
import { ApiResponse, ListResponse } from '@/types/response.types';
import {
  CustomerInformationDto,
  mapToCustomerInformation,
} from '@/dto/customer-information.dto';

export const getUsers = async (filters?: UserFilters) => {
  try {
    // Validate filters if provided
    const validatedFilters = filters ? userFiltersSchema.parse(filters) : {};

    // Call Spring Boot API with ky wrapper
    const response: ApiResponse<PaginatedDataResponse<UserReponse>> = await get(ApiRoutes.USERS, {
      searchParams: validatedFilters,
      credentials: 'include',
    });

    const data: ListResponse<CustomerInformationDto> = {
      list: response.data.list.map(user => {
        return mapToCustomerInformation(user);
      }),
      count: response.data.total,
    };

    return data;
  } catch (error) {
    console.error('Switch API Error:', error);
    throw error;
  }
};
