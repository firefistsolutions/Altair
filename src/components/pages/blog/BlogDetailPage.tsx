'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowLeft, Facebook, Twitter, Linkedin } from 'lucide-react'
import { SectionContainer } from '@/components/ui/section-container'
import { AltairButton } from '@/components/ui/altair-button'
import { AltairBadge } from '@/components/ui/altair-badge'

interface BlogDetailPageProps {
  post: {
    slug: string
    title: string
    excerpt: string
    content: string
    image: string
    category: string
    author: string
    date: string
    featured: boolean
  }
}

// Mock related posts - will be replaced with CMS data in Phase 6
const relatedPosts = [
  {
    id: 2,
    title: 'Medicall Expo Mumbai 2025 - Highlights',
    excerpt: 'Recap of our participation at the 44th Medicall Mumbai Edition.',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop&q=80',
    category: 'Events',
    slug: 'medicall-expo-mumbai-2025',
  },
  {
    id: 3,
    title: 'Understanding HTM-02-01 Compliance',
    excerpt: 'A comprehensive guide to HTM-02-01 compliance requirements.',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop&q=80',
    category: 'Technical',
    slug: 'understanding-htm-compliance',
  },
]

export function BlogDetailPage({ post }: BlogDetailPageProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = post.title

  return (
    <div className="min-h-screen bg-clinical-white">
      <SectionContainer className="pt-6 pb-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-brand-navy hover:text-brand-bronze transition-colors focus:outline-none focus:ring-2 focus:ring-brand-bronze rounded mt-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </Link>
      </SectionContainer>

      {/* Hero Image */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <SectionContainer className="text-white">
            <div className="flex items-center gap-4 mb-4 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author}
              </span>
            </div>
            <AltairBadge variant="bronze" className="mb-4">
              {post.category}
            </AltairBadge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>
            <p className="text-lg text-white/90 max-w-3xl leading-relaxed">{post.excerpt}</p>
          </SectionContainer>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 bg-clinical-white">
        <SectionContainer>
          <div className="max-w-4xl mx-auto">
            {/* Social Sharing */}
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-border-gray">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-gray">Share:</span>
                <div className="flex gap-2">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md bg-light-gray hover:bg-border-gray transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-4 h-4 text-brand-navy" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md bg-light-gray hover:bg-border-gray transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-4 h-4 text-brand-navy" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md bg-light-gray hover:bg-border-gray transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 text-brand-navy" />
                  </a>
                </div>
              </div>
            </div>

            {/* Rich Text Content */}
            <div
              className="prose prose-lg max-w-none prose-headings:text-brand-navy prose-headings:font-bold prose-p:text-slate-gray prose-p:leading-relaxed prose-a:text-brand-bronze prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-navy prose-ul:text-slate-gray prose-li:text-slate-gray"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </SectionContainer>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 md:py-16 bg-light-gray">
          <SectionContainer>
            <div className="max-w-7xl">
              <h2 className="text-3xl font-bold text-brand-navy mb-8">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="block h-full focus:outline-none focus:ring-2 focus:ring-brand-bronze rounded-lg"
                  >
                    <div className="bg-clinical-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <AltairBadge variant="outline" size="sm" className="mb-3 w-fit">
                          {relatedPost.category}
                        </AltairBadge>
                        <h3 className="text-xl font-semibold mb-2 text-brand-navy hover:text-brand-bronze transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-slate-gray line-clamp-2 leading-relaxed">{relatedPost.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </SectionContainer>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-brand-navy text-white">
        <SectionContainer>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg text-white/90 mb-6 leading-relaxed">
              Subscribe to our newsletter to receive the latest updates, technical insights, and event announcements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AltairButton variant="bronze" size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </AltairButton>
              <AltairButton
                variant="outline"
                size="lg"
                asChild
                className="border-white text-white hover:bg-white hover:text-brand-navy"
              >
                <Link href="/blog">View All Posts</Link>
              </AltairButton>
            </div>
          </div>
        </SectionContainer>
      </section>
    </div>
  )
}

