export const SITE_URL = 'https://compress-img.github.io';

export const SUPPORTED_LOCALES = [
  { code: 'en', label: 'English', pathPrefix: '/', ogLocale: 'en_US' },
  { code: 'es', label: 'Español', pathPrefix: '/es/', ogLocale: 'es_ES' },
  { code: 'pt', label: 'Português', pathPrefix: '/pt/', ogLocale: 'pt_BR' },
  { code: 'de', label: 'Deutsch', pathPrefix: '/de/', ogLocale: 'de_DE' },
  { code: 'fr', label: 'Français', pathPrefix: '/fr/', ogLocale: 'fr_FR' },
  { code: 'ja', label: '日本語', pathPrefix: '/ja/', ogLocale: 'ja_JP' },
  { code: 'zh', label: '简体中文', pathPrefix: '/zh/', ogLocale: 'zh_CN' },
  { code: 'ru', label: 'Русский', pathPrefix: '/ru/', ogLocale: 'ru_RU' },
] as const;

export type LocaleCode = (typeof SUPPORTED_LOCALES)[number]['code'];
export type PageRouteKey = 'home' | 'howToUse' | 'hireMe';

const ROUTE_SUFFIX: Record<PageRouteKey, string> = {
  home: '',
  howToUse: 'how-to-use/',
  hireMe: 'hire-me/',
};

export function getLocaleConfig(code: LocaleCode) {
  return SUPPORTED_LOCALES.find((l) => l.code === code) ?? SUPPORTED_LOCALES[0];
}

export function getLocalizedPath(locale: LocaleCode, route: PageRouteKey): string {
  const prefix = getLocaleConfig(locale).pathPrefix;
  return `${prefix}${ROUTE_SUFFIX[route]}`;
}

export function getCanonicalUrl(locale: LocaleCode, route: PageRouteKey): string {
  return `${SITE_URL}${getLocalizedPath(locale, route)}`;
}

export function resolveLocaleParam(param: string | undefined): LocaleCode {
  if (!param) return 'en';
  const match = SUPPORTED_LOCALES.find((l) => l.code === param);
  return match ? match.code : 'en';
}

export function getLocaleStaticPaths() {
  return SUPPORTED_LOCALES.map((locale) => ({
    params: { lang: locale.code === 'en' ? undefined : locale.code },
    props: { locale: locale.code },
  }));
}
