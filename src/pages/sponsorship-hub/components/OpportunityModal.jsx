import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OpportunityModal = ({ opportunity, isOpen, onClose, userRole, onApply }) => {
  const [isApplying, setIsApplying] = useState(false);
  const [applicationData, setApplicationData] = useState({
    message: '',
    portfolio: null,
    experience: ''
  });

  if (!isOpen || !opportunity) return null;

  const handleApply = async () => {
    setIsApplying(true);
    await onApply(opportunity?.id, applicationData);
    setIsApplying(false);
    onClose();
  };

  const formatBudget = (min, max) => {
    return `$${min?.toLocaleString('es-CO')} - $${max?.toLocaleString('es-CO')} COP`;
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining(opportunity?.deadline);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                <Image 
                  src={opportunity?.sponsor?.logo} 
                  alt={opportunity?.sponsor?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{opportunity?.title}</h2>
                <p className="text-lg text-muted-foreground">{opportunity?.sponsor?.name}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1 text-success">
                    <Icon name="DollarSign" size={16} />
                    <span className="font-semibold">{formatBudget(opportunity?.budget?.min, opportunity?.budget?.max)}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Icon name="MapPin" size={16} />
                    <span>{opportunity?.location}</span>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
            />
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Descripción</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {opportunity?.description}
                </p>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Requisitos</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {opportunity?.requirements}
                </p>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Beneficios</h3>
                <ul className="space-y-2">
                  {opportunity?.benefits?.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="Check" size={16} className="text-success mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Application Form for Athletes/Clubs */}
              {userRole !== 'sponsor' && daysRemaining > 0 && (
                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Aplicar a esta Oportunidad</h3>
                  <div className="space-y-4">
                    <Input
                      label="Mensaje de Presentación"
                      type="textarea"
                      placeholder="Cuéntanos por qué eres el candidato ideal..."
                      value={applicationData?.message}
                      onChange={(e) => setApplicationData({...applicationData, message: e?.target?.value})}
                      rows={4}
                    />
                    
                    <Input
                      label="Experiencia Relevante"
                      type="textarea"
                      placeholder="Describe tu experiencia en este deporte..."
                      value={applicationData?.experience}
                      onChange={(e) => setApplicationData({...applicationData, experience: e?.target?.value})}
                      rows={3}
                    />
                    
                    <Input
                      label="Portfolio/Media Kit"
                      type="file"
                      description="Sube tu media kit o portfolio (PDF, máx. 10MB)"
                      onChange={(e) => setApplicationData({...applicationData, portfolio: e?.target?.files?.[0]})}
                    />
                    
                    <Button
                      variant="default"
                      loading={isApplying}
                      onClick={handleApply}
                      iconName="Send"
                      iconPosition="left"
                      className="w-full"
                    >
                      Enviar Aplicación
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">Información Rápida</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Fecha límite:</span>
                    <span className={`text-sm font-medium ${
                      daysRemaining <= 7 ? 'text-warning' : 'text-foreground'
                    }`}>
                      {new Date(opportunity.deadline)?.toLocaleDateString('es-CO')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Duración:</span>
                    <span className="text-sm font-medium text-foreground">{opportunity?.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tipo:</span>
                    <span className="text-sm font-medium text-foreground">{opportunity?.type}</span>
                  </div>
                  {userRole === 'sponsor' && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Aplicaciones:</span>
                      <span className="text-sm font-medium text-foreground">{opportunity?.applicants}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Sports Categories */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Categorías Deportivas</h4>
                <div className="flex flex-wrap gap-2">
                  {opportunity?.categories?.map((category, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              {/* Company Info */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Sobre la Empresa</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="Building" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{opportunity?.sponsor?.industry}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{opportunity?.sponsor?.size} empleados</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Globe" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{opportunity?.sponsor?.website}</span>
                  </div>
                </div>
              </div>

              {/* Contact */}
              {userRole !== 'sponsor' && (
                <div>
                  <Button
                    variant="outline"
                    iconName="MessageCircle"
                    iconPosition="left"
                    className="w-full"
                  >
                    Contactar Patrocinador
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityModal;