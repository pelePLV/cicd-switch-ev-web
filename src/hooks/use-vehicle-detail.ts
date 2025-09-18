import { useQuery } from '@tanstack/react-query';
import { getVehicleDetail } from '@/lib/api/get-vehicle-detail';
import { VehicleDetailFilters } from '@/lib/validations/filter-validation';

export const useVehicleDetail = (filters: VehicleDetailFilters) => {
  return useQuery({
    queryKey: ['vehicle-detail', filters],
    queryFn: () => getVehicleDetail(filters),
    enabled: !!filters.devId, // Only run query if devId is provided
  });
};
