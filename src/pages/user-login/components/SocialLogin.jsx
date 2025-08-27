import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLogin = () => {
  const [loadingProvider, setLoadingProvider] = useState(null);
  const navigate = useNavigate();

  const handleSocialLogin = async (provider) => {
    setLoadingProvider(provider);
    
    try {
      // Simulate social login API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful social login
      console.log(`Logging in with ${provider}`);
      navigate('/community-dashboard');
    } catch (error) {
      console.error(`Error logging in with ${provider}:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };

  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'text-red-500',
      bgColor: 'hover:bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50',
      borderColor: 'border-blue-200'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">O continúa con</span>
        </div>
      </div>
      <div className="space-y-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.name}
            variant="outline"
            size="lg"
            fullWidth
            loading={loadingProvider === provider?.name?.toLowerCase()}
            onClick={() => handleSocialLogin(provider?.name?.toLowerCase())}
            className={`border-2 ${provider?.borderColor} ${provider?.bgColor} transition-all duration-200`}
          >
            <div className="flex items-center justify-center space-x-3">
              <Icon 
                name={provider?.icon} 
                size={20} 
                className={provider?.color}
              />
              <span className="font-medium">
                {loadingProvider === provider?.name?.toLowerCase() 
                  ? `Conectando con ${provider?.name}...` 
                  : `Continuar con ${provider?.name}`
                }
              </span>
            </div>
          </Button>
        ))}
      </div>
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Al continuar, aceptas nuestros{' '}
          <button className="text-accent hover:text-accent/80 font-medium transition-colors">
            Términos de Servicio
          </button>
          {' '}y{' '}
          <button className="text-accent hover:text-accent/80 font-medium transition-colors">
            Política de Privacidad
          </button>
        </p>
      </div>
    </div>
  );
};

export default SocialLogin;