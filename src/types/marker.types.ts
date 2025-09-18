// Car marker from TRACKING_CAR_LOG API
export interface CarMarker {
  latitude: number;
  longitude: number;
  title: string;
  onlineStatus: string; // "1" for online, "2" for offline
}

// Switch marker from TRACKING_SWITCH API
export interface SwitchMarker {
  latitude: number;
  longitude: number;
  title: string;
  onlineStatus?: string;
  shardingKey?: number;
}

// Combined response for markers
export interface MarkersResponse {
  onlineCarMarkers: CarMarker[];
  offlineCarMarkers: CarMarker[];
  switchMarkers: SwitchMarker[];
}
