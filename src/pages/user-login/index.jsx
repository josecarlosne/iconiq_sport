import React from 'react';
import { Helmet } from 'react-helmet';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import RegistrationPrompt from './components/RegistrationPrompt';

const UserLogin = () => {
  return (
    <>
      <Helmet>
        <title>Iniciar Sesión - ICONIQ SPORT</title>
        <meta name="description" content="Inicia sesión en ICONIQ SPORT y accede a la comunidad deportiva más grande de Colombia. Conecta con atletas, clubes y patrocinadores." />
        <meta name="keywords" content="login, iniciar sesión, ICONIQ SPORT, deportes Colombia, atletas, patrocinios" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <LoginHeader />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            {/* Main Login Form */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-card mb-6">
              <LoginForm />
            </div>

            {/* Social Login Options */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-card mb-6">
              <SocialLogin />
            </div>

            {/* Registration Prompt */}
            <RegistrationPrompt />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-muted border-t border-border mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-accent-foreground">I</span>
                </div>
                <span className="text-lg font-bold text-foreground">ICONIQ SPORT</span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                La plataforma que conecta el deporte colombiano
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <button className="text-muted-foreground hover:text-accent transition-colors">
                  Términos de Servicio
                </button>
                <button className="text-muted-foreground hover:text-accent transition-colors">
                  Política de Privacidad
                </button>
                <button className="text-muted-foreground hover:text-accent transition-colors">
                  Soporte
                </button>
                <button className="text-muted-foreground hover:text-accent transition-colors">
                  Contacto
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  © {new Date()?.getFullYear()} ICONIQ SPORT. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default UserLogin;