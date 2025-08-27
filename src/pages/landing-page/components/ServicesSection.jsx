import React from 'react';
import Icon from '../../../components/AppIcon';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      icon: "User",
      title: "Marca Personal",
      description: "Desarrolla tu identidad deportiva única con estrategias personalizadas que destacan tus fortalezas y logros.",
      features: ["Perfil profesional", "Portfolio digital", "Estrategia de contenido"]
    },
    {
      id: 2,
      icon: "MessageSquare",
      title: "Consultoría Digital",
      description: "Asesoramiento experto para maximizar tu presencia online y conectar con las audiencias correctas.",
      features: ["Análisis de mercado", "Estrategia digital", "Mentoring personalizado"]
    },
    {
      id: 3,
      icon: "Palette",
      title: "Diseño de Logo",
      description: "Logos profesionales que representan tu esencia deportiva y crean una identidad visual memorable.",
      features: ["Diseño único", "Múltiples formatos", "Revisiones incluidas"]
    },
    {
      id: 4,
      icon: "FileText",
      title: "Media Kit",
      description: "Paquetes promocionales completos que presentan tu perfil de manera profesional a patrocinadores.",
      features: ["Dossier profesional", "Estadísticas clave", "Propuestas de valor"]
    },
    {
      id: 5,
      icon: "Share2",
      title: "Gestión de Redes",
      description: "Administración profesional de tus redes sociales para maximizar engagement y oportunidades.",
      features: ["Contenido programado", "Análisis de métricas", "Crecimiento orgánico"]
    },
    {
      id: 6,
      icon: "Handshake",
      title: "Matching de Sponsors",
      description: "Algoritmo inteligente que conecta atletas con patrocinadores basado en afinidades y objetivos.",
      features: ["Matching automático", "Negociación asistida", "Contratos seguros"]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Servicios que <span className="text-accent">Impulsan tu Carrera</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubre nuestro ecosistema completo de herramientas y servicios diseñados 
            específicamente para el crecimiento profesional de atletas colombianos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service) => (
            <div
              key={service?.id}
              className="bg-card rounded-xl p-8 shadow-card hover:shadow-modal transition-smooth hover-scale border border-border group"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-accent/10 rounded-xl mb-6 group-hover:bg-accent/20 transition-smooth">
                <Icon name={service?.icon} size={32} color="var(--color-accent)" />
              </div>
              
              <h3 className="text-xl font-bold text-card-foreground mb-4">
                {service?.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service?.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service?.features?.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-muted-foreground">
                    <Icon name="Check" size={16} color="var(--color-success)" className="mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full bg-accent/10 hover:bg-accent hover:text-accent-foreground text-accent font-medium py-3 px-4 rounded-lg transition-smooth">
                Más Información
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            ¿Necesitas un servicio personalizado? Nuestro equipo está listo para ayudarte.
          </p>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-smooth hover-scale">
            Contactar Especialista
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;