import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ProjectWithImages } from '../types/database';
import { Link } from 'react-router-dom';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import { Seo } from '../components/Seo';

export function Projects() {
  const { t } = useTranslation();
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
      <Seo
        title="Projects"
        description="Browse custom rustic tables and furniture handcrafted in Quebec."
      />
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4">{t('projects.title')}</h1>
        <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          {t('projects.subtitle')}
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-slate-600">{t('projects.noProjects')}</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

interface ProjectCardProps {
  project: ProjectWithImages;
}

function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (project.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (project.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  const goToImage = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  return (
    <Link
      to={`/projects/${project.id}`}
      className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1"
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-slate-200">
        {project.images.length > 0 ? (
          <>
            <img
              src={project.images[currentImageIndex].image_url}
              alt={`${project.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
                
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => goToImage(e, index)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-white w-4'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            {t('projects.noImage')}
          </div>
        )}
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors">
          {project.name}
        </h2>
        <p className="text-slate-600 line-clamp-3">{project.description}</p>
        <div className="mt-4 text-amber-600 font-semibold group-hover:translate-x-2 transition-transform inline-block">
          {t('projects.viewDetails')} →
        </div>
      </div>
    </Link>
  );
}
