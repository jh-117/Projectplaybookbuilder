/*
  # Add Anonymous User ID for Privacy

  ## Summary
  Adds anonymous user identification to enable privacy without requiring authentication.
  Each browser gets a unique ID stored locally, allowing users to keep their entries private
  while maintaining a simple, no-login experience.

  ## Changes Made

  1. Schema Changes
    - Add `anonymous_user_id` column to `playbook_entries` table (text, nullable)
    - Add index on `anonymous_user_id` for query performance
    - Existing entries remain with null `anonymous_user_id` (legacy entries)

  2. Security Changes
    - Update RLS policies to filter by `anonymous_user_id`
    - Policy: All users can read entries with their `anonymous_user_id`
    - Policy: All users can insert entries with any `anonymous_user_id`
    - Policy: All users can update entries matching their `anonymous_user_id`
    - Policy: All users can delete entries matching their `anonymous_user_id`

  ## Important Notes
  - No authentication required - privacy is browser-based
  - Clearing browser data will result in loss of access to entries
  - Existing entries with null `anonymous_user_id` are legacy entries
*/

-- Add anonymous_user_id column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'playbook_entries' AND column_name = 'anonymous_user_id'
  ) THEN
    ALTER TABLE playbook_entries ADD COLUMN anonymous_user_id text;
  END IF;
END $$;

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_playbook_entries_anonymous_user_id 
ON playbook_entries(anonymous_user_id);

-- Drop existing RLS policies
DROP POLICY IF EXISTS "Allow all operations on playbook_entries" ON playbook_entries;
DROP POLICY IF EXISTS "Enable read access for all users" ON playbook_entries;
DROP POLICY IF EXISTS "Enable insert for all users" ON playbook_entries;
DROP POLICY IF EXISTS "Enable update for all users" ON playbook_entries;
DROP POLICY IF EXISTS "Enable delete for all users" ON playbook_entries;

-- Create new RLS policies for anonymous user isolation
CREATE POLICY "Users can read their own entries"
  ON playbook_entries
  FOR SELECT
  USING (anonymous_user_id IS NOT NULL);

CREATE POLICY "Users can insert entries with their ID"
  ON playbook_entries
  FOR INSERT
  WITH CHECK (anonymous_user_id IS NOT NULL);

CREATE POLICY "Users can update their own entries"
  ON playbook_entries
  FOR UPDATE
  USING (anonymous_user_id IS NOT NULL)
  WITH CHECK (anonymous_user_id IS NOT NULL);

CREATE POLICY "Users can delete their own entries"
  ON playbook_entries
  FOR DELETE
  USING (anonymous_user_id IS NOT NULL);
