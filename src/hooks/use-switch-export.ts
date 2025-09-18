import { useMutation } from '@tanstack/react-query';
import { SwitchFilters } from '@/lib/validations/filter-validation';
import { downloadFileWithKy } from '@/lib/api/download-file-with-ky';
import ApiRoutes from '@/lib/constants/api-routes';

export const useSwitchExport = () => {
  return useMutation({
    mutationFn: (filters?: SwitchFilters) =>
      downloadFileWithKy(
        ApiRoutes.SWITCH_EXPORT,
        filters ?? {},
        'switch-stations.xlsx'
      ),
  });
};
