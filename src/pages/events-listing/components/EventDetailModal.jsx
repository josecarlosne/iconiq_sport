import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EventDetailModal = ({ event, isOpen, onClose, onRegister }) => {
  if (!isOpen || !event) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('es-CO', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
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
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-modal max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <div className="h-64 overflow-hidden rounded-t-lg">
            <Image
              src={event?.image}
              alt={event?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
          <div className="absolute bottom-4 left-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event?.registrationStatus)}`}>
              {getStatusText(event?.registrationStatus)}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-card-foreground mb-2">{event?.name}</h2>
              <div className="flex items-center space-x-4 text-muted-foreground mb-4">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={16} />
                  <span className="text-sm">{formatDate(event?.date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={16} />
                  <span className="text-sm">{formatTime(event?.time)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={16} />
                  <span className="text-sm">{event?.participants} participantes</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary mb-2">{formatPrice(event?.entryFee)}</div>
              {event?.registrationStatus === 'open' && (
                <Button
                  variant="default"
                  onClick={() => onRegister(event)}
                  iconName="UserPlus"
                  iconPosition="left"
                >
                  Registrarse Ahora
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-3">Descripción del Evento</h3>
                <p className="text-muted-foreground leading-relaxed">{event?.fullDescription}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-3">Reglas y Regulaciones</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {event?.rules?.map((rule, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {event?.prizes && event?.prizes?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-3">Premios</h3>
                  <div className="space-y-2">
                    {event?.prizes?.map((prize, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <Icon name="Trophy" size={16} className="text-warning" />
                          <span className="font-medium">{prize?.position}</span>
                        </div>
                        <span className="text-primary font-semibold">{formatPrice(prize?.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-lg font-semibold text-card-foreground mb-3">Detalles del Evento</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} className="text-muted-foreground" />
                    <div>
                      <div className="font-medium">{event?.venue}</div>
                      <div className="text-sm text-muted-foreground">{event?.address}</div>
                      <div className="text-sm text-muted-foreground">{event?.city}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Trophy" size={16} className="text-muted-foreground" />
                    <span>{event?.sport}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Target" size={16} className="text-muted-foreground" />
                    <span>Nivel {event?.skillLevel}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={16} className="text-muted-foreground" />
                    <span>Registro hasta: {formatDate(event?.registrationDeadline)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-lg font-semibold text-card-foreground mb-3">Organizador</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Building" size={20} color="white" />
                  </div>
                  <div>
                    <div className="font-medium">{event?.organizer?.name}</div>
                    <div className="text-sm text-muted-foreground">{event?.organizer?.email}</div>
                    <div className="text-sm text-muted-foreground">{event?.organizer?.phone}</div>
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-lg font-semibold text-card-foreground mb-3">Ubicación</h3>
                <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    title={event?.venue}
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${event?.coordinates?.lat},${event?.coordinates?.lng}&z=15&output=embed`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;