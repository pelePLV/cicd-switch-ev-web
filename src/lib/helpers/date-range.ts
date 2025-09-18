import { startOfWeek, startOfMonth, startOfYear, endOfDay } from 'date-fns';
import { DateOption, DateRange } from '@/types/date-filter.types';

/**
 * Get date range based on the selected date option
 * @param option - The date option to calculate range for ('this-week', 'this-month', 'this-year', 'all-time', 'pick-range')
 * @returns DateRange object with start and end dates
 */
export const getDateRange = (option: DateOption): DateRange => {
  const now = new Date();
  
  switch (option) {
    case 'this-week': {
      // Calculate start of week (Monday) at 00:00:00 to today at 23:59:59
      const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday = 1
      const weekEnd = endOfDay(now); // Today at 23:59:59
      
      return { start: weekStart, end: weekEnd };
    }
    case 'this-month': {
      // Calculate start of month (1st day) at 00:00:00 to today at 23:59:59
      const monthStart = startOfMonth(now);
      const monthEnd = endOfDay(now); // Today at 23:59:59
      
      return { start: monthStart, end: monthEnd };
    }
    case 'this-year': {
      // Calculate start of year (January 1st) at 00:00:00 to today at 23:59:59
      const yearStart = startOfYear(now);
      const yearEnd = endOfDay(now); // Today at 23:59:59
      
      return { start: yearStart, end: yearEnd };
    }
    case 'all-time':
      // Return null dates to indicate no date filtering
      return { start: null, end: null };
    default:
      // Fallback for unknown options or 'pick-range' (handled by modal)
      return { start: null, end: null };
  }
};
