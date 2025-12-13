import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ProjectWithImages } from '../types/database';
import { Link, useParams } from 'react-router-dom';
import { Loader2, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import { Seo } from '../components/Seo';

export function ProjectDetail() {
  const { t } = useTranslation();
  const { id: projectId } = useParams();
  const [project, setProject] = useState<ProjectWithImages | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (projectId) {
      loadProject(projectId);
    }
  }, [projectId]);

  const loadProject = async (id: string) => {
    try {
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (projectError) throw projectError;
      if (!projectData) {
        setLoading(false);
        return;
      }

      const { data: imagesData, error: imagesError } = await supabase
        .from('project_images')
        .select('*')
        .eq('project_id', id)
        .order('display_order', { ascending: true });

      if (imagesError) throw imagesError;

      setProject({
        ...projectData,
        images: imagesData || []
      });
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (project && project.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImage = () => {
    if (project && project.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Seo title="Project" description="Project details from Aquawood Patagonia." />
        <Loader2 className="animate-spin text-amber-600" size={48} />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Seo title="Project not found" description="This project could not be found." />
        <h1 className="text-3xl font-bold text-slate-800 mb-4">{t('projectDetail.projectNotFound')}</h1>
        <Link to="/projects" className="text-amber-600 hover:text-amber-700 font-semibold">
          ← {t('projectDetail.backToProjects')}
        </Link>
      </div>
    );
  }

  const metaDescription =
    (project.description || '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 160) || 'Project details from Aquawood Patagonia.';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Seo title={project.name} description={metaDescription} type="article" />
      <Link
        to="/projects"
        className="inline-flex items-center text-amber-600 hover:text-amber-700 font-semibold mb-8 group"
      >
        <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
        {t('projectDetail.backToProjects')}
      </Link>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {project.images.length > 0 ? (
          <div className="relative">
            <div className="aspect-[16/9] bg-slate-200 overflow-hidden">
              <img
                src={project.images[currentImageIndex].image_url}
                alt={`${project.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronRight size={24} />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-white w-8'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="aspect-[16/9] bg-slate-200 flex items-center justify-center text-slate-400">
            {t('projectDetail.noImagesAvailable')}
          </div>
        )}

        <div className="p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">{project.name}</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{project.description}</p>
          </div>

          {project.images.length > 1 && (
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-4">{t('projectDetail.gallery')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden ${
                      index === currentImageIndex
                        ? 'ring-4 ring-amber-500'
                        : 'hover:opacity-75 transition-opacity'
                    }`}
                  >
                    <img
                      src={image.image_url}
                      alt={`${project.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 text-center bg-slate-800 text-white rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-4">{t('projectDetail.interestedInCustom')}</h3>
        <p className="text-stone-300 mb-6">{t('projectDetail.interestedInCustomDesc')}</p>
        <Link
          to="/contact"
          className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          {t('home.getInTouch')}
        </Link>
      </div>
    </div>
  );
}
