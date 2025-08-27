import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ isOpen, onClose, filters, onFiltersChange, onClearFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const sportOptions = [
    { value: '', label: 'Todos los deportes' },
    { value: 'Fútbol', label: 'Fútbol' },
    { value: 'Baloncesto', label: 'Baloncesto' },
    { value: 'Atletismo', label: 'Atletismo' },
    { value: 'Ciclismo', label: 'Ciclismo' },
    { value: 'Natación', label: 'Natación' },
    { value: 'Tenis', label: 'Tenis' },
    { value: 'Voleibol', label: 'Voleibol' }
  ];

  const cityOptions = [
    { value: '', label: 'Todas las ciudades' },
    { value: 'Montería', label: 'Montería' },
    { value: 'Medellín', label: 'Medellín' },
    { value: 'Bogotá', label: 'Bogotá' },
    { value: 'Cartagena', label: 'Cartagena' },
    { value: 'Cali', label: 'Cali' },
    { value: 'Barranquilla', label: 'Barranquilla' }
  ];

  const skillLevelOptions = [
    { value: '', label: 'Todos los niveles' },
    { value: 'Principiante', label: 'Principiante' },
    { value: 'Intermedio', label: 'Intermedio' },
    { value: 'Avanzado', label: 'Avanzado' }
  ];

  const entryFeeOptions = [
    { value: '', label: 'Cualquier precio' },
    { value: 'free', label: 'Gratis' },
    { value: '0-50000', label: 'Hasta $50.000' },
    { value: '50000-100000', label: '$50.000 - $100.000' },
    { value: '100000+', label: 'Más de $100.000' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleDateChange = (key, value) => {
    const updatedFilters = { 
      ...localFilters, 
      dateRange: { ...localFilters?.dateRange, [key]: value }
    };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      sport: '',
      city: '',
      skillLevel: '',
      entryFee: '',
      dateRange: { start: '', end: '' },
      onlyAvailable: false
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const sidebarContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Filtros</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="text-muted-foreground hover:text-foreground"
          >
            Limpiar
          </Button>
          {isOpen && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="md:hidden"
            >
              <Icon name="X" size={20} />
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <Select
          label="Deporte"
          options={sportOptions}
          value={localFilters?.sport}
          onChange={(value) => handleFilterChange('sport', value)}
        />

        <Select
          label="Ciudad"
          options={cityOptions}
          value={localFilters?.city}
          onChange={(value) => handleFilterChange('city', value)}
        />

        <Select
          label="Nivel de habilidad"
          options={skillLevelOptions}
          value={localFilters?.skillLevel}
          onChange={(value) => handleFilterChange('skillLevel', value)}
        />

        <Select
          label="Precio de inscripción"
          options={entryFeeOptions}
          value={localFilters?.entryFee}
          onChange={(value) => handleFilterChange('entryFee', value)}
        />

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Rango de fechas</label>
          <div className="space-y-2">
            <Input
              type="date"
              placeholder="Fecha de inicio"
              value={localFilters?.dateRange?.start}
              onChange={(e) => handleDateChange('start', e?.target?.value)}
            />
            <Input
              type="date"
              placeholder="Fecha de fin"
              value={localFilters?.dateRange?.end}
              onChange={(e) => handleDateChange('end', e?.target?.value)}
            />
          </div>
        </div>

        <div className="pt-2">
          <Checkbox
            label="Solo eventos con inscripciones abiertas"
            checked={localFilters?.onlyAvailable}
            onChange={(e) => handleFilterChange('onlyAvailable', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );

  if (isOpen) {
    return (
      <>
        {/* Mobile Overlay */}
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onClose} />
        
        {/* Mobile Sidebar */}
        <div className="fixed inset-y-0 left-0 z-50 w-80 bg-card border-r border-border p-6 overflow-y-auto md:hidden">
          {sidebarContent}
        </div>
        
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-80 bg-card border-r border-border p-6 overflow-y-auto">
          {sidebarContent}
        </div>
      </>
    );
  }

  return (
    <div className="hidden md:block w-80 bg-card border-r border-border p-6 overflow-y-auto">
      {sidebarContent}
    </div>
  );
};

export default FilterSidebar;