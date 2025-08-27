import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PricingSection = () => {
  const plans = [
    {
      id: 'free',
      name: 'Gratuito',
      price: 0,
      period: 'Siempre gratis',
      description: 'Perfecto para atletas que están comenzando su carrera profesional',
      features: [
        'Perfil básico de atleta',
        'Acceso a eventos públicos',
        'Conexión con 5 contactos',
        'Estadísticas básicas',
        'Soporte por email'
      ],
      limitations: [
        'Sin acceso a patrocinadores premium',
        'Funciones de análisis limitadas'
      ],
      cta: 'Comenzar Gratis',
      popular: false,
      variant: 'outline'
    },
    {
      id: 'pro',
      name: 'Profesional',
      price: 40000,
      period: 'por mes',
      description: 'La opción más popular para atletas serios que buscan crecimiento',
      features: [
        'Todo lo del plan Gratuito',
        'Perfil profesional completo',
        'Acceso ilimitado a patrocinadores',
        'Media kit personalizado',
        'Análisis avanzado de rendimiento',
        'Gestión de redes sociales',
        'Soporte prioritario 24/7',
        'Certificaciones deportivas'
      ],
      limitations: [],
      cta: 'Comenzar Prueba Gratis',
      popular: true,
      variant: 'default'
    },
    {
      id: 'club',
      name: 'Club/Sponsor',
      price: 120000,
      period: 'por mes',
      description: 'Solución completa para clubes deportivos y patrocinadores',
      features: [
        'Todo lo del plan Profesional',
        'Panel de administración avanzado',
        'Gestión de múltiples atletas',
        'Herramientas de reclutamiento',
        'Análisis de ROI de patrocinios',
        'API personalizada',
        'Gerente de cuenta dedicado',
        'Reportes personalizados',
        'Integración con sistemas existentes'
      ],
      limitations: [],
      cta: 'Contactar Ventas',
      popular: false,
      variant: 'secondary'
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(price);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Planes que se <span className="text-accent">Adaptan a ti</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Elige el plan perfecto para tu nivel y objetivos. Todos incluyen acceso completo 
            a nuestra comunidad deportiva y herramientas básicas de networking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans?.map((plan) => (
            <div
              key={plan?.id}
              className={`relative bg-card rounded-2xl p-8 shadow-card border transition-smooth hover-scale ${
                plan?.popular 
                  ? 'border-accent shadow-modal ring-2 ring-accent/20' 
                  : 'border-border hover:border-accent/50'
              }`}
            >
              {plan?.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-accent text-accent-foreground px-6 py-2 rounded-full text-sm font-medium">
                    Más Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-card-foreground mb-2">
                  {plan?.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl md:text-5xl font-bold text-foreground">
                    {plan?.price === 0 ? 'Gratis' : formatPrice(plan?.price)}
                  </span>
                  {plan?.price > 0 && (
                    <span className="text-muted-foreground ml-2">
                      {plan?.period}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {plan?.description}
                </p>
              </div>

              <div className="mb-8">
                <h4 className="font-semibold text-card-foreground mb-4 flex items-center">
                  <Icon name="Check" size={20} color="var(--color-success)" className="mr-2" />
                  Incluye:
                </h4>
                <ul className="space-y-3">
                  {plan?.features?.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-muted-foreground">
                      <Icon name="Check" size={16} color="var(--color-success)" className="mr-3 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {plan?.limitations?.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-card-foreground mb-3 flex items-center">
                      <Icon name="X" size={20} color="var(--color-muted-foreground)" className="mr-2" />
                      Limitaciones:
                    </h4>
                    <ul className="space-y-2">
                      {plan?.limitations?.map((limitation, index) => (
                        <li key={index} className="flex items-start text-sm text-muted-foreground">
                          <Icon name="X" size={16} color="var(--color-muted-foreground)" className="mr-3 mt-0.5 flex-shrink-0" />
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <Button
                variant={plan?.variant}
                size="lg"
                fullWidth
                className={plan?.popular ? 'bg-accent hover:bg-accent/90' : ''}
              >
                {plan?.cta}
              </Button>

              {plan?.id === 'pro' && (
                <p className="text-center text-xs text-muted-foreground mt-4">
                  Prueba gratuita de 14 días • Sin compromiso • Cancela cuando quieras
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            ¿Necesitas un plan empresarial personalizado?
          </p>
          <Button variant="ghost" className="text-accent hover:text-accent/80">
            Hablar con nuestro equipo de ventas
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;