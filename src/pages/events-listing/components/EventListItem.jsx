import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EventListItem = ({ event, onViewDetails, onRegister }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`)?.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit'
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
    <div className="bg-card rounded-lg shadow-card hover:shadow-modal transition-smooth border border-border">
      <div className="flex flex-col sm:flex-row">
        {/* Event Image */}
        <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
          <div className="w-full h-full overflow-hidden rounded-t-lg sm:rounded-l-lg sm:rounded-t-none">
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

        {/* Event Content */}
        <div className="flex-1 p-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-semibold text-card-foreground">{event?.name}</h3>
                <div className="flex items-center space-x-1 text-muted-foreground ml-4">
                  <Icon name="Users" size={16} />
                  <span className="text-sm">{event?.participants}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Icon name="Calendar" size={16} />
                  <span className="text-sm">{formatDate(event?.date)}</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Icon name="Clock" size={16} />
                  <span className="text-sm">{formatTime(event?.time)}</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Icon name="MapPin" size={16} />
                  <span className="text-sm">{event?.city}</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Icon name="Trophy" size={16} />
                  <span className="text-sm">{event?.sport}</span>
                </div>
              </div>

              <p className="text-muted-foreground mb-4 line-clamp-2">
                {event?.description}
              </p>

              <div className="flex items-center space-x-3 mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  event?.skillLevel === 'Principiante' ? 'bg-success/10 text-success' :
                  event?.skillLevel === 'Intermedio'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                }`}>
                  {event?.skillLevel}
                </span>
                <div className="text-sm text-muted-foreground">
                  {event?.venue}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col space-y-2 sm:space-y-0 sm:space-x-2 lg:space-x-0 lg:space-y-2 lg:ml-6">
              <Button
                variant="outline"
                onClick={() => onViewDetails(event)}
                iconName="Eye"
                iconPosition="left"
              >
                Ver Detalles
              </Button>
              {event?.registrationStatus === 'open' && (
                <Button
                  variant="default"
                  onClick={() => onRegister(event)}
                  iconName="UserPlus"
                  iconPosition="left"
                >
                  Registrarse
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventListItem;