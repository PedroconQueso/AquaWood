-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can view projects" ON projects;
DROP POLICY IF EXISTS "Anyone can view project images" ON project_images;
DROP POLICY IF EXISTS "Authenticated users can create projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can delete projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can create project images" ON project_images;
DROP POLICY IF EXISTS "Authenticated users can update project images" ON project_images;
DROP POLICY IF EXISTS "Authenticated users can delete project images" ON project_images;

-- Ensure RLS is enabled
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

