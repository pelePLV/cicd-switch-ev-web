'use client';

import React from 'react';
import { FaDownload } from 'react-icons/fa';
import { Button } from '../ui/button';

interface ExportButtonProps {
  isLoading?: boolean;
  onClick?: () => void;
  label?: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  isLoading = false,
  onClick,
  label = 'Export',
}) => {
  return (
    <Button
      onClick={onClick}
      className="rounded-lg bg-gradient-to-r from-green-700 to-green-500 px-5 py-2 text-sm font-medium text-white transition-all hover:translate-y-[-1px] hover:from-green-800 hover:to-green-600"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <svg
            className="mr-2 h-4 w-4 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
            ></path>
          </svg>
          {label}
        </>
      ) : (
        <>
          <FaDownload className="mr-2" />
          {label}
        </>
      )}
    </Button>
  );
};
