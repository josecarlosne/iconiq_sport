import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ApplicationCard = ({ application, onViewProfile, onAccept, onReject, onMessage }) => {
  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-warning/10 text-warning',
      accepted: 'bg-success/10 text-success',
      rejected: 'bg-error/10 text-error',
      reviewing: 'bg-accent/10 text-accent'
    };
    return colors?.[status] || colors?.pending;
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'Pendiente',
      accepted: 'Aceptada',
      rejected: 'Rechazada',
      reviewing: 'En Revisión'
    };
    return texts?.[status] || 'Pendiente';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 hover-scale transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
            <Image 
              src={application?.applicant?.avatar} 
              alt={application?.applicant?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{application?.applicant?.name}</h3>
            <p className="text-sm text-muted-foreground">{application?.applicant?.sport}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Icon name="MapPin" size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{application?.applicant?.location}</span>
            </div>
          </div>
        </div>
        
        <span className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(application?.status)}`}>
          {getStatusText(application?.status)}
        </span>
      </div>
      {/* Application Message */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {application?.message}
        </p>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-muted/30 rounded-lg">
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">{application?.applicant?.experience}</div>
          <div className="text-xs text-muted-foreground">Años Exp.</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">{application?.applicant?.followers}</div>
          <div className="text-xs text-muted-foreground">Seguidores</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">{application?.applicant?.rating}</div>
          <div className="text-xs text-muted-foreground">Rating</div>
        </div>
      </div>
      {/* Application Date */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
        <Icon name="Calendar" size={14} />
        <span>Aplicó el {new Date(application.appliedAt)?.toLocaleDateString('es-CO')}</span>
      </div>
      {/* Actions */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewProfile(application?.applicant)}
          iconName="User"
          iconPosition="left"
          className="flex-1"
        >
          Ver Perfil
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onMessage(application?.applicant)}
          iconName="MessageCircle"
        />

        {application?.status === 'pending' && (
          <>
            <Button
              variant="success"
              size="sm"
              onClick={() => onAccept(application?.id)}
              iconName="Check"
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onReject(application?.id)}
              iconName="X"
            />
          </>
        )}
      </div>
      {/* Portfolio Link */}
      {application?.portfolio && (
        <div className="mt-3 pt-3 border-t border-border">
          <Button
            variant="link"
            size="sm"
            iconName="Download"
            iconPosition="left"
            className="p-0 h-auto"
          >
            Descargar Portfolio
          </Button>
        </div>
      )}
    </div>
  );
};

export default ApplicationCard;