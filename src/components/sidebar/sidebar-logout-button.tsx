'use client';

import React, { useState } from 'react';
import { useLogout } from '@/hooks/use-auth';
import { FaSignOutAlt } from 'react-icons/fa';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const SidebarLogoutButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const logoutMutation = useLogout();

  const handleLogout = () => {
    // Close modal and trigger logout
    setIsOpen(false);
    logoutMutation.mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="sidebar-menu-item mt-5 mb-5 flex cursor-pointer items-center gap-[15px] rounded-lg px-5 py-2.5 text-base font-normal text-white/80 no-underline transition-all duration-300 hover:bg-white/10 hover:text-white w-full">
          <FaSignOutAlt className="w-5 text-center text-lg" />
          <span>Sign out</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to sign out? You will be redirected to the login page.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? 'Signing out...' : 'Sign Out'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
