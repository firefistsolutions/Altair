import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductDetailPage } from '@/components/pages/products/ProductDetailPage'

// This will be replaced with proper type from CMS in Phase 6
type Product = {
  slug: string
  title: string
  description: string
  image: string
  images: string[]
  specs: string[]
  category: string
  featured: boolean
  datasheetUrl?: string
}

// Schema.org Product structured data
function generateProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images || [product.image],
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: 'Altair Medical System',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'INR',
    },
  }
}

// Mock product data - will be replaced with CMS data in Phase 6
const products = [
  {
    slug: 'modular-operation-theater',
    title: 'Modular Operation Theater',
    description: 'Precision-engineered modular OT with seamless panels, touchless systems, and premium lighting.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&h=800&fit=crop&q=80',
    ],
    specs: ['HTM-02-01', 'Seamless Panels', 'Touchless Systems'],
    category: 'Operation Theatres',
    featured: true,
    datasheetUrl: '/resources/datasheets/modular-ot.pdf', // Placeholder - will be from CMS
  },
]

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug)

  if (!product) {
    return {
      title: 'Product Not Found | Altair Medical System',
    }
  }

  return {
    title: `${product.title} | Altair Medical System`,
    description: product.description,
    openGraph: {
      title: `${product.title} | Altair Medical System`,
      description: product.description,
      images: [product.image],
    },
  }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  const productSchema = generateProductSchema(product)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetailPage product={product} />
    </>
  )
}

