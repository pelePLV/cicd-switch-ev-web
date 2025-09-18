import type { Metadata } from 'next';
import { Geist, Geist_Mono, Montserrat } from 'next/font/google';
import QueryProvider from '@/context/query-provider';
import { NextIntlClientProvider } from 'next-intl';
import '../globals.css';
import { Messages } from '@/lib/helpers/localization';
import { defaultLocale, Locale, locales } from '@/lib/helpers/localization';
import { Sidebar } from '@/components/sidebar';
import AuthProvider from '@/provider/auth-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export const metadata: Metadata = {
  title: 'switch-ev',
  description: 'switch management system',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await Promise.resolve(params);
  const safeLocale: Locale = isValidLocale(locale) ? locale : defaultLocale;

  let messages: Messages;
  try {
    const test = await import(`@/../i18n/messages/${safeLocale}.json`);
    messages = test.default;
  } catch (error) {
    console.error(`Missing or invalid locale file for '${locale}':`, error);
    messages = (await import(`@/../i18n/messages/${defaultLocale}.json`))
      .default;
  }

  return (
    <html lang={safeLocale} suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <QueryProvider>
            <AuthProvider>
              <Sidebar>{children}</Sidebar>
            </AuthProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
