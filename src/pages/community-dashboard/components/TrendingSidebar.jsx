import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TrendingSidebar = () => {
  const trendingHashtags = [
    { tag: 'FutbolColombia', posts: 1247 },
    { tag: 'EntrenamientoMonteria', posts: 892 },
    { tag: 'BasketMedellin', posts: 654 },
    { tag: 'AtletismoBogota', posts: 543 },
    { tag: 'CiclismoCartagena', posts: 432 }
  ];

  const suggestedConnections = [
    {
      id: 1,
      name: "Carlos Vásquez",
      role: "Entrenador de Fútbol",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      mutualConnections: 12,
      verified: true
    },
    {
      id: 2,
      name: "María Rodríguez",
      role: "Atleta de Natación",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      mutualConnections: 8,
      verified: false
    },
    {
      id: 3,
      name: "Club Deportivo Águilas",
      role: "Club de Baloncesto",
      avatar: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=40&h=40&fit=crop&crop=center",
      mutualConnections: 25,
      verified: true
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Torneo Nacional de Fútbol",
      date: "2025-09-15",
      location: "Montería",
      participants: 156,
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=60&h=60&fit=crop"
    },
    {
      id: 2,
      title: "Maratón de Medellín",
      date: "2025-09-22",
      location: "Medellín",
      participants: 89,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop"
    },
    {
      id: 3,
      title: "Copa de Baloncesto Juvenil",
      date: "2025-10-01",
      location: "Bogotá",
      participants: 234,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=60&h=60&fit=crop"
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('es-CO', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <div className="w-80 bg-card border-l border-border h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Trending Hashtags */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Tendencias</h2>
          <div className="space-y-3">
            {trendingHashtags?.map((item, index) => (
              <button
                key={index}
                className="w-full text-left p-3 rounded-lg hover:bg-muted transition-smooth group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Hash" size={14} className="text-accent" />
                      <span className="font-medium text-foreground group-hover:text-accent">
                        {item?.tag}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item?.posts?.toLocaleString()} publicaciones
                    </p>
                  </div>
                  <Icon name="TrendingUp" size={16} className="text-green-500" />
                </div>
              </button>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-3 text-accent">
            Ver más tendencias
          </Button>
        </div>

        {/* Suggested Connections */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Conexiones sugeridas</h2>
          <div className="space-y-3">
            {suggestedConnections?.map((person) => (
              <div key={person?.id} className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-smooth">
                <div className="flex items-start space-x-3">
                  <Image
                    src={person?.avatar}
                    alt={person?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1">
                      <h3 className="font-medium text-foreground text-sm truncate">
                        {person?.name}
                      </h3>
                      {person?.verified && (
                        <Icon name="BadgeCheck" size={14} className="text-blue-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{person?.role}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {person?.mutualConnections} conexiones en común
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3">
                  <Button size="sm" className="flex-1">
                    Conectar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Ver perfil
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-3 text-accent">
            Ver más sugerencias
          </Button>
        </div>

        {/* Upcoming Events */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Próximos eventos</h2>
          <div className="space-y-3">
            {upcomingEvents?.map((event) => (
              <button
                key={event?.id}
                className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted/50 transition-smooth group"
              >
                <div className="flex space-x-3">
                  <Image
                    src={event?.image}
                    alt={event?.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground text-sm truncate group-hover:text-accent">
                      {event?.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={12} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {formatDate(event?.date)}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">•</span>
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {event?.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      <Icon name="Users" size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {event?.participants} participantes
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-3 text-accent">
            Ver todos los eventos
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="p-4 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-lg">
          <h3 className="font-semibold text-foreground mb-3">Tu actividad</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">127</div>
              <div className="text-xs text-muted-foreground">Conexiones</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">43</div>
              <div className="text-xs text-muted-foreground">Publicaciones</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingSidebar;