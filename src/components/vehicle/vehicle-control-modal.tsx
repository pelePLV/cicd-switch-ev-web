'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  FaLock,
  FaUnlock,
  FaExclamationTriangle,
  FaBan,
  FaShieldAlt,
  FaCog,
  FaChevronUp,
} from 'react-icons/fa';
import { Vehicle } from '@/types/vehicle.types';

interface VehicleControlModalProps {
  vehicle: Vehicle | null;
  open: boolean;
  onClose: () => void;
}

export const VehicleControlModal: React.FC<VehicleControlModalProps> = ({
  vehicle,
  open,
  onClose,
}) => {
  const [selectedCommand, setSelectedCommand] = useState<string | null>(null);

  const controlButtons = [
    { type: 'CLOSE_ACC', icon: <FaLock />, label: 'Lock' },
    { type: 'OPEN_ACC', icon: <FaUnlock />, label: 'Unlock' },
    {
      type: 'OPEN_DEFEND',
      icon: <FaExclamationTriangle />,
      label: 'Alert Warning',
    },
    { type: 'CLOSE_DEFEND', icon: <FaBan />, label: 'Disable Alert' },
    { type: 'FIND_CAR', icon: <FaShieldAlt />, label: 'Find Car' },
    { type: 'OPEN_SEAT_LOCK', icon: <FaCog />, label: 'Open Seat' },
  ];

  const handleCommandSelect = (cmdType: string) => {
    setSelectedCommand(cmdType === selectedCommand ? null : cmdType);
  };

  const handleSendCommand = () => {
    if (selectedCommand) {
      console.log(
        `Sending command: ${selectedCommand} to vehicle: ${vehicle?.devId}`
      );
      // Here you would implement the actual command sending logic
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-green-600">
            Vehicle Controls
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-600"></DialogDescription>
        </DialogHeader>

        {/* Vehicle Details */}
        <div className="mb-6 border-t border-gray-200 pt-4">
          <div className="mb-4 flex items-center justify-between py-3">
            <span className="text-base font-medium text-gray-700">
              Vehicle Detail
            </span>
            <FaChevronUp className="text-sm text-gray-400" />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-light text-gray-500">License:</span>
              <span className="text-sm font-light text-gray-500">
                {vehicle?.licensePlate || 'TC61'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-light text-gray-500">
                Vehicle ID:
              </span>
              <span className="text-sm font-light text-gray-500">
                {vehicle?.devId || '8545255258'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-light text-gray-500">Battery:</span>
              <span className="text-sm font-light text-gray-500">
                1: 76438542 (50%); 2: 76438542 (40%)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-light text-gray-500">
                Rental Status:
              </span>
              <span className="text-sm font-light text-gray-500">Rented</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-light text-gray-500">
                Vehicle Status:
              </span>
              <span className="text-sm font-light text-gray-500">Online</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-light text-gray-500">Driver:</span>
              <span className="text-sm font-light text-gray-500">
                {vehicle?.userName || 'Yun'}
              </span>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          {controlButtons.map(button => (
            <div
              key={button.type}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border p-4 transition-all ${selectedCommand === button.type ? 'border-green-500' : 'border-gray-200 hover:border-green-500 hover:bg-slate-50'}`}
              onClick={() => handleCommandSelect(button.type)}
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
                <span className="text-xl text-green-600">{button.icon}</span>
              </div>
              <span className="text-center text-sm font-normal text-gray-700">
                {button.label}
              </span>
            </div>
          ))}
        </div>

        {/* Footer Buttons */}
        <DialogFooter className="flex justify-between gap-3 sm:flex-row">
          <Button
            onClick={onClose}
            className="flex-1 rounded-lg border-none bg-green-100 px-6 py-3 text-sm font-medium text-green-700 hover:bg-green-200"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendCommand}
            disabled={!selectedCommand}
            className="flex-1 rounded-lg border-none bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 text-sm font-medium text-white hover:from-green-700 hover:to-green-600 active:from-green-800 active:to-green-700 disabled:opacity-50"
          >
            Send Command
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
