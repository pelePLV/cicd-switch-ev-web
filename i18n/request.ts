import { locales } from '@/lib/helpers/localization';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async params => {
  const locale = params.locale ?? locales[0];

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    locale: locale,
  };
});
