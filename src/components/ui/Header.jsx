import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ isAuthenticated = false, userRole = 'athlete', notificationCount = 0 }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { label: 'Inicio', path: '/community-dashboard', icon: 'Home', tooltip: 'Feed de la comunidad' },
    { label: 'Eventos', path: '/events-listing', icon: 'Calendar', tooltip: 'Descubre torneos y competencias' },
    { label: 'Patrocinios', path: '/sponsorship-hub', icon: 'Handshake', tooltip: 'Conecta con patrocinadores' },
    { label: 'Perfil', path: '/user-profile-management', icon: 'User', tooltip: 'Gestiona tu perfil profesional' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      console.log('Searching for:', searchQuery);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/user-login');
  };

  const isActivePath = (path) => location?.pathname === path;

  if (!isAuthenticated) {
    return (
      <header className="sticky top-0 z-50 w-full bg-primary border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/landing-page')}
                className="flex items-center space-x-2 hover-scale"
              >
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} color="white" />
                </div>
                <span className="text-xl font-bold text-primary-foreground">ICONIQ SPORT</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/user-login')}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                Iniciar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-primary border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/community-dashboard')}
                className="flex items-center space-x-2 hover-scale"
              >
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} color="white" />
                </div>
                <span className="text-xl font-bold text-primary-foreground">ICONIQ SPORT</span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-smooth hover-scale ${
                    isActivePath(item?.path)
                      ? 'bg-accent text-accent-foreground'
                      : 'text-primary-foreground hover:bg-primary-foreground/10'
                  }`}
                  title={item?.tooltip}
                >
                  <Icon name={item?.icon} size={18} />
                  <span className="font-medium">{item?.label}</span>
                </button>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-lg transition-smooth"
                title="Buscar"
              >
                <Icon name="Search" size={20} />
              </button>
              
              <button
                className="relative p-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-lg transition-smooth"
                title="Notificaciones"
              >
                <Icon name="Bell" size={20} />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </button>

              <button
                onClick={handleLogout}
                className="p-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-lg transition-smooth"
                title="Cerrar Sesión"
              >
                <Icon name="LogOut" size={20} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-lg transition-smooth"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-primary border-t border-primary-foreground/20">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth ${
                    isActivePath(item?.path)
                      ? 'bg-accent text-accent-foreground'
                      : 'text-primary-foreground hover:bg-primary-foreground/10'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.label}</span>
                </button>
              ))}
              
              <div className="flex items-center justify-between pt-4 border-t border-primary-foreground/20">
                <button
                  onClick={() => {
                    setIsSearchOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-lg transition-smooth"
                >
                  <Icon name="Search" size={20} />
                  <span>Buscar</span>
                </button>
                
                <button
                  className="relative flex items-center space-x-2 px-4 py-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-lg transition-smooth"
                >
                  <Icon name="Bell" size={20} />
                  <span>Notificaciones</span>
                  {notificationCount > 0 && (
                    <span className="bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </span>
                  )}
                </button>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-lg transition-smooth"
                >
                  <Icon name="LogOut" size={20} />
                  <span>Salir</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20">
          <div className="bg-card w-full max-w-2xl mx-4 rounded-lg shadow-modal animate-scale-in">
            <form onSubmit={handleSearch} className="p-6">
              <div className="flex items-center space-x-4">
                <Icon name="Search" size={20} color="var(--color-muted-foreground)" />
                <input
                  type="text"
                  placeholder="Buscar atletas, eventos, patrocinadores..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="flex-1 bg-transparent border-none outline-none text-lg placeholder:text-muted-foreground"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-smooth"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              
              {searchQuery && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground mb-2">Sugerencias:</div>
                  <div className="space-y-2">
                    <button
                      type="button"
                      className="w-full text-left px-3 py-2 hover:bg-muted rounded-lg transition-smooth"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name="User" size={16} />
                        <span>Atletas: "{searchQuery}"</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      className="w-full text-left px-3 py-2 hover:bg-muted rounded-lg transition-smooth"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name="Calendar" size={16} />
                        <span>Eventos: "{searchQuery}"</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;