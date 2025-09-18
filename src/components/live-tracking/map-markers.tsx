'use client';

import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

import { useMarker } from '@/hooks/use-marker';
import { CarMarker, SwitchMarker } from '@/types/marker.types';
import {
  adjustPositionForBounds,
  calculateMarkerScreenPosition,
} from '@/lib/helpers/map';

interface MapMarkersProps {
  activeFilters: string[];
  onVehicleClick?: (
    vehicleId: string,
    position: { top: number; left: number }
  ) => void;
  onSwitchStationClick?: (
    stationId: string,
    position: { top: number; left: number }
  ) => void;
  className?: string;
  map?: google.maps.Map | null;
}

export const MapMarkers: React.FC<MapMarkersProps> = ({
  activeFilters,
  onVehicleClick,
  onSwitchStationClick,
  className = '',
  map = null,
}) => {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  // Get real location data from hook
  const {
    onlineCarMarkers,
    offlineCarMarkers,
    switchMarkers,
    isLoading,
    error,
  } = useMarker();

  // Check if markers should be shown
  const shouldShow = (filter: string) => {
    // if no filters are active, show all markers
    if (activeFilters.length === 0) return true;

    // if filter is active, show only the markers for that filter
    return activeFilters.includes(filter);
  };

  // Handle vehicle marker click
  const handleVehicleMarkerClick = (car: CarMarker) => {
    if (onVehicleClick) {
      const screenPos = calculateMarkerScreenPosition(
        map,
        car.latitude,
        car.longitude
      );
      const adjustedPos = adjustPositionForBounds(
        screenPos.x,
        screenPos.y,
        340,
        300
      );
      const position = {
        top: adjustedPos.y,
        left: adjustedPos.x,
      };
      onVehicleClick(car.title, position);
    }
    setSelectedMarker(null); // Close any open info windows
  };

  // Handle switch station marker click
  const handleSwitchStationMarkerClick = (station: SwitchMarker) => {
    if (onSwitchStationClick) {
      const screenPos = calculateMarkerScreenPosition(
        map,
        station.latitude,
        station.longitude
      );
      const adjustedPos = adjustPositionForBounds(
        screenPos.x,
        screenPos.y,
        250,
        390
      );
      const position = {
        top: adjustedPos.y,
        left: adjustedPos.x,
      };
      onSwitchStationClick(station.title, position);
    }
    setSelectedMarker(null); // Close any open info windows
  };

  // Get vehicle marker icon
  const getVehicleIcon = (isOnline: boolean) => {
    return {
      url: isOnline
        ? '/icons/e-bike-online-marker.png'
        : '/icons/e-bike-offline-marker.png',
      scaledSize: new google.maps.Size(40, 40),
      anchor: new google.maps.Point(20, 40),
    };
  };

  // Get switch station marker icon
  const getSwitchStationIcon = () => {
    return {
      url: '/icons/switch-station-marker.png',
      scaledSize: new google.maps.Size(40, 40),
      anchor: new google.maps.Point(20, 40),
    };
  };

  // Don't render markers if data is loading or has error
  if (isLoading || error) {
    return <div className={className}></div>;
  }

  return (
    <div className={className}>
      {/* Online Vehicle Markers */}
      {shouldShow('online') &&
        onlineCarMarkers.map((car, index) => (
          <Marker
            key={`online-vehicle-${car.title || index}`}
            position={{ lat: car.latitude, lng: car.longitude }}
            title={`${car.title} (Online)`}
            icon={getVehicleIcon(true)}
            onClick={() => handleVehicleMarkerClick(car)}
            zIndex={1000}
          />
        ))}

      {/* Offline Vehicle Markers */}
      {shouldShow('offline') &&
        offlineCarMarkers.map((car, index) => (
          <Marker
            key={`offline-vehicle-${car.title || index}`}
            position={{ lat: car.latitude, lng: car.longitude }}
            title={`${car.title} (Offline)`}
            icon={getVehicleIcon(false)}
            onClick={() => handleVehicleMarkerClick(car)}
            zIndex={1000}
          />
        ))}

      {/* Switch Station Markers */}
      {shouldShow('switch-station') &&
        switchMarkers.map((station, index) => (
          <Marker
            key={`station-${station.title || index}`}
            position={{ lat: station.latitude, lng: station.longitude }}
            title={`Switch Station ${station.title || index + 1}`}
            icon={getSwitchStationIcon()}
            onClick={() => handleSwitchStationMarkerClick(station)}
            zIndex={999}
          />
        ))}
    </div>
  );
};
