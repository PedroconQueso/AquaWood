# Supabase Storage Setup Guide

To enable image uploads, you need to set up a storage bucket in Supabase.

## Option 1: Using the Migration (Recommended)

Run the migration file:
```bash
# If using Supabase CLI
supabase migration up

# Or apply the migration manually in Supabase Dashboard > SQL Editor
```

The migration file `supabase/migrations/20251209000000_create_storage_bucket.sql` will:
- Create a public storage bucket named `project-images`
- Set up policies for public read access
- Allow authenticated users to upload, update, and delete images

## Option 2: Manual Setup via Dashboard

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **Storage** in the left sidebar
4. Click **New bucket**
5. Configure:
   - **Name**: `project-images`
   - **Public bucket**: ✅ Checked (enables public read access)
6. Click **Create bucket**

7. Go to **Storage** > **Policies** for the `project-images` bucket
8. Add the following policies:

   **Policy 1: Public Read Access**
   - Policy name: "Public can view project images"
   - Allowed operation: SELECT
   - Target roles: public
   - USING expression: `bucket_id = 'project-images'`

   **Policy 2: Authenticated Upload**
   - Policy name: "Authenticated users can upload project images"
   - Allowed operation: INSERT
   - Target roles: authenticated
   - WITH CHECK expression: `bucket_id = 'project-images'`

   **Policy 3: Authenticated Update**
   - Policy name: "Authenticated users can update project images"
   - Allowed operation: UPDATE
   - Target roles: authenticated
   - USING expression: `bucket_id = 'project-images'`

   **Policy 4: Authenticated Delete**
   - Policy name: "Authenticated users can delete project images"
   - Allowed operation: DELETE
   - Target roles: authenticated
   - USING expression: `bucket_id = 'project-images'`

## Verify Setup

After setup, you should be able to:
1. Log in to the admin panel
2. Create or edit a project
3. Select images from your computer
4. Upload and see them displayed

## Troubleshooting

- **"Bucket not found"**: Make sure the bucket name is exactly `project-images`
- **"Permission denied"**: Check that the storage policies are correctly configured
- **Upload fails**: Verify you're logged in (authenticated user required)

