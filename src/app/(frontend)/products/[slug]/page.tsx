import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductDetailPage } from '@/components/pages/products/ProductDetailPage'
import { generateProductSchema } from '@/utilities/seo'
import { getServerSideURL } from '@/utilities/getURL'
import { getProductBySlug, getProducts } from '@/lib/api/products'
import { transformProduct } from '@/lib/utils/transform-product'

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export async function generateStaticParams() {
  const products = await getProducts({ limit: 1000 })
  return products.docs.map((product) => ({
    slug: product.slug || '',
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: 'Product Not Found | Altair Medical System',
    }
  }

  const baseUrl = getServerSideURL()
  const transformed = transformProduct(product)

  return {
    title: `${product.title} | Altair Medical System`,
    description: transformed.shortDescription || transformed.description || product.title,
    keywords: [
      typeof product.category === 'string' ? product.category : '',
      product.title || '',
      'HTM-02-01',
      'ASTM certified',
      'medical equipment',
    ],
    openGraph: {
      title: `${product.title} | Altair Medical System`,
      description: transformed.shortDescription || transformed.description || product.title,
      images: [transformed.image],
      type: 'website',
      url: `${baseUrl}/products/${product.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | Altair Medical System`,
      description: transformed.shortDescription || transformed.description || product.title,
      images: [transformed.image],
    },
    alternates: {
      canonical: `${baseUrl}/products/${product.slug}`,
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const transformed = transformProduct(product)

  // Get related products (same category, excluding current)
  const relatedProductsResult = await getProducts({
    category: typeof product.category === 'string' ? product.category : undefined,
    limit: 4,
  })
  const relatedProducts = relatedProductsResult.docs
    .filter((p) => p.id !== product.id)
    .slice(0, 3)
    .map(transformProduct)

  const productSchema = generateProductSchema({
    title: transformed.title,
    description: transformed.description,
    image: transformed.image,
    slug: transformed.slug,
    category: transformed.category,
    specs: transformed.specs,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetailPage product={transformed} relatedProducts={relatedProducts} />
    </>
  )
}
