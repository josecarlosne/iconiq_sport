import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterSidebar = ({ isOpen, onClose, filters, onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState(filters || {
    contentType: 'all',
    sport: 'all',
    location: 'all'
  });

  const contentTypes = [
    { id: 'all', label: 'Todo el contenido', icon: 'Grid3X3' },
    { id: 'training', label: 'Entrenamientos', icon: 'Dumbbell' },
    { id: 'achievement', label: 'Logros', icon: 'Trophy' },
    { id: 'event', label: 'Eventos', icon: 'Calendar' },
    { id: 'sponsor', label: 'Patrocinios', icon: 'Handshake' }
  ];

  const sports = [
    { id: 'all', label: 'Todos los deportes', icon: 'Activity' },
    { id: 'football', label: 'Fútbol', icon: 'Circle' },
    { id: 'basketball', label: 'Baloncesto', icon: 'Circle' },
    { id: 'athletics', label: 'Atletismo', icon: 'Zap' },
    { id: 'cycling', label: 'Ciclismo', icon: 'Bike' },
    { id: 'swimming', label: 'Natación', icon: 'Waves' }
  ];

  const locations = [
    { id: 'all', label: 'Todas las ciudades', icon: 'MapPin' },
    { id: 'bogota', label: 'Bogotá', icon: 'MapPin' },
    { id: 'medellin', label: 'Medellín', icon: 'MapPin' },
    { id: 'monteria', label: 'Montería', icon: 'MapPin' },
    { id: 'cartagena', label: 'Cartagena', icon: 'MapPin' }
  ];

  const handleFilterChange = (category, value) => {
    const newFilters = { ...activeFilters, [category]: value };
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearAllFilters = () => {
    const defaultFilters = { contentType: 'all', sport: 'all', location: 'all' };
    setActiveFilters(defaultFilters);
    onFilterChange?.(defaultFilters);
  };

  const hasActiveFilters = Object.values(activeFilters)?.some(value => value !== 'all');

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />
      )}
      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 z-50 lg:z-0
        w-80 lg:w-64 h-full lg:h-auto
        bg-card border-r border-border
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-4 lg:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Filtros</h2>
            <div className="flex items-center space-x-2">
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Limpiar
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="lg:hidden"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
          </div>

          {/* Content Type Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-foreground mb-3">Tipo de contenido</h3>
            <div className="space-y-1">
              {contentTypes?.map((type) => (
                <button
                  key={type?.id}
                  onClick={() => handleFilterChange('contentType', type?.id)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-smooth
                    ${activeFilters?.contentType === type?.id
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon name={type?.icon} size={16} />
                  <span className="text-sm">{type?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sport Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-foreground mb-3">Deporte</h3>
            <div className="space-y-1">
              {sports?.map((sport) => (
                <button
                  key={sport?.id}
                  onClick={() => handleFilterChange('sport', sport?.id)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-smooth
                    ${activeFilters?.sport === sport?.id
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon name={sport?.icon} size={16} />
                  <span className="text-sm">{sport?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-foreground mb-3">Ubicación</h3>
            <div className="space-y-1">
              {locations?.map((location) => (
                <button
                  key={location?.id}
                  onClick={() => handleFilterChange('location', location?.id)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-smooth
                    ${activeFilters?.location === location?.id
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon name={location?.icon} size={16} />
                  <span className="text-sm">{location?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="text-xs font-medium text-muted-foreground mb-2">FILTROS ACTIVOS</h4>
              <div className="space-y-1">
                {activeFilters?.contentType !== 'all' && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground">
                      {contentTypes?.find(t => t?.id === activeFilters?.contentType)?.label}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleFilterChange('contentType', 'all')}
                      className="w-4 h-4"
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  </div>
                )}
                {activeFilters?.sport !== 'all' && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground">
                      {sports?.find(s => s?.id === activeFilters?.sport)?.label}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleFilterChange('sport', 'all')}
                      className="w-4 h-4"
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  </div>
                )}
                {activeFilters?.location !== 'all' && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground">
                      {locations?.find(l => l?.id === activeFilters?.location)?.label}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleFilterChange('location', 'all')}
                      className="w-4 h-4"
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;