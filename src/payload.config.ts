// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      // Handle Supabase connection string - ensure SSL is configured correctly
      connectionString: (() => {
        const uri = process.env.DATABASE_URI || '';
        if (!uri) {
          // During build, if no DATABASE_URI, throw a clear error
          // User should set DATABASE_URI in .env file
          if (process.env.NEXT_PHASE === 'phase-production-build') {
            console.warn('⚠️  DATABASE_URI not set during build. Payload CMS features may be limited.');
            // Return a dummy connection that will fail gracefully
            return 'postgresql://build-time-dummy:5432/dummy?sslmode=disable';
          }
          return uri;
        }
        
        // For Supabase, replace sslmode=require with sslmode=no-verify
        // or add it if not present
        if (uri.includes('sslmode=require')) {
          return uri.replace('sslmode=require', 'sslmode=no-verify');
        } else if (uri.includes('sslmode=')) {
          // Already has sslmode, keep it but ensure it's no-verify
          return uri.replace(/sslmode=[^&]*/, 'sslmode=no-verify');
        } else {
          // Add sslmode=no-verify if not present
          const separator = uri.includes('?') ? '&' : '?';
          return `${uri}${separator}sslmode=no-verify`;
        }
      })(),
      // Explicitly set SSL config for pg library to allow self-signed certificates
      ssl: {
        rejectUnauthorized: false,
      },
      // During build, don't actually connect - set max connections to 0
      ...(process.env.NEXT_PHASE === 'phase-production-build' && !process.env.DATABASE_URI
        ? { max: 0 }
        : {}),
    },
  }),
  collections: [Pages, Posts, Media, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
