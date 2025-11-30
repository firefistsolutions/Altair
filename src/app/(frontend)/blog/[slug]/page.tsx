import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogDetailPage } from '@/components/pages/blog/BlogDetailPage'
import { generateBlogPostSchema } from '@/utilities/seo'
import { getServerSideURL } from '@/utilities/getURL'

// Mock blog post data - will be replaced with CMS data in Phase 6
const blogPosts = [
  {
    slug: 'advancements-modular-ot-design',
    title: 'Advancements in Modular Operation Theatre Design',
    excerpt:
      'Exploring the latest innovations in modular OT design, including touchless systems, advanced lighting, and seamless panel technology.',
    content: `
      <p>Modular operation theatres have revolutionized healthcare infrastructure, offering rapid installation, flexibility, and compliance with international standards. In this article, we explore the latest advancements in modular OT design.</p>
      
      <h2>Touchless Systems</h2>
      <p>Modern modular OTs incorporate touchless sensor systems for doors, lights, and medical equipment. This reduces the risk of contamination and improves hygiene standards in critical healthcare environments.</p>
      
      <h2>Advanced Lighting Solutions</h2>
      <p>Premium LED lighting systems with dimming capabilities provide optimal visibility for surgical procedures while reducing energy consumption. These systems are designed to meet HTM-02-01 standards.</p>
      
      <h2>Seamless Panel Technology</h2>
      <p>Anti-bacterial seamless panels eliminate joints and crevices where bacteria could accumulate. This technology ensures a hygienic environment that meets the highest healthcare standards.</p>
      
      <h2>Conclusion</h2>
      <p>These advancements in modular OT design represent our commitment to providing healthcare facilities with state-of-the-art infrastructure that prioritizes patient safety and operational efficiency.</p>
    `,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=600&fit=crop&q=80',
    category: 'Technical',
    author: 'Altair Medical Team',
    date: '2024-12-15',
    featured: true,
  },
  {
    slug: 'medicall-expo-mumbai-2025',
    title: 'Medicall Expo Mumbai 2025 - Highlights',
    excerpt:
      'Recap of our participation at the 44th Medicall Mumbai Edition, showcasing our latest modular OT solutions and meeting healthcare professionals.',
    content: `
      <p>We were thrilled to participate in the 44th Medicall Mumbai Edition, one of India's premier medical equipment exhibitions.</p>
      
      <h2>Our Exhibition</h2>
      <p>Our booth showcased our latest modular operation theatre solutions, including live demonstrations of touchless systems and seamless panel technology.</p>
      
      <h2>Key Highlights</h2>
      <ul>
        <li>Over 500 healthcare professionals visited our booth</li>
        <li>Live demonstrations of our modular OT systems</li>
        <li>Product launches and technical presentations</li>
        <li>Networking with industry leaders</li>
      </ul>
      
      <h2>Looking Forward</h2>
      <p>We're excited to continue participating in major medical exhibitions across India, bringing our innovative solutions to healthcare facilities nationwide.</p>
    `,
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&h=600&fit=crop&q=80',
    category: 'Events',
    author: 'Marketing Team',
    date: '2024-12-10',
    featured: false,
  },
]

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return {
      title: 'Post Not Found | Altair Medical System',
    }
  }

  const baseUrl = getServerSideURL()

  return {
    title: `${post.title} | Altair Medical System Blog`,
    description: post.excerpt,
    keywords: [post.category, 'medical equipment', 'healthcare', 'modular operation theatre'],
    openGraph: {
      title: `${post.title} | Altair Medical System Blog`,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      url: `${baseUrl}/blog/${post.slug}`,
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Altair Medical System Blog`,
      description: post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug}`,
    },
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const blogPostSchema = generateBlogPostSchema({
    title: post.title,
    description: post.excerpt,
    image: post.image,
    slug: post.slug,
    datePublished: post.date,
    author: post.author,
    category: post.category,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <BlogDetailPage post={post} />
    </>
  )
}

