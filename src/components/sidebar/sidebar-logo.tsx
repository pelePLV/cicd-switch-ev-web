import Image from 'next/image';
import { IntlLink } from '@/lib/navigation';

import React from 'react';
import logo from '@/public/images/switch-logo.png';

export const SidebarLogo = () => {
  return (
    <IntlLink
      href="/"
      className="mb-10 flex w-full cursor-pointer items-center justify-start gap-2.5"
    >
      <Image
        className="ml-3 h-10 w-[72px] object-contain"
        src={logo}
        alt="logo"
        width={72}
        height={40}
      />
      <span className="ml-2.5 text-base font-medium text-white">
        SWITCH Laos
      </span>
    </IntlLink>
  );
};
