import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'post': return 'FileText';
      case 'event': return 'Calendar';
      case 'connection': return 'UserPlus';
      case 'achievement': return 'Trophy';
      case 'training': return 'Activity';
      case 'media': return 'Image';
      default: return 'Circle';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'post': return 'text-blue-600 bg-blue-100';
      case 'event': return 'text-green-600 bg-green-100';
      case 'connection': return 'text-purple-600 bg-purple-100';
      case 'achievement': return 'text-yellow-600 bg-yellow-100';
      case 'training': return 'text-red-600 bg-red-100';
      case 'media': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ahora mismo';
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Hace ${diffInHours}h`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Hace ${diffInDays}d`;
    
    return activityTime?.toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="bg-card rounded-lg shadow-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Actividad Reciente
      </h3>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3 p-3 hover:bg-muted rounded-lg transition-smooth">
            {/* Activity Icon */}
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>
            
            {/* Activity Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity?.title}</span>
                </p>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {formatTimeAgo(activity?.timestamp)}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {activity?.description}
              </p>
              
              {/* Activity Media */}
              {activity?.media && (
                <div className="mt-2">
                  {activity?.media?.type === 'image' && (
                    <Image
                      src={activity?.media?.url}
                      alt="Actividad"
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  )}
                  {activity?.media?.type === 'video' && (
                    <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                      <Icon name="Play" size={20} className="text-muted-foreground" />
                    </div>
                  )}
                </div>
              )}
              
              {/* Activity Stats */}
              {activity?.stats && (
                <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                  {activity?.stats?.likes && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Heart" size={12} />
                      <span>{activity?.stats?.likes}</span>
                    </div>
                  )}
                  {activity?.stats?.comments && (
                    <div className="flex items-center space-x-1">
                      <Icon name="MessageCircle" size={12} />
                      <span>{activity?.stats?.comments}</span>
                    </div>
                  )}
                  {activity?.stats?.shares && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Share2" size={12} />
                      <span>{activity?.stats?.shares}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {activities?.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="Activity" size={48} className="mx-auto mb-3 opacity-50" />
          <p>No hay actividad reciente</p>
          <p className="text-sm mt-1">Comienza a interactuar en la plataforma para ver tu actividad aquí</p>
        </div>
      )}
      {activities?.length > 0 && (
        <div className="mt-4 text-center">
          <button className="text-accent hover:text-accent/80 text-sm font-medium transition-colors">
            Ver toda la actividad
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;