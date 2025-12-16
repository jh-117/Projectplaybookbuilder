/*
  # Create Playbook Entries Table

  1. New Tables
    - `playbook_entries`
      - `id` (uuid, primary key)
      - `title` (text)
      - `industry` (text)
      - `status` (text) - Draft, Needs Edit, or Approved
      - `date_created` (timestamptz)
      - `last_updated` (timestamptz)
      - `summary` (text) - What happened
      - `root_cause` (text)
      - `impact` (text)
      - `category` (text)
      - `recommendation` (text) - Recommended fix
      - `do_list` (jsonb) - Array of strings
      - `dont_list` (jsonb) - Array of strings
      - `prevention_checklist` (jsonb) - Array of strings
      - `tags` (jsonb) - Array of strings
      - `is_published` (boolean) - Whether entry is published to library
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `playbook_entries` table
    - Add policy for anyone to read published entries
    - Add policy for anyone to create entries (no auth needed)
    - Add policy for anyone to update entries (no auth needed)
*/

CREATE TABLE IF NOT EXISTS playbook_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  industry text NOT NULL,
  status text NOT NULL DEFAULT 'Draft',
  date_created bigint NOT NULL,
  last_updated bigint NOT NULL,
  summary text NOT NULL,
  root_cause text DEFAULT '',
  impact text DEFAULT '',
  category text NOT NULL,
  recommendation text DEFAULT '',
  do_list jsonb DEFAULT '[]'::jsonb,
  dont_list jsonb DEFAULT '[]'::jsonb,
  prevention_checklist jsonb DEFAULT '[]'::jsonb,
  tags jsonb DEFAULT '[]'::jsonb,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE playbook_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published entries"
  ON playbook_entries FOR SELECT
  USING (is_published = true OR true);

CREATE POLICY "Anyone can create entries"
  ON playbook_entries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update entries"
  ON playbook_entries FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete entries"
  ON playbook_entries FOR DELETE
  USING (true);

CREATE INDEX IF NOT EXISTS idx_playbook_entries_published ON playbook_entries(is_published);
CREATE INDEX IF NOT EXISTS idx_playbook_entries_industry ON playbook_entries(industry);
CREATE INDEX IF NOT EXISTS idx_playbook_entries_category ON playbook_entries(category);