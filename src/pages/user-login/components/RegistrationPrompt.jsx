import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegistrationPrompt = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: 'Users',
      title: 'Conecta con atletas',
      description: 'Únete a la comunidad deportiva más grande de Colombia'
    },
    {
      icon: 'Trophy',
      title: 'Encuentra patrocinios',
      description: 'Accede a oportunidades exclusivas de patrocinio'
    },
    {
      icon: 'Calendar',
      title: 'Participa en eventos',
      description: 'Descubre torneos y competencias en tu ciudad'
    },
    {
      icon: 'Star',
      title: 'Construye tu marca',
      description: 'Desarrolla tu perfil profesional deportivo'
    }
  ];

  const handleRegistration = () => {
    // In real app, would navigate to registration page
    console.log('Navigate to registration');
    navigate('/landing-page'); // Temporary redirect
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="bg-card border border-border rounded-xl p-6 shadow-card">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            ¿Nuevo en ICONIQ SPORT?
          </h3>
          <p className="text-sm text-muted-foreground">
            Únete a miles de atletas, clubes y patrocinadores
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {benefits?.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name={benefit?.icon} size={16} color="var(--color-accent)" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground">
                  {benefit?.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {benefit?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={handleRegistration}
          iconName="UserPlus"
          iconPosition="left"
          className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
        >
          Crear Cuenta Gratis
        </Button>

        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Comienza con el plan gratuito • Sin tarjeta de crédito
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPrompt;