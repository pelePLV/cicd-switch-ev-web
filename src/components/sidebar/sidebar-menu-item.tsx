import Link from "next/link";
import { IconType } from "react-icons";

interface SidebarMenuItemProps {
  href: string;
  icon: IconType;
  label: string;
  active: boolean;
  disabled: boolean;
}

export const SidebarMenuItem = ({ href, icon, label, active, disabled }: SidebarMenuItemProps) => {
  const IconComponent = icon;
  
  return (
    <Link 
      href={href} 
      className={`
        sidebar-menu-item flex items-center gap-[15px] px-5 py-3 text-white/80 no-underline text-base font-normal rounded-lg transition-all duration-300 cursor-pointer hover:bg-white/10 hover:text-white
        ${active ? 'bg-white/15 text-white font-medium' : ''}
        ${disabled ? 'opacity-60 pointer-events-none cursor-not-allowed' : ''}
      `}
    >
      <IconComponent className="text-lg w-5 text-center" />
      <span>{label}</span>
    </Link>
  );
};