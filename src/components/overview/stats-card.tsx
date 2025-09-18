import { PercentageType } from '@/dto/overview-stats.dto';
import React from 'react';
import { IconType } from 'react-icons';

interface StatsCardProps {
  title: string;
  value: string | number;
  percentage?: string;
  percentageType?: PercentageType;
  icon: IconType;
  colSpan: string;
  show?: boolean;
  compareText?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  percentage,
  percentageType,
  icon: Icon,
  colSpan,
  show = true,
  compareText,
}) => {
  if (!show) return null;
  const percentageColorClass =
    percentageType === 'positive'
      ? 'bg-green-100 text-green-600'
      : 'bg-red-100 text-red-600';

  const getColSpanClass = (span: string) => {
    switch (span) {
      case '1':
        return 'lg:col-span-1';
      case '2':
        return 'lg:col-span-2';
      case '3':
        return 'lg:col-span-3';
      case '4':
        return 'lg:col-span-4';
      case '5':
        return 'lg:col-span-5';
      case '6':
        return 'lg:col-span-6';
      default:
        return 'lg:col-span-1';
    }
  };

  return (
    <div
      className={`${getColSpanClass(colSpan)} rounded-xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="mb-2 text-sm leading-relaxed font-normal text-gray-700">
            {title}
          </h3>
          <div className="mb-3 text-2xl font-semibold text-gray-900 lg:text-3xl">
            {value}
          </div>

          {percentage && compareText && (
            <div className="flex items-center gap-1.5 text-xs font-medium">
              <span
                className={`${percentageColorClass} min-w-[40px] rounded-2xl px-2 py-1 text-center`}
              >
                {percentage}
              </span>
              <span className="font-normal text-gray-500">{compareText}</span>
            </div>
          )}
        </div>
        <div className="bg-switch-soft-green-background ml-4 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full">
          <Icon className="text-switch-green-primary text-4xl" />
        </div>
      </div>
    </div>
  );
};
