export type DateOption = 'this-week' | 'this-month' | 'this-year' | 'all-time' | 'pick-range';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}
