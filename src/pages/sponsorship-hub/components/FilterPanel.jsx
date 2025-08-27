import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ filters, onFilterChange, onClearFilters, isOpen, onToggle }) => {
  const sportOptions = [
    { value: 'futbol', label: 'Fútbol' },
    { value: 'baloncesto', label: 'Baloncesto' },
    { value: 'atletismo', label: 'Atletismo' },
    { value: 'ciclismo', label: 'Ciclismo' },
    { value: 'natacion', label: 'Natación' },
    { value: 'tenis', label: 'Tenis' },
    { value: 'voleibol', label: 'Voleibol' },
    { value: 'boxeo', label: 'Boxeo' }
  ];

  const locationOptions = [
    { value: 'bogota', label: 'Bogotá' },
    { value: 'medellin', label: 'Medellín' },
    { value: 'monteria', label: 'Montería' },
    { value: 'cartagena', label: 'Cartagena' },
    { value: 'cali', label: 'Cali' },
    { value: 'barranquilla', label: 'Barranquilla' },
    { value: 'nacional', label: 'Nacional' }
  ];

  const budgetRanges = [
    { value: '0-50000', label: 'Hasta $50.000 COP' },
    { value: '50000-200000', label: '$50.000 - $200.000 COP' },
    { value: '200000-500000', label: '$200.000 - $500.000 COP' },
    { value: '500000-1000000', label: '$500.000 - $1.000.000 COP' },
    { value: '1000000+', label: 'Más de $1.000.000 COP' }
  ];

  const durationOptions = [
    { value: '1-3', label: '1-3 meses' },
    { value: '3-6', label: '3-6 meses' },
    { value: '6-12', label: '6-12 meses' },
    { value: '12+', label: 'Más de 12 meses' }
  ];

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName={isOpen ? "X" : "Filter"}
          iconPosition="left"
          className="w-full"
        >
          {isOpen ? 'Cerrar Filtros' : 'Filtros'}
        </Button>
      </div>
      {/* Filter Panel */}
      <div className={`bg-card rounded-lg border border-border p-6 ${
        isOpen ? 'block' : 'hidden lg:block'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Filtros</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Limpiar
          </Button>
        </div>

        <div className="space-y-6">
          {/* Search */}
          <div>
            <Input
              label="Buscar oportunidades"
              type="search"
              placeholder="Buscar por título, empresa..."
              value={filters?.search || ''}
              onChange={(e) => onFilterChange('search', e?.target?.value)}
            />
          </div>

          {/* Sports */}
          <div>
            <Select
              label="Deportes"
              placeholder="Seleccionar deportes"
              multiple
              searchable
              options={sportOptions}
              value={filters?.sports || []}
              onChange={(value) => onFilterChange('sports', value)}
            />
          </div>

          {/* Location */}
          <div>
            <Select
              label="Ubicación"
              placeholder="Seleccionar ubicación"
              options={locationOptions}
              value={filters?.location || ''}
              onChange={(value) => onFilterChange('location', value)}
            />
          </div>

          {/* Budget Range */}
          <div>
            <Select
              label="Rango de Presupuesto"
              placeholder="Seleccionar rango"
              options={budgetRanges}
              value={filters?.budgetRange || ''}
              onChange={(value) => onFilterChange('budgetRange', value)}
            />
          </div>

          {/* Duration */}
          <div>
            <Select
              label="Duración del Patrocinio"
              placeholder="Seleccionar duración"
              options={durationOptions}
              value={filters?.duration || ''}
              onChange={(value) => onFilterChange('duration', value)}
            />
          </div>

          {/* Additional Filters */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Opciones Adicionales</h4>
            
            <Checkbox
              label="Solo oportunidades nuevas"
              checked={filters?.newOnly || false}
              onChange={(e) => onFilterChange('newOnly', e?.target?.checked)}
            />
            
            <Checkbox
              label="Aplicación rápida disponible"
              checked={filters?.quickApply || false}
              onChange={(e) => onFilterChange('quickApply', e?.target?.checked)}
            />
            
            <Checkbox
              label="Patrocinios recurrentes"
              checked={filters?.recurring || false}
              onChange={(e) => onFilterChange('recurring', e?.target?.checked)}
            />
          </div>

          {/* Active Filters Count */}
          {Object.keys(filters)?.length > 0 && (
            <div className="pt-4 border-t border-border">
              <div className="flex items-center space-x-2 text-sm text-accent">
                <Icon name="Filter" size={16} />
                <span>{Object.keys(filters)?.length} filtros activos</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterPanel;