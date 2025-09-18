import NextApiRoutes from '@/lib/constants/next-api-routes';

export interface LogoutResponse {
  message: string;
  success: boolean;
}

export const logout = async (): Promise<LogoutResponse> => {
  const response = await fetch(NextApiRoutes.LOGOUT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies in the request
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Logout failed');
  }

  return data;
};
