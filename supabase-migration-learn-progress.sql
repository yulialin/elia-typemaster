-- Migration: Add learn_progress column to user_progress table
-- This column stores ELIA Learn progress data

-- Add the learn_progress column as JSONB (allows storing complex JSON objects)
ALTER TABLE user_progress
ADD COLUMN IF NOT EXISTS learn_progress JSONB DEFAULT '{
  "completedChapters": [],
  "completedExercises": {},
  "exerciseProgress": {},
  "lastAccessedChapter": 1
}'::jsonb;

-- Add a comment to document the column
COMMENT ON COLUMN user_progress.learn_progress IS 'Stores ELIA Learn progress including completed chapters, exercises, and current stage for each chapter';
