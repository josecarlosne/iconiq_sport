import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ events, onEventSelect, selectedEvent }) => {
  const [mapCenter] = useState({ lat: 7.8890, lng: -76.6413 }); // Colombia center

  const formatPrice = (price) => {
    if (price === 0) return 'Gratis';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    })?.format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'border-success bg-success/10';
      case 'closing':
        return 'border-warning bg-warning/10';
      case 'closed':
        return 'border-error bg-error/10';
      default:
        return 'border-muted bg-muted/10';
    }
  };

  return (
    <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden">
      {/* Map Container */}
      <div className="w-full h-full">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Mapa de Eventos Deportivos Colombia"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=6&output=embed`}
          className="border-0"
        />
      </div>
      {/* Event Markers Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {events?.map((event, index) => {
          const markerPosition = {
            left: `${20 + (index % 4) * 20}%`,
            top: `${20 + Math.floor(index / 4) * 15}%`
          };

          return (
            <div
              key={event?.id}
              className="absolute pointer-events-auto"
              style={markerPosition}
            >
              <button
                onClick={() => onEventSelect(event)}
                className={`relative bg-card border-2 rounded-lg p-2 shadow-card hover:shadow-modal transition-smooth hover-scale ${getStatusColor(event?.registrationStatus)} ${
                  selectedEvent?.id === event?.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div className="flex items-center space-x-2 min-w-0">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" size={16} color="white" />
                  </div>
                  <div className="text-left min-w-0">
                    <div className="font-medium text-sm text-card-foreground truncate max-w-32">
                      {event?.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {event?.city} • {formatDate(event?.date)}
                    </div>
                  </div>
                </div>
                
                {/* Price Badge */}
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {formatPrice(event?.entryFee)}
                </div>
              </button>
            </div>
          );
        })}
      </div>
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          variant="secondary"
          size="sm"
          className="bg-card shadow-card"
          iconName="ZoomIn"
        >
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="bg-card shadow-card"
          iconName="ZoomOut"
        >
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="bg-card shadow-card"
          iconName="Locate"
        >
        </Button>
      </div>
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card rounded-lg shadow-card p-3">
        <div className="text-sm font-medium text-card-foreground mb-2">Estado de Inscripciones</div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="text-xs text-muted-foreground">Abiertas</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <span className="text-xs text-muted-foreground">Cerrando</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-error"></div>
            <span className="text-xs text-muted-foreground">Cerradas</span>
          </div>
        </div>
      </div>
      {/* Selected Event Info */}
      {selectedEvent && (
        <div className="absolute bottom-4 right-4 bg-card rounded-lg shadow-modal p-4 max-w-sm">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-card-foreground">{selectedEvent?.name}</h4>
            <button
              onClick={() => onEventSelect(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={14} />
              <span>{selectedEvent?.venue}, {selectedEvent?.city}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={14} />
              <span>{formatDate(selectedEvent?.date)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Trophy" size={14} />
              <span>{selectedEvent?.sport}</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="font-semibold text-primary">{formatPrice(selectedEvent?.entryFee)}</span>
            <Button
              variant="default"
              size="sm"
              onClick={() => console.log('Ver detalles:', selectedEvent?.id)}
            >
              Ver Detalles
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;