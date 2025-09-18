import type en from '@/../i18n/messages/en.json'; // or wherever your default locale file is

export type Messages = typeof en;
export const locales = ['en', 'lo'] as const;
export const defaultLocale = 'en';
export type Locale = (typeof locales)[number]; // "en" | "lo"
