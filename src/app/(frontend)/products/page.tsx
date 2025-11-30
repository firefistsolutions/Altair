import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ProductsListingPage } from '@/components/pages/products/ProductsListingPage'
import { Loader2 } from 'lucide-react'
import { getServerSideURL } from '@/utilities/getURL'

// Schema.org ItemList for products page
function generateProductsListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Altair Medical System Products',
    description: 'Comprehensive range of modular operation theatres and medical gas systems',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Modular Operation Theater',
        url: 'https://altairmedical.com/products/modular-operation-theater',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Surgical Pendant',
        url: 'https://altairmedical.com/products/surgical-pendant',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Bed-Head Unit',
        url: 'https://altairmedical.com/products/bed-head-unit',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Medical Gas Manifold',
        url: 'https://altairmedical.com/products/medical-gas-manifold',
      },
    ],
  }
}

const baseUrl = getServerSideURL()

export const metadata: Metadata = {
  title: 'Products | Altair Medical System',
  description: 'Browse our comprehensive range of modular operation theatres, medical gas systems, surgical pendants, bed-head units, and more. HTM & ASTM compliant solutions.',
  keywords: [
    'modular operation theatre',
    'medical gas systems',
    'surgical pendant',
    'bed-head unit',
    'medical gas manifold',
    'HTM-02-01',
    'ASTM certified',
  ],
  openGraph: {
    title: 'Products | Altair Medical System',
    description: 'Browse our comprehensive range of modular operation theatres and medical gas systems.',
    type: 'website',
    url: `${baseUrl}/products`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Products | Altair Medical System',
    description: 'Browse our comprehensive range of modular operation theatres and medical gas systems.',
  },
  alternates: {
    canonical: `${baseUrl}/products`,
  },
}

function ProductsLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-brand-bronze" />
    </div>
  )
}

export default function ProductsPage() {
  const listSchema = generateProductsListSchema()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
      <Suspense fallback={<ProductsLoading />}>
        <ProductsListingPage />
      </Suspense>
    </>
  )
}

