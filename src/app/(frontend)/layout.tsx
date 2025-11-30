import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { Inter } from 'next/font/google'
import React from 'react'

// Configure Inter font for Altair brand
// Optimized with preload and subset loading
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  preload: true,
  fallback: ['system-ui', 'arial'],
})

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import { SkipLink } from '@/components/ui/skip-link'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { generateOrganizationSchema } from '@/utilities/seo'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const organizationSchema = generateOrganizationSchema()

  return (
    <html className={cn(inter.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <Providers>
          <SkipLink />
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph({
    siteName: 'Altair Medical System',
    title: 'Altair Medical System | Modular Operation Theatres & Medical Gas Systems',
    description:
      'Design to Perform. Build to Last. Expert engineering and installation of modular operation theatres and medical gas pipeline systems. HTM & ASTM compliant solutions across India.',
  }),
  twitter: {
    card: 'summary_large_image',
    title: 'Altair Medical System | Modular Operation Theatres & Medical Gas Systems',
    description:
      'Design to Perform. Build to Last. Expert engineering and installation of modular operation theatres and medical gas pipeline systems.',
  },
}
