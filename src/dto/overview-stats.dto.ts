import { formatPriceByDeptMark } from '@/lib/helpers/format';
import { DashboardStats } from '@/types/dashboard-stats.types';
import { FaCar, FaLocationDot, FaLeaf, FaMoneyBillWave } from 'react-icons/fa6';

export type PercentageType = 'positive' | 'negative' | 'neutral';

export enum OverviewStatId {
  Vehicles = 'vehicles',
  TotalKm = 'total-km',
  Co2Saved = 'co2-saved',
  BatterySwaps = 'battery-swaps',
  CostBatterySwapLak = 'cost-battery-swap-lak',
  CostBatterySwapBaht = 'cost-battery-swap-baht',
}
interface OverviewStatItemDto {
  id: OverviewStatId;
  title: string;
  value: string;
  percentage?: string;
  percentageType?: PercentageType;
  icon: any;
  colSpan: string;
}

export function mapDashboardToStats(
  data: DashboardStats
): OverviewStatItemDto[] {
  return [
    {
      id: OverviewStatId.Vehicles,
      title: 'Number of vehicles',
      value: `${data.activeVehicle}`,
      icon: FaCar,
      colSpan: '2',
    },
    // {
    //   id: 'vehicles',
    //   title: 'Number of vehicles',
    //   value: `${data.vehicleStats.todayChange}`,
    //   percentage: data.vehicleStats.percentageChange,
    //   percentageType: getPercentageType(data.vehicleStats.percentageChange),
    //   icon: FaCar,
    //   colSpan: '2',
    // },
    {
      id: OverviewStatId.TotalKm,
      title: 'Total KM',
      value: data.mileageStats.currentMonth,
      percentage: data.mileageStats.percentageMonthChange,
      percentageType: getPercentageType(
        data.mileageStats.percentageMonthChange
      ),
      icon: FaLocationDot,
      colSpan: '2',
    },
    {
      id: OverviewStatId.Co2Saved,
      title: 'Total CO₂ Saved (Kg)',
      value: data.co2Stats.savedByEv,
      percentage: data.co2Stats.percentageMonthChange,
      percentageType: getPercentageType(data.co2Stats.percentageMonthChange),
      icon: FaLeaf,
      colSpan: '2',
    },
    {
      id: OverviewStatId.BatterySwaps,
      title: 'Total Battery Swaps',
      value: `${data.batterySwapStats.thisMonthTotal}`,
      percentage: data.batterySwapStats.percentageOrderChange,
      percentageType: getPercentageType(
        data.batterySwapStats.percentageOrderChange
      ),
      icon: FaMoneyBillWave,
      colSpan: '6',
    },
    {
      id: OverviewStatId.CostBatterySwapLak,
      title: 'Cost of Battery Swap (LAK)',
      value: `${formatPriceByDeptMark(data.batterySwapCostStats.kip.currentMonth, 101)}`,
      percentage: data.batterySwapCostStats.kip.percentageMonthChange,
      percentageType: getPercentageType(
        data.batterySwapCostStats.kip.percentageMonthChange
      ),
      icon: FaMoneyBillWave,
      colSpan: '3',
    },
    {
      id: OverviewStatId.CostBatterySwapBaht,
      title: 'Cost of Battery Swap (Baht)',
      value: `${formatPriceByDeptMark(data.batterySwapCostStats.bath.currentMonth, 102)}`,
      percentage: data.batterySwapCostStats.bath.percentageMonthChange,
      percentageType: getPercentageType(
        data.batterySwapCostStats.bath.percentageMonthChange
      ),
      icon: FaMoneyBillWave,
      colSpan: '3',
    },
  ];
}

function getPercentageType(value: string): PercentageType {
  const parsed = parseFloat(value.replace('%', ''));
  if (isNaN(parsed)) return 'neutral';
  return parsed > 0 ? 'positive' : parsed < 0 ? 'negative' : 'neutral';
}
