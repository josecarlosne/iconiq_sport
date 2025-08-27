import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SettingsPanel = ({ settings, onUpdate }) => {
  const [activeSection, setActiveSection] = useState('notifications');
  const [formData, setFormData] = useState({
    notifications: settings?.notifications,
    privacy: settings?.privacy,
    account: settings?.account
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleToggle = (section, key) => {
    const updatedData = {
      ...formData,
      [section]: {
        ...formData?.[section],
        [key]: !formData?.[section]?.[key]
      }
    };
    setFormData(updatedData);
    onUpdate(updatedData);
  };

  const handleInputChange = (section, key, value) => {
    const updatedData = {
      ...formData,
      [section]: {
        ...formData?.[section],
        [key]: value
      }
    };
    setFormData(updatedData);
    onUpdate(updatedData);
  };

  const handlePasswordChange = () => {
    if (passwordData?.newPassword === passwordData?.confirmPassword) {
      console.log('Password changed successfully');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
    }
  };

  const sections = [
    { id: 'notifications', label: 'Notificaciones', icon: 'Bell' },
    { id: 'privacy', label: 'Privacidad', icon: 'Shield' },
    { id: 'account', label: 'Cuenta', icon: 'User' }
  ];

  const renderNotificationSettings = () => (
    <div className="space-y-4">
      <h4 className="font-medium text-foreground mb-4">Preferencias de Notificación</h4>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div>
            <h5 className="font-medium text-foreground">Notificaciones por Email</h5>
            <p className="text-sm text-muted-foreground">Recibir actualizaciones por correo electrónico</p>
          </div>
          <button
            onClick={() => handleToggle('notifications', 'email')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData?.notifications?.email ? 'bg-accent' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData?.notifications?.email ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div>
            <h5 className="font-medium text-foreground">Notificaciones Push</h5>
            <p className="text-sm text-muted-foreground">Recibir notificaciones en el navegador</p>
          </div>
          <button
            onClick={() => handleToggle('notifications', 'push')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData?.notifications?.push ? 'bg-accent' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData?.notifications?.push ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div>
            <h5 className="font-medium text-foreground">Mensajes Directos</h5>
            <p className="text-sm text-muted-foreground">Notificar cuando recibas mensajes privados</p>
          </div>
          <button
            onClick={() => handleToggle('notifications', 'messages')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData?.notifications?.messages ? 'bg-accent' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData?.notifications?.messages ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div>
            <h5 className="font-medium text-foreground">Eventos y Competencias</h5>
            <p className="text-sm text-muted-foreground">Notificar sobre nuevos eventos deportivos</p>
          </div>
          <button
            onClick={() => handleToggle('notifications', 'events')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData?.notifications?.events ? 'bg-accent' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData?.notifications?.events ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-4">
      <h4 className="font-medium text-foreground mb-4">Configuración de Privacidad</h4>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div>
            <h5 className="font-medium text-foreground">Perfil Público</h5>
            <p className="text-sm text-muted-foreground">Permitir que otros vean tu perfil completo</p>
          </div>
          <button
            onClick={() => handleToggle('privacy', 'publicProfile')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData?.privacy?.publicProfile ? 'bg-accent' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData?.privacy?.publicProfile ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div>
            <h5 className="font-medium text-foreground">Mostrar Estadísticas</h5>
            <p className="text-sm text-muted-foreground">Permitir que otros vean tus estadísticas deportivas</p>
          </div>
          <button
            onClick={() => handleToggle('privacy', 'showStats')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData?.privacy?.showStats ? 'bg-accent' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData?.privacy?.showStats ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div>
            <h5 className="font-medium text-foreground">Contacto Directo</h5>
            <p className="text-sm text-muted-foreground">Permitir que patrocinadores te contacten directamente</p>
          </div>
          <button
            onClick={() => handleToggle('privacy', 'allowContact')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData?.privacy?.allowContact ? 'bg-accent' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData?.privacy?.allowContact ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <h4 className="font-medium text-foreground mb-4">Configuración de Cuenta</h4>
      
      {/* Email Settings */}
      <div className="bg-muted rounded-lg p-4">
        <h5 className="font-medium text-foreground mb-3">Correo Electrónico</h5>
        <Input
          type="email"
          value={formData?.account?.email}
          onChange={(e) => handleInputChange('account', 'email', e?.target?.value)}
          placeholder="tu@email.com"
          className="mb-2"
        />
        <Button variant="outline" size="sm">
          Verificar Email
        </Button>
      </div>

      {/* Password Settings */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h5 className="font-medium text-foreground">Contraseña</h5>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            Cambiar Contraseña
          </Button>
        </div>
        
        {showPasswordForm && (
          <div className="space-y-3 mt-4">
            <Input
              type="password"
              placeholder="Contraseña actual"
              value={passwordData?.currentPassword}
              onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e?.target?.value }))}
            />
            <Input
              type="password"
              placeholder="Nueva contraseña"
              value={passwordData?.newPassword}
              onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e?.target?.value }))}
            />
            <Input
              type="password"
              placeholder="Confirmar nueva contraseña"
              value={passwordData?.confirmPassword}
              onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e?.target?.value }))}
            />
            <div className="flex space-x-2">
              <Button variant="default" size="sm" onClick={handlePasswordChange}>
                Actualizar
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowPasswordForm(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Subscription Settings */}
      <div className="bg-muted rounded-lg p-4">
        <h5 className="font-medium text-foreground mb-3">Suscripción</h5>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground">Plan Actual: <span className="font-medium">Pro</span></p>
            <p className="text-xs text-muted-foreground">Renovación: 27 de septiembre, 2025</p>
          </div>
          <Button variant="outline" size="sm">
            Gestionar Plan
          </Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h5 className="font-medium text-red-800 mb-3">Zona de Peligro</h5>
        <p className="text-sm text-red-600 mb-3">
          Estas acciones son permanentes y no se pueden deshacer.
        </p>
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
            Desactivar Cuenta
          </Button>
          <Button variant="destructive" size="sm">
            Eliminar Cuenta
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg shadow-card overflow-hidden">
      {/* Section Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6">
          {sections?.map((section) => (
            <button
              key={section?.id}
              onClick={() => setActiveSection(section?.id)}
              className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                activeSection === section?.id
                  ? 'border-accent text-accent' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={section?.icon} size={16} />
              <span className="font-medium">{section?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Section Content */}
      <div className="p-6">
        {activeSection === 'notifications' && renderNotificationSettings()}
        {activeSection === 'privacy' && renderPrivacySettings()}
        {activeSection === 'account' && renderAccountSettings()}
      </div>
    </div>
  );
};

export default SettingsPanel;