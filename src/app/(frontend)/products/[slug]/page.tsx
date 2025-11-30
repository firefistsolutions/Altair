import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductDetailPage } from '@/components/pages/products/ProductDetailPage'
import { generateProductSchema } from '@/utilities/seo'
import { getServerSideURL } from '@/utilities/getURL'

// This will be replaced with proper type from CMS in Phase 6
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return {
      title: 'Product Not Found | Altair Medical System',
    }
  }

  const baseUrl = getServerSideURL()

  return {
    title: `${product.title} | Altair Medical System`,
    description: product.description,
    keywords: [product.category, product.title, 'HTM-02-01', 'ASTM certified', 'medical equipment'],
    openGraph: {
      title: `${product.title} | Altair Medical System`,
      description: product.description,
      images: [product.image],
      type: 'website',
      url: `${baseUrl}/products/${product.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | Altair Medical System`,
      description: product.description,
      images: [product.image],
    },
    alternates: {
      canonical: `${baseUrl}/products/${product.slug}`,
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  const productSchema = generateProductSchema({
    title: product.title,
    description: product.description,
    image: product.image,
    slug: product.slug,
    category: product.category,
    specs: product.specs,
  })

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

