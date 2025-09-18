import { downloadFileWithKy } from '@/lib/api/download-file-with-ky';
import ApiRoutes from '@/lib/constants/api-routes';
import { UserFilters } from '@/lib/validations/filter-validation';
import { useMutation } from '@tanstack/react-query';

export const useUsersExport = () => {
  return useMutation({
    mutationFn: (filters?: UserFilters) =>
      downloadFileWithKy(
        ApiRoutes.USERS_EXPORT,
        filters ?? {},
        'customer-informations.xlsx'
      ),
  });
};
