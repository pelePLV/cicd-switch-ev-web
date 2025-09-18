import { useQuery } from '@tanstack/react-query';
import { getTotalRiddenByUser } from '@/lib/api/get-total-ridden-by-user';

export const useTotalRiddensByUser = (userId: string) => {
  return useQuery({
    queryKey: ['totalRiddensByUser', userId],
    queryFn: () => getTotalRiddenByUser(userId),
  });
};
