# Supabase Database Migration Instructions

## Problem
The `user_progress` table is missing the `learn_progress` column, which causes database save errors when users complete ELIA Learn chapters.

## Solution
Add the `learn_progress` column to the `user_progress` table in your Supabase database.

## Steps to Apply Migration

### Option 1: Using Supabase Dashboard (Recommended)

1. **Go to your Supabase project dashboard**
   - Navigate to https://app.supabase.com
   - Select your project

2. **Open the SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run the migration SQL**
   - Copy the contents of `supabase-migration-learn-progress.sql`
   - Paste it into the SQL editor
   - Click "Run" or press Cmd/Ctrl + Enter

4. **Verify the column was added**
   - Go to "Table Editor" in the left sidebar
   - Select the `user_progress` table
   - Confirm that `learn_progress` column now exists (type: jsonb)

### Option 2: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
# Navigate to your project directory
cd /Users/yueerlin/Desktop/elia_life_tech/elia-typemaster

# Apply the migration
supabase db push

# Or run the SQL file directly
psql YOUR_DATABASE_CONNECTION_STRING < supabase-migration-learn-progress.sql
```

## What This Migration Does

- Adds a `learn_progress` column to the `user_progress` table
- Column type: `JSONB` (allows storing complex JSON data)
- Default value: Empty progress object with:
  - `completedChapters`: []
  - `completedExercises`: {}
  - `exerciseProgress`: {}
  - `lastAccessedChapter`: 1

## After Migration

Once you've applied this migration:

1. **Test the application**
   - Log in to your app
   - Complete a chapter in ELIA Learn
   - Check browser console - you should see "✅ [Supabase] Save successful" instead of errors
   - Navigate away and back - progress should persist

2. **Verify data is being saved**
   - In Supabase dashboard, go to Table Editor → user_progress
   - Click on your user's row
   - Check that the `learn_progress` column contains your completed chapters

## Rollback (if needed)

If you need to remove the column:

```sql
ALTER TABLE user_progress DROP COLUMN IF EXISTS learn_progress;
```

## Next Steps

After applying this migration, the ELIA Learn progress persistence should work correctly:
- ✅ Progress saves to database when chapters are completed
- ✅ Progress loads from database on login
- ✅ Progress persists across navigation
- ✅ Progress persists across login sessions
