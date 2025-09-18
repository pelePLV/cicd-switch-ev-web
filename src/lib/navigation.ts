// src/navigation.ts (you can name it anything)
import { defaultLocale, locales } from '@/lib/helpers/localization';
import { createNavigation } from 'next-intl/navigation';

const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  defaultLocale,
});

export {
  Link as IntlLink,
  redirect as intlRedirect,
  usePathname as useIntlPathname,
  useRouter as useIntlRouter,
};
