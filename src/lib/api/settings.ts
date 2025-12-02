import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import type { Header, Footer } from '@/payload-types'

/**
 * Get global header settings
 */
export async function getHeader(): Promise<Header | null> {
  const payload = await getPayload({ config: configPromise })

  try {
    const header = await payload.findGlobal({
      slug: 'header',
      depth: 2,
    })

    return header as Header
  } catch (error) {
    console.error('Error fetching header:', error)
    return null
  }
}

/**
 * Get global footer settings
 */
export async function getFooter(): Promise<Footer | null> {
  const payload = await getPayload({ config: configPromise })

  try {
    const footer = await payload.findGlobal({
      slug: 'footer',
      depth: 2,
    })

    return footer as Footer
  } catch (error) {
    console.error('Error fetching footer:', error)
    return null
  }
}

/**
 * Get all global settings (header + footer)
 */
export async function getSettings(): Promise<{
  header: Header | null
  footer: Footer | null
}> {
  const [header, footer] = await Promise.all([getHeader(), getFooter()])

  return {
    header,
    footer,
  }
}

