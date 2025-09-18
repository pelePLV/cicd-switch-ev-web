import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json(
      { 
        message: 'Logout successful',
        success: true 
      },
      { status: 200 }
    );

    // Clear JSESSIONID cookie by setting it to expire in the past
    response.cookies.set('JSESSIONID', '', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      expires: new Date(0), // Set to epoch time (past date)
    });

    // Also try to clear with different domain configurations
    response.headers.append('Set-Cookie', 'JSESSIONID=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax');
    
    return response;
  } catch (error) {
    console.error('Logout API Error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
