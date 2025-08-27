import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import FilterSidebar from './components/FilterSidebar';
import SearchAndSort from './components/SearchAndSort';
import EventCard from './components/EventCard';
import EventListItem from './components/EventListItem';
import MapView from './components/MapView';
import EventDetailModal from './components/EventDetailModal';
import LoadingSkeleton from './components/LoadingSkeleton';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const EventsListing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    sport: '',
    city: '',
    skillLevel: '',
    entryFee: '',
    dateRange: { start: '', end: '' },
    onlyAvailable: false
  });

  // Mock events data
  const mockEvents = [
    {
      id: 1,
      name: "Torneo Nacional de Fútbol Juvenil",
      sport: "Fútbol",
      date: "2025-09-15",
      time: "09:00",
      venue: "Estadio Jaraguay",
      address: "Calle 42 #15-30, Montería",
      city: "Montería",
      coordinates: { lat: 8.7479, lng: -75.8814 },
      image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg",
      description: "Competencia nacional para jóvenes futbolistas entre 16 y 18 años. Participan equipos de toda Colombia.",
      fullDescription: `El Torneo Nacional de Fútbol Juvenil es una competencia anual que reúne a los mejores talentos del fútbol colombiano entre las edades de 16 y 18 años. Este evento busca promover el desarrollo del deporte y identificar futuros talentos para el fútbol profesional.\n\nLa competencia se desarrollará durante tres días consecutivos con partidos eliminatorios hasta llegar a la gran final. Todos los partidos se jugarán bajo las reglas oficiales de la FIFA adaptadas para categorías juveniles.`,
      entryFee: 50000,
      participants: 128,
      skillLevel: "Intermedio",
      registrationStatus: "open",
      registrationDeadline: "2025-09-01",
      organizer: {
        name: "Liga Cordobesa de Fútbol",
        email: "info@ligacordoba.com",
        phone: "+57 300 123 4567"
      },
      rules: [
        "Edad mínima 16 años, máxima 18 años",
        "Documento de identidad vigente obligatorio",
        "Certificado médico deportivo",
        "Seguro de accidentes deportivos",
        "Equipamiento completo del equipo"
      ],
      prizes: [
        { position: "1er Lugar", amount: 2000000 },
        { position: "2do Lugar", amount: 1000000 },
        { position: "3er Lugar", amount: 500000 }
      ]
    },
    {
      id: 2,
      name: "Copa Antioquia de Baloncesto",
      sport: "Baloncesto",
      date: "2025-09-22",
      time: "14:00",
      venue: "Coliseo Iván de Bedout",
      address: "Carrera 70 #52-20, Medellín",
      city: "Medellín",
      coordinates: { lat: 6.2442, lng: -75.5812 },
      image: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg",
      description: "Torneo de baloncesto masculino y femenino para todas las edades. Categorías desde infantil hasta adulto mayor.",
      fullDescription: `La Copa Antioquia de Baloncesto es el evento deportivo más importante de la región en esta disciplina. Con más de 20 años de tradición, reúne a equipos de todo el departamento en múltiples categorías.\n\nEl torneo incluye categorías masculinas y femeninas desde infantil (8-10 años) hasta adulto mayor (50+ años), promoviendo la participación de toda la familia en el deporte.`,
      entryFee: 75000,
      participants: 96,
      skillLevel: "Principiante",
      registrationStatus: "open",
      registrationDeadline: "2025-09-08",
      organizer: {
        name: "Federación Antioqueña de Baloncesto",
        email: "contacto@fedebasquet.com",
        phone: "+57 301 234 5678"
      },
      rules: [
        "Inscripción por equipos completos (mínimo 8 jugadores)",
        "Certificado médico para todos los participantes",
        "Pago de inscripción antes del plazo límite",
        "Uniforme oficial del equipo",
        "Seguro deportivo vigente"
      ],
      prizes: [
        { position: "Campeón Masculino", amount: 1500000 },
        { position: "Campeón Femenino", amount: 1500000 },
        { position: "Subcampeón", amount: 750000 }
      ]
    },
    {
      id: 3,
      name: "Maratón Internacional de Bogotá",
      sport: "Atletismo",
      date: "2025-10-05",
      time: "06:00",
      venue: "Parque Simón Bolívar",
      address: "Calle 63 #68-95, Bogotá",
      city: "Bogotá",
      coordinates: { lat: 4.6533, lng: -74.0836 },
      image: "https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg",
      description: "Maratón internacional con recorrido por los principales sitios turísticos de Bogotá. Distancias de 5K, 10K, 21K y 42K.",
      fullDescription: `El Maratón Internacional de Bogotá es el evento atlético más importante de la capital colombiana. Con un recorrido que atraviesa los lugares más emblemáticos de la ciudad, ofrece una experiencia única para corredores nacionales e internacionales.\n\nEl evento incluye cuatro distancias diferentes para adaptarse a todos los niveles: 5K familiar, 10K recreativo, media maratón (21K) y maratón completo (42K). Cada categoría tiene premiación especial y medalla de participación.`,
      entryFee: 0,
      participants: 15000,
      skillLevel: "Principiante",
      registrationStatus: "open",
      registrationDeadline: "2025-09-20",
      organizer: {
        name: "Instituto Distrital de Recreación y Deporte",
        email: "maraton@idrd.gov.co",
        phone: "+57 302 345 6789"
      },
      rules: [
        "Edad mínima 16 años para maratón completo",
        "Certificado médico obligatorio",
        "Chip de cronometraje incluido",
        "Hidratación cada 5 kilómetros",
        "Tiempo límite: 6 horas para 42K"
      ],
      prizes: [
        { position: "1er Lugar Masculino 42K", amount: 3000000 },
        { position: "1er Lugar Femenino 42K", amount: 3000000 },
        { position: "1er Lugar 21K", amount: 1000000 }
      ]
    },
    {
      id: 4,
      name: "Torneo de Tenis Cartagena Open",
      sport: "Tenis",
      date: "2025-09-28",
      time: "08:00",
      venue: "Club Cartagena",
      address: "Bocagrande, Cartagena",
      city: "Cartagena",
      coordinates: { lat: 10.3997, lng: -75.5144 },
      image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
      description: "Torneo profesional de tenis con participación internacional. Modalidades individuales y dobles.",
      fullDescription: `El Cartagena Open es un torneo profesional de tenis que atrae a jugadores de toda Latinoamérica. Se juega en canchas de polvo de ladrillo con las mejores condiciones técnicas.\n\nEl torneo incluye competencias en modalidades individuales masculino y femenino, así como dobles mixtos. Es una excelente oportunidad para que los tenistas locales compitan contra jugadores internacionales.`,
      entryFee: 120000,
      participants: 64,
      skillLevel: "Avanzado",
      registrationStatus: "closing",
      registrationDeadline: "2025-09-15",
      organizer: {
        name: "Asociación de Tenis de Bolívar",
        email: "info@tenisbolivar.com",
        phone: "+57 303 456 7890"
      },
      rules: [
        "Ranking ATP/WTA o certificación de nivel",
        "Equipamiento profesional obligatorio",
        "Examen médico deportivo",
        "Seguro de responsabilidad civil",
        "Pago completo antes del cierre de inscripciones"
      ],
      prizes: [
        { position: "Campeón Individual", amount: 5000000 },
        { position: "Finalista Individual", amount: 2500000 },
        { position: "Campeón Dobles", amount: 1500000 }
      ]
    },
    {
      id: 5,
      name: "Gran Fondo Ciclístico de los Andes",
      sport: "Ciclismo",
      date: "2025-10-12",
      time: "07:00",
      venue: "Plaza de Bolívar",
      address: "Centro Histórico, Bogotá",
      city: "Bogotá",
      coordinates: { lat: 4.5981, lng: -74.0758 },
      image: "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg",
      description: "Competencia ciclística de montaña con recorrido por la Cordillera Oriental. Distancias de 50K, 100K y 150K.",
      fullDescription: `El Gran Fondo Ciclístico de los Andes es una de las competencias de ciclismo de ruta más desafiantes de Colombia. El recorrido atraviesa paisajes espectaculares de la Cordillera Oriental con alturas que superan los 3.000 metros sobre el nivel del mar.\n\nLa competencia ofrece tres distancias para diferentes niveles de experiencia, todas con cronometraje oficial y clasificación por categorías de edad. Es un evento que combina deporte de alto rendimiento con turismo ecológico.`,
      entryFee: 80000,
      participants: 500,
      skillLevel: "Intermedio",
      registrationStatus: "open",
      registrationDeadline: "2025-09-30",
      organizer: {
        name: "Federación Colombiana de Ciclismo",
        email: "eventos@fedeciclismo.com",
        phone: "+57 304 567 8901"
      },
      rules: [
        "Bicicleta de ruta en perfecto estado",
        "Casco y equipamiento de seguridad obligatorio",
        "Seguro de accidentes deportivos",
        "Examen médico deportivo vigente",
        "Experiencia mínima en ciclismo de ruta"
      ],
      prizes: [
        { position: "General 150K", amount: 2000000 },
        { position: "General 100K", amount: 1000000 },
        { position: "General 50K", amount: 500000 }
      ]
    },
    {
      id: 6,
      name: "Campeonato Nacional de Natación",
      sport: "Natación",
      date: "2025-11-08",
      time: "09:00",
      venue: "Complejo Acuático Nacional",
      address: "Zona Deportiva, Medellín",
      city: "Medellín",
      coordinates: { lat: 6.2518, lng: -75.5636 },
      image: "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg",
      description: "Campeonato nacional de natación con todas las modalidades olímpicas. Clasificatorio para competencias internacionales.",
      fullDescription: `El Campeonato Nacional de Natación es el evento más importante del calendario acuático colombiano. Reúne a los mejores nadadores del país en todas las modalidades olímpicas, sirviendo como clasificatorio para competencias internacionales.\n\nLa competencia se desarrolla en una piscina olímpica de 50 metros con cronometraje electrónico oficial. Incluye pruebas individuales y relevos en todas las categorías de edad, desde juvenil hasta máster.`,
      entryFee: 60000,
      participants: 200,
      skillLevel: "Avanzado",
      registrationStatus: "open",
      registrationDeadline: "2025-10-25",
      organizer: {
        name: "Federación Colombiana de Natación",
        email: "campeonato@fednatacion.com",
        phone: "+57 305 678 9012"
      },
      rules: [
        "Marcas mínimas de clasificación por prueba",
        "Certificado médico especializado",
        "Afiliación a liga departamental",
        "Seguro deportivo vigente",
        "Equipamiento técnico homologado"
      ],
      prizes: [
        { position: "Récord Nacional", amount: 1000000 },
        { position: "Oro por Prueba", amount: 300000 },
        { position: "Plata por Prueba", amount: 200000 }
      ]
    }
  ];

  // Filter and search logic
  const filteredEvents = useMemo(() => {
    let filtered = mockEvents?.filter(event => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery?.toLowerCase();
        const matchesSearch = 
          event?.name?.toLowerCase()?.includes(query) ||
          event?.sport?.toLowerCase()?.includes(query) ||
          event?.city?.toLowerCase()?.includes(query) ||
          event?.venue?.toLowerCase()?.includes(query) ||
          event?.description?.toLowerCase()?.includes(query);
        
        if (!matchesSearch) return false;
      }

      // Sport filter
      if (filters?.sport && event?.sport !== filters?.sport) return false;

      // City filter
      if (filters?.city && event?.city !== filters?.city) return false;

      // Skill level filter
      if (filters?.skillLevel && event?.skillLevel !== filters?.skillLevel) return false;

      // Entry fee filter
      if (filters?.entryFee) {
        switch (filters?.entryFee) {
          case 'free':
            if (event?.entryFee !== 0) return false;
            break;
          case '0-50000':
            if (event?.entryFee > 50000) return false;
            break;
          case '50000-100000':
            if (event?.entryFee < 50000 || event?.entryFee > 100000) return false;
            break;
          case '100000+':
            if (event?.entryFee <= 100000) return false;
            break;
        }
      }

      // Date range filter
      if (filters?.dateRange?.start || filters?.dateRange?.end) {
        const eventDate = new Date(event.date);
        if (filters?.dateRange?.start && eventDate < new Date(filters.dateRange.start)) return false;
        if (filters?.dateRange?.end && eventDate > new Date(filters.dateRange.end)) return false;
      }

      // Only available filter
      if (filters?.onlyAvailable && event?.registrationStatus !== 'open') return false;

      return true;
    });

    // Sort logic
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'city':
          return a?.city?.localeCompare(b?.city);
        case 'price':
          return a?.entryFee - b?.entryFee;
        case 'participants':
          return b?.participants - a?.participants;
        case 'deadline':
          return new Date(a.registrationDeadline) - new Date(b.registrationDeadline);
        case 'date':
        default:
          return new Date(a.date) - new Date(b.date);
      }
    });

    return filtered;
  }, [searchQuery, filters, sortBy]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };

  const handleRegister = (event) => {
    console.log('Registering for event:', event?.name);
    // Here would be the registration logic
    alert(`¡Registro iniciado para ${event?.name}!`);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      sport: '',
      city: '',
      skillLevel: '',
      entryFee: '',
      dateRange: { start: '', end: '' },
      onlyAvailable: false
    });
  };

  const handleMapEventSelect = (event) => {
    setSelectedEvent(event);
  };

  const renderEventContent = () => {
    if (isLoading) {
      return <LoadingSkeleton viewMode={viewMode} />;
    }

    if (filteredEvents?.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Icon name="Calendar" size={64} className="text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No se encontraron eventos</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            No hay eventos que coincidan con tus criterios de búsqueda. 
            Intenta ajustar los filtros o buscar otros términos.
          </p>
          <Button variant="outline" onClick={handleClearFilters}>
            Limpiar Filtros
          </Button>
        </div>
      );
    }

    switch (viewMode) {
      case 'list':
        return (
          <div className="space-y-4">
            {filteredEvents?.map(event => (
              <EventListItem
                key={event?.id}
                event={event}
                onViewDetails={handleViewDetails}
                onRegister={handleRegister}
              />
            ))}
          </div>
        );

      case 'map':
        return (
          <div className="h-[600px]">
            <MapView
              events={filteredEvents}
              onEventSelect={handleMapEventSelect}
              selectedEvent={selectedEvent}
            />
          </div>
        );

      case 'grid':
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents?.map(event => (
              <EventCard
                key={event?.id}
                event={event}
                onViewDetails={handleViewDetails}
                onRegister={handleRegister}
              />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={true} notificationCount={3} />
      <div className="flex">
        <FilterSidebar
          isOpen={isFiltersOpen}
          onClose={() => setIsFiltersOpen(false)}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
        />

        <div className="flex-1 min-w-0">
          <SearchAndSort
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onToggleFilters={() => setIsFiltersOpen(true)}
            resultsCount={isLoading ? null : filteredEvents?.length}
          />

          <div className="p-6">
            {renderEventContent()}
          </div>
        </div>
      </div>
      <EventDetailModal
        event={selectedEvent}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedEvent(null);
        }}
        onRegister={handleRegister}
      />
    </div>
  );
};

export default EventsListing;