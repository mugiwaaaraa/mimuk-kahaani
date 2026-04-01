const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Kahaani — Tales of Taste',
  description: 'East Indian & Hakka Cuisine in Winnipeg, Manitoba',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '11-801 Regent Ave W',
    addressLocality: 'Winnipeg',
    addressRegion: 'MB',
    postalCode: 'R2C 3A7',
    addressCountry: 'CA',
  },
  servesCuisine: ['Indian', 'Hakka', 'Asian'],
  priceRange: '$$',
  url: 'https://kahaani.ca',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '11:00',
      closes: '00:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '11:00',
      closes: '23:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday', 'Saturday'],
      opens: '11:00',
      closes: '00:00',
    },
  ],
}

// Static hardcoded JSON-LD for SEO — no user input, safe to inline
export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
