import { getServerSideURL } from './getURL'

const baseUrl = getServerSideURL()

/**
 * Generate Organization Schema (JSON-LD)
 * Should be included on all pages
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Altair Medical System Pvt. Ltd.',
    url: baseUrl,
    logo: `${baseUrl}/logo/logo.png`,
    description:
      'Expert engineering and installation of modular operation theatres and medical gas pipeline systems. HTM & ASTM compliant solutions across India.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-XXXXXXXXXX',
      contactType: 'sales',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    sameAs: [
      // Add social media links when available
      // 'https://www.linkedin.com/company/altair-medical',
      // 'https://www.facebook.com/altairmedical',
    ],
  }
}

/**
 * Generate Product Schema (JSON-LD)
 */
export function generateProductSchema(product: {
  title: string
  description: string
  image?: string
  slug: string
  category?: string
  specs?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.image ? `${baseUrl}${product.image}` : undefined,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: 'Altair Medical System',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Altair Medical System Pvt. Ltd.',
    },
    url: `${baseUrl}/products/${product.slug}`,
    ...(product.specs && {
      additionalProperty: product.specs.map((spec) => ({
        '@type': 'PropertyValue',
        name: 'Specification',
        value: spec,
      })),
    }),
  }
}

/**
 * Generate Project Schema (JSON-LD) - CreativeWork
 */
export function generateProjectSchema(project: {
  title: string
  description: string
  image?: string
  slug: string
  client?: string
  location?: string
  year?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: project.image ? `${baseUrl}${project.image}` : undefined,
    url: `${baseUrl}/projects/${project.slug}`,
    creator: {
      '@type': 'Organization',
      name: 'Altair Medical System Pvt. Ltd.',
    },
    ...(project.client && {
      publisher: {
        '@type': 'Organization',
        name: project.client,
      },
    }),
    ...(project.location && {
      locationCreated: {
        '@type': 'Place',
        name: project.location,
      },
    }),
    ...(project.year && {
      dateCreated: project.year,
    }),
  }
}

/**
 * Generate Event Schema (JSON-LD)
 */
export function generateEventSchema(event: {
  title: string
  description: string
  image?: string
  slug: string
  startDate?: string
  endDate?: string
  location?: string
  venue?: string
  eventType?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    image: event.image ? `${baseUrl}${event.image}` : undefined,
    url: `${baseUrl}/events/${event.slug}`,
    ...(event.startDate && {
      startDate: event.startDate,
    }),
    ...(event.endDate && {
      endDate: event.endDate,
    }),
    ...(event.location && {
      location: {
        '@type': 'Place',
        name: event.venue || event.location,
        address: {
          '@type': 'PostalAddress',
          addressLocality: event.location,
        },
      },
    }),
    ...(event.eventType && {
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
    }),
    organizer: {
      '@type': 'Organization',
      name: 'Altair Medical System Pvt. Ltd.',
      url: baseUrl,
    },
  }
}

/**
 * Generate BlogPost Schema (JSON-LD)
 */
export function generateBlogPostSchema(post: {
  title: string
  description: string
  image?: string
  slug: string
  datePublished?: string
  dateModified?: string
  author?: string
  category?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image ? `${baseUrl}${post.image}` : undefined,
    url: `${baseUrl}/blog/${post.slug}`,
    ...(post.datePublished && {
      datePublished: post.datePublished,
    }),
    ...(post.dateModified && {
      dateModified: post.dateModified || post.datePublished,
    }),
    author: {
      '@type': 'Organization',
      name: post.author || 'Altair Medical System',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Altair Medical System Pvt. Ltd.',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo/logo.png`,
      },
    },
    ...(post.category && {
      articleSection: post.category,
    }),
  }
}

/**
 * Generate BreadcrumbList Schema (JSON-LD)
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  }
}

/**
 * Generate ItemList Schema (JSON-LD) for listing pages
 */
export function generateItemListSchema(items: { name: string; url: string }[], listName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: `${baseUrl}${item.url}`,
    })),
  }
}

