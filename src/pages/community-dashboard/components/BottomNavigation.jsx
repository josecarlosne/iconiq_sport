import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const BottomNavigation = ({ notificationCount = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      id: 'home',
      label: 'Inicio',
      icon: 'Home',
      path: '/community-dashboard'
    },
    {
      id: 'events',
      label: 'Eventos',
      icon: 'Calendar',
      path: '/events-listing'
    },
    {
      id: 'sponsors',
      label: 'Patrocinios',
      icon: 'Handshake',
      path: '/sponsorship-hub'
    },
    {
      id: 'profile',
      label: 'Perfil',
      icon: 'User',
      path: '/user-profile-management'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActivePath = (path) => location?.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around py-2">
        {navigationItems?.map((item) => (
          <button
            key={item?.id}
            onClick={() => handleNavigation(item?.path)}
            className={`
              flex flex-col items-center justify-center p-2 min-w-0 flex-1 transition-smooth
              ${isActivePath(item?.path)
                ? 'text-accent' :'text-muted-foreground hover:text-foreground'
              }
            `}
          >
            <div className="relative">
              <Icon 
                name={item?.icon} 
                size={20} 
                fill={isActivePath(item?.path) ? 'currentColor' : 'none'}
              />
              {item?.id === 'profile' && notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </div>
            <span className={`
              text-xs mt-1 font-medium truncate
              ${isActivePath(item?.path) ? 'text-accent' : 'text-muted-foreground'}
            `}>
              {item?.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;