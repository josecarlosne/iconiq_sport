import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "José Carlos Negrete",
      role: "Futbolista Profesional",
      team: "Jaguares de Córdoba FC",
      location: "Montería, Córdoba",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      testimonial: `ICONIQ SPORT cambió completamente mi carrera. En 6 meses conseguí 3 patrocinadores importantes y mi presencia digital creció un 400%. La plataforma me conectó con oportunidades que nunca imaginé posibles.`,
      achievement: "3 patrocinios conseguidos",
      verified: true
    },
    {
      id: 2,
      name: "Mariana López",
      role: "Consultora de Marketing Deportivo",
      team: "SportsBrand Colombia",
      location: "Medellín, Antioquia",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      testimonial: `Como consultora, recomiendo ICONIQ SPORT a todos mis clientes atletas. Las herramientas de análisis y el sistema de matching con patrocinadores son excepcionales. Resultados garantizados.`,
      achievement: "50+ atletas asesorados",
      verified: true
    },
    {
      id: 3,
      name: "Andrés Pérez",
      role: "Corredor de Maratón",
      team: "Club Atlético Bogotá",
      location: "Bogotá, Cundinamarca",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      testimonial: `Desde que uso ICONIQ SPORT, mi red de contactos se multiplicó. Participé en 8 eventos nacionales y conseguí el apoyo de una marca deportiva internacional. La comunidad es increíble.`,
      achievement: "Récord personal mejorado",
      verified: true
    },
    {
      id: 4,
      name: "Club Los Jaguares",
      role: "Club de Baloncesto",
      team: "Liga Profesional",
      location: "Cartagena, Bolívar",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      testimonial: `La plataforma nos ayudó a descubrir talentos increíbles y gestionar mejor nuestro equipo. El sistema de reclutamiento y las herramientas de análisis son de clase mundial.`,
      achievement: "15 nuevos talentos fichados",
      verified: true
    },
    {
      id: 5,
      name: "Patrocinios XYZ",
      role: "Director de Marketing",
      team: "Empresa de Patrocinios",
      location: "Cali, Valle del Cauca",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      testimonial: `ICONIQ SPORT revolucionó nuestra estrategia de patrocinios deportivos. Encontramos atletas perfectos para nuestras campañas y el ROI mejoró un 250%. Herramienta indispensable.`,
      achievement: "ROI mejorado 250%",
      verified: true
    },
    {
      id: 6,
      name: "Carolina Ruiz",
      role: "Ciclista Profesional",
      team: "Team Colombia Cycling",
      location: "Boyacá, Colombia",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      testimonial: `La gestión de mi marca personal nunca fue tan fácil. ICONIQ SPORT me ayudó a profesionalizar mi imagen y conseguir contratos internacionales. Recomendado al 100%.`,
      achievement: "Contrato internacional",
      verified: true
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        color={index < rating ? "var(--color-warning)" : "var(--color-border)"}
        className={index < rating ? "fill-current" : ""}
      />
    ));
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Lo que Dicen Nuestros <span className="text-accent">Atletas</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Más de 500 atletas, clubes y patrocinadores confían en ICONIQ SPORT 
            para impulsar sus carreras y alcanzar sus objetivos deportivos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials?.map((testimonial) => (
            <div
              key={testimonial?.id}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-modal transition-smooth hover-scale border border-border"
            >
              <div className="flex items-center mb-4">
                <div className="relative">
                  <Image
                    src={testimonial?.avatar}
                    alt={testimonial?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {testimonial?.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-accent rounded-full p-1">
                      <Icon name="Check" size={12} color="white" />
                    </div>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-semibold text-card-foreground">
                    {testimonial?.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial?.role}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial?.team} • {testimonial?.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <div className="flex space-x-1 mr-3">
                  {renderStars(testimonial?.rating)}
                </div>
                <span className="text-sm text-muted-foreground">
                  {testimonial?.rating}.0
                </span>
              </div>

              <blockquote className="text-muted-foreground leading-relaxed mb-4 italic">
                "{testimonial?.testimonial}"
              </blockquote>

              <div className="bg-accent/10 rounded-lg p-3">
                <div className="flex items-center">
                  <Icon name="TrendingUp" size={16} color="var(--color-accent)" className="mr-2" />
                  <span className="text-sm font-medium text-accent">
                    {testimonial?.achievement}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-card rounded-xl p-8 shadow-card border border-border">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-card-foreground mb-4">
              Certificaciones y Reconocimientos
            </h3>
            <p className="text-muted-foreground">
              ICONIQ SPORT cuenta con las certificaciones oficiales del deporte colombiano
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <div className="bg-accent/10 rounded-lg p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center">
                <Icon name="Award" size={32} color="var(--color-accent)" />
              </div>
              <div className="text-sm font-medium text-card-foreground">
                Ministerio del Deporte
              </div>
              <div className="text-xs text-muted-foreground">
                Certificación Oficial
              </div>
            </div>

            <div className="text-center">
              <div className="bg-success/10 rounded-lg p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center">
                <Icon name="Shield" size={32} color="var(--color-success)" />
              </div>
              <div className="text-sm font-medium text-card-foreground">
                COC Colombia
              </div>
              <div className="text-xs text-muted-foreground">
                Comité Olímpico
              </div>
            </div>

            <div className="text-center">
              <div className="bg-warning/10 rounded-lg p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center">
                <Icon name="Star" size={32} color="var(--color-warning)" />
              </div>
              <div className="text-sm font-medium text-card-foreground">
                ISO 27001
              </div>
              <div className="text-xs text-muted-foreground">
                Seguridad de Datos
              </div>
            </div>

            <div className="text-center">
              <div className="bg-secondary/10 rounded-lg p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center">
                <Icon name="Users" size={32} color="var(--color-secondary)" />
              </div>
              <div className="text-sm font-medium text-card-foreground">
                500+ Atletas
              </div>
              <div className="text-xs text-muted-foreground">
                Comunidad Activa
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;