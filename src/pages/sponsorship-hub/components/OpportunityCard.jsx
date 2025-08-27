import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OpportunityCard = ({ opportunity, userRole, onApply, onSave, onViewDetails, isSaved = false }) => {
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = async () => {
    setIsApplying(true);
    await onApply(opportunity?.id);
    setIsApplying(false);
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
    <div className="bg-card rounded-lg shadow-card border border-border p-6 hover-scale transition-smooth">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
            <Image 
              src={opportunity?.sponsor?.logo} 
              alt={opportunity?.sponsor?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{opportunity?.title}</h3>
            <p className="text-sm text-muted-foreground">{opportunity?.sponsor?.name}</p>
          </div>
        </div>
        
        {userRole !== 'sponsor' && (
          <button
            onClick={() => onSave(opportunity?.id)}
            className={`p-2 rounded-lg transition-smooth ${
              isSaved 
                ? 'text-accent bg-accent/10' :'text-muted-foreground hover:text-accent hover:bg-accent/10'
            }`}
          >
            <Icon name={isSaved ? "Bookmark" : "BookmarkPlus"} size={20} />
          </button>
        )}
      </div>
      {/* Sports Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        {opportunity?.categories?.map((category, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full font-medium"
          >
            {category}
          </span>
        ))}
      </div>
      {/* Budget */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 text-success">
          <Icon name="DollarSign" size={16} />
          <span className="font-semibold">{formatBudget(opportunity?.budget?.min, opportunity?.budget?.max)}</span>
        </div>
      </div>
      {/* Requirements Preview */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {opportunity?.requirements}
        </p>
      </div>
      {/* Location & Deadline */}
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
        <div className="flex items-center space-x-1">
          <Icon name="MapPin" size={14} />
          <span>{opportunity?.location}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={14} />
          <span className={daysRemaining <= 7 ? 'text-warning font-medium' : ''}>
            {daysRemaining > 0 ? `${daysRemaining} días restantes` : 'Vencido'}
          </span>
        </div>
      </div>
      {/* Actions */}
      <div className="flex items-center space-x-3">
        {userRole !== 'sponsor' && daysRemaining > 0 && (
          <Button
            variant="default"
            size="sm"
            loading={isApplying}
            onClick={handleApply}
            className="flex-1"
          >
            Aplicar
          </Button>
        )}
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(opportunity)}
          className={userRole === 'sponsor' ? 'flex-1' : ''}
        >
          Ver Detalles
        </Button>
      </div>
      {/* Status Badge for Sponsors */}
      {userRole === 'sponsor' && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {opportunity?.applicants} aplicaciones
            </span>
            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
              opportunity?.status === 'active' ?'bg-success/10 text-success' 
                : opportunity?.status === 'paused' ?'bg-warning/10 text-warning' :'bg-muted text-muted-foreground'
            }`}>
              {opportunity?.status === 'active' ? 'Activa' : 
               opportunity?.status === 'paused' ? 'Pausada' : 'Cerrada'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpportunityCard;