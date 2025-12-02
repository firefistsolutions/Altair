/**
 * Script to check and fix enum_events_status values
 * This ensures the enum has the correct lowercase values
 */

import { Client } from 'pg'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Load environment variables
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

dotenv.config()

const DATABASE_URI = process.env.DATABASE_URI

if (!DATABASE_URI) {
  console.error('❌ DATABASE_URI not found in environment variables')
  process.exit(1)
}

async function checkAndFixEnum() {
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

    // Check if enum exists
    const enumExists = await client.query(`
      SELECT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'enum_events_status'
      )
    `)

    if (!enumExists.rows[0].exists) {
      console.log('✅ Enum does not exist. Payload will create it on next start.')
      return
    }

    console.log('🔍 Checking enum values...')
    const enumValues = await client.query(`
      SELECT enumlabel 
      FROM pg_enum 
      WHERE enumtypid = (
        SELECT oid FROM pg_type WHERE typname = 'enum_events_status'
      )
      ORDER BY enumsortorder
    `)

    const values = enumValues.rows.map((row) => row.enumlabel)
    console.log(`   Current enum values: ${values.join(', ')}`)

    const requiredValues = ['upcoming', 'past', 'cancelled']
    const hasAllValues = requiredValues.every((val) => values.includes(val))

    if (hasAllValues && values.length === requiredValues.length) {
      console.log('✅ Enum has correct values!')
      return
    }

    console.log('⚠️  Enum values are incorrect or incomplete')
    console.log('🗑️  Dropping enum and dependent objects...')

    // First, drop any tables that depend on this enum
    const dependentTables = await client.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public' 
      AND tablename IN ('events', 'events_rels')
    `)

    for (const table of dependentTables.rows) {
      console.log(`   Dropping table: ${table.tablename}`)
      await client.query(`DROP TABLE IF EXISTS ${table.tablename} CASCADE`)
    }

    // Drop the enum
    await client.query('DROP TYPE IF EXISTS enum_events_status CASCADE')

    console.log('✅ Successfully dropped enum_events_status')
    console.log('')
    console.log('📝 Next steps:')
    console.log('   1. Restart your dev server: pnpm dev')
    console.log('   2. Payload will recreate the enum with correct values: upcoming, past, cancelled')
    console.log('   3. The admin panel should load without errors')
  } catch (error: any) {
    console.error('❌ Error checking/fixing enum:')
    console.error(error.message)
    if (error.code) {
      console.error(`   Error code: ${error.code}`)
    }
    process.exit(1)
  } finally {
    await client.end()
  }
}

checkAndFixEnum()

