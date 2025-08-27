import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LoginHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Navigation Header */}
      <header className="w-full bg-primary border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => navigate('/landing-page')}
              className="flex items-center space-x-2 hover-scale"
            >
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} color="white" />
              </div>
              <span className="text-xl font-bold text-primary-foreground">ICONIQ SPORT</span>
            </button>
            
            <Button 
              variant="ghost" 
              onClick={() => navigate('/landing-page')}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              Crear Cuenta
            </Button>
          </div>
        </div>
      </header>

      {/* Login Title Section */}
      <div className="text-center py-8 px-4">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Bienvenido de vuelta
        </h1>
        <p className="text-muted-foreground text-lg">
          Inicia sesión en tu cuenta de ICONIQ SPORT
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;