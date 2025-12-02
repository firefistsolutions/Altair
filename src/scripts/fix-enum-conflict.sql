-- Fix enum conflict for events_status
-- This script drops the existing enum and lets Payload recreate it with correct values

-- Drop the enum if it exists (this will fail if tables are using it, so drop tables first if needed)
DROP TYPE IF EXISTS enum_events_status CASCADE;

-- Note: After running this, restart the dev server and Payload will recreate the enum with correct values
-- The enum will be recreated with: 'upcoming', 'past', 'cancelled'

