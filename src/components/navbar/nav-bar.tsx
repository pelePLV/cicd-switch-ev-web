'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import engFlag from '@/public/images/eng-flag.svg';
import { HiMenu, HiZoomIn, HiLockClosed, HiCog } from 'react-icons/hi';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FaLocationDot } from 'react-icons/fa6';
import {
  useLocationStore,
  DeptLabels,
  DeptId,
} from '@/store/use-location-store';

interface NavbarProps {
  onToggleMobileSidebar?: () => void;
}

export const Navbar = ({ onToggleMobileSidebar }: NavbarProps) => {
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Location store for location selection
  const { selectedDeptId, setSelectedDeptId } = useLocationStore();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMobileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileDropdown = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  const handleLanguageChange = () => {
    setIsMobileDropdownOpen(false);
  };

  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsMobileDropdownOpen(false);
  };

  const handleLockScreen = () => {
    setIsMobileDropdownOpen(false);
  };
  return (
    <div className="flex min-h-[70px] items-center justify-between border-b border-gray-200 bg-white px-7.5">
      {/* Left side */}
      <div className="flex items-center">
        {/* Mobile hamburger menu - only visible on mobile */}
        <button
          onClick={onToggleMobileSidebar}
          className="cursor-pointer rounded border-none bg-transparent p-2 text-xl text-gray-600 transition-colors duration-300 hover:bg-gray-100 md:hidden"
        >
          <HiMenu />
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Desktop/Tablet buttons (hidden on mobile) */}
        <div className="hidden items-center gap-3 md:flex">
          {/* <button 
            onClick={handleLanguageChange}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-300 bg-transparent border-none cursor-pointer rounded-md hover:bg-gray-100"
          >
            <Image src={engFlag} alt="English" width={18} height={12} className="object-cover w-auto h-auto" />
            <span>EN</span>
          </button> */}

          {/* Select Location */}
          <div className="relative">
            <Select
              value={selectedDeptId}
              onValueChange={value => {
                setSelectedDeptId(value as DeptId);
              }}
            >
              <SelectTrigger className="bg-switch-green-primary hover:bg-switch-green-primary-hover rounded-full border-none px-4 py-2 text-sm font-medium text-white hover:cursor-pointer focus:ring-2 focus:ring-green-300 min-w-[180px]">
                <div className="flex items-center gap-2">
                  <FaLocationDot className="text-xs" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {Object.entries(DeptLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <button
            onClick={handleFullScreen}
            className="flex cursor-pointer items-center gap-2 rounded-md border-none bg-transparent px-3 py-2 text-sm font-medium text-gray-600 transition-colors duration-300 hover:bg-gray-100"
          >
            <HiZoomIn className="text-base" />
            <span>Zoom</span>
          </button>

          <button
            onClick={handleLockScreen}
            className="flex cursor-pointer items-center gap-2 rounded-md border-none bg-transparent px-3 py-2 text-sm font-medium text-gray-600 transition-colors duration-300 hover:bg-gray-100"
          >
            <HiLockClosed className="text-base" />
            <span>Lock screen</span>
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Select Location for Mobile */}
          <div className="relative">
            <Select
              value={selectedDeptId}
              onValueChange={value => {
                setSelectedDeptId(value as DeptId);
              }}
            >
              <SelectTrigger className="bg-switch-green-primary hover:bg-switch-green-primary-hover rounded-full border-none px-3 py-2 text-sm font-medium text-white hover:cursor-pointer focus:ring-2 focus:ring-green-300 min-w-[120px]">
                <div className="flex items-center gap-2">
                  <FaLocationDot className="text-xs" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent className="z-[1100]">
                {Object.entries(DeptLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Mobile dropdown menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleMobileDropdown}
              className="flex cursor-pointer items-center justify-center rounded-md border-none bg-transparent px-3 py-2 text-lg text-gray-600 transition-all duration-300 hover:bg-gray-100"
            >
              <HiCog />
            </button>
          <div
            className={`absolute top-full right-0 z-[1000] min-w-[180px] rounded-lg border border-gray-200 bg-white py-2 shadow-lg ${isMobileDropdownOpen ? 'block' : 'hidden'}`}
          >
            {/* <button 
              onClick={handleLanguageChange}
              className="flex items-center gap-2 w-full px-4 py-3 text-left text-sm text-gray-800 transition-colors duration-300 bg-transparent border-none cursor-pointer hover:bg-gray-100"
            >
              <Image src={engFlag} alt="English" width={18} height={12} className="object-cover rounded-sm w-auto h-auto" />
              <span>EN</span>
            </button> */}
            <button
              onClick={handleFullScreen}
              className="flex w-full cursor-pointer items-center gap-2 border-none bg-transparent px-4 py-3 text-left text-sm text-gray-800 transition-colors duration-300 hover:bg-gray-100"
            >
              <HiZoomIn className="w-4.5 text-center text-base" />
              <span>Zoom</span>
            </button>
            <button
              onClick={handleLockScreen}
              className="flex w-full cursor-pointer items-center gap-2 border-none bg-transparent px-4 py-3 text-left text-sm text-gray-800 transition-colors duration-300 hover:bg-gray-100"
            >
              <HiLockClosed className="w-4.5 text-center text-base" />
              <span>Lock screen</span>
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};
