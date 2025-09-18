'use client';

import React from 'react';
import { IntlLink } from '@/lib/navigation';
import { FaChevronLeft } from 'react-icons/fa';

interface SwitchStationDetailHeaderProps {
  devId?: string;
}

export const SwitchStationDetailHeader: React.FC<
  SwitchStationDetailHeaderProps
> = ({ devId }) => {
  return (
    <div className="mb-5">
      <h1 className="hidden">
        Switch Station Detail - DevId: {devId || 'N/A'}
      </h1>
      <div className="mb-5">
        <IntlLink
          href="/switch-station"
          className="inline-flex items-center gap-2 rounded-md bg-transparent px-4 py-2 text-sm font-normal text-gray-500 no-underline transition-colors hover:bg-gray-100 hover:text-gray-500"
        >
          <FaChevronLeft className="text-xs" />
          SWITCH Station
        </IntlLink>
      </div>
    </div>
  );
};
