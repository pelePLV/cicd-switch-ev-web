import { create } from 'zustand';
import { VehicleTrack } from '@/types/vehicle-tracking.types';

interface VehicleTrackingState {
  vehicleTracks: VehicleTrack[];
  set: (tracks: VehicleTrack[]) => void;
  clear: () => void;
}

export const useVehicleTrackingStore = create<VehicleTrackingState>(set => ({
  vehicleTracks: [],

  set: (tracks: VehicleTrack[]) => set({ vehicleTracks: tracks }),

  clear: () => set({ vehicleTracks: [] }),
}));
