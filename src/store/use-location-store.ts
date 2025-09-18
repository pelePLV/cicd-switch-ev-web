import { create } from 'zustand';

// Enum for department IDs
export enum DeptId {
  All = 'all',
  Laos = '101',
  Thailand = '102',
}

// For mapping to readable labels
export const DeptLabels: Record<DeptId, string> = {
  [DeptId.All]: 'ALL',
  [DeptId.Laos]: 'SWITCH-LA',
  [DeptId.Thailand]: 'SWITCH-TH',
};

interface LocationState {
  selectedDeptId: DeptId;
  setSelectedDeptId: (dept: DeptId) => void;
  reset: () => void;
}

export const useLocationStore = create<LocationState>()((set) => ({
  selectedDeptId: DeptId.All,
  
  setSelectedDeptId: (dept: DeptId) => set({ selectedDeptId: dept }),
  
  reset: () => set({ selectedDeptId: DeptId.All }),
}));
