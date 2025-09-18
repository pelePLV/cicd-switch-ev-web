import { useMutation } from '@tanstack/react-query';
import { BatteryTransactionFilters } from '@/lib/validations/filter-validation';
import { downloadFileWithKy } from '@/lib/api/download-file-with-ky';
import ApiRoutes from '@/lib/constants/api-routes';

export const useBatteryTransactionExport = () => {
  return useMutation({
    mutationFn: (filters?: BatteryTransactionFilters) =>
      downloadFileWithKy(
        ApiRoutes.BATTERY_TRANSACTION_EXPORT,
        filters ?? {},
        'battery-transactions.xlsx'
      ),
  });
};
