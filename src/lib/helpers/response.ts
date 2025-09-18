// ===================================
// RESPONSE UTILS - Next.js API response helper functions
// ===================================

import { NextResponse } from 'next/server';

/**
 * Standard API response utilities for Next.js API routes
 * 
 * @description Provides consistent, type-safe response helpers for common HTTP scenarios.
 * 
 * @example
 * ```typescript
 * import { ApiResponse } from '@/utils/response';
 * return ApiResponse.success({ switches: data, count: 22 });
 * return ApiResponse.error(EMessage.server, errorObject, 500);
 * return ApiResponse.validationError(EMessage.validation, result.error.format());
 * return ApiResponse.notFound('Switch cabinet not found');
 * return ApiResponse.unauthorized('Invalid API key');
 * return ApiResponse.forbidden('Admin role required');
 * ```
 */
export const ApiResponse = {
  success: <T>(data: T, status: number = 200): NextResponse => {
    return NextResponse.json(data, { status });
  },

  error: (message: string, errors: any, status: number = 500): NextResponse => {
    return NextResponse.json({ message, errors }, { status });
  },

  validationError: (message: string = 'Validation failed', errors: any): NextResponse => {
    return NextResponse.json({ message, errors }, { status: 400 });
  },

  notFound: (message: string = 'Resource not found'): NextResponse => {
    return NextResponse.json({ message }, { status: 404 });
  },

  unauthorized: (message: string = 'Unauthorized'): NextResponse => {
    return NextResponse.json({ message }, { status: 401 });
  },

  forbidden: (message: string = 'Forbidden'): NextResponse => {
    return NextResponse.json({ message }, { status: 403 });
  }
};

/**
 * Type definitions for consistent API response structures
 */
export interface ApiSuccessResponse<T = any> {
  data?: T;
  message?: string;
}

export interface ApiErrorResponse {
  message: string;
  errors?: any;
}

export type ApiResponseType<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;