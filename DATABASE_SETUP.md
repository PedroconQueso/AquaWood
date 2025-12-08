# Database Setup Guide

Your Supabase database needs the tables created. Follow these steps:

## Step 1: Run the Migration

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project (kqqsjysoxhqdflddhzej)
3. Navigate to **SQL Editor** in the left sidebar
4. Click **New query**
5. Copy and paste the entire contents of `supabase/migrations/20251208180512_create_projects_and_images.sql`
6. Click **Run** (or press Ctrl+Enter)

This will create:
- `projects` table
- `project_images` table
- Row Level Security policies
- Indexes for performance

## Step 2: Verify Tables Were Created

1. Go to **Table Editor** in the left sidebar
2. You should see two tables:
   - `projects`
   - `project_images`

## Step 3: (Optional) Set Up Storage Bucket

If you want to upload images from your computer, also run the storage migration:

1. Go back to **SQL Editor**
2. Copy and paste the contents of `supabase/migrations/20251209000000_create_storage_bucket.sql`
3. Click **Run**

Or follow the manual setup in `STORAGE_SETUP.md`

## Troubleshooting

- **"relation already exists"**: The tables are already created, you can ignore this
- **"permission denied"**: Make sure you're logged into the Supabase Dashboard with the correct account
- **"syntax error"**: Make sure you copied the entire migration file correctly

