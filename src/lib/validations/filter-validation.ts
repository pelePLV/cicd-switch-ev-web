import { isAfter, isValid, parseISO } from 'date-fns';
import { z } from 'zod';

export const switchFiltersSchema = z.object({
  searchText: z.string().optional(),
  limit: z.coerce.number().int().positive().optional(),
  pageNumber: z.coerce.number().int().positive().optional(),
  switchStatus: z.string().optional(),
  startingDate: z.string().optional(),
  endDate: z.string().optional(),
  deptId: z.coerce.number().int().positive().optional(),
});

export type SwitchFilters = z.infer<typeof switchFiltersSchema>;

export const batteryTransactionFiltersSchema = z.object({
  searchText: z.string().optional(),
  page: z.coerce.number().int().positive().optional(),
  size: z.coerce.number().int().positive().optional(),
  logStatus: z.string().optional(),
  logType: z.string().optional(),
  userId: z.coerce.number().int().positive().optional(),
  switchCabId: z.string().optional(),
  createTime: z.string().optional(),
  reqTime: z.string().optional(),
  successTime: z.string().optional(),
  failTime: z.string().optional(),
  overTime: z.string().optional(),
  deptId: z.coerce.number().int().positive().optional(),
  getBatteryId: z.string().optional(),
  putBatteryId: z.string().optional(),
  orderId: z.coerce.number().int().positive().optional(),
  flowType: z.string().optional(),
});

export type BatteryTransactionFilters = z.infer<
  typeof batteryTransactionFiltersSchema
>;

export const vehicleFiltersSchema = z.object({
  searchText: z.string().optional(),
  limit: z.coerce.number().int().positive().optional(),
  pageNumber: z.coerce.number().int().positive().optional(),
  vehicleStatus: z.string().optional(),
  startingDate: z.string().optional(),
  endDate: z.string().optional(),
  deptId: z.coerce.number().int().positive().optional(),
});

export type VehicleFilters = z.infer<typeof vehicleFiltersSchema>;

export const vehicleTrackingFiltersSchema = z.object({
  devId: z.string(), // Required parameter
  page: z.coerce.number().int().positive().optional(),
  size: z.coerce.number().int().positive().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  deptId: z.coerce.number().int().positive().optional(),
});

export type VehicleTrackingFilters = z.infer<
  typeof vehicleTrackingFiltersSchema
>;

export const userFiltersSchema = z.object({
  searchText: z.coerce.string().optional(),
  limit: z.coerce.number().int().positive().optional(),
  pageNumber: z.coerce.number().int().positive().optional(),
  deptId: z.coerce.number().int().positive().optional(),
});

export type UserFilters = z.infer<typeof userFiltersSchema>;

export const getOneSwitchFiltersSchema = z.object({
  devId: z.string(), // Required parameter
  deptId: z.coerce.number().int().positive().optional(),
});

export type GetOneSwitchFilters = z.infer<typeof getOneSwitchFiltersSchema>;

export const swapCostFiltersSchema = z.object({
  filter: z.string().optional(),
  deptId: z.coerce.number().int().positive().optional(),
});

export type SwapCostFilters = z.infer<typeof swapCostFiltersSchema>;

export const totalRiddenFiltersSchema = z.object({
  filter: z.string().optional(),
  deptId: z.coerce.number().int().positive().optional(),
});

export type TotalRiddenFilters = z.infer<typeof totalRiddenFiltersSchema>;

export const overviewFiltersSchema = z
  .object({
    startDate: z
      .string()
      .optional()
      .refine(val => val === undefined || isValid(parseISO(val)), {
        message: 'Invalid start date format (expected YYYY-MM-DD)',
      }),
    endDate: z
      .string()
      .optional()
      .refine(val => val === undefined || isValid(parseISO(val)), {
        message: 'Invalid end date format (expected YYYY-MM-DD)',
      }),
    deptId: z.coerce.number().int().positive().optional(),
  })
  .refine(
    data => {
      if (data.startDate && data.endDate) {
        return !isAfter(parseISO(data.startDate), parseISO(data.endDate));
      }
      return true;
    },
    {
      message: 'Start date must be before or equal to end date',
      path: ['startDate'], // You can assign this to ['startDate', 'endDate'] too
    }
  );

export type OverviewFilters = z.infer<typeof overviewFiltersSchema>;

export const vehicleDetailFiltersSchema = z.object({
  devId: z.string(), // Required parameter
  deptId: z.coerce.number().int().positive().optional(),
});

export type VehicleDetailFilters = z.infer<typeof vehicleDetailFiltersSchema>;
