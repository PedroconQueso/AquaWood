import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ProjectWithImages } from '../types/database';
import { Link } from '../components/Router';
import { Loader2 } from 'lucide-react';

export function Projects() {
  const [projects, setProjects] = useState<ProjectWithImages[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (projectsError) throw projectsError;

      const { data: imagesData, error: imagesError } = await supabase
        .from('project_images')
        .select('*')
        .order('display_order', { ascending: true });

      if (imagesError) throw imagesError;

      const projectsWithImages: ProjectWithImages[] = (projectsData || []).map(project => ({
        ...project,
        images: (imagesData || []).filter(img => img.project_id === project.id)
      }));

      setProjects(projectsWithImages);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-amber-600" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4">Our Projects</h1>
        <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Explore our collection of handcrafted wooden furniture. Each piece is unique, built with passion and precision.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-slate-600">No projects yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-200">
                {project.images[0] ? (
                  <img
                    src={project.images[0].image_url}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    No image
                  </div>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors">
                  {project.name}
                </h2>
                <p className="text-slate-600 line-clamp-3">{project.description}</p>
                <div className="mt-4 text-amber-600 font-semibold group-hover:translate-x-2 transition-transform inline-block">
                  View Details →
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
