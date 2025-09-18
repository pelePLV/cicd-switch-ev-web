import { get } from '@/lib/helpers/ky-api-client';
import ApiRoutes from '@/lib/constants/api-routes';
import {
  BatteryTransactionFilters,
  batteryTransactionFiltersSchema,
} from '@/lib/validations/filter-validation';
import { ApiResponse, ListResponse } from '@/types/response.types';
import {
  BatteryTransactionDto,
  mapToBatteryTransactionDto,
} from '@/dto/battery-transaction.dto';
import { BatteryTransactionLog } from '@/types/battery-transaction.types';
import { PaginatedDataResponse } from '@/types/paginated-response.types';

export const getBatteryTransactionsByStation = async (
  stationId: string,
  filters?: BatteryTransactionFilters
): Promise<ListResponse<BatteryTransactionDto>> => {
  try {
    // Validate filters if provided
    const validatedFilters = filters
      ? batteryTransactionFiltersSchema.parse(filters)
      : {};

    // Call Spring Boot API with ky wrapper
    const data: ApiResponse<PaginatedDataResponse<BatteryTransactionLog>> =
      await get(`${ApiRoutes.BATTERY_TRANSACTION_BY_SWITCH}${stationId}`, {
        searchParams: validatedFilters,
        credentials: 'include',
      });

    // Transform the response to match our expected format
    const transformedData: ListResponse<BatteryTransactionDto> = {
      list: data.data.list.map(log => mapToBatteryTransactionDto(log)),
      count: data.data.total,
    };

    return transformedData;
  } catch (error) {
    console.error('Battery Transaction API Error:', error);
    throw error;
  }
};
