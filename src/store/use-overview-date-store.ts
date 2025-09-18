import { create } from 'zustand';
import { getDateRange } from '@/lib/helpers/date-range';
import { DateOption } from '@/types/date-filter.types';

interface OverviewDateState {
  startDate: Date | null;
  endDate: Date | null;
  selectedDateOption: DateOption;
  setDateRange: (option: DateOption) => void;
  setCustomDateRange: (startDate: Date | null, endDate: Date | null) => void;
  clear: () => void;
}

// Initialize with "This Month" by default
const { start: initialStart, end: initialEnd } = getDateRange('this-month');

export const useOverviewDateStore = create<OverviewDateState>(set => ({
  startDate: initialStart,
  endDate: initialEnd,
  selectedDateOption: 'this-month',

  setDateRange: (option: DateOption) => {
    const { start, end } = getDateRange(option);
    set({ 
      startDate: start, 
      endDate: end, 
      selectedDateOption: option 
    });
  },

  setCustomDateRange: (startDate: Date | null, endDate: Date | null) => 
    set({ startDate, endDate, selectedDateOption: 'pick-range' }),

  clear: () => {
    const { start, end } = getDateRange('this-month');
    set({ 
      startDate: start, 
      endDate: end,
      selectedDateOption: 'this-month'
    });
  },
}));
