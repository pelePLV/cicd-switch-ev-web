import { useQuery } from '@tanstack/react-query';
import { getSwitchDetail } from '@/lib/api/get-switch-detail';

export const useSwitchDetail = (stationId: string) => {
  return useQuery({
    queryKey: ['switchs', stationId],
    queryFn: () => getSwitchDetail(stationId),
  });
};
