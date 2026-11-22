import type { APIRoute } from 'astro';
import {
  getCanonicalUrl,
  SUPPORTED_LOCALES,
  type PageRouteKey,
} from '../i18n/locales';

const ROUTES: Array<{ key: PageRouteKey; changefreq: string; priorityEn: string; priorityLocalized: string }> = [
  { key: 'home', changefreq: 'weekly', priorityEn: '1.0', priorityLocalized: '0.9' },
  { key: 'howToUse', changefreq: 'monthly', priorityEn: '0.8', priorityLocalized: '0.7' },
  { key: 'hireMe', changefreq: 'monthly', priorityEn: '0.7', priorityLocalized: '0.6' },
];

const LAST_MOD = '2026-11-22';

export const GET: APIRoute = () => {
  const urlEntries: string[] = [];

  for (const route of ROUTES) {
    const xDefaultHref = getCanonicalUrl('en', route.key);
    const alternateLinks = SUPPORTED_LOCALES.map(
      (loc) =>
        `    <xhtml:link rel="alternate" hreflang="${loc.code}" href="${getCanonicalUrl(loc.code, route.key)}" />`
    )
      .concat(
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${xDefaultHref}" />`
      )
      .join('\n');

    for (const loc of SUPPORTED_LOCALES) {
      const canonical = getCanonicalUrl(loc.code, route.key);
      const priority = loc.code === 'en' ? route.priorityEn : route.priorityLocalized;
      urlEntries.push(
        `  <url>\n` +
          `    <loc>${canonical}</loc>\n` +
          `    <lastmod>${LAST_MOD}</lastmod>\n` +
          `    <changefreq>${route.changefreq}</changefreq>\n` +
          `    <priority>${priority}</priority>\n` +
          `${alternateLinks}\n` +
          `  </url>`
      );
    }
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
    `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    `${urlEntries.join('\n')}\n` +
    `</urlset>\n`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
