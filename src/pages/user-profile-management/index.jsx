import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import ProfileHeader from './components/ProfileHeader';
import ProfileStats from './components/ProfileStats';
import SportsCategories from './components/SportsCategories';
import AchievementsSection from './components/AchievementsSection';
import SettingsPanel from './components/SettingsPanel';
import RecentActivity from './components/RecentActivity';

const UserProfileManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    id: 1,
    name: "José Carlos Negrete",
    bio: "Futbolista profesional con 8 años de experiencia en ligas colombianas. Especializado en posición de mediocampo ofensivo con enfoque en creación de juego y asistencias. Busco oportunidades de patrocinio y crecimiento profesional.",
    location: "Montería, Córdoba",
    website: "https://josecarlosnegrete.com",
    joinDate: "marzo 2023",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    coverPhoto: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=300&fit=crop",
    role: "athlete",
    verified: true
  });

  const [stats, setStats] = useState({
    profileViews: 2847,
    connections: 156,
    posts: 89,
    events: 12
  });

  const [sportsCategories, setSportsCategories] = useState([
    {
      id: 1,
      sport: "Fútbol",
      level: "Profesional",
      experience: "8"
    },
    {
      id: 2,
      sport: "Atletismo",
      level: "Intermedio",
      experience: "3"
    }
  ]);

  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: "Mejor Jugador del Torneo Regional",
      description: "Reconocimiento como mejor mediocampista en el Torneo Regional de Córdoba 2024",
      date: "2024-06-15",
      category: "Reconocimiento",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Certificación FIFA Grassroots",
      description: "Certificación oficial FIFA para desarrollo de fútbol base y formación juvenil",
      date: "2024-03-20",
      category: "Certificación",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Récord de Asistencias Liga Local",
      description: "Mayor número de asistencias en una temporada de la Liga Local de Montería",
      date: "2023-11-30",
      category: "Récord",
      image: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400&h=300&fit=crop"
    }
  ]);

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      messages: true,
      events: false
    },
    privacy: {
      publicProfile: true,
      showStats: true,
      allowContact: true
    },
    account: {
      email: "jose.negrete@email.com",
      subscription: "Pro",
      renewalDate: "2025-09-27"
    }
  });

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: "post",
      title: "Nueva publicación",
      description: "Compartió fotos del entrenamiento matutino en el estadio municipal",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      media: {
        type: "image",
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop"
      },
      stats: {
        likes: 24,
        comments: 8,
        shares: 3
      }
    },
    {
      id: 2,
      type: "event",
      title: "Participación confirmada",
      description: "Se registró para el Torneo Interclubes de Córdoba 2025",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      stats: null
    },
    {
      id: 3,
      type: "connection",
      title: "Nueva conexión",
      description: "Se conectó con María González - Representante de Patrocinios XYZ",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      stats: null
    },
    {
      id: 4,
      type: "achievement",
      title: "Nuevo logro",
      description: "Agregó el reconocimiento 'Mejor Jugador del Torneo Regional'",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      stats: null
    },
    {
      id: 5,
      type: "training",
      title: "Sesión de entrenamiento",
      description: "Completó sesión de entrenamiento físico - 90 minutos de intensidad alta",
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      stats: null
    }
  ]);

  const tabs = [
    { id: 'profile', label: 'Perfil Público', icon: 'User' },
    { id: 'settings', label: 'Configuración', icon: 'Settings' },
    { id: 'privacy', label: 'Privacidad', icon: 'Shield' }
  ];

  const handleProfileSave = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
    console.log('Profile updated:', updatedData);
  };

  const handleSportsCategoriesUpdate = (updatedCategories) => {
    setSportsCategories(updatedCategories);
    console.log('Sports categories updated:', updatedCategories);
  };

  const handleAchievementsUpdate = (updatedAchievements) => {
    setAchievements(updatedAchievements);
    console.log('Achievements updated:', updatedAchievements);
  };

  const handleSettingsUpdate = (updatedSettings) => {
    setSettings(updatedSettings);
    console.log('Settings updated:', updatedSettings);
  };

  useEffect(() => {
    document.title = 'Gestión de Perfil - ICONIQ SPORT';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={true} userRole="athlete" notificationCount={3} />
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestión de Perfil</h1>
            <p className="text-muted-foreground mt-1">
              Administra tu presencia profesional en ICONIQ SPORT
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/community-dashboard')}
              className="flex items-center space-x-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="ArrowLeft" size={16} />
              <span>Volver al Dashboard</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-border mb-8">
          <nav className="flex space-x-8">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab?.id
                    ? 'border-accent text-accent' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span className="font-medium">{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div className="space-y-8">
            {/* Profile Header */}
            <ProfileHeader
              user={user}
              isEditing={isEditing}
              onEditToggle={() => setIsEditing(!isEditing)}
              onSave={handleProfileSave}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <SportsCategories
                  categories={sportsCategories}
                  isEditing={isEditing}
                  onUpdate={handleSportsCategoriesUpdate}
                />
                
                <AchievementsSection
                  achievements={achievements}
                  isEditing={isEditing}
                  onUpdate={handleAchievementsUpdate}
                />
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                <ProfileStats stats={stats} />
                <RecentActivity activities={recentActivities} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-4xl">
            <SettingsPanel
              settings={settings}
              onUpdate={handleSettingsUpdate}
            />
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="max-w-4xl">
            <div className="bg-card rounded-lg shadow-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Configuración de Privacidad
              </h3>
              
              <div className="space-y-6">
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-2">Visibilidad del Perfil</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Controla quién puede ver tu información personal y deportiva
                  </p>
                  
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings?.privacy?.publicProfile}
                        onChange={(e) => handleSettingsUpdate({
                          ...settings,
                          privacy: { ...settings?.privacy, publicProfile: e?.target?.checked }
                        })}
                        className="w-4 h-4 text-accent focus:ring-accent border-border rounded"
                      />
                      <span className="text-sm text-foreground">Perfil público visible para todos</span>
                    </label>
                    
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings?.privacy?.showStats}
                        onChange={(e) => handleSettingsUpdate({
                          ...settings,
                          privacy: { ...settings?.privacy, showStats: e?.target?.checked }
                        })}
                        className="w-4 h-4 text-accent focus:ring-accent border-border rounded"
                      />
                      <span className="text-sm text-foreground">Mostrar estadísticas deportivas</span>
                    </label>
                    
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings?.privacy?.allowContact}
                        onChange={(e) => handleSettingsUpdate({
                          ...settings,
                          privacy: { ...settings?.privacy, allowContact: e?.target?.checked }
                        })}
                        className="w-4 h-4 text-accent focus:ring-accent border-border rounded"
                      />
                      <span className="text-sm text-foreground">Permitir contacto directo de patrocinadores</span>
                    </label>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-2">Datos Personales</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Gestiona el uso y almacenamiento de tus datos personales
                  </p>
                  
                  <div className="space-y-3">
                    <button className="w-full text-left p-3 bg-background rounded-lg hover:bg-muted transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-foreground">Descargar mis datos</h5>
                          <p className="text-sm text-muted-foreground">Obtén una copia de toda tu información</p>
                        </div>
                        <Icon name="Download" size={16} className="text-muted-foreground" />
                      </div>
                    </button>
                    
                    <button className="w-full text-left p-3 bg-background rounded-lg hover:bg-muted transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-foreground">Solicitar eliminación</h5>
                          <p className="text-sm text-muted-foreground">Eliminar permanentemente tu cuenta y datos</p>
                        </div>
                        <Icon name="Trash2" size={16} className="text-destructive" />
                      </div>
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="Info" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800 mb-1">Política de Privacidad</h4>
                      <p className="text-sm text-blue-700">
                        Revisa nuestra política de privacidad para entender cómo protegemos y utilizamos tu información personal.
                      </p>
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-2">
                        Leer Política Completa →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileManagement;