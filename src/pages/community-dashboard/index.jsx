import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/ui/Header';
import PostCard from './components/PostCard';
import FilterSidebar from './components/FilterSidebar';
import TrendingSidebar from './components/TrendingSidebar';
import CreatePostModal from './components/CreatePostModal';
import BottomNavigation from './components/BottomNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CommunityDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filters, setFilters] = useState({
    contentType: 'all',
    sport: 'all',
    location: 'all'
  });
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Mock data for posts
  const mockPosts = [
    {
      id: 1,
      author: {
        name: "José Carlos Negrete",
        role: "Futbolista Profesional",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        verified: true
      },
      content: `¡Excelente sesión de entrenamiento hoy! 💪\n\nTrabajamos en técnica de pase y definición. El equipo está mostrando una gran evolución y estoy muy orgulloso del progreso que hemos logrado.\n\n¿Qué opinan sobre la importancia de la preparación mental en el fútbol?`,
      type: "training",
      location: "Montería, Córdoba",
      hashtags: ["futbol", "entrenamiento", "monteria", "preparacion"],
      media: {
        type: "image",
        url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop"
      },
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      likes: 47,
      comments: 12,
      shares: 8,
      isLiked: false,
      recentComments: [
        {
          author: {
            name: "María López",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
          },
          content: "¡Increíble dedicación! La preparación mental es clave 🧠",
          timestamp: new Date(Date.now() - 900000)
        },
        {
          author: {
            name: "Carlos Vásquez",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
          },
          content: "Totalmente de acuerdo. El aspecto psicológico marca la diferencia.",
          timestamp: new Date(Date.now() - 600000)
        }
      ]
    },
    {
      id: 2,
      author: {
        name: "Club Los Jaguares",
        role: "Club de Baloncesto",
        avatar: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=40&h=40&fit=crop&crop=center",
        verified: true
      },
      content: `🏀 ¡CONVOCATORIA ABIERTA! 🏀\n\nEstamos buscando nuevos talentos para nuestras categorías juveniles (16-20 años). Si tienes pasión por el baloncesto y quieres formar parte de una familia deportiva comprometida con la excelencia, ¡esta es tu oportunidad!\n\nPruebas este sábado a las 9:00 AM en nuestras instalaciones.`,
      type: "event",
      location: "Medellín, Antioquia",
      hashtags: ["baloncesto", "convocatoria", "medellin", "juveniles"],
      media: {
        type: "image",
        url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop"
      },
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      likes: 89,
      comments: 23,
      shares: 15,
      isLiked: true,
      recentComments: [
        {
          author: {
            name: "Andrés Pérez",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
          },
          content: "¿Hay límite de edad? Tengo 19 años y mucho interés",
          timestamp: new Date(Date.now() - 1800000)
        }
      ]
    },
    {
      id: 3,
      author: {
        name: "Patrocinios XYZ",
        role: "Empresa de Patrocinios",
        avatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=40&h=40&fit=crop&crop=center",
        verified: true
      },
      content: `🤝 OPORTUNIDAD DE PATROCINIO 🤝\n\nBuscamos atletas destacados en atletismo y ciclismo para formar parte de nuestro programa de patrocinio 2025.\n\nOfrecemos:\n✅ Apoyo económico mensual\n✅ Equipamiento deportivo\n✅ Cobertura médica\n✅ Asesoría nutricional\n\nEnvía tu propuesta a: patrocinios@xyz.com`,
      type: "sponsor",
      location: "Bogotá, Cundinamarca",
      hashtags: ["patrocinio", "atletismo", "ciclismo", "oportunidad"],
      media: null,
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      likes: 156,
      comments: 45,
      shares: 32,
      isLiked: false,
      recentComments: [
        {
          author: {
            name: "Mariana López",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
          },
          content: "¡Excelente oportunidad! ¿También consideran otros deportes?",
          timestamp: new Date(Date.now() - 3600000)
        }
      ]
    },
    {
      id: 4,
      author: {
        name: "Mariana López",
        role: "Consultora de Marketing Deportivo",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
        verified: false
      },
      content: `📈 TIPS PARA ATLETAS: Construye tu marca personal\n\n1. Define tu propuesta de valor única\n2. Mantén consistencia en redes sociales\n3. Documenta tu progreso y logros\n4. Conecta con tu audiencia de forma auténtica\n5. Busca colaboraciones estratégicas\n\nRecuerda: Tu marca personal es tu activo más valioso como atleta profesional.`,
      type: "general",
      location: "Cartagena, Bolívar",
      hashtags: ["marketing", "marca", "atletas", "consejos"],
      media: null,
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      likes: 73,
      comments: 18,
      shares: 25,
      isLiked: false,
      recentComments: []
    },
    {
      id: 5,
      author: {
        name: "Andrés Pérez",
        role: "Corredor de Maratón",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        verified: false
      },
      content: `🏃‍♂️ ¡NUEVO RÉCORD PERSONAL! 🏃‍♂️\n\nAcabo de completar mi mejor tiempo en 21K: 1:28:45 ⏱️\n\nHa sido un año de mucho trabajo, disciplina y sacrificio. Cada kilómetro corrido, cada madrugada de entrenamiento, cada momento de dolor... todo valió la pena.\n\nGracias a mi entrenador y a todos los que me apoyan. ¡Ahora a por el maratón completo!`,
      type: "achievement",
      location: "Bogotá, Cundinamarca",
      hashtags: ["running", "maraton", "record", "bogota"],
      media: {
        type: "image",
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
      },
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      likes: 124,
      comments: 31,
      shares: 19,
      isLiked: true,
      recentComments: [
        {
          author: {
            name: "José Carlos Negrete",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
          },
          content: "¡Felicitaciones hermano! Increíble tiempo 👏",
          timestamp: new Date(Date.now() - 7200000)
        }
      ]
    }
  ];

  // Initialize posts
  useEffect(() => {
    const loadInitialPosts = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPosts(mockPosts);
      setIsLoading(false);
    };

    loadInitialPosts();
  }, []);

  // Filter posts based on active filters
  useEffect(() => {
    let filtered = [...posts];

    if (filters?.contentType !== 'all') {
      filtered = filtered?.filter(post => post?.type === filters?.contentType);
    }

    if (filters?.sport !== 'all') {
      filtered = filtered?.filter(post => 
        post?.hashtags?.some(tag => 
          tag?.toLowerCase()?.includes(filters?.sport?.toLowerCase())
        ) || 
        post?.content?.toLowerCase()?.includes(filters?.sport?.toLowerCase())
      );
    }

    if (filters?.location !== 'all') {
      filtered = filtered?.filter(post => 
        post?.location?.toLowerCase()?.includes(filters?.location?.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  }, [posts, filters]);

  // Handle pull to refresh
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In real app, fetch latest posts
    setIsRefreshing(false);
  }, []);

  // Handle infinite scroll
  const loadMorePosts = useCallback(async () => {
    if (!hasMore || isLoading) return;
    
    setIsLoading(true);
    // Simulate API call for more posts
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real app, append new posts
    setPage(prev => prev + 1);
    setIsLoading(false);
  }, [hasMore, isLoading]);

  // Handle post interactions
  const handleLike = useCallback((postId, isLiked) => {
    setPosts(prev => prev?.map(post => 
      post?.id === postId 
        ? { ...post, isLiked, likes: isLiked ? post?.likes + 1 : post?.likes - 1 }
        : post
    ));
  }, []);

  const handleComment = useCallback((postId, comment) => {
    const newComment = {
      author: {
        name: "Tu nombre",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
      },
      content: comment,
      timestamp: new Date()
    };

    setPosts(prev => prev?.map(post => 
      post?.id === postId 
        ? { 
            ...post, 
            comments: post?.comments + 1,
            recentComments: [newComment, ...(post?.recentComments || [])]?.slice(0, 3)
          }
        : post
    ));
  }, []);

  const handleShare = useCallback((postId) => {
    setPosts(prev => prev?.map(post => 
      post?.id === postId 
        ? { ...post, shares: post?.shares + 1 }
        : post
    ));
    
    // In real app, implement sharing functionality
    console.log('Sharing post:', postId);
  }, []);

  const handleCreatePost = useCallback((newPost) => {
    setPosts(prev => [newPost, ...prev]);
  }, []);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Scroll event listener for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement?.scrollTop
        >= document.documentElement?.offsetHeight - 1000
      ) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMorePosts]);

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={true} notificationCount={3} />
      <div className="flex">
        {/* Left Sidebar - Filters */}
        <FilterSidebar
          isOpen={isFilterSidebarOpen}
          onClose={() => setIsFilterSidebarOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 lg:mr-80">
          <div className="max-w-2xl mx-auto px-4 py-6">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setIsFilterSidebarOpen(true)}
                className="w-full flex items-center justify-center space-x-2"
              >
                <Icon name="Filter" size={16} />
                <span>Filtros</span>
              </Button>
            </div>

            {/* Pull to Refresh Indicator */}
            {isRefreshing && (
              <div className="flex items-center justify-center py-4">
                <div className="flex items-center space-x-2 text-accent">
                  <Icon name="RefreshCw" size={16} className="animate-spin" />
                  <span className="text-sm">Actualizando...</span>
                </div>
              </div>
            )}

            {/* Posts Feed */}
            <div className="space-y-6">
              {isLoading && filteredPosts?.length === 0 ? (
                // Loading skeleton
                (Array.from({ length: 3 })?.map((_, index) => (
                  <div key={index} className="bg-card rounded-lg shadow-card border border-border p-4">
                    <div className="animate-pulse">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-muted rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                          <div className="h-3 bg-muted rounded w-1/4"></div>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                      </div>
                      <div className="h-48 bg-muted rounded-lg"></div>
                    </div>
                  </div>
                )))
              ) : filteredPosts?.length === 0 ? (
                // Empty state
                (<div className="text-center py-12">
                  <Icon name="MessageCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No hay publicaciones
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {Object.values(filters)?.some(f => f !== 'all') 
                      ? 'No se encontraron publicaciones con los filtros seleccionados.' :'Sé el primero en compartir algo con la comunidad.'
                    }
                  </p>
                  <Button onClick={() => setIsCreatePostModalOpen(true)}>
                    Crear publicación
                  </Button>
                </div>)
              ) : (
                // Posts list
                (filteredPosts?.map((post) => (
                  <PostCard
                    key={post?.id}
                    post={post}
                    onLike={handleLike}
                    onComment={handleComment}
                    onShare={handleShare}
                  />
                )))
              )}

              {/* Load more indicator */}
              {isLoading && filteredPosts?.length > 0 && (
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    <span className="text-sm">Cargando más publicaciones...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Right Sidebar - Trending */}
        <div className="hidden lg:block fixed right-0 top-16 h-[calc(100vh-4rem)]">
          <TrendingSidebar />
        </div>
      </div>
      {/* Floating Action Button */}
      <Button
        onClick={() => setIsCreatePostModalOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-30"
        size="icon"
      >
        <Icon name="Plus" size={24} />
      </Button>
      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        onSubmit={handleCreatePost}
      />
      {/* Bottom Navigation - Mobile Only */}
      <BottomNavigation notificationCount={3} />
    </div>
  );
};

export default CommunityDashboard;