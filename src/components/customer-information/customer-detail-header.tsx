'use client';

import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { IntlLink } from '@/lib/navigation';

interface CustomerDetailHeaderProps {
  userId?: string;
}

export const CustomerDetailHeader: React.FC<CustomerDetailHeaderProps> = ({
  userId,
}) => {
  return (
    <div className="mb-5">
      <h1 className="hidden">
        Customer Information Detail - UserId: {userId || 'N/A'}
      </h1>
      <div className="mb-5">
        <IntlLink
          href="/customer-information"
          className="inline-flex items-center gap-2 rounded-md bg-transparent px-4 py-2 text-sm font-normal text-gray-500 no-underline transition-colors hover:bg-gray-100 hover:text-gray-500"
        >
          <FaChevronLeft className="text-xs" />
          Customer Information
        </IntlLink>
      </div>
    </div>
  );
};
