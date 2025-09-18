'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
  GoogleMap as GoogleMapComponent,
  LoadScript,
} from '@react-google-maps/api';
import { MapMarkers } from './map-markers';
import { VehicleInfoModal } from './vehicle-info-modal';
import { VehicleTrackingOverlay } from './vehicle-tracking-overlay';
import { FaExclamationTriangle } from 'react-icons/fa';
import { SwitchStationModal } from './switch-station-modal';
import { useVehicleTrackingStore } from '@/store/use-vehicle-tracking-store';

// Libraries array as const outside component to prevent unnecessary reloads
const libraries: 'geometry'[] = ['geometry'];

interface GoogleMapProps {
  className?: string;
  activeFilters?: string[];
  onStreetView?: (isStreetView: boolean) => void;
}

// Map container style
const containerStyle = {
  width: '100%',
  height: '100%',
};

// Center on Laos
const center = {
  lat: 17.9757,
  lng: 102.6331,
};

// Map options
const mapOptions: google.maps.MapOptions = {
  zoom: 6,
  mapTypeId: 'roadmap',
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ],
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: true,
  rotateControl: false,
  fullscreenControl: false,
  draggable: true,
  gestureHandling: 'greedy',
};

export const GoogleMap: React.FC<GoogleMapProps> = ({
  className = '',
  activeFilters = [],
  onStreetView,
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Get vehicle tracks from store
  const { vehicleTracks } = useVehicleTrackingStore();

  // Vehicle Modal State
  const [vehicleModal, setVehicleModal] = useState<{
    vehicleId: string | null;
    position: { top: number; left: number };
    isVisible: boolean;
    isLoading: boolean;
  }>({
    vehicleId: null,
    position: { top: 40, left: 800 },
    isVisible: false,
    isLoading: false,
  });

  // Switch Station Modal State
  const [switchStationModal, setSwitchStationModal] = useState<{
    stationId: string | null;
    position: { top: number; left: number };
    isVisible: boolean;
    isLoading: boolean;
  }>({
    stationId: null,
    position: { top: 140, left: 400 },
    isVisible: false,
    isLoading: false,
  });

  // Zoom to latest track location when vehicleTracks change
  useEffect(() => {
    if (map && vehicleTracks.length > 0) {
      // Get the last track in the array (most recently pushed)
      const latestTrack = vehicleTracks[vehicleTracks.length - 1];

      // Create new center from latest track's start location
      // Offset latitude slightly upward to account for table overlay
      const latOffset = 0.01; // Adjust this value as needed
      const newCenter = {
        lat: latestTrack.startWgs84Lat - latOffset,
        lng: latestTrack.startWgs84Lng,
      };

      // Set map center and zoom level
      map.setCenter(newCenter);
      map.setZoom(15); // Zoom level for detailed view
    }
  }, [map, vehicleTracks]);

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      setMap(map);
      setIsLoaded(true);

      // Add street view event listeners
      if (onStreetView) {
        const streetView = map.getStreetView();

        // Listen for street view visibility changes
        streetView.addListener('visible_changed', () => {
          const isVisible = streetView.getVisible();
          onStreetView(isVisible);
        });
      }
    },
    [onStreetView]
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Handle vehicle marker click
  const handleVehicleMarkerClick = useCallback(
    (vehicleId: string, position: { top: number; left: number }) => {
      // Close all other modals first
      setSwitchStationModal(prev => ({ ...prev, isVisible: false }));

      setVehicleModal({
        vehicleId: vehicleId,
        position: position,
        isVisible: true,
        isLoading: false,
      });
    },
    []
  );

  // Handle switch station marker click
  const handleSwitchStationMarkerClick = useCallback(
    (stationId: string, position: { top: number; left: number }) => {
      // Close all other modals first
      setVehicleModal(prev => ({ ...prev, isVisible: false }));

      setSwitchStationModal({
        stationId: stationId,
        position: position,
        isVisible: true,
        isLoading: false,
      });
    },
    []
  );

  // Handle hide vehicle modal
  const handleHideVehicleModal = useCallback(() => {
    setVehicleModal(prev => ({ ...prev, isVisible: false }));
  }, []);

  // Handle hide switch station modal
  const handleHideSwitchStationModal = useCallback(() => {
    setSwitchStationModal(prev => ({ ...prev, isVisible: false }));
  }, []);

  // Handle map click and drag to close all modals
  const handleCloseAllModals = useCallback(() => {
    // Close all modals when dragging map
    setVehicleModal(prev => ({ ...prev, isVisible: false }));
    setSwitchStationModal(prev => ({ ...prev, isVisible: false }));
  }, []);

  const onLoadScript = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const onLoadScriptError = useCallback(() => {
    setLoadError('Failed to load Google Maps API');
  }, []);

  if (loadError) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-gray-100 ${className}`}
      >
        <div className="text-center">
          <div className="mb-2 text-red-500">
            <FaExclamationTriangle className="mx-auto h-12 w-12" />
          </div>
          <span className="text-gray-600">{loadError}</span>
        </div>
      </div>
    );
  }

  return (
    // 100vh - 70px(navbar) = 93vh
    <div
      id="googleMap"
      className={`relative h-[calc(100vh-70px)] w-full ${className}`}
    >
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
        libraries={libraries}
        onLoad={onLoadScript}
        onError={onLoadScriptError}
        loadingElement={
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2 border-green-500"></div>
              <span className="text-gray-600">Loading map...</span>
            </div>
          </div>
        }
      >
        <GoogleMapComponent
          mapContainerStyle={containerStyle}
          center={center}
          options={mapOptions}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={handleCloseAllModals}
          onDragStart={handleCloseAllModals}
          onZoomChanged={handleCloseAllModals}
        >
          {/* Map Markers */}
          <MapMarkers
            activeFilters={activeFilters}
            onVehicleClick={handleVehicleMarkerClick}
            onSwitchStationClick={handleSwitchStationMarkerClick}
            map={map}
          />

          {/* Vehicle Tracking Overlay (draw tracking path and markers) */}
          <VehicleTrackingOverlay />
        </GoogleMapComponent>
      </LoadScript>

      {/* Vehicle Info Modal */}
      <VehicleInfoModal
        vehicleId={vehicleModal.vehicleId}
        position={vehicleModal.position}
        isVisible={vehicleModal.isVisible}
        isLoading={vehicleModal.isLoading}
        onClose={handleHideVehicleModal}
      />

      {/* Switch Station Modal */}
      <SwitchStationModal
        stationId={switchStationModal.stationId}
        position={switchStationModal.position}
        isVisible={switchStationModal.isVisible}
        isLoading={switchStationModal.isLoading}
        onClose={handleHideSwitchStationModal}
      />
    </div>
  );
};
