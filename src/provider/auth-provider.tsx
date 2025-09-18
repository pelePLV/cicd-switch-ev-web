'use client';

import { useEffect, ReactNode } from 'react';
import { useIntlRouter } from '@/lib/navigation';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useIntlRouter();

  useEffect(() => {
    const checkAuthExpiration = () => {
      // Skip check if we're on the login page
      if (typeof window !== 'undefined' && window.location.pathname.includes('/login')) {
        return;
      }

      const cookieExpireTime = localStorage.getItem('cookieExpireTime');
      
      // If there's no cookieExpireTime, redirect to login
      if (!cookieExpireTime) {
        // console.log('No session found, redirecting to login');
        router.push('/login');
        return;
      }

      const expireTime = parseInt(cookieExpireTime);
      const currentTime = Date.now();
      
      // If the cookie has expired
      if (currentTime > expireTime) {
        // console.log('Session expired, redirecting to login');
        localStorage.removeItem('cookieExpireTime');
        router.push('/login');
      }
    };

    // Check immediately
    checkAuthExpiration();

    // Set up interval to check every 10 seconds
    const intervalId = setInterval(checkAuthExpiration, 10000);

    return () => clearInterval(intervalId);
  }, [router]);

  return <>{children}</>;
}
