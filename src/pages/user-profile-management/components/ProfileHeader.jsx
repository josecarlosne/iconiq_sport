import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ user, isEditing, onEditToggle, onSave }) => {
  const [editData, setEditData] = useState({
    name: user?.name,
    bio: user?.bio,
    location: user?.location,
    website: user?.website
  });

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(editData);
    onEditToggle();
  };

  return (
    <div className="relative bg-card rounded-lg shadow-card overflow-hidden">
      {/* Cover Photo */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary to-accent">
        <Image
          src={user?.coverPhoto}
          alt="Foto de portada"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Edit Cover Button */}
        {isEditing && (
          <button className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-lg hover:bg-black/70 transition-smooth">
            <Icon name="Camera" size={20} />
          </button>
        )}
      </div>
      {/* Profile Content */}
      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="relative -mt-16 mb-4">
          <div className="relative w-32 h-32 mx-auto md:mx-0">
            <Image
              src={user?.avatar}
              alt={user?.name}
              className="w-full h-full rounded-full border-4 border-card object-cover"
            />
            {isEditing && (
              <button className="absolute bottom-2 right-2 bg-accent text-accent-foreground p-2 rounded-full hover-scale">
                <Icon name="Camera" size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-center md:text-left">
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={editData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                className="text-2xl font-bold bg-transparent border-b-2 border-accent focus:outline-none w-full"
                placeholder="Nombre completo"
              />
              <textarea
                value={editData?.bio}
                onChange={(e) => handleInputChange('bio', e?.target?.value)}
                className="w-full bg-muted rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-accent"
                rows="3"
                placeholder="Describe tu trayectoria deportiva..."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={editData?.location}
                  onChange={(e) => handleInputChange('location', e?.target?.value)}
                  className="bg-muted rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Ubicación"
                />
                <input
                  type="url"
                  value={editData?.website}
                  onChange={(e) => handleInputChange('website', e?.target?.value)}
                  className="bg-muted rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Sitio web"
                />
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {user?.name}
              </h1>
              <p className="text-muted-foreground mb-4 max-w-2xl">
                {user?.bio}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={16} />
                  <span>{user?.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={16} />
                  <span>Se unió en {user?.joinDate}</span>
                </div>
                {user?.website && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Globe" size={16} />
                    <a href={user?.website} className="text-accent hover:underline">
                      Sitio web
                    </a>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center md:justify-end mt-6 space-x-3">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={onEditToggle}>
                Cancelar
              </Button>
              <Button variant="default" onClick={handleSave}>
                Guardar Cambios
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={onEditToggle}>
                <Icon name="Edit" size={16} className="mr-2" />
                Editar Perfil
              </Button>
              <Button variant="default">
                <Icon name="Download" size={16} className="mr-2" />
                Descargar Media Kit
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;