'use client';

import React from 'react';

interface SwitchButtonProps {
  activeTab: 'vehicle' | 'switch-station' | 'vehicle-detail';
  onTabChange: (tab: 'vehicle' | 'switch-station' | 'vehicle-detail') => void;
  className?: string;
}

export const SwitchButton: React.FC<SwitchButtonProps> = ({
  activeTab,
  onTabChange,
  className = '',
}) => {
  return (
    <div
      className={`flex gap-2 rounded-full border border-gray-200 bg-gray-100 p-1 ${className}`}
    >
      <button
        className={`min-w-[100px] rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
          activeTab === 'vehicle'
            ? 'bg-switch-green-primary hover:bg-switch-green-primary-hover text-white shadow-sm'
            : 'bg-gray-100 text-gray-600'
        }`}
        onClick={() => onTabChange('vehicle')}
      >
        Vehicle
      </button>
      <button
        className={`min-w-[120px] rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
          activeTab === 'switch-station'
            ? 'bg-switch-green-primary hover:bg-switch-green-primary-hover text-white shadow-sm'
            : 'bg-gray-100 text-gray-600'
        }`}
        onClick={() => onTabChange('switch-station')}
      >
        Switch Station
      </button>
    </div>
  );
};
