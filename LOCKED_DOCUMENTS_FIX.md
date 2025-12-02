# Locked Documents Table Fix

## Issue
Error: `column payload_locked_documents__rels.products_id does not exist`

This error occurs because the `payload_locked_documents_rels` table (used by Payload CMS for document locking/collaborative editing) is missing columns for the new collections (Products, Projects, Events, Resources, Leads).

## Solution

### Automated Fix (Recommended)

Run the automated fix script:

```bash
pnpm fix-locked-docs
```

This script will:
- Connect to your database
- Check the `payload_locked_documents_rels` table
- Add missing columns for new collections
- Provide next steps

### Manual SQL Fix

If you prefer to fix it manually, run this SQL:

```sql
-- Add missing columns to payload_locked_documents_rels
ALTER TABLE payload_locked_documents_rels 
  ADD COLUMN IF NOT EXISTS products_id integer,
  ADD COLUMN IF NOT EXISTS projects_id integer,
  ADD COLUMN IF NOT EXISTS events_id integer,
  ADD COLUMN IF NOT EXISTS resources_id integer,
  ADD COLUMN IF NOT EXISTS leads_id integer;
```

## What This Table Does

The `payload_locked_documents_rels` table is an internal Payload CMS table that:
- Tracks which documents are currently being edited
- Prevents concurrent editing conflicts
- Stores relationships between locked documents and collections

When new collections are added, this table needs to be updated with columns for each new collection.

## After Running the Fix

1. **Restart your dev server:**
   ```bash
   pnpm dev
   ```

2. **Verify the admin panel loads:**
   - Navigate to http://localhost:3000/admin
   - All collections should be accessible
   - No more column errors

## Prevention

This issue typically occurs when:
- New collections are added after the initial database setup
- The schema push didn't fully update all related tables
- Manual database modifications were made

The `push: true` setting in development should handle this automatically, but sometimes manual intervention is needed for internal Payload tables.

---

**Status:** ✅ Fix script available - Run `pnpm fix-locked-docs`

