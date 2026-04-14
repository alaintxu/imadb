import { headers } from 'next/headers';
import { translations, type Language } from '@/i18n/translations';

const DEFAULT_LANGUAGE: Language = 'es';

function normalizeLanguage(value: string | null | undefined): Language | undefined {
  if (!value) return undefined;
  const base = value.trim().toLowerCase().split('-')[0] ?? '';
  if (!base) return undefined;
  return base in translations ? (base as Language) : undefined;
}

async function getRequestLanguage(): Promise<Language> {
  const requestHeaders = await headers();

  const headerLanguage = normalizeLanguage(requestHeaders.get('x-language'));
  if (headerLanguage) return headerLanguage;

  const cookieLanguage = normalizeLanguage(requestHeaders.get('cookie')?.match(/(?:^|;\s*)language=([^;]+)/)?.[1]);
  if (cookieLanguage) return cookieLanguage;

  const acceptLanguage = requestHeaders.get('accept-language');
  if (acceptLanguage) {
    for (const token of acceptLanguage.split(',')) {
      const candidate = normalizeLanguage(token.split(';')[0]);
      if (candidate) return candidate;
    }
  }

  return DEFAULT_LANGUAGE;
}

export async function getSSRTranslations() {
  const language = await getRequestLanguage();
  if (!(language in translations)) {
    return {
      language: DEFAULT_LANGUAGE,
      t: translations[DEFAULT_LANGUAGE],
    };
  }
  return {
    language,
    t: translations[language],
  };
}