import { post } from '@/lib/helpers/ky-api-client';
import ApiRoutes from '@/lib/constants/api-routes';
import { CarMarker, SwitchMarker, MarkersResponse } from '@/types/marker.types';
import { ApiResponse } from '@/types/response.types';

export const getMarkers = async (): Promise<MarkersResponse> => {
  try {
    // Fetch both APIs concurrently using Promise.all
    const [carMarkersResponse, switchMarkers] = await Promise.all([
      // Fetch car markers (POST request with ApiResponse wrapper)
      post<ApiResponse<CarMarker[]>>(ApiRoutes.TRACKING_CAR_LOG, {
        credentials: 'include',
        json: {}, // Empty JSON object for POST request
      }),

      // Fetch switch markers (POST request with direct array response)
      post<ApiResponse<SwitchMarker[]>>(ApiRoutes.TRACKING_SWITCH, {
        credentials: 'include',
        json: {}, // Empty JSON object for POST request
      }),
    ]);

    // Filter car markers by online status
    const carMarkers = carMarkersResponse.data || [];
    const onlineCarMarkers = carMarkers.filter(
      marker => marker.onlineStatus === '1'
    );
    const offlineCarMarkers = carMarkers.filter(
      marker => marker.onlineStatus === '2'
    );

    // Return combined data
    const markersResponse: MarkersResponse = {
      onlineCarMarkers,
      offlineCarMarkers,
      switchMarkers: switchMarkers.data || [],
    };

    return markersResponse;
  } catch (error) {
    console.error('Markers API Error:', error);
    throw error;
  }
};
