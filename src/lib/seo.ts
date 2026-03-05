/* Image Merge Tools - SEO Optimizations */

/* Schema Markup for SoftwareApplication */
export const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Image Merge Tools",
  "description": "Free online image merge and text to image tools",
  "url": "https://imagemergetools.com",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1000"
  }
};

/* Organization Schema */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Image Merge Tools",
  "url": "https://imagemergetools.com",
  "logo": "https://imagemergetools.com/images/logo.png",
  "description": "Free online image merge and text to image tools",
  "sameAs": [
    "https://twitter.com/imagemergetools",
    "https://facebook.com/imagemergetools",
    "https://linkedin.com/company/imagemergetools"
  ]
};

/* FAQ Schema */
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Image Merge Tools really free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, completely free with no registration, no hidden costs, and no premium version."
      }
    },
    {
      "@type": "Question",
      "name": "Is my data private when using the tool?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your images are never stored on our servers. Processing is instant and secure with automatic deletion."
      }
    },
    {
      "@type": "Question",
      "name": "What image formats are supported?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We support JPG, PNG, WebP, GIF for input and PNG, JPG, WebP for output."
      }
    },
    {
      "@type": "Question",
      "name": "Are there any file size limitations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Maximum 10MB per image. Maximum output resolution is 8000x8000px."
      }
    }
  ]
};

/* Breadcrumb Schema */
export const breadcrumbSchema = (title: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://imagemergetools.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": title,
      "item": `https://imagemergetools.com${path}`
    }
  ]
});

/* SEO Keywords by Page */
export const seoKeywords = {
  home: "free image merge tool, combine images online, text to image generator, image editor",
  imageMerge: "merge images, combine images horizontally, vertical image merger, grid image merger, image collage maker",
  textToImage: "add text to image, text overlay tool, image text generator, quote image maker, social media graphics",
  about: "about image merge tools, image editing tools, free online tools",
};

/* Structured Data Helper */
export function JSONLDScript(schema: any) {
  return JSON.stringify(schema);
}
