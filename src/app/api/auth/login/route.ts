import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import ApiRoutes from '@/lib/constants/api-routes';

const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional().default(false),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input with zod
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          message: 'Validation failed',
          errors: validation.error.format(),
        },
        { status: 400 }
      );
    }

    const { username, password, rememberMe } = validation.data;

    const springResponse = await fetch(ApiRoutes.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'include',
      body: new URLSearchParams({
        username,
        password,
        rememberMe: rememberMe ? 'true' : 'false',
      }).toString(),
    });

    const data = await springResponse.json();

    // Forward cookies from Spring Boot to the client
    const response = NextResponse.json(data, {
      status: springResponse.status,
    });

    // Extract JSESSIONID and set with proper path
    const setCookieHeaders = springResponse.headers.getSetCookie();
    if (setCookieHeaders) {
      setCookieHeaders.forEach(cookieHeader => {
        if (cookieHeader.includes('JSESSIONID=')) {
          const jsessionValue = cookieHeader
            .split('JSESSIONID=')[1]
            .split(';')[0];
          response.cookies.set('JSESSIONID', jsessionValue, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
          });
        }
      });

      // Forward all cookies from Spring Boot
      setCookieHeaders.forEach(cookie => {
        response.headers.append('Set-Cookie', cookie);
      });
    }

    return response;
  } catch (error) {
    console.error('Login API Error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
