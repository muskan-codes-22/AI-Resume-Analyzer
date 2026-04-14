-- Run this in your Supabase SQL Editor
-- Adds the result_data JSONB column to store the full AI analysis result

ALTER TABLE analyses
  ADD COLUMN IF NOT EXISTS result_data JSONB;
