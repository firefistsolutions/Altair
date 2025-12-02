import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ProductsListingPage } from '@/components/pages/products/ProductsListingPage'
import { Loader2 } from 'lucide-react'
import { getServerSideURL } from '@/utilities/getURL'
import { getProducts, getProductCategories } from '@/lib/api/products'
import { generateItemListSchema } from '@/utilities/seo'

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

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

export default async function ProductsPage() {
  // Fetch products and categories for schema
  const [productsResult, categories] = await Promise.all([
    getProducts({ limit: 100 }), // Get all for schema
    getProductCategories(),
  ])

  const listSchema = generateItemListSchema(
    productsResult.docs.map((p) => ({
      name: p.title || '',
      url: `/products/${p.slug || ''}`,
    })),
    'Altair Medical System Products'
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
      <Suspense fallback={<ProductsLoading />}>
        <ProductsListingPage initialProducts={productsResult.docs} initialCategories={categories} />
      </Suspense>
    </>
  )
}

