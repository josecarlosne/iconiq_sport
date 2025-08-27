import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfileStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Vistas del Perfil',
      value: stats?.profileViews,
      icon: 'Eye',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Conexiones',
      value: stats?.connections,
      icon: 'Users',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Publicaciones',
      value: stats?.posts,
      icon: 'FileText',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Eventos',
      value: stats?.events,
      icon: 'Calendar',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className="bg-card rounded-lg shadow-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Estadísticas del Perfil
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statItems?.map((item, index) => (
          <div key={index} className="text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${item?.bgColor} mb-2`}>
              <Icon name={item?.icon} size={20} className={item?.color} />
            </div>
            <div className="text-2xl font-bold text-foreground">
              {item?.value?.toLocaleString('es-CO')}
            </div>
            <div className="text-sm text-muted-foreground">
              {item?.label}
            </div>
          </div>
        ))}
      </div>
      {/* Recent Activity */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-md font-medium text-foreground mb-3">
          Actividad Reciente
        </h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-muted-foreground">
              Perfil actualizado hace 2 horas
            </span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span className="text-muted-foreground">
              Nueva conexión agregada hace 1 día
            </span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-warning rounded-full"></div>
            <span className="text-muted-foreground">
              Publicación compartida hace 3 días
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;