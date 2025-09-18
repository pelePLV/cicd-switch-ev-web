import React from 'react';
import Image from 'next/image';
import { IntlLink } from '@/lib/navigation';
import userProfile from '@/public/images/user.png';

export const SidebarUserProfile = () => {
  return (
    <>
      <div className="mb-6 border-t border-white/20"></div>
      <button
        className="flex items-center gap-3 px-5 py-[15px] no-underline"
      >
        <div className="h-[45px] w-[45px] overflow-hidden rounded-full bg-white/20">
          <Image
            src={userProfile}
            alt="Admin User"
            className="h-full w-full object-cover"
            width={45}
            height={45}
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-base font-medium text-white">Admin User</span>
          <span className="inline-block rounded-xl bg-[#37A161] px-3 py-1 text-sm font-light text-white">
            Online
          </span>
        </div>
      </button>
    </>
  );
};
