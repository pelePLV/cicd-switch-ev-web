import { useIntlRouter } from '@/lib/navigation';
import { login } from '@/lib/api/login';
import { logout } from '@/lib/api/logout';
import { AUTH_CONSTANTS } from '@/lib/constants/auth-constants';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  const router = useIntlRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: data => {
      // Set cookie expiration time to 6 hours from now
      const expireTime = Date.now() + AUTH_CONSTANTS.COOKIE_EXPIRE_TIME;
      localStorage.setItem('cookieExpireTime', expireTime.toString());
      router.push('/');
    },
    onError: error => {
      console.error('Login error:', error);
    },
  });
};

export const useLogout = () => {
  const router = useIntlRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: data => {
      // Clear the cookie expiration time from localStorage
      localStorage.removeItem('cookieExpireTime');
      router.push('/login');
    },
    onError: error => {
      console.error('Logout error:', error);
    },
  });
};
