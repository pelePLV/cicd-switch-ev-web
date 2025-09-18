'use client';

import React from 'react';
import { CostOfBatterySwapChart } from './cost-of-battery-swap-chart';
import { TotalKmChart } from './total-km-chart';
import { useLocationStore, DeptId } from '@/store/use-location-store';
import clsx from 'clsx';

const COST_CHARTS = [
  { deptId: DeptId.Laos, title: 'Cost of battery swap (LAK)' },
  { deptId: DeptId.Thailand, title: 'Cost of battery swap (Baht)' },
];

export const OverviewCharts = () => {
  const { selectedDeptId } = useLocationStore();

  const visibleCharts =
    selectedDeptId === DeptId.All
      ? COST_CHARTS
      : COST_CHARTS.filter(c => c.deptId === selectedDeptId);

  const single = visibleCharts.length === 1;

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {visibleCharts.map(chart => (
        <div key={chart.deptId} className={clsx(single && 'lg:col-span-2')}>
          <CostOfBatterySwapChart
            title={chart.title}
            deptId={Number(chart.deptId)}
          />
        </div>
      ))}

      <div className="lg:col-span-2">
        {/* If you want to filter TotalKmChart as well */}
        {/* <TotalKmChart deptId={selectedDeptId === DeptId.All ? undefined : Number(selectedDeptId)} /> */}
        <TotalKmChart />
      </div>
    </div>
  );
};
