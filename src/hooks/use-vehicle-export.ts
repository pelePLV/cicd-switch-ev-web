import { useMutation } from '@tanstack/react-query';
import { VehicleFilters } from '@/lib/validations/filter-validation';
import { downloadFileWithKy } from '@/lib/api/download-file-with-ky';
import ApiRoutes from '@/lib/constants/api-routes';

export const useVehicleExport = () => {
  return useMutation({
    mutationFn: (filters?: VehicleFilters) =>
      downloadFileWithKy(
        ApiRoutes.VEHICLE_EXPORT,
        filters ?? {},
        'vehicles.xlsx'
      ),
  });
};
