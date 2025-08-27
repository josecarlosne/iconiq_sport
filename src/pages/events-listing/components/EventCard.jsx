import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EventCard = ({ event, onViewDetails, onRegister }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatPrice = (price) => {
    if (price === 0) return 'Gratis';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    })?.format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-success text-success-foreground';
      case 'closing':
        return 'bg-warning text-warning-foreground';
      case 'closed':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'open':
        return 'Inscripciones Abiertas';
      case 'closing':
        return 'Últimos Días';
      case 'closed':
        return 'Inscripciones Cerradas';
      default:
        return 'Por Confirmar';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-card hover:shadow-modal transition-smooth hover-scale overflow-hidden">
      <div className="relative">
        <div className="h-48 overflow-hidden">
          <Image
            src={event?.image}
            alt={event?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event?.registrationStatus)}`}>
            {getStatusText(event?.registrationStatus)}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
          <span className="text-white text-sm font-medium">{formatPrice(event?.entryFee)}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-card-foreground line-clamp-2">{event?.name}</h3>
          <div className="flex items-center space-x-1 text-muted-foreground ml-2">
            <Icon name="Users" size={16} />
            <span className="text-sm">{event?.participants}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Calendar" size={16} />
            <span className="text-sm">{formatDate(event?.date)}</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="MapPin" size={16} />
            <span className="text-sm">{event?.venue}, {event?.city}</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Trophy" size={16} />
            <span className="text-sm">{event?.sport}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {event?.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              event?.skillLevel === 'Principiante' ? 'bg-success/10 text-success' :
              event?.skillLevel === 'Intermedio'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
            }`}>
              {event?.skillLevel}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(event)}
            >
              Más Info
            </Button>
            {event?.registrationStatus === 'open' && (
              <Button
                variant="default"
                size="sm"
                onClick={() => onRegister(event)}
              >
                Registrarse
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;