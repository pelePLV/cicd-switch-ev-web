import ky from 'ky';
import { ApiResponse } from '@/types/response.types';

export const get = async <T>(url: string, options?: any): Promise<T> => {
  try {
    const response = await ky.get(url, options).json<T>();
    validationSessionExpire(response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const post = async <T>(url: string, options?: any): Promise<T> => {
  try {
    const response = await ky.post(url, options).json<T>();
    validationSessionExpire(response);
    return response;
  } catch (error) {
    throw error;
  }
};

// Check if response has ApiResponse structure and code is 1
const validationSessionExpire = <T>(response: Awaited<T>) => {
  if (
    isApiResponse(response) &&
    (response.code === 1 || response.code === '1')
  ) {
    throw new Error(response.code.toString());
  }
};

// Type guard to check if response is ApiResponse
function isApiResponse<T>(response: any): response is ApiResponse<T> {
  return (
    response &&
    typeof response === 'object' &&
    'code' in response &&
    'msg' in response
  );
}
