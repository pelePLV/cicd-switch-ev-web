'use client';

import { IconType } from 'react-icons';
import { usePathname } from 'next/navigation';
import {
  FaChartPie,
  FaCar,
  FaCrosshairs,
  FaPlug,
  FaHistory,
  FaUsers,
  FaBatteryThreeQuarters,
} from 'react-icons/fa';
import { SidebarMenuItem } from './sidebar-menu-item';

interface MenuItem {
  href: string;
  icon: IconType;
  label: string;
  disabled: boolean;
}

const menuItems: MenuItem[] = [
  {
    href: '/',
    icon: FaChartPie,
    label: 'Overview',
    disabled: false,
  },
  {
    href: '/live-tracking',
    icon: FaCrosshairs,
    label: 'Live Tracking',
    disabled: false,
  },
  {
    href: '/vehicle',
    icon: FaCar,
    label: 'Vehicle',
    disabled: false,
  },
  {
    href: '/switch-station',
    icon: FaPlug,
    label: 'Switch Station',
    disabled: false,
  },
  {
    href: '/battery-transaction',
    icon: FaHistory,
    label: 'Battery Transaction',
    disabled: false,
  },
  {
    href: '/customer-information',
    icon: FaUsers,
    label: 'Customer information',
    disabled: false,
  },
];

export const SidebarMenu = () => {
  const pathname = usePathname();

  // pathname example: "/en/switch-station/SW001"
  // currentPath example: "/switch-station"
  // it routeSegment is not exist, then currentPath is "/"
  const routeSegment = pathname.split('/')[2];
  const currentPath = routeSegment ? `/${routeSegment}` : '/';

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-1 flex-col justify-between">
      <div className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <SidebarMenuItem
            key={index}
            href={item.href}
            icon={item.icon}
            label={item.label}
            active={currentPath === item.href} // Compare currentPath with href to determine active state
            disabled={item.disabled}
          />
        ))}
      </div>
    </div>
  );
};
