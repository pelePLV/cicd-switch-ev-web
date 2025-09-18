'use client';

import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { TimeFilterButtons, TimeFilterType } from './time-filter-buttons';
import { useSwapCosts } from '@/hooks/use-swap-costs';
import { formatPriceByDeptMark } from '@/lib/helpers/format';

interface CostOfBatterySwapChartProps {
  className?: string;
  title: string;
  deptId: number;
}

export const CostOfBatterySwapChart: React.FC<CostOfBatterySwapChartProps> = ({
  className = '',
  title,
  deptId,
}) => {
  const [activeFilter, setActiveFilter] = useState<TimeFilterType>('month');

  const { data, error, isLoading } = useSwapCosts({
    // only include filter if not "alltime"
    ...(activeFilter !== 'alltime' && { filter: activeFilter }),
    deptId,
  });

  const dates = data?.map(d => d.date) ?? [];
  const values = data?.map(d => d.costOfBatterySwap) ?? [];

  const handleFilterChange = (filter: TimeFilterType) => {
    setActiveFilter(filter);
  };

  const chartOption = data?.length
    ? {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: (params: any) =>
            `${params[0].name}<br/>Amount: ${formatPriceByDeptMark(
              params[0].value,
              deptId
            )}`,
        },
        xAxis: {
          type: 'category',
          data: dates,
          axisLabel: { fontSize: 12, color: '#666' },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter(value: number) {
              if (value >= 1_000_000)
                return `${(value / 1_000_000).toFixed(1)}M`;
              if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
              return value.toString();
            },
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
            data: values,
            type: 'bar',
            barWidth: '50%',
            itemStyle: {
              borderRadius: [8, 8, 0, 0],
              color: '#4EC07B',
            },
          },
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
      }
    : null;

  return (
    <div
      className={`flex-1 overflow-hidden rounded-xl border border-gray-200 bg-green-50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${className} `}
    >
      {/* Header */}
      <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        <TimeFilterButtons
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Chart / Loading / Error / Empty */}
      <div className="relative flex h-[300px] w-full items-center justify-center pl-3 lg:h-[300px]">
        {isLoading && (
          <div className="absolute inset-0 h-full w-full animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
        )}

        {error && !isLoading && (
          <div className="text-red-500">Failed to load data.</div>
        )}

        {!error && !isLoading && data?.length === 0 && (
          <div className="text-gray-500">No data available.</div>
        )}

        {!error && !isLoading && data && data?.length > 0 && chartOption && (
          <ReactECharts
            option={chartOption}
            style={{ height: '100%', width: '100%' }}
            opts={{ 
              renderer: 'canvas',
              // useDirtyRect: true,
              //lazyUpdate: true
            }}
            lazyUpdate={true}
          />
        )}
      </div>
    </div>
  );
};
