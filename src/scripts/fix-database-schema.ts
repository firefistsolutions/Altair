/**
 * Combined script to fix database schema issues
 * 1. Fixes enum conflicts for events_status
 * 2. Adds missing columns to payload_locked_documents_rels
 */

import { Client } from 'pg'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Load environment variables
// Try multiple possible .env file locations
const envPaths = [
  path.resolve(dirname, '../../../../.env'),
  path.resolve(dirname, '../../../.env'),
  path.resolve(dirname, '../../.env.local'),
  path.resolve(dirname, '../../../../.env.local'),
]

for (const envPath of envPaths) {
  try {
    dotenv.config({ path: envPath })
    if (process.env.DATABASE_URI) break
  } catch {
    // Continue to next path
  }
}

// Also try loading from process.env directly (if already set)
dotenv.config()

const DATABASE_URI = process.env.DATABASE_URI

if (!DATABASE_URI) {
  console.error('❌ DATABASE_URI not found in environment variables')
  process.exit(1)
}

async function fixDatabaseSchema() {
  // Handle SSL configuration similar to payload.config.ts
  let connectionString = DATABASE_URI
  if (connectionString.includes('sslmode=require')) {
    connectionString = connectionString.replace('sslmode=require', 'sslmode=no-verify')
  } else if (!connectionString.includes('sslmode=')) {
    const separator = connectionString.includes('?') ? '&' : '?'
    connectionString = `${connectionString}${separator}sslmode=no-verify`
  }

  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  })

  try {
    console.log('🔌 Connecting to database...')
    await client.connect()

    console.log('')
    console.log('🔧 Fixing database schema issues...')
    console.log('')

    // Fix 1: Enum conflict
    console.log('1️⃣  Checking for enum conflicts...')
    const enumCheck = await client.query(`
      SELECT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'enum_events_status'
      )
    `)

    if (enumCheck.rows[0].exists) {
      console.log('   ⚠️  Found existing enum_events_status')
      console.log('   🗑️  Dropping enum_events_status (CASCADE)...')
      await client.query('DROP TYPE IF EXISTS enum_events_status CASCADE')
      console.log('   ✅ Dropped enum_events_status')
    } else {
      console.log('   ✅ No enum conflicts found')
    }

    console.log('')

    // Fix 2: Locked documents table
    console.log('2️⃣  Checking payload_locked_documents_rels table...')
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'payload_locked_documents_rels'
      )
    `)

    if (!tableCheck.rows[0].exists) {
      console.log('   ⚠️  Table does not exist. Payload will create it on next start.')
    } else {
      // Get existing columns
      const existingColumns = await client.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'payload_locked_documents_rels'
      `)

      const existingColumnNames = existingColumns.rows.map((row) => row.column_name)

      // Columns that should exist for new collections
      const requiredColumns = [
        { name: 'products_id', type: 'integer' },
        { name: 'projects_id', type: 'integer' },
        { name: 'events_id', type: 'integer' },
        { name: 'resources_id', type: 'integer' },
        { name: 'leads_id', type: 'integer' },
      ]

      const missingColumns = requiredColumns.filter(
        (col) => !existingColumnNames.includes(col.name),
      )

      if (missingColumns.length === 0) {
        console.log('   ✅ All required columns already exist')
      } else {
        console.log(`   ⚠️  Found ${missingColumns.length} missing column(s)`)
        for (const col of missingColumns) {
          await client.query(`
            ALTER TABLE payload_locked_documents_rels 
            ADD COLUMN IF NOT EXISTS ${col.name} ${col.type}
          `)
          console.log(`   ✅ Added column: ${col.name}`)
        }
      }
    }

    console.log('')
    console.log('✅ Database schema fixes completed!')
    console.log('')
    console.log('📝 Next steps:')
    console.log('   1. Restart your dev server: pnpm dev')
    console.log('   2. Payload will recreate enums and sync schema')
    console.log('   3. The admin panel should load without errors')
  } catch (error: any) {
    console.error('')
    console.error('❌ Error fixing database schema:')
    console.error(error.message)
    if (error.code) {
      console.error(`   Error code: ${error.code}`)
    }
    process.exit(1)
  } finally {
    await client.end()
  }
}

fixDatabaseSchema()

