import { DeptId } from '@/store/use-location-store';

/**
 * Creates department filter object for API requests
 * Returns empty object if "All" is selected, otherwise includes deptId as number
 * 
 * @param selectedDeptId - The selected department ID from location store
 * @returns Object that can be spread into API request parameters
 * 
 * @example
 * // Usage in API calls:
 * const apiParams = {
 *   ...otherFilters,
 *   ...getDepartmentFilter(selectedDeptId)
 * }
 */
export const getDepartmentFilter = (selectedDeptId: DeptId): { deptId?: number } => {
  return selectedDeptId !== DeptId.All 
    ? { deptId: Number(selectedDeptId) } 
    : {};
};

