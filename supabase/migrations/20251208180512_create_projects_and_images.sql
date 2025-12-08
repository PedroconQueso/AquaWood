/*
  # Create Aquawood Projects Database Schema

  1. New Tables
    - `projects`
      - `id` (uuid, primary key) - Unique project identifier
      - `name` (text) - Project name
      - `description` (text) - Project description
      - `created_at` (timestamptz) - When project was created
      - `updated_at` (timestamptz) - Last update timestamp
    
    - `project_images`
      - `id` (uuid, primary key) - Unique image identifier
      - `project_id` (uuid, foreign key) - Reference to parent project
      - `image_url` (text) - URL/path to the image
      - `display_order` (integer) - Order for displaying images
      - `created_at` (timestamptz) - When image was uploaded

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access (anyone can view projects)
    - Add policies for authenticated admin users to manage projects
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create project_images table
CREATE TABLE IF NOT EXISTS project_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;

-- Public read access for projects
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

-- Public read access for project images
CREATE POLICY "Anyone can view project images"
  ON project_images FOR SELECT
  TO anon, authenticated
  USING (true);

-- Admin policies for projects (authenticated users can manage)
CREATE POLICY "Authenticated users can create projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- Admin policies for project_images (authenticated users can manage)
CREATE POLICY "Authenticated users can create project images"
  ON project_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update project images"
  ON project_images FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete project images"
  ON project_images FOR DELETE
  TO authenticated
  USING (true);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS project_images_project_id_idx ON project_images(project_id);
CREATE INDEX IF NOT EXISTS project_images_display_order_idx ON project_images(display_order);
