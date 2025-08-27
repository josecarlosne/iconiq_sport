import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const CreateOpportunityModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    categories: [],
    budgetMin: '',
    budgetMax: '',
    location: '',
    duration: '',
    type: '',
    deadline: '',
    benefits: [''],
    quickApply: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

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

  const durationOptions = [
    { value: '1-3 meses', label: '1-3 meses' },
    { value: '3-6 meses', label: '3-6 meses' },
    { value: '6-12 meses', label: '6-12 meses' },
    { value: '12+ meses', label: 'Más de 12 meses' }
  ];

  const typeOptions = [
    { value: 'individual', label: 'Patrocinio Individual' },
    { value: 'equipo', label: 'Patrocinio de Equipo' },
    { value: 'evento', label: 'Patrocinio de Evento' },
    { value: 'producto', label: 'Endorsement de Producto' }
  ];

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    const opportunityData = {
      ...formData,
      budget: {
        min: parseInt(formData?.budgetMin),
        max: parseInt(formData?.budgetMax)
      },
      benefits: formData?.benefits?.filter(benefit => benefit?.trim() !== ''),
      createdAt: new Date()?.toISOString(),
      status: 'active',
      applicants: 0
    };
    
    await onSubmit(opportunityData);
    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      requirements: '',
      categories: [],
      budgetMin: '',
      budgetMax: '',
      location: '',
      duration: '',
      type: '',
      deadline: '',
      benefits: [''],
      quickApply: false
    });
  };

  const addBenefit = () => {
    setFormData({
      ...formData,
      benefits: [...formData?.benefits, '']
    });
  };

  const updateBenefit = (index, value) => {
    const newBenefits = [...formData?.benefits];
    newBenefits[index] = value;
    setFormData({
      ...formData,
      benefits: newBenefits
    });
  };

  const removeBenefit = (index) => {
    const newBenefits = formData?.benefits?.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      benefits: newBenefits?.length > 0 ? newBenefits : ['']
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Crear Nueva Oportunidad</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <Input
                label="Título de la Oportunidad"
                type="text"
                placeholder="Ej: Patrocinio para Atleta de Fútbol"
                value={formData?.title}
                onChange={(e) => setFormData({...formData, title: e?.target?.value})}
                required
              />

              <Input
                label="Descripción"
                type="textarea"
                placeholder="Describe la oportunidad de patrocinio..."
                value={formData?.description}
                onChange={(e) => setFormData({...formData, description: e?.target?.value})}
                rows={4}
                required
              />

              <Input
                label="Requisitos"
                type="textarea"
                placeholder="Especifica los requisitos para aplicar..."
                value={formData?.requirements}
                onChange={(e) => setFormData({...formData, requirements: e?.target?.value})}
                rows={3}
                required
              />

              <Select
                label="Categorías Deportivas"
                placeholder="Seleccionar deportes"
                multiple
                searchable
                options={sportOptions}
                value={formData?.categories}
                onChange={(value) => setFormData({...formData, categories: value})}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Presupuesto Mínimo (COP)"
                  type="number"
                  placeholder="50000"
                  value={formData?.budgetMin}
                  onChange={(e) => setFormData({...formData, budgetMin: e?.target?.value})}
                  required
                />
                <Input
                  label="Presupuesto Máximo (COP)"
                  type="number"
                  placeholder="500000"
                  value={formData?.budgetMax}
                  onChange={(e) => setFormData({...formData, budgetMax: e?.target?.value})}
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <Select
                label="Ubicación"
                placeholder="Seleccionar ubicación"
                options={locationOptions}
                value={formData?.location}
                onChange={(value) => setFormData({...formData, location: value})}
                required
              />

              <Select
                label="Duración del Patrocinio"
                placeholder="Seleccionar duración"
                options={durationOptions}
                value={formData?.duration}
                onChange={(value) => setFormData({...formData, duration: value})}
                required
              />

              <Select
                label="Tipo de Patrocinio"
                placeholder="Seleccionar tipo"
                options={typeOptions}
                value={formData?.type}
                onChange={(value) => setFormData({...formData, type: value})}
                required
              />

              <Input
                label="Fecha Límite"
                type="date"
                value={formData?.deadline}
                onChange={(e) => setFormData({...formData, deadline: e?.target?.value})}
                required
              />

              {/* Benefits */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Beneficios del Patrocinio
                </label>
                <div className="space-y-2">
                  {formData?.benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        type="text"
                        placeholder="Ej: Equipamiento deportivo completo"
                        value={benefit}
                        onChange={(e) => updateBenefit(index, e?.target?.value)}
                        className="flex-1"
                      />
                      {formData?.benefits?.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeBenefit(index)}
                          iconName="Trash2"
                        />
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addBenefit}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Agregar Beneficio
                  </Button>
                </div>
              </div>

              <Checkbox
                label="Permitir aplicación rápida"
                description="Los atletas pueden aplicar con información básica"
                checked={formData?.quickApply}
                onChange={(e) => setFormData({...formData, quickApply: e?.target?.checked})}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              iconName="Plus"
              iconPosition="left"
            >
              Crear Oportunidad
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOpportunityModal;