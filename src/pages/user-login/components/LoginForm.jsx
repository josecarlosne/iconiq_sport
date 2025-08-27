import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Mock credentials for different user types
  const mockCredentials = {
    athlete: { email: "jose.negrete@iconiqsport.com", password: "atleta123" },
    club: { email: "club.jaguares@iconiqsport.com", password: "club123" },
    sponsor: { email: "patrocinios.xyz@iconiqsport.com", password: "sponsor123" },
    advisor: { email: "mariana.lopez@iconiqsport.com", password: "advisor123" }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }
    
    if (!formData?.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check mock credentials
      const userType = Object.keys(mockCredentials)?.find(type => 
        mockCredentials?.[type]?.email === formData?.email && 
        mockCredentials?.[type]?.password === formData?.password
      );
      
      if (userType) {
        // Successful login - redirect based on user type
        switch (userType) {
          case 'athlete':
          case 'club': case'sponsor': case'advisor': navigate('/community-dashboard');
            break;
          default:
            navigate('/community-dashboard');
        }
      } else {
        setErrors({ 
          general: `Credenciales incorrectas. Usa: ${mockCredentials?.athlete?.email} / ${mockCredentials?.athlete?.password} (atleta) o ${mockCredentials?.club?.email} / ${mockCredentials?.club?.password} (club)` 
        });
      }
    } catch (error) {
      setErrors({ general: 'Error de conexión. Inténtalo de nuevo.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // In real app, would navigate to forgot password page
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors?.general && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertCircle" size={20} color="var(--color-error)" />
              <div className="flex-1">
                <p className="text-sm text-error font-medium">Error de autenticación</p>
                <p className="text-sm text-error/80 mt-1">{errors?.general}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Correo electrónico"
            type="email"
            name="email"
            placeholder="tu@email.com"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            className="w-full"
          />

          <div className="relative">
            <Input
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Ingresa tu contraseña"
              value={formData?.password}
              onChange={handleInputChange}
              error={errors?.password}
              required
              className="w-full pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 p-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Checkbox
            label="Recordarme"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            size="sm"
          />
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-accent hover:text-accent/80 font-medium transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={isLoading}
          fullWidth
          className="mt-6"
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;