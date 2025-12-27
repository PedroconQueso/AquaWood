import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '../contexts/TranslationContext';

type OgType = 'website' | 'article';

interface SeoProps {
  title?: string;
  description?: string;
  imagePath?: string; // relative (/image.png) or absolute
  type?: OgType;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
}

function withoutTrailingSlash(url: string) {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

function toAbsoluteUrl(siteUrl: string, maybeRelativeUrl: string) {
  if (/^https?:\/\//i.test(maybeRelativeUrl)) return maybeRelativeUrl;
  if (maybeRelativeUrl.startsWith('/')) return `${siteUrl}${maybeRelativeUrl}`;
  return `${siteUrl}/${maybeRelativeUrl}`;
}

export function Seo({
  title,
  description,
  imagePath = '/image.png',
  type = 'website',
  noindex = false,
  jsonLd,
}: SeoProps) {
  const location = useLocation();
  const { locale } = useTranslation();

  const fallbackTitle = 'Aquawood Patagonia — Bois rustique';
  const fallbackDescription =
    'Custom handcrafted woodworking from Quebec, specializing in beautiful rustic tables and furniture.';

  const siteUrlRaw =
    (import.meta.env.VITE_SITE_URL as string | undefined) ||
    (typeof window !== 'undefined' ? window.location.origin : '');
  const siteUrl = siteUrlRaw ? withoutTrailingSlash(siteUrlRaw) : '';

  const canonical = siteUrl ? `${siteUrl}${location.pathname}` : undefined;
  const ogImage = siteUrl ? toAbsoluteUrl(siteUrl, imagePath) : imagePath;

  const finalTitle = title ? `${title} | Aquawood Patagonia` : fallbackTitle;
  const finalDescription = description || fallbackDescription;

  return (
    <Helmet>
      <html lang={locale} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />

      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:type" content={type} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />

      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}





