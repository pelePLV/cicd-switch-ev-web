import createMiddleware from 'next-intl/middleware';
import { defaultLocale, Locale, locales } from './lib/helpers/localization';
import { NextRequest, NextResponse } from 'next/server';

const isLocale = (val: string): val is Locale =>
  (locales as readonly string[]).includes(val);
const intl = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
});

function firstPathSegment(pathname: string) {
  const [, seg = ''] = pathname.split('/');
  return seg;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSeg = firstPathSegment(pathname);

  const looksLikeLocale = /^[a-z]{2}$/.test(firstSeg);
  const hasValidLocale = isLocale(firstSeg);
  const currentLocale = hasValidLocale ? (firstSeg as Locale) : defaultLocale;

  // If the first segment looks like a locale but isn't supported, rewrite to default
  if (looksLikeLocale && !hasValidLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(`/${firstSeg}`, `/${defaultLocale}`);
    return NextResponse.redirect(url);
  }

  // Determine if we're on the login page (with or without locale prefix)
  // e.g. "/en/login" or "/login"
  const segments = pathname.split('/').filter(Boolean);
  const lastSeg = segments[segments.length - 1] ?? '';
  const isLoginPage = lastSeg === 'login';

  // (Matcher already excludes /api and assets, but keep a light guard just in case)
  const isApiRoute = pathname.startsWith('/api');

  // Auth cookie
  const jsessionId = request.cookies.get('JSESSIONID')?.value?.trim();

  // For any non-login, non-API route, require session
  if (!isLoginPage && !isApiRoute && !jsessionId) {
    const url = request.nextUrl.clone();
    url.pathname = `/${currentLocale}/login`;
    return NextResponse.redirect(url);
  }

  // Let next-intl handle locale detection/routing for the rest
  return intl(request);
}

export const config = {
  // Exclude Next internals, favicon, api routes, and any file with an extension
  matcher: ['/((?!_next|favicon|api|ms-admin|.*\\..*).*)'],
};
