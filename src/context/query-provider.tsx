'use client';

import { logout } from '@/lib/api/logout';
import { useIntlRouter } from '@/lib/navigation';
import { QueryClient, QueryClientProvider, keepPreviousData, QueryCache, MutationCache } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export default function QueryProvider({ children }: { children: ReactNode }) {
  const router = useIntlRouter();
  
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false, // default: true
            refetchOnReconnect: false, // default: true
            refetchInterval: false, // disable automatic refetching every few minutes
            refetchIntervalInBackground: false, // disable refetching in background
            retry: 1,
            placeholderData: keepPreviousData,
          },
        },
        queryCache: new QueryCache({
          onError: async (error: any) => {
            console.log('error in query cache', error)
            if(error?.message === "1") {
              queryClient.clear();
              try {
                await logout();
                router.push('/login');
              } catch (logoutError) {
                console.error('Logout error:', logoutError);
                router.push('/login');
              }
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: async (error: any) => {
            console.log('error in query cache', error)
            if(error?.message === "1") {
              queryClient.clear();
              try {
                await logout();
                // Navigate to login page after successful logout
                window.location.href = '/login';
              } catch (logoutError) {
                console.error('Logout error:', logoutError);
                // Even if logout fails, redirect to login for security
                window.location.href = '/login';
              }
            }
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
} 