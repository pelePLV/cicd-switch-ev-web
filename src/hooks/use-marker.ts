import { getMarkers } from '@/lib/api/get-markers';
import { useQuery } from '@tanstack/react-query';

export const useMarker = () => {
  const queryResult = useQuery({
    queryKey: ['markers'],
    queryFn: () => getMarkers(),
  });

  return {
    ...queryResult,
    // Convenient data access
    onlineCarMarkers: queryResult.data?.onlineCarMarkers || [],
    offlineCarMarkers: queryResult.data?.offlineCarMarkers || [],
    switchMarkers: queryResult.data?.switchMarkers || [],
    markers: queryResult.data,
  };
};
