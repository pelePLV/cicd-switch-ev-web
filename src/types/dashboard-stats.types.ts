export interface DashboardStats {
  activeVehicle: number;
  vehicleStats: {
    todayChange: number;
    percentageChange: string; // e.g. "-26.32%"
  };
  mileageStats: {
    currentMonth: string; // e.g. "3,395" as a formatted string
    percentageMonthChange: string;
  };
  co2Stats: {
    savedByEv: string; // e.g. "652" as a formatted string
    percentageMonthChange: string;
  };
  batterySwapStats: {
    thisMonthTotal: number;
    percentageOrderChange: string;
  };
  batterySwapCostStats: {
    kip: {
      currentMonth: number; // in LAK
      percentageMonthChange: string;
    };
    bath: {
      currentMonth: number; // in THB
      percentageMonthChange: string;
    };
  };
}
