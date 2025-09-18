'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  FaChevronLeft,
  FaPowerOff,
  FaCogs,
  FaCog,
  FaDesktop,
  FaCheck,
} from 'react-icons/fa';
import { Vehicle } from '@/types/vehicle.types';

interface VehicleConditionModalProps {
  vehicle: Vehicle | null;
  open: boolean;
  onClose: () => void;
}

export const VehicleConditionModal: React.FC<VehicleConditionModalProps> = ({
  open,
  onClose,
}) => {
  // Progress circle calculation
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progressValue = 85; // 85% condition
  const strokeDashoffset =
    circumference - (progressValue / 100) * circumference;

  const systemItems = [
    {
      icon: <FaPowerOff />,
      label: 'Power support system',
      bgColor: 'bg-emerald-500',
    },
    {
      icon: <FaCogs />,
      label: 'Central control system',
      bgColor: 'bg-blue-500',
    },
    { icon: <FaCog />, label: 'Dynamic system', bgColor: 'bg-amber-500' },
    { icon: <FaDesktop />, label: 'Display system', bgColor: 'bg-yellow-500' },
  ];

  return (
    <Dialog open={open} onOpenChange={open => !open && onClose()}>
      <DialogContent className="min-h-[600px] overflow-hidden rounded-2xl p-0 sm:max-w-[400px]">
        {/* Header */}
        <div className="relative flex items-center border-b border-gray-200 p-4">
          <button
            onClick={onClose}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-2 text-lg text-green-600 transition-all hover:bg-white/20"
          >
            <FaChevronLeft />
          </button>
          <DialogTitle className="absolute left-1/2 m-0 -translate-x-1/2 transform text-lg font-medium text-green-600">
            Vehicle Condition
          </DialogTitle>
          <DialogDescription className="sr-only"></DialogDescription>
        </div>

        {/* Fault Detection */}
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Fault Detection
            </span>
            <span className="text-xs font-normal text-gray-400">
              Latest detection: 2025-06-16 16:43:02
            </span>
          </div>

          <div className="flex min-h-[200px] flex-1 items-center justify-center p-5">
            <div className="flex h-full w-full flex-col items-center justify-center gap-5">
              {/* Circular Progress */}
              <div className="relative flex items-center justify-center">
                <svg
                  className="-rotate-90 transform drop-shadow-lg"
                  width="120"
                  height="120"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="transparent"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    className="opacity-20"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="transparent"
                    stroke="#10B981"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="animate-[progressAnimation_2s_ease-in-out] transition-all duration-500 ease-in-out"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center">
                  <span className="text-3xl leading-none font-semibold text-emerald-500">
                    85%
                  </span>
                </div>
              </div>

              {/* Condition Button */}
              <div className="flex w-full justify-center">
                <button className="cursor-pointer rounded-full border-none bg-gradient-to-r from-green-600 to-green-500 px-5 py-2 text-sm font-normal text-white shadow-[0_2px_8px_rgba(34,197,94,0.2)] transition-all hover:translate-y-[-1px] hover:from-green-700 hover:to-green-600 hover:shadow-[0_4px_12px_rgba(34,197,94,0.3)] active:translate-y-0 active:from-green-800 active:to-green-700 active:shadow-[0_2px_8px_rgba(34,197,94,0.2)]">
                  Condition: Excellent
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-gray-50 px-2 pb-2">
          {systemItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-white p-3 transition-all hover:bg-gray-50"
            >
              <div
                className={`mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-full ${item.bgColor}`}
              >
                <span className="text-sm text-white">{item.icon}</span>
              </div>
              <span className="flex-1 text-sm font-normal text-gray-700">
                {item.label}
              </span>
              <div className="flex items-center gap-3">
                <FaChevronLeft className="rotate-180 cursor-pointer text-sm text-gray-400 transition-all hover:text-gray-500" />
                <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-green-100">
                  <FaCheck className="text-xs font-bold text-emerald-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
