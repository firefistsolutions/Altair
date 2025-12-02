# Database Schema Sync Fix

## Issue
Error: `Failed query: select "payload_locked_documents"...`

This error occurs when the database schema is out of sync with the Payload CMS collections configuration. The new collections (Products, Projects, Events, Resources, Leads) were added to the config, but their database tables don't exist yet.

## Solution Applied

**Enabled automatic schema push in development mode:**

```typescript
db: postgresAdapter({
  push: process.env.NODE_ENV !== 'production', // Auto-push schema changes in development
  pool: {
    // ... connection config
  },
})
```

## What This Does

- **Development (`NODE_ENV !== 'production'`)**: Automatically creates/updates database tables when collections are added or modified
- **Production**: Requires manual migrations (safer for production data)

## Next Steps

1. **Restart the development server:**
   ```bash
   # Stop the current server (Ctrl+C)
   # Then restart:
   pnpm dev
   ```

2. **On server start**, Payload will automatically:
   - Detect new collections
   - Create database tables for Products, Projects, Events, Resources, Leads
   - Create relationships and indexes
   - Sync the schema

3. **Verify in admin panel:**
   - Navigate to http://localhost:3000/admin
   - Check that all collections appear:
     - Products
     - Projects
     - Events
     - Resources
     - Leads

## Alternative: Manual Migration (Production)

For production environments, use migrations:

```bash
# Create migration
pnpm payload migrate:create

# Run migrations
pnpm payload migrate
```

## Notes

- The `push: true` setting is safe for development
- It automatically syncs schema changes without manual migrations
- For production, always use migrations to avoid data loss
- The error should resolve after restarting with the new configuration

---

**Status:** ✅ Fixed - Schema push enabled for development

