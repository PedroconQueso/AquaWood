import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from '../components/Router';
import { supabase } from '../lib/supabase';
import { ProjectWithImages } from '../types/database';
import { Plus, Edit, Trash2, Loader2, X, Image as ImageIcon, Upload } from 'lucide-react';

export function Admin() {
  const { user, loading: authLoading } = useAuth();
  const { navigate } = useRouter();
  const [projects, setProjects] = useState<ProjectWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectWithImages | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      loadProjects();
    }
  }, [user]);

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

  const handleDelete = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;
      await loadProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  const handleEdit = (project: ProjectWithImages) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const handleFormSuccess = () => {
    handleCloseForm();
    loadProjects();
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-amber-600" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-slate-600 mt-2">Manage your woodworking projects</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>New Project</span>
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-amber-600" size={48} />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-lg">
          <ImageIcon className="mx-auto text-slate-300 mb-4" size={64} />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No projects yet</h3>
          <p className="text-slate-500 mb-6">Create your first project to get started</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Create Project</span>
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-[4/3] bg-slate-200 overflow-hidden">
                {project.images[0] ? (
                  <img
                    src={project.images[0].image_url}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <ImageIcon size={48} />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{project.name}</h3>
                <p className="text-slate-600 text-sm line-clamp-2 mb-4">{project.description}</p>
                <div className="text-xs text-slate-500 mb-4">
                  {project.images.length} {project.images.length === 1 ? 'image' : 'images'}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
                  >
                    <Edit size={16} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
                  >
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <ProjectForm
          project={editingProject}
          onClose={handleCloseForm}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}

interface ProjectFormProps {
  project: ProjectWithImages | null;
  onClose: () => void;
  onSuccess: () => void;
}

interface ImageFile {
  file: File | null;
  preview: string;
  existingUrl?: string; // For existing images when editing
}

function ProjectForm({ project, onClose, onSuccess }: ProjectFormProps) {
  const [name, setName] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description || '');
  const [images, setImages] = useState<ImageFile[]>(
    project?.images.length 
      ? project.images.map(img => ({ file: null, preview: img.image_url, existingUrl: img.image_url }))
      : [{ file: null, preview: '' }]
  );
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      images.forEach(img => {
        if (img.file && img.preview && !img.existingUrl) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, []);

  const handleFileSelect = (index: number, file: File | null) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be less than 10MB');
      return;
    }

    const newImages = [...images];
    const preview = URL.createObjectURL(file);
    newImages[index] = { file, preview, existingUrl: newImages[index]?.existingUrl };
    setImages(newImages);
    setError('');
  };

  const handleAddImageField = () => {
    setImages([...images, { file: null, preview: '' }]);
  };

  const handleRemoveImageField = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    // Ensure at least one image field remains
    if (newImages.length === 0) {
      setImages([{ file: null, preview: '' }]);
    } else {
      setImages(newImages);
    }
  };

  const uploadImageToStorage = async (file: File, projectId: string, index: number): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${projectId}/${index}-${Date.now()}.${fileExt}`;

    const { error: uploadError, data } = await supabase.storage
      .from('project-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('project-images')
      .getPublicUrl(data.path);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setUploading(true);

    try {
      // Filter out empty image slots
      const validImages = images.filter(img => img.file || img.existingUrl);

      if (validImages.length === 0) {
        setError('Please add at least one image');
        setLoading(false);
        setUploading(false);
        return;
      }

      let projectId: string;

      if (project) {
        // Update existing project
        const { error: updateError } = await supabase
          .from('projects')
          .update({
            name,
            description,
            updated_at: new Date().toISOString()
          })
          .eq('id', project.id);

        if (updateError) throw updateError;
        projectId = project.id;

        // Delete old images from storage (optional - you might want to keep them)
        // For now, we'll just delete the database records
        const { error: deleteError } = await supabase
          .from('project_images')
          .delete()
          .eq('project_id', project.id);

        if (deleteError) throw deleteError;
      } else {
        // Create new project
        const { data: newProject, error: projectError } = await supabase
          .from('projects')
          .insert({ name, description })
          .select()
          .single();

        if (projectError) throw projectError;
        projectId = newProject.id;
      }

      // Upload new files and collect URLs
      const imageUrls: string[] = [];
      for (let i = 0; i < validImages.length; i++) {
        const image = validImages[i];
        if (image.file) {
          // Upload new file
          const url = await uploadImageToStorage(image.file, projectId, i);
          imageUrls.push(url);
        } else if (image.existingUrl) {
          // Use existing URL
          imageUrls.push(image.existingUrl);
        }
      }

      // Insert image records
      const imageInserts = imageUrls.map((url, index) => ({
        project_id: projectId,
        image_url: url,
        display_order: index
      }));

      const { error: imagesError } = await supabase
        .from('project_images')
        .insert(imageInserts);

      if (imagesError) throw imagesError;

      // Clean up preview URLs
      images.forEach(img => {
        if (img.file && img.preview && !img.existingUrl) {
          URL.revokeObjectURL(img.preview);
        }
      });

      onSuccess();
    } catch (err: any) {
      console.error('Error saving project:', err);
      setError(err.message || 'Failed to save project. Please try again.');
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">
            {project ? 'Edit Project' : 'New Project'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
              Project Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
              placeholder="Rustic Dining Table"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none"
              placeholder="Describe your project..."
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-slate-700">
                Images *
              </label>
              <button
                type="button"
                onClick={handleAddImageField}
                className="text-sm text-amber-600 hover:text-amber-700 font-medium"
              >
                + Add Image
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Select images from your computer (JPG, PNG, etc. Max 10MB per image)
            </p>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {images.map((image, index) => (
                <div key={index} className="border border-slate-300 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    {image.preview ? (
                      <div className="flex-shrink-0">
                        <img
                          src={image.preview}
                          alt={`Preview ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-lg border border-slate-200"
                        />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-24 h-24 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                        <ImageIcon className="text-slate-400" size={32} />
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <input
                        ref={(el) => {
                          fileInputRefs.current[index] = el;
                        }}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          handleFileSelect(index, file);
                        }}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRefs.current[index]?.click()}
                        className="w-full px-4 py-2 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-amber-500 hover:text-amber-600 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Upload size={18} />
                        <span>{image.file ? 'Change Image' : 'Select Image'}</span>
                      </button>
                      {image.file && (
                        <p className="text-xs text-slate-500">
                          {image.file.name} ({(image.file.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      )}
                    </div>
                    {images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (image.file && image.preview && !image.existingUrl) {
                            URL.revokeObjectURL(image.preview);
                          }
                          handleRemoveImageField(index);
                        }}
                        className="text-red-600 hover:text-red-700 px-2"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {uploading && (
              <div className="mt-4 flex items-center space-x-2 text-amber-600">
                <Loader2 className="animate-spin" size={16} />
                <span className="text-sm">Uploading images...</span>
              </div>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Saving...</span>
                </>
              ) : (
                <span>{project ? 'Update Project' : 'Create Project'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
