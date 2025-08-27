import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import OpportunityCard from './components/OpportunityCard';
import FilterPanel from './components/FilterPanel';
import OpportunityModal from './components/OpportunityModal';
import CreateOpportunityModal from './components/CreateOpportunityModal';
import StatsCard from './components/StatsCard';
import ApplicationCard from './components/ApplicationCard';

const SponsorshipHub = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('athlete'); // athlete, club, sponsor
  const [activeTab, setActiveTab] = useState('opportunities');
  const [filters, setFilters] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [isOpportunityModalOpen, setIsOpportunityModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [savedOpportunities, setSavedOpportunities] = useState(new Set());
  const [sortBy, setSortBy] = useState('newest');

  // Mock data
  const mockOpportunities = [
    {
      id: 1,
      title: "Patrocinio para Futbolista Profesional",
      sponsor: {
        name: "Deportes Élite Colombia",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
        industry: "Equipamiento Deportivo",
        size: "500-1000",
        website: "www.deporteselite.co"
      },
      categories: ["Fútbol", "Deportes de Equipo"],
      budget: { min: 200000, max: 800000 },
      location: "Bogotá",
      duration: "12 meses",
      type: "Patrocinio Individual",
      deadline: "2025-02-15",
      requirements: "Futbolista profesional con experiencia en ligas nacionales, mínimo 2 años de trayectoria, presencia activa en redes sociales con al menos 5,000 seguidores.",
      description: `Buscamos un futbolista talentoso para representar nuestra marca de equipamiento deportivo. El atleta seleccionado será embajador de nuestros productos y participará en campañas publicitarias.\n\nEsta es una oportunidad única para atletas que buscan llevar su carrera al siguiente nivel con el respaldo de una marca reconocida en Colombia.`,
      benefits: [
        "Equipamiento deportivo completo por valor de $500,000 COP",
        "Participación en campañas publicitarias",
        "Bonificaciones por rendimiento",
        "Acceso a eventos exclusivos de la marca"
      ],
      status: "active",
      applicants: 24,
      createdAt: "2025-01-15"
    },
    {
      id: 2,
      title: "Patrocinio Atleta de Atletismo",
      sponsor: {
        name: "Nutrición Deportiva Pro",
        logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center",
        industry: "Suplementos Nutricionales",
        size: "100-500",
        website: "www.nutricionpro.co"
      },
      categories: ["Atletismo", "Deportes Individuales"],
      budget: { min: 150000, max: 400000 },
      location: "Medellín",
      duration: "6 meses",
      type: "Endorsement de Producto",
      deadline: "2025-02-28",
      requirements: "Atleta de atletismo con participación en competencias nacionales, especialización en carreras de fondo o medio fondo, disponibilidad para eventos promocionales.",
      description: `Oportunidad para atletas de atletismo que buscan optimizar su rendimiento con productos nutricionales de alta calidad.\n\nOfrecemos un programa integral de patrocinio que incluye productos, asesoría nutricional y apoyo económico para competencias.`,
      benefits: [
        "Suplementos nutricionales por 6 meses",
        "Asesoría nutricional personalizada",
        "Apoyo económico para competencias",
        "Participación en eventos de la marca"
      ],
      status: "active",
      applicants: 18,
      createdAt: "2025-01-20"
    },
    {
      id: 3,
      title: "Patrocinio Equipo de Baloncesto",
      sponsor: {
        name: "Banco Deportivo Nacional",
        logo: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=100&h=100&fit=crop&crop=center",
        industry: "Servicios Financieros",
        size: "1000+",
        website: "www.bancodeportivo.co"
      },
      categories: ["Baloncesto", "Deportes de Equipo"],
      budget: { min: 500000, max: 1500000 },
      location: "Cartagena",
      duration: "12 meses",
      type: "Patrocinio de Equipo",
      deadline: "2025-03-10",
      requirements: "Equipo de baloncesto registrado en liga profesional o semi-profesional, historial de participación en torneos nacionales, capacidad de promoción de marca.",
      description: `Buscamos equipos de baloncesto comprometidos con la excelencia deportiva para una alianza estratégica a largo plazo.\n\nEste patrocinio incluye apoyo financiero, promoción del equipo y oportunidades de crecimiento en el ámbito deportivo nacional.`,
      benefits: [
        "Apoyo financiero mensual",
        "Uniformes y equipamiento",
        "Promoción en medios digitales",
        "Acceso a instalaciones deportivas"
      ],
      status: "active",
      applicants: 8,
      createdAt: "2025-01-10"
    }
  ];

  const mockApplications = [
    {
      id: 1,
      opportunityId: 1,
      applicant: {
        name: "Carlos Rodríguez",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        sport: "Fútbol",
        location: "Bogotá",
        experience: 5,
        followers: "12.5K",
        rating: 4.8
      },
      message: "Soy un futbolista profesional con 5 años de experiencia en la Liga Colombiana. He jugado en equipos como Millonarios y Santa Fe, y actualmente busco nuevas oportunidades para crecer profesionalmente.",
      appliedAt: "2025-01-25",
      status: "pending",
      portfolio: true
    },
    {
      id: 2,
      opportunityId: 1,
      applicant: {
        name: "Miguel Ángel Torres",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        sport: "Fútbol",
        location: "Medellín",
        experience: 3,
        followers: "8.2K",
        rating: 4.5
      },
      message: "Futbolista joven con gran potencial, he participado en torneos juveniles y estoy listo para dar el salto al fútbol profesional con el apoyo adecuado.",
      appliedAt: "2025-01-24",
      status: "reviewing",
      portfolio: true
    }
  ];

  const mockStats = {
    athlete: [
      { title: "Oportunidades Disponibles", value: "47", change: "+12%", changeType: "positive", icon: "Target", color: "accent" },
      { title: "Aplicaciones Enviadas", value: "8", change: "+3", changeType: "positive", icon: "Send", color: "success" },
      { title: "Respuestas Recibidas", value: "3", change: "0%", changeType: "neutral", icon: "MessageCircle", color: "warning" },
      { title: "Oportunidades Guardadas", value: "12", change: "+5", changeType: "positive", icon: "Bookmark", color: "accent" }
    ],
    sponsor: [
      { title: "Oportunidades Activas", value: "5", change: "+2", changeType: "positive", icon: "Briefcase", color: "accent" },
      { title: "Aplicaciones Recibidas", value: "89", change: "+23%", changeType: "positive", icon: "Users", color: "success" },
      { title: "Atletas Contratados", value: "12", change: "+4", changeType: "positive", icon: "UserCheck", color: "success" },
      { title: "Inversión Total", value: "$2.4M", change: "+15%", changeType: "positive", icon: "DollarSign", color: "warning" }
    ]
  };

  const sortOptions = [
    { value: 'newest', label: 'Más Recientes' },
    { value: 'deadline', label: 'Fecha Límite' },
    { value: 'budget-high', label: 'Mayor Presupuesto' },
    { value: 'budget-low', label: 'Menor Presupuesto' },
    { value: 'applicants', label: 'Más Aplicaciones' }
  ];

  const tabs = userRole === 'sponsor' 
    ? [
        { id: 'opportunities', label: 'Mis Oportunidades', icon: 'Briefcase' },
        { id: 'applications', label: 'Aplicaciones', icon: 'Users' },
        { id: 'analytics', label: 'Analíticas', icon: 'BarChart3' }
      ]
    : [
        { id: 'opportunities', label: 'Oportunidades', icon: 'Target' },
        { id: 'saved', label: 'Guardadas', icon: 'Bookmark' },
        { id: 'applications', label: 'Mis Aplicaciones', icon: 'Send' }
      ];

  useEffect(() => {
    // Simulate user role detection
    const role = localStorage.getItem('userRole') || 'athlete';
    setUserRole(role);
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleApplyToOpportunity = async (opportunityId, applicationData = null) => {
    console.log('Applying to opportunity:', opportunityId, applicationData);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleSaveOpportunity = (opportunityId) => {
    setSavedOpportunities(prev => {
      const newSet = new Set(prev);
      if (newSet?.has(opportunityId)) {
        newSet?.delete(opportunityId);
      } else {
        newSet?.add(opportunityId);
      }
      return newSet;
    });
  };

  const handleViewOpportunityDetails = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setIsOpportunityModalOpen(true);
  };

  const handleCreateOpportunity = async (opportunityData) => {
    console.log('Creating opportunity:', opportunityData);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleAcceptApplication = (applicationId) => {
    console.log('Accepting application:', applicationId);
  };

  const handleRejectApplication = (applicationId) => {
    console.log('Rejecting application:', applicationId);
  };

  const handleViewProfile = (applicant) => {
    console.log('Viewing profile:', applicant);
    navigate('/user-profile-management');
  };

  const handleMessage = (applicant) => {
    console.log('Messaging:', applicant);
  };

  const filteredOpportunities = mockOpportunities?.filter(opportunity => {
    if (filters?.search && !opportunity?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
      return false;
    }
    if (filters?.sports && filters?.sports?.length > 0) {
      const hasMatchingSport = opportunity?.categories?.some(category => 
        filters?.sports?.some(sport => category?.toLowerCase()?.includes(sport))
      );
      if (!hasMatchingSport) return false;
    }
    if (filters?.location && opportunity?.location?.toLowerCase() !== filters?.location) {
      return false;
    }
    return true;
  });

  const currentStats = mockStats?.[userRole] || mockStats?.athlete;

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={true} userRole={userRole} notificationCount={3} />
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {userRole === 'sponsor' ? 'Centro de Patrocinios' : 'Hub de Patrocinios'}
              </h1>
              <p className="text-muted-foreground">
                {userRole === 'sponsor' ?'Gestiona tus campañas de patrocinio y conecta con atletas talentosos' :'Descubre oportunidades de patrocinio y conecta con marcas deportivas'
                }
              </p>
            </div>
            
            {userRole === 'sponsor' && (
              <Button
                variant="default"
                onClick={() => setIsCreateModalOpen(true)}
                iconName="Plus"
                iconPosition="left"
              >
                Crear Oportunidad
              </Button>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {currentStats?.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat?.title}
                value={stat?.value}
                change={stat?.change}
                changeType={stat?.changeType}
                icon={stat?.icon}
                color={stat?.color}
              />
            ))}
          </div>

          {/* Tabs */}
          <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg mb-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-smooth ${
                  activeTab === tab?.id
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={18} />
                <span className="font-medium">{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          {activeTab === 'opportunities' && (
            <div className="lg:col-span-1">
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
              />
            </div>
          )}

          {/* Main Content */}
          <div className={`${activeTab === 'opportunities' ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            {activeTab === 'opportunities' && (
              <>
                {/* Sort and View Options */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">
                      {filteredOpportunities?.length} oportunidades encontradas
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Select
                      placeholder="Ordenar por"
                      options={sortOptions}
                      value={sortBy}
                      onChange={setSortBy}
                      className="w-48"
                    />
                  </div>
                </div>

                {/* Opportunities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredOpportunities?.map((opportunity) => (
                    <OpportunityCard
                      key={opportunity?.id}
                      opportunity={opportunity}
                      userRole={userRole}
                      onApply={handleApplyToOpportunity}
                      onSave={handleSaveOpportunity}
                      onViewDetails={handleViewOpportunityDetails}
                      isSaved={savedOpportunities?.has(opportunity?.id)}
                    />
                  ))}
                </div>

                {filteredOpportunities?.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No se encontraron oportunidades</h3>
                    <p className="text-muted-foreground">
                      Intenta ajustar tus filtros o busca con términos diferentes
                    </p>
                  </div>
                )}
              </>
            )}

            {activeTab === 'applications' && userRole === 'sponsor' && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Aplicaciones Recibidas</h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {mockApplications?.length} aplicaciones
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockApplications?.map((application) => (
                    <ApplicationCard
                      key={application?.id}
                      application={application}
                      onViewProfile={handleViewProfile}
                      onAccept={handleAcceptApplication}
                      onReject={handleRejectApplication}
                      onMessage={handleMessage}
                    />
                  ))}
                </div>
              </>
            )}

            {activeTab === 'saved' && userRole !== 'sponsor' && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Oportunidades Guardadas</h2>
                  <span className="text-sm text-muted-foreground">
                    {savedOpportunities?.size} guardadas
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {mockOpportunities?.filter(opp => savedOpportunities?.has(opp?.id))?.map((opportunity) => (
                      <OpportunityCard
                        key={opportunity?.id}
                        opportunity={opportunity}
                        userRole={userRole}
                        onApply={handleApplyToOpportunity}
                        onSave={handleSaveOpportunity}
                        onViewDetails={handleViewOpportunityDetails}
                        isSaved={true}
                      />
                    ))}
                </div>

                {savedOpportunities?.size === 0 && (
                  <div className="text-center py-12">
                    <Icon name="Bookmark" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No tienes oportunidades guardadas</h3>
                    <p className="text-muted-foreground mb-4">
                      Guarda oportunidades interesantes para revisarlas más tarde
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab('opportunities')}
                    >
                      Explorar Oportunidades
                    </Button>
                  </div>
                )}
              </>
            )}

            {activeTab === 'analytics' && userRole === 'sponsor' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground">Analíticas de Patrocinio</h2>
                
                <div className="bg-card rounded-lg border border-border p-6">
                  <div className="text-center py-12">
                    <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">Analíticas Avanzadas</h3>
                    <p className="text-muted-foreground">
                      Las métricas detalladas y reportes de rendimiento estarán disponibles próximamente
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modals */}
      <OpportunityModal
        opportunity={selectedOpportunity}
        isOpen={isOpportunityModalOpen}
        onClose={() => setIsOpportunityModalOpen(false)}
        userRole={userRole}
        onApply={handleApplyToOpportunity}
      />
      <CreateOpportunityModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateOpportunity}
      />
    </div>
  );
};

export default SponsorshipHub;