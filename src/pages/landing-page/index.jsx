import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import PricingSection from './components/PricingSection';
import EventsSection from './components/EventsSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>ICONIQ SPORT - Plataforma Deportiva Colombiana | Atletas, Clubes y Patrocinadores</title>
        <meta 
          name="description" 
          content="La plataforma líder que conecta atletas, clubes y patrocinadores colombianos. Construye tu marca deportiva, accede a patrocinios exclusivos y participa en eventos nacionales." 
        />
        <meta name="keywords" content="deporte colombia, atletas colombianos, patrocinios deportivos, eventos deportivos, marca personal deportiva" />
        <meta property="og:title" content="ICONIQ SPORT - Conecta tu Pasión Deportiva con Oportunidades Reales" />
        <meta property="og:description" content="Únete a la comunidad deportiva más grande de Colombia. Más de 500 atletas, 150 clubes y 80 patrocinadores confían en nosotros." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://iconiqsport.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ICONIQ SPORT - Plataforma Deportiva Colombiana" />
        <meta name="twitter:description" content="Conecta atletas, clubes y patrocinadores. Construye tu marca deportiva y accede a oportunidades exclusivas." />
        <link rel="canonical" href="https://iconiqsport.com/landing-page" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header isAuthenticated={false} />
        
        <main>
          <HeroSection />
          <ServicesSection />
          <EventsSection />
          <PricingSection />
          <TestimonialsSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LandingPage;