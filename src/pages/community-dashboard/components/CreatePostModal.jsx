import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
  const [postData, setPostData] = useState({
    content: '',
    type: 'general',
    location: '',
    hashtags: '',
    media: null
  });
  const [mediaPreview, setMediaPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const postTypes = [
    { id: 'general', label: 'General', icon: 'MessageCircle' },
    { id: 'training', label: 'Entrenamiento', icon: 'Dumbbell' },
    { id: 'achievement', label: 'Logro', icon: 'Trophy' },
    { id: 'event', label: 'Evento', icon: 'Calendar' }
  ];

  const handleInputChange = (field, value) => {
    setPostData(prev => ({ ...prev, [field]: value }));
  };

  const handleMediaUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setPostData(prev => ({ ...prev, media: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setMediaPreview({
          url: e?.target?.result,
          type: file?.type?.startsWith('image/') ? 'image' : 'video',
          name: file?.name
        });
      };
      reader?.readAsDataURL(file);
    }
  };

  const removeMedia = () => {
    setPostData(prev => ({ ...prev, media: null }));
    setMediaPreview(null);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!postData?.content?.trim()) return;

    setIsSubmitting(true);
    
    try {
      // Process hashtags
      const hashtags = postData?.hashtags?.split(' ')?.filter(tag => tag?.startsWith('#'))?.map(tag => tag?.slice(1));

      const newPost = {
        id: Date.now(),
        content: postData?.content,
        type: postData?.type,
        location: postData?.location || null,
        hashtags: hashtags?.length > 0 ? hashtags : null,
        media: mediaPreview,
        author: {
          name: "Tu nombre",
          role: "Atleta",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
          verified: false
        },
        timestamp: new Date(),
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        recentComments: []
      };

      await onSubmit?.(newPost);
      
      // Reset form
      setPostData({
        content: '',
        type: 'general',
        location: '',
        hashtags: '',
        media: null
      });
      setMediaPreview(null);
      onClose();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card rounded-lg shadow-modal w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Crear publicación</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex flex-col max-h-[calc(90vh-80px)]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* User Info */}
            <div className="flex items-center space-x-3">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                alt="Tu avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-foreground">Tu nombre</h3>
                <p className="text-sm text-muted-foreground">Atleta</p>
              </div>
            </div>

            {/* Post Type */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tipo de publicación
              </label>
              <div className="flex flex-wrap gap-2">
                {postTypes?.map((type) => (
                  <button
                    key={type?.id}
                    type="button"
                    onClick={() => handleInputChange('type', type?.id)}
                    className={`
                      flex items-center space-x-2 px-3 py-2 rounded-lg border transition-smooth
                      ${postData?.type === type?.id
                        ? 'bg-accent text-accent-foreground border-accent'
                        : 'bg-card text-muted-foreground border-border hover:border-accent'
                      }
                    `}
                  >
                    <Icon name={type?.icon} size={16} />
                    <span className="text-sm">{type?.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div>
              <textarea
                placeholder="¿Qué quieres compartir con la comunidad?"
                value={postData?.content}
                onChange={(e) => handleInputChange('content', e?.target?.value)}
                className="w-full h-32 p-3 bg-card border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground"
                maxLength={500}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-muted-foreground">
                  {postData?.content?.length}/500 caracteres
                </span>
              </div>
            </div>

            {/* Location */}
            <Input
              label="Ubicación (opcional)"
              type="text"
              placeholder="¿Dónde estás?"
              value={postData?.location}
              onChange={(e) => handleInputChange('location', e?.target?.value)}
            />

            {/* Hashtags */}
            <Input
              label="Hashtags (opcional)"
              type="text"
              placeholder="#entrenamiento #futbol #monteria"
              value={postData?.hashtags}
              onChange={(e) => handleInputChange('hashtags', e?.target?.value)}
              description="Separa los hashtags con espacios"
            />

            {/* Media Upload */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Multimedia (opcional)
              </label>
              
              {!mediaPreview ? (
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent transition-smooth">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleMediaUpload}
                    className="hidden"
                    id="media-upload"
                  />
                  <label htmlFor="media-upload" className="cursor-pointer">
                    <Icon name="Upload" size={24} className="text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Haz clic para subir una imagen o video
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Máximo 10MB
                    </p>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  {mediaPreview?.type === 'image' ? (
                    <Image
                      src={mediaPreview?.url}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Icon name="Video" size={32} className="text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">{mediaPreview?.name}</p>
                      </div>
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={removeMedia}
                    className="absolute top-2 right-2"
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 border-t border-border">
            <div className="flex items-center space-x-4">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => document.getElementById('media-upload')?.click()}
                className="flex items-center space-x-2"
              >
                <Icon name="Image" size={16} />
                <span>Foto/Video</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Icon name="MapPin" size={16} />
                <span>Ubicación</span>
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={!postData?.content?.trim() || isSubmitting}
                loading={isSubmitting}
              >
                Publicar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;