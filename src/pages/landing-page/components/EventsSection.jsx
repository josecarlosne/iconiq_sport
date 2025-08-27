import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EventsSection = () => {
  const events = [
    {
      id: 1,
      title: "Copa Nacional de Fútbol Juvenil",
      date: "15-18 Marzo 2025",
      location: "Montería, Córdoba",
      venue: "Estadio Jaraguay",
      category: "Fútbol",
      participants: 32,
      maxParticipants: 48,
      registrationDeadline: "28 Febrero 2025",
      prize: "$15.000.000 COP",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      status: "Inscripciones Abiertas",
      coordinates: "8.7479,-75.8814",
      description: "El torneo juvenil más prestigioso del país. Equipos de toda Colombia compiten por el título nacional.",
      requirements: ["Edad: 16-20 años", "Registro federativo", "Seguro deportivo"]
    },
    {
      id: 2,
      title: "Maratón Internacional de Medellín",
      date: "22 Abril 2025",
      location: "Medellín, Antioquia",
      venue: "Centro de la Ciudad",
      category: "Atletismo",
      participants: 1250,
      maxParticipants: 2000,
      registrationDeadline: "15 Marzo 2025",
      prize: "$8.000.000 COP",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      status: "Inscripciones Abiertas",
      coordinates: "6.2442,-75.5812",
      description: "42K por las calles de la ciudad de la eterna primavera. Recorrido certificado internacionalmente.",
      requirements: ["Certificado médico", "Tiempo mínimo clasificatorio", "Experiencia en 21K"]
    },
    {
      id: 3,
      title: "Torneo Nacional de Baloncesto",
      date: "10-14 Mayo 2025",
      location: "Bogotá, Cundinamarca",
      venue: "Coliseo El Campín",
      category: "Baloncesto",
      participants: 16,
      maxParticipants: 24,
      registrationDeadline: "20 Abril 2025",
      prize: "$12.000.000 COP",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      status: "Próximamente",
      coordinates: "4.6097,-74.0817",
      description: "Los mejores equipos universitarios y juveniles del país se enfrentan en la capital.",
      requirements: ["Categoría Sub-23", "Afiliación a liga regional", "Planilla completa"]
    },
    {
      id: 4,
      title: "Copa Caribe de Ciclismo",
      date: "5-7 Junio 2025",
      location: "Cartagena, Bolívar",
      venue: "Circuito Costero",
      category: "Ciclismo",
      participants: 89,
      maxParticipants: 120,
      registrationDeadline: "15 Mayo 2025",
      prize: "$10.000.000 COP",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      status: "Inscripciones Abiertas",
      coordinates: "10.3910,-75.4794",
      description: "Tres etapas por la costa caribeña colombiana. Paisajes únicos y competencia de alto nivel.",
      requirements: ["Licencia UCI", "Bicicleta homologada", "Equipo de protección"]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Inscripciones Abiertas':
        return 'bg-success/10 text-success border-success/20';
      case 'Próximamente':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Finalizado':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-accent/10 text-accent border-accent/20';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Fútbol':
        return 'Target';
      case 'Atletismo':
        return 'Zap';
      case 'Baloncesto':
        return 'Circle';
      case 'Ciclismo':
        return 'Bike';
      default:
        return 'Trophy';
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Eventos <span className="text-accent">Destacados</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Participa en los torneos y competencias más importantes de Colombia. 
            Conecta con otros atletas y demuestra tu talento a nivel nacional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {events?.map((event) => (
            <div
              key={event?.id}
              className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-modal transition-smooth hover-scale border border-border"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={event?.image}
                  alt={event?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(event?.status)}`}>
                    {event?.status}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2">
                    <Icon name={getCategoryIcon(event?.category)} size={20} color="white" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground mb-2">
                      {event?.title}
                    </h3>
                    <div className="flex items-center text-muted-foreground text-sm mb-1">
                      <Icon name="Calendar" size={16} className="mr-2" />
                      {event?.date}
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Icon name="MapPin" size={16} className="mr-2" />
                      {event?.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-accent mb-1">
                      {event?.prize}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      en premios
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {event?.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Participantes</div>
                    <div className="font-semibold text-card-foreground">
                      {event?.participants}/{event?.maxParticipants}
                    </div>
                    <div className="w-full bg-border rounded-full h-2 mt-2">
                      <div 
                        className="bg-accent h-2 rounded-full transition-smooth"
                        style={{ width: `${(event?.participants / event?.maxParticipants) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Inscripciones hasta</div>
                    <div className="font-semibold text-card-foreground text-sm">
                      {event?.registrationDeadline}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-xs text-muted-foreground mb-2">Requisitos:</div>
                  <div className="flex flex-wrap gap-2">
                    {event?.requirements?.map((req, index) => (
                      <span
                        key={index}
                        className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1"
                    disabled={event?.status !== 'Inscripciones Abiertas'}
                  >
                    {event?.status === 'Inscripciones Abiertas' ? 'Inscribirse' : 'Ver Detalles'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="MapPin"
                    onClick={() => window.open(`https://www.google.com/maps?q=${event?.coordinates}&z=14`, '_blank')}
                  >
                    Ubicación
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            iconName="Calendar"
            iconPosition="left"
            onClick={() => window.location.href = '/events-listing'}
          >
            Ver Todos los Eventos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;