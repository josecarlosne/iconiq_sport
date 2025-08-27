import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const AchievementsSection = ({ achievements, isEditing, onUpdate }) => {
  const [editAchievements, setEditAchievements] = useState(achievements);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    description: '',
    date: '',
    category: 'Competencia',
    image: ''
  });

  const categories = ['Competencia', 'Reconocimiento', 'Certificación', 'Récord', 'Otro'];

  const handleAddAchievement = () => {
    if (newAchievement?.title && newAchievement?.date) {
      const updatedAchievements = [...editAchievements, { 
        ...newAchievement, 
        id: Date.now(),
        image: newAchievement?.image || 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop'
      }];
      setEditAchievements(updatedAchievements);
      setNewAchievement({ title: '', description: '', date: '', category: 'Competencia', image: '' });
      setShowAddForm(false);
      onUpdate(updatedAchievements);
    }
  };

  const handleRemoveAchievement = (id) => {
    const updatedAchievements = editAchievements?.filter(ach => ach?.id !== id);
    setEditAchievements(updatedAchievements);
    onUpdate(updatedAchievements);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Competencia': return 'Trophy';
      case 'Reconocimiento': return 'Award';
      case 'Certificación': return 'Certificate';
      case 'Récord': return 'Target';
      default: return 'Star';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Competencia': return 'bg-yellow-100 text-yellow-800';
      case 'Reconocimiento': return 'bg-purple-100 text-purple-800';
      case 'Certificación': return 'bg-blue-100 text-blue-800';
      case 'Récord': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Logros y Reconocimientos
        </h3>
        {isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddForm(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Agregar
          </Button>
        )}
      </div>
      {/* Add New Achievement Form */}
      {showAddForm && isEditing && (
        <div className="bg-muted rounded-lg p-4 mb-4">
          <h4 className="font-medium text-foreground mb-3">Agregar Nuevo Logro</h4>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Título del logro"
              value={newAchievement?.title}
              onChange={(e) => setNewAchievement(prev => ({ ...prev, title: e?.target?.value }))}
              className="w-full bg-background border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <textarea
              placeholder="Descripción del logro"
              value={newAchievement?.description}
              onChange={(e) => setNewAchievement(prev => ({ ...prev, description: e?.target?.value }))}
              className="w-full bg-background border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              rows="3"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="date"
                value={newAchievement?.date}
                onChange={(e) => setNewAchievement(prev => ({ ...prev, date: e?.target?.value }))}
                className="bg-background border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <select
                value={newAchievement?.category}
                onChange={(e) => setNewAchievement(prev => ({ ...prev, category: e?.target?.value }))}
                className="bg-background border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {categories?.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <input
              type="url"
              placeholder="URL de imagen (opcional)"
              value={newAchievement?.image}
              onChange={(e) => setNewAchievement(prev => ({ ...prev, image: e?.target?.value }))}
              className="w-full bg-background border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div className="flex space-x-2 mt-3">
            <Button variant="default" size="sm" onClick={handleAddAchievement}>
              Agregar
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowAddForm(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      )}
      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {editAchievements?.map((achievement) => (
          <div key={achievement?.id} className="bg-muted rounded-lg p-4 relative">
            {isEditing && (
              <button
                onClick={() => handleRemoveAchievement(achievement?.id)}
                className="absolute top-2 right-2 text-destructive hover:bg-destructive/10 p-1 rounded-lg transition-smooth"
              >
                <Icon name="X" size={16} />
              </button>
            )}
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Image
                  src={achievement?.image}
                  alt={achievement?.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name={getCategoryIcon(achievement?.category)} size={16} className="text-accent" />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(achievement?.category)}`}>
                    {achievement?.category}
                  </span>
                </div>
                
                <h4 className="font-medium text-foreground mb-1 truncate">
                  {achievement?.title}
                </h4>
                
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {achievement?.description}
                </p>
                
                <div className="flex items-center text-xs text-muted-foreground">
                  <Icon name="Calendar" size={12} className="mr-1" />
                  {new Date(achievement.date)?.toLocaleDateString('es-CO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {editAchievements?.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="Trophy" size={48} className="mx-auto mb-3 opacity-50" />
          <p>No hay logros registrados</p>
          {isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddForm(true)}
              className="mt-3"
            >
              Agregar Primer Logro
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default AchievementsSection;