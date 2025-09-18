'use client';

import React, { useState, useEffect } from 'react';
import { Polyline, Marker } from '@react-google-maps/api';
import { useVehicleTrackingStore } from '@/store/use-vehicle-tracking-store';

type VehicleTrackingOverlayProps = object;

export const VehicleTrackingOverlay: React.FC<
  VehicleTrackingOverlayProps
> = () => {
  // Vehicle tracking store
  const { vehicleTracks } = useVehicleTrackingStore();

  // Vehicle tracking paths and markers state
  const [trackingPaths, setTrackingPaths] = useState<
    Array<{
      trackId: string;
      path: google.maps.LatLng[];
      color: string;
    }>
  >([]);
  const [trackingMarkers, setTrackingMarkers] = useState<
    Array<{
      trackId: string;
      startMarker: { lat: number; lng: number };
      endMarker: { lat: number; lng: number };
      color: string;
    }>
  >([]);

  // Generate different colors for each track
  const getTrackColor = (index: number): string => {
    const colors = [
      '#FF0000', // Red
      '#00FF00', // Green
      '#0000FF', // Blue
      '#FF00FF', // Magenta
      '#00FFFF', // Cyan
      '#FFFF00', // Yellow
      '#FF8000', // Orange
      '#8000FF', // Purple
      '#FF0080', // Pink
      '#80FF00', // Lime
    ];
    return colors[index % colors.length];
  };

  // Process vehicle tracks into paths and markers
  useEffect(() => {
    if (vehicleTracks.length > 0 && window.google) {
      const newPaths: Array<{
        trackId: string;
        path: google.maps.LatLng[];
        color: string;
      }> = [];

      const newMarkers: Array<{
        trackId: string;
        startMarker: { lat: number; lng: number };
        endMarker: { lat: number; lng: number };
        color: string;
      }> = [];

      vehicleTracks.forEach((track, index) => {
        const color = getTrackColor(index);

        // Create path from mapPath.path
        const pathCoordinates = track.mapPath.path.map(
          point => new google.maps.LatLng(point.lat, point.lng)
        );

        newPaths.push({
          trackId: track.trackId,
          path: pathCoordinates,
          color: color,
        });

        // Create start and end markers
        newMarkers.push({
          trackId: track.trackId,
          startMarker: {
            lat: track.mapPath.startMarker.lat,
            lng: track.mapPath.startMarker.lng,
          },
          endMarker: {
            lat: track.mapPath.endMarker.lat,
            lng: track.mapPath.endMarker.lng,
          },
          color: color,
        });
      });

      setTrackingPaths(newPaths);
      setTrackingMarkers(newMarkers);
    } else {
      // Clear paths and markers when no tracks
      setTrackingPaths([]);
      setTrackingMarkers([]);
    }
  }, [vehicleTracks]);

  return (
    <>
      {/* Vehicle Tracking Paths */}
      {trackingPaths.map(pathData => (
        <Polyline
          key={`path-${pathData.trackId}`}
          path={pathData.path}
          options={{
            strokeColor: pathData.color,
            strokeOpacity: 0.8,
            strokeWeight: 4,
            zIndex: 1000,
          }}
        />
      ))}

      {/* Vehicle Tracking Start/End Markers */}
      {trackingMarkers.map(markerData => (
        <React.Fragment key={`markers-${markerData.trackId}`}>
          {/* Start Marker */}
          <Marker
            position={markerData.startMarker}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: markerData.color,
              fillOpacity: 1,
              strokeColor: '#FFFFFF',
              strokeWeight: 2,
              scale: 8,
            }}
            title={`Start - Track ${markerData.trackId}`}
            zIndex={1001}
          />

          {/* End Marker */}
          <Marker
            position={markerData.endMarker}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: markerData.color,
              fillOpacity: 0.7,
              strokeColor: '#FFFFFF',
              strokeWeight: 2,
              scale: 6,
            }}
            title={`End - Track ${markerData.trackId}`}
            zIndex={1001}
          />
        </React.Fragment>
      ))}
    </>
  );
};
