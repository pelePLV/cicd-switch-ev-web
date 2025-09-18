'use client';

import React, { useMemo, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption, SeriesOption } from 'echarts';
import { TimeFilterButtons, TimeFilterType } from './time-filter-buttons';
import { useTotalRiddens } from '@/hooks/use-total-ridden';
import { useLocationStore, DeptId } from '@/store/use-location-store';
import { TotalRiddenFilters } from '@/lib/validations/filter-validation';
import { formatNumberWithCommas } from '@/lib/helpers/format';

interface TotalKmChartProps {
  className?: string;
}

export const TotalKmChart: React.FC<TotalKmChartProps> = ({
  className = '',
}) => {
  const [activeFilter, setActiveFilter] = useState<TimeFilterType>('month');
  // Subscribe to location store
  const { selectedDeptId } = useLocationStore();

  // map enum to number | undefined for the hook
  const numericDeptId = useMemo(
    () => selectedDeptId === DeptId.All ? undefined : Number(selectedDeptId),
    [selectedDeptId]
  );

  // stable params for hook typing (not strictly required for react-query)
  const params = useMemo<TotalRiddenFilters>(
    () => ({
      // only include filter if not "alltime"
      ...(activeFilter !== 'alltime' && { filter: activeFilter }),
      // only include deptId if not "All" 
      ...(numericDeptId && { deptId: numericDeptId })
    }),
    [activeFilter, numericDeptId]
  );
  const { data, error, isLoading } = useTotalRiddens(params);

  const dates = data?.map(d => d.date) ?? [];
  const values = data?.map(d => d.totalKmRidden) ?? [];

  const handleFilterChange = (filter: TimeFilterType) =>
    setActiveFilter(filter);

  const chartOption: EChartsOption | null = data?.length
    ? {
        tooltip: {
          trigger: 'axis',
          position: function (pt: any) {
            return [pt[0], '10%'];
          },
          formatter: (params: any) => {
            const param = Array.isArray(params) ? params[0] : params;
            return `${param.name}<br/>Distance: ${formatNumberWithCommas(param.value)} kilometers`;
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: dates,
          axisLabel: { fontSize: 12, color: '#666' },
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          axisLabel: {
            formatter: (value: number) => `${value} km`,
            fontSize: 12,
            color: '#666',
          },
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100
          }
        ],
        series: [
          {
            name: 'Total Distance',
            data: values,
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            smooth: false,
            itemStyle: {
              color: '#4EC07B'
            },
            lineStyle: { 
              color: '#4EC07B', 
              width: 2 
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(78, 192, 123, 0.4)' },
                  { offset: 1, color: 'rgba(78, 192, 123, 0.1)' },
                ],
              },
            },
          } as SeriesOption,
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '15%',
          containLabel: true,
        },
      }
    : null;

  let chartContent: React.ReactNode;
  if (isLoading) {
    chartContent = (
      <div className="absolute inset-0 h-full w-full animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
    );
  } else if (error) {
    chartContent = <div className="text-red-500">Failed to load data.</div>;
  } else if (!data || data.length === 0) {
    chartContent = <div className="text-gray-500">No data available.</div>;
  } else {
    chartContent = (
      <ReactECharts
        option={chartOption!}
        style={{ height: '100%', width: '100%' }}
        opts={{ 
          renderer: 'canvas'
        }}
        lazyUpdate={true}
      />
    );
  }

  return (
    <div
      className={`flex-1 overflow-hidden rounded-xl border border-gray-200 bg-[#F6FCF8] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${className}`}
    >
      <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
        <h3 className="text-lg font-medium text-gray-700">Total KM</h3>
        <TimeFilterButtons
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
      </div>
      <div className="relative flex h-[300px] w-full items-center justify-center pl-3 lg:h-[300px]">
        {chartContent}
      </div>
    </div>
  );
};
