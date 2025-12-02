# Enum Conflict Fix

## Issue
Error: `invalid input value for enum enum_events_status: "upcoming"`

This error occurs because there's an existing PostgreSQL enum `enum_events_status` in the database with different values (likely capitalized: `'Upcoming'`, `'Past'`, `'Cancelled'`), but the Events collection configuration uses lowercase values (`'upcoming'`, `'past'`, `'cancelled'`).

## Solution

### Option 1: Drop the Conflicting Enum (Recommended for Development)

**If you have no important data in the events table:**

1. Connect to your PostgreSQL database
2. Run this SQL command:

```sql
DROP TYPE IF EXISTS enum_events_status CASCADE;
```

3. Restart the dev server (`pnpm dev`)
4. Payload will automatically recreate the enum with the correct lowercase values

### Option 2: Manual SQL Fix (If you have data)

If you have existing data, you'll need to:

1. **Backup your data first**
2. **Alter the enum values** (PostgreSQL doesn't support direct enum value changes, so you need to recreate):

```sql
-- Step 1: Create a new enum with correct values
CREATE TYPE enum_events_status_new AS ENUM ('upcoming', 'past', 'cancelled');

-- Step 2: Alter the table to use the new enum
ALTER TABLE events 
  ALTER COLUMN status TYPE enum_events_status_new 
  USING status::text::enum_events_status_new;

ALTER TABLE events 
  ALTER COLUMN _status TYPE enum_events_status_new 
  USING _status::text::enum_events_status_new;

-- Step 3: Drop the old enum and rename the new one
DROP TYPE enum_events_status;
ALTER TYPE enum_events_status_new RENAME TO enum_events_status;
```

### Option 3: Use Database Migration Tool

If you're using migrations:

```bash
# Create a migration
pnpm payload migrate:create

# Edit the migration file to drop/recreate the enum
# Then run:
pnpm payload migrate
```

## Quick Fix Script (Automated)

**Recommended:** Use the automated Node.js script:

```bash
pnpm fix-enum
```

This script will:
- Connect to your database
- Check for the conflicting enum
- Drop it if found
- Provide next steps

**Manual SQL Option:**

A SQL script is also available at `src/scripts/fix-enum-conflict.sql` that you can run directly:

```bash
# Using psql (if you have direct database access)
psql $DATABASE_URI -f src/scripts/fix-enum-conflict.sql

# Or using a database GUI tool (pgAdmin, DBeaver, etc.)
# Open the script and execute it
```

## Prevention

The `migrationDir` has been added to `payload.config.ts` to better handle schema migrations. For future enum changes:

1. Always use consistent casing (lowercase recommended)
2. Use migrations for production changes
3. Test enum changes in development first

## Status

✅ **Configuration Updated**: Added `migrationDir` to payload config
⚠️ **Action Required**: Drop the existing enum or run the SQL fix script

---

**Next Steps:**
1. Run the SQL fix (Option 1 or 2 above)
2. Restart the dev server
3. Verify the admin panel loads without errors

