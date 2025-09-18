import NextApiRoutes from '@/lib/constants/next-api-routes';

export interface LoginData {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  msg: string;
  code: number;
}

export const login = async (loginData: LoginData): Promise<LoginResponse> => {
  const response = await fetch(NextApiRoutes.LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies in the request
    body: JSON.stringify({
      username: loginData.username,
      password: loginData.password,
      rememberMe: loginData.rememberMe,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Login failed');
  }

  return data;
};
