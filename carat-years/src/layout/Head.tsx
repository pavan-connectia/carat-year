type HeadProps = {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  structuredData?: object;
  noIndex?: boolean;
};

export default function Head({
  title = "Carat Years",
  description = "Life’s little big moments, Now in carats",
  keywords = "rings,Everyday Elegance,Bridal Gold",
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage = "/og.png",
  ogType = "website",
  twitterCard = "summary_large_image",
  structuredData,
  noIndex = false,
}: HeadProps) {
  // avoid window.location in SSR
  const currentUrl =
    typeof window !== "undefined" ? window.location.href : canonicalUrl || "";

  return (
    <article>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical URL */}
      {currentUrl && <link rel="canonical" href={currentUrl} />}

      {/* Robots */}
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />

      {/* Open Graph */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      {currentUrl && <meta property="og:url" content={currentUrl} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Carat Years" />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Additional Meta */}
      <meta name="author" content="Carat Years" />
      <meta name="language" content="en-GB" />

      {/* Structured Data (if provided) */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}

      {/* Default Organization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Carat Years",
            url: "https://carat-years.vercel.app",
            logo: "https://carat-years.vercel.app/logo.png",
            description: "Life’s little big moments, Now in carats",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "",
              contactType: "customer service",
              email: "infocaratyears.com",
            },
          }),
        }}
      />
    </article>
  );
}
