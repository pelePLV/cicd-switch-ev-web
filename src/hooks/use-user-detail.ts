import { useQuery } from '@tanstack/react-query';
import { getUserDetail } from '@/lib/api/get-user-detail';

export const useUserDetail = (userId: string) => {
  return useQuery({
    queryKey: ['users', userId],
    queryFn: () => getUserDetail(userId),
  });
};
