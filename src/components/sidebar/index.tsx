'use client';

import React, { useState } from 'react';
import { SidebarLogoutButton } from './sidebar-logout-button';
import { SidebarMenu } from './sidebar-menu';
import { SidebarUserProfile } from './sidebar-user-profile';
import { usePathname } from 'next/navigation';
import { SidebarLogo } from './sidebar-logo';
import { Navbar } from '../navbar/nav-bar';

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // pathname example: "/en/login" or "/lo/login"
  // currentPath example: "/login"
  // if routeSegment is not exist, then currentPath is "/"
  const routeSegment = pathname.split('/')[2];
  const currentPath = routeSegment ? `/${routeSegment}` : '/';

  // If the current path is login, just return the children without the sidebar
  if (currentPath === '/login') {
    return <>{children}</>;
  }

  // If the current path is not login, return the sidebar with the children
  return (
    <div className="relative flex min-h-screen w-full bg-white">
      {/* Mobile overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          // Close the mobile sidebar when clicking on the overlay
          onClick={() => {
            setIsMobileSidebarOpen(false);
          }}
        />
      )}

      {/* Leftside sidebar */}
      <aside
        className={`bg-switch-sidebar absolute top-0 z-[50] h-screen w-[260px] shrink-0 transition-transform duration-200 ease-in-out md:sticky md:block md:translate-x-0 ${isMobileSidebarOpen ? 'fixed translate-x-0' : 'fixed -translate-x-full md:relative'} `}
      >
        <div className="flex h-full w-full flex-col p-5">
          {/* Logo */}
          <SidebarLogo />

          {/* Menu Items */}
          <SidebarMenu />

          {/* User Profile */}
          <SidebarUserProfile />

          {/* Logout Button */}
          <SidebarLogoutButton />
        </div>
      </aside>

      {/* Rightside main content */}
      <main className="min-h-screen flex-1 overflow-auto bg-white">
        {/* Navbar */}
        <Navbar
          onToggleMobileSidebar={() => {
            setIsMobileSidebarOpen(!isMobileSidebarOpen);
          }}
        />

        {/* Main content */}
        <div>{children}</div>
      </main>
    </div>
  );
};
