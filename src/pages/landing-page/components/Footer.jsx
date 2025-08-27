import React from 'react';
import Icon from '../../../components/AppIcon';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: "Plataforma",
      links: [
        { label: "Inicio", path: "/landing-page" },
        { label: "Servicios", path: "#servicios" },
        { label: "Precios", path: "#precios" },
        { label: "Eventos", path: "/events-listing" },
        { label: "Comunidad", path: "/community-dashboard" }
      ]
    },
    {
      title: "Para Atletas",
      links: [
        { label: "Crear Perfil", path: "/user-login" },
        { label: "Buscar Patrocinios", path: "/sponsorship-hub" },
        { label: "Media Kit", path: "#media-kit" },
        { label: "Gestión de Marca", path: "#branding" },
        { label: "Análisis", path: "#analytics" }
      ]
    },
    {
      title: "Para Empresas",
      links: [
        { label: "Patrocinar Atletas", path: "/sponsorship-hub" },
        { label: "Reclutamiento", path: "#recruitment" },
        { label: "API Empresarial", path: "#api" },
        { label: "Casos de Éxito", path: "#success-stories" },
        { label: "Contactar Ventas", path: "#contact-sales" }
      ]
    },
    {
      title: "Soporte",
      links: [
        { label: "Centro de Ayuda", path: "#help" },
        { label: "Documentación", path: "#docs" },
        { label: "Contacto", path: "#contact" },
        { label: "Estado del Sistema", path: "#status" },
        { label: "Reportar Problema", path: "#report" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", url: "https://facebook.com/iconiqsport" },
    { name: "Instagram", icon: "Instagram", url: "https://instagram.com/iconiqsport" },
    { name: "Twitter", icon: "Twitter", url: "https://twitter.com/iconiqsport" },
    { name: "LinkedIn", icon: "Linkedin", url: "https://linkedin.com/company/iconiqsport" },
    { name: "YouTube", icon: "Youtube", url: "https://youtube.com/iconiqsport" },
    { name: "TikTok", icon: "Music", url: "https://tiktok.com/@iconiqsport" }
  ];

  const contactInfo = [
    {
      icon: "MapPin",
      title: "Oficina Principal",
      content: "Carrera 7 #32-16, Bogotá\nColombia"
    },
    {
      icon: "Phone",
      title: "Teléfono",
      content: "+57 (1) 234-5678\n+57 300 123 4567"
    },
    {
      icon: "Mail",
      title: "Email",
      content: "hola@iconiqsport.com\nsoporte@iconiqsport.com"
    },
    {
      icon: "Clock",
      title: "Horario",
      content: "Lun - Vie: 8:00 - 18:00\nSáb: 9:00 - 14:00"
    }
  ];

  const handleLinkClick = (path) => {
    if (path?.startsWith('#')) {
      // Handle anchor links
      const element = document.querySelector(path);
      if (element) {
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={24} color="white" />
              </div>
              <span className="text-2xl font-bold">ICONIQ SPORT</span>
            </div>
            
            <p className="text-primary-foreground/80 leading-relaxed mb-6">
              La plataforma líder que conecta atletas, clubes y patrocinadores colombianos. 
              Construye tu marca deportiva, accede a oportunidades exclusivas y alcanza tus metas profesionales.
            </p>

            <div className="space-y-4">
              {contactInfo?.map((info, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-accent/20 rounded-lg p-2 mt-1">
                    <Icon name={info?.icon} size={16} color="var(--color-accent)" />
                  </div>
                  <div>
                    <div className="font-medium text-sm mb-1">{info?.title}</div>
                    <div className="text-primary-foreground/70 text-sm whitespace-pre-line">
                      {info?.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerSections?.map((section, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-lg mb-4">{section?.title}</h3>
                  <ul className="space-y-3">
                    {section?.links?.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <button
                          onClick={() => handleLinkClick(link?.path)}
                          className="text-primary-foreground/70 hover:text-accent transition-smooth text-sm hover:underline text-left"
                        >
                          {link?.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Mantente al día con ICONIQ SPORT
              </h3>
              <p className="text-primary-foreground/70">
                Recibe las últimas noticias, eventos y oportunidades deportivas directamente en tu email.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-medium transition-smooth hover-scale">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h4 className="font-semibold mb-4 md:mb-0">Síguenos en redes sociales</h4>
            </div>
            
            <div className="flex space-x-4">
              {socialLinks?.map((social, index) => (
                <a
                  key={index}
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-foreground/10 hover:bg-accent p-3 rounded-lg transition-smooth hover-scale group"
                  title={social?.name}
                >
                  <Icon 
                    name={social?.icon} 
                    size={20} 
                    color="var(--color-primary-foreground)"
                    className="group-hover:text-accent-foreground"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-primary-foreground/70 text-sm">
              © {currentYear} ICONIQ SPORT. Todos los derechos reservados.
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <button className="text-primary-foreground/70 hover:text-accent transition-smooth">
                Términos de Servicio
              </button>
              <button className="text-primary-foreground/70 hover:text-accent transition-smooth">
                Política de Privacidad
              </button>
              <button className="text-primary-foreground/70 hover:text-accent transition-smooth">
                Cookies
              </button>
              <button className="text-primary-foreground/70 hover:text-accent transition-smooth">
                Aviso Legal
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;