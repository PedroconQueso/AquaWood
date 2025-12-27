import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { ProjectWithImages, Project, ProjectImage } from '../types/database';
import { Link, useParams } from 'react-router-dom';
import { Loader2, ArrowLeft, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import { Seo } from '../components/Seo';

export function ProjectDetail() {
  const { t } = useTranslation();
  const { id: projectId } = useParams();
  const [project, setProject] = useState<ProjectWithImages | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

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
        ...(projectData as Project),
        images: (imagesData || []) as ProjectImage[]
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

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  // Swipe handling for mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!lightboxOpen || !project) return;
      if (e.key === 'Escape') {
        setLightboxOpen(false);
        document.body.style.overflow = '';
      }
      if (e.key === 'ArrowLeft' && project.images.length > 0) {
        setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
      }
      if (e.key === 'ArrowRight' && project.images.length > 0) {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      }
    },
    [lightboxOpen, project]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

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
            {/* Main image - tappable to open lightbox */}
            <button
              onClick={() => openLightbox(currentImageIndex)}
              className="w-full aspect-[16/9] md:aspect-[16/9] bg-slate-200 overflow-hidden relative group cursor-pointer"
            >
              <img
                src={project.images[currentImageIndex].image_url}
                alt={`${project.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Zoom hint overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-4 py-2 rounded-full flex items-center space-x-2">
                  <ZoomIn size={18} />
                  <span className="text-sm font-medium hidden sm:inline">View full image</span>
                </div>
              </div>
            </button>

            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-colors z-10"
                >
                  <ChevronLeft size={20} className="md:hidden" />
                  <ChevronLeft size={24} className="hidden md:block" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-colors z-10"
                >
                  <ChevronRight size={20} className="md:hidden" />
                  <ChevronRight size={24} className="hidden md:block" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
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
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
                {project.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => openLightbox(index)}
                    className={`aspect-square rounded-lg overflow-hidden ${
                      index === currentImageIndex
                        ? 'ring-2 md:ring-4 ring-amber-500'
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

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && project.images.length > 0 && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-[110] bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 z-[110] bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium">
            {currentImageIndex + 1} / {project.images.length}
          </div>

          {/* Previous button */}
          {project.images.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[110] bg-white/10 hover:bg-white/20 text-white p-3 md:p-4 rounded-full transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Next button */}
          {project.images.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[110] bg-white/10 hover:bg-white/20 text-white p-3 md:p-4 rounded-full transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Full image - object-contain to show the entire image */}
          <div
            className="w-full h-full flex items-center justify-center p-4 md:p-16"
            onClick={closeLightbox}
          >
            <img
              src={project.images[currentImageIndex].image_url}
              alt={`${project.name} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain select-none"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Thumbnail strip at bottom (hidden on very small screens) */}
          {project.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[110] hidden sm:flex space-x-2 bg-black/50 p-2 rounded-lg max-w-[90vw] overflow-x-auto">
              {project.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-md overflow-hidden transition-all ${
                    index === currentImageIndex
                      ? 'ring-2 ring-amber-500 opacity-100'
                      : 'opacity-50 hover:opacity-75'
                  }`}
                >
                  <img
                    src={image.image_url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Dot indicators for mobile */}
          {project.images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110] flex sm:hidden space-x-2">
              {project.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'bg-white w-6'
                      : 'bg-white/40'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
