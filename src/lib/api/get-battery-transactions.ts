import { get } from '@/lib/helpers/ky-api-client';
import ApiRoutes from '@/lib/constants/api-routes';
import { BatteryTransactionLog } from '@/types/battery-transaction.types';
import {
  BatteryTransactionFilters,
  batteryTransactionFiltersSchema,
} from '@/lib/validations/filter-validation';
import { PaginatedDataResponse } from '@/types/paginated-response.types';
import { ApiResponse, ListResponse } from '@/types/response.types';

export const getBatteryTransactions = async (
  filters?: BatteryTransactionFilters
): Promise<ListResponse<BatteryTransactionLog>> => {
  try {
    // Validate filters if provided
    const validatedFilters = filters
      ? batteryTransactionFiltersSchema.parse(filters)
      : {};

    // Call Spring Boot API with ky wrapper
    const data: ApiResponse<PaginatedDataResponse<BatteryTransactionLog>> =
      await get(ApiRoutes.BATTERY_TRANSACTION_FLOW, {
        searchParams: validatedFilters,
        credentials: 'include',
      });

    // Transform the response to match our expected format
    const transformedData: ListResponse<BatteryTransactionLog> = {
      list: data.data.list,
      count: data.data.total,
    };

    return transformedData;
  } catch (error) {
    console.error('Battery Transaction API Error:', error);
    throw error;
  }
};
