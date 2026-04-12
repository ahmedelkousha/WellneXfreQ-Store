import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  schema?: any; // To support JSON-LD
  noindex?: boolean;
}

const SEO = ({
  title,
  description,
  canonical,
  ogImage = "/og-main.png",
  ogType = "website",
  schema,
  noindex = false
}: SEOProps) => {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();
  const currentLang = i18n.language.split("-")[0];
  const siteName = "WellneXfreQ";
  
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const baseUrl = "https://www.wellnexfreq.com";
  const fullUrl = `${baseUrl}${pathname}`;
  const canonicalUrl = canonical || fullUrl;

  const alternateLang = currentLang === "en" ? "pl" : "en";
  const alternateUrl = `${baseUrl}/${alternateLang}${pathname.replace(`/${currentLang}`, "")}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots Meta Tag (Noindex/Nofollow) */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Language Alternates (SEO for Multi-language) */}
      <link rel="alternate" hrefLang={currentLang} href={fullUrl} />
      <link rel="alternate" hrefLang={alternateLang} href={alternateUrl} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/en`} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />

      {/* JSON-LD Schema Markup */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
