import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchAndSort = ({ 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  onToggleFilters,
  resultsCount 
}) => {
  const sortOptions = [
    { value: 'date', label: 'Fecha del evento' },
    { value: 'name', label: 'Nombre del evento' },
    { value: 'city', label: 'Ciudad' },
    { value: 'price', label: 'Precio de inscripción' },
    { value: 'participants', label: 'Número de participantes' },
    { value: 'deadline', label: 'Fecha límite de inscripción' }
  ];

  return (
    <div className="bg-card border-b border-border p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Search and Results Count */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="search"
              placeholder="Buscar eventos, deportes, ciudades..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-10"
            />
          </div>
          {resultsCount !== null && (
            <div className="mt-2 text-sm text-muted-foreground">
              {resultsCount === 0 
                ? 'No se encontraron eventos' 
                : `${resultsCount} evento${resultsCount !== 1 ? 's' : ''} encontrado${resultsCount !== 1 ? 's' : ''}`
              }
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            onClick={onToggleFilters}
            className="md:hidden"
            iconName="Filter"
            iconPosition="left"
          >
            Filtros
          </Button>

          {/* Sort Dropdown */}
          <div className="min-w-48">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={onSortChange}
              placeholder="Ordenar por"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-md transition-smooth ${
                viewMode === 'grid' ?'bg-card text-card-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
              title="Vista de cuadrícula"
            >
              <Icon name="Grid3X3" size={18} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-md transition-smooth ${
                viewMode === 'list' ?'bg-card text-card-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
              title="Vista de lista"
            >
              <Icon name="List" size={18} />
            </button>
            <button
              onClick={() => onViewModeChange('map')}
              className={`p-2 rounded-md transition-smooth ${
                viewMode === 'map' ?'bg-card text-card-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
              title="Vista de mapa"
            >
              <Icon name="Map" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndSort;