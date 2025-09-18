import { VehicleTrackingFilters } from '@/lib/validations/filter-validation';
import { downloadFileWithKy } from '@/lib/api/download-file-with-ky';
import ApiRoutes from '@/lib/constants/api-routes';
import { useMutation } from '@tanstack/react-query';

export const useVehicleTrackingExport = () => {
  return useMutation({
    mutationFn: (filters?: VehicleTrackingFilters) =>
      downloadFileWithKy(
        ApiRoutes.TRACKING_CAR_TRACK_EXPORT,
        filters ?? {},
        'vehicle-tracking.xlsx'
      ),
  });
};
