import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SportsCategories = ({ categories, isEditing, onUpdate }) => {
  const [editCategories, setEditCategories] = useState(categories);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState({
    sport: '',
    level: 'Principiante',
    experience: ''
  });

  const availableSports = [
    'Fútbol', 'Baloncesto', 'Atletismo', 'Ciclismo', 'Natación',
    'Tenis', 'Voleibol', 'Boxeo', 'Gimnasia', 'Karate'
  ];

  const levels = ['Principiante', 'Intermedio', 'Avanzado', 'Profesional'];

  const handleAddCategory = () => {
    if (newCategory?.sport && newCategory?.experience) {
      const updatedCategories = [...editCategories, { ...newCategory, id: Date.now() }];
      setEditCategories(updatedCategories);
      setNewCategory({ sport: '', level: 'Principiante', experience: '' });
      setShowAddForm(false);
      onUpdate(updatedCategories);
    }
  };

  const handleRemoveCategory = (id) => {
    const updatedCategories = editCategories?.filter(cat => cat?.id !== id);
    setEditCategories(updatedCategories);
    onUpdate(updatedCategories);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Principiante': return 'bg-blue-100 text-blue-800';
      case 'Intermedio': return 'bg-yellow-100 text-yellow-800';
      case 'Avanzado': return 'bg-orange-100 text-orange-800';
      case 'Profesional': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSportIcon = (sport) => {
    const iconMap = {
      'Fútbol': 'Zap',
      'Baloncesto': 'Circle',
      'Atletismo': 'Zap',
      'Ciclismo': 'Circle',
      'Natación': 'Waves',
      'Tenis': 'Circle',
      'Voleibol': 'Circle',
      'Boxeo': 'Zap',
      'Gimnasia': 'Star',
      'Karate': 'Zap'
    };
    return iconMap?.[sport] || 'Activity';
  };

  return (
    <div className="bg-card rounded-lg shadow-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Categorías Deportivas
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
      {/* Add New Category Form */}
      {showAddForm && isEditing && (
        <div className="bg-muted rounded-lg p-4 mb-4">
          <h4 className="font-medium text-foreground mb-3">Agregar Nueva Categoría</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <select
              value={newCategory?.sport}
              onChange={(e) => setNewCategory(prev => ({ ...prev, sport: e?.target?.value }))}
              className="bg-background border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Seleccionar deporte</option>
              {availableSports?.map(sport => (
                <option key={sport} value={sport}>{sport}</option>
              ))}
            </select>
            <select
              value={newCategory?.level}
              onChange={(e) => setNewCategory(prev => ({ ...prev, level: e?.target?.value }))}
              className="bg-background border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {levels?.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Años de experiencia"
              value={newCategory?.experience}
              onChange={(e) => setNewCategory(prev => ({ ...prev, experience: e?.target?.value }))}
              className="bg-background border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div className="flex space-x-2">
            <Button variant="default" size="sm" onClick={handleAddCategory}>
              Agregar
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowAddForm(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      )}
      {/* Categories List */}
      <div className="space-y-3">
        {editCategories?.map((category) => (
          <div key={category?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name={getSportIcon(category?.sport)} size={20} className="text-accent" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{category?.sport}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(category?.level)}`}>
                    {category?.level}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {category?.experience} años
                  </span>
                </div>
              </div>
            </div>
            {isEditing && (
              <button
                onClick={() => handleRemoveCategory(category?.id)}
                className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-smooth"
              >
                <Icon name="Trash2" size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
      {editCategories?.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="Activity" size={48} className="mx-auto mb-3 opacity-50" />
          <p>No hay categorías deportivas agregadas</p>
          {isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddForm(true)}
              className="mt-3"
            >
              Agregar Primera Categoría
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SportsCategories;