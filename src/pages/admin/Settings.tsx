import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Database,
  Mail,
  Globe,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

interface SettingsSection {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const AdminSettings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      name: 'Administrateur IRELANCE',
      email: 'admin@irelance.net',
      phone: '06 61 16 23 71',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    notifications: {
      emailNotifications: true,
      orderNotifications: true,
      stockAlerts: true,
      systemUpdates: false,
      marketingEmails: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      loginAttempts: '5',
      passwordExpiry: '90'
    },
    system: {
      siteName: 'IRELANCE E-commerce',
      siteDescription: 'Solutions technologiques professionnelles',
      currency: 'MAD',
      timezone: 'Africa/Casablanca',
      language: 'fr',
      maintenanceMode: false
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: '587',
      smtpUser: 'noreply@irelance.net',
      smtpPassword: '',
      fromName: 'IRELANCE',
      fromEmail: 'noreply@irelance.net'
    }
  });

  const sections: SettingsSection[] = [
    { id: 'profile', name: 'Profil', icon: <User className="w-5 h-5" /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'security', name: 'Sécurité', icon: <Shield className="w-5 h-5" /> },
    { id: 'system', name: 'Système', icon: <Database className="w-5 h-5" /> },
    { id: 'email', name: 'Email', icon: <Mail className="w-5 h-5" /> }
  ];

  const handleSave = (section: string) => {
    // Simulation de la sauvegarde
    console.log(`Sauvegarde des paramètres ${section}:`, settings[section as keyof typeof settings]);
    // Ici, vous implémenteriez la logique de sauvegarde réelle
  };

  const ProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations du Profil</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
            <input
              type="text"
              value={settings.profile.name}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                profile: { ...prev.profile, name: e.target.value }
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={settings.profile.email}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                profile: { ...prev.profile, email: e.target.value }
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
            <input
              type="tel"
              value={settings.profile.phone}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                profile: { ...prev.profile, phone: e.target.value }
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Changer le Mot de Passe</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={settings.profile.currentPassword}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  profile: { ...prev.profile, currentPassword: e.target.value }
                }))}
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe</label>
              <input
                type="password"
                value={settings.profile.newPassword}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  profile: { ...prev.profile, newPassword: e.target.value }
                }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le mot de passe</label>
              <input
                type="password"
                value={settings.profile.confirmPassword}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  profile: { ...prev.profile, confirmPassword: e.target.value }
                }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const NotificationSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Préférences de Notification</h3>
      <div className="space-y-4">
        {Object.entries(settings.notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">
                {key === 'emailNotifications' && 'Notifications par email'}
                {key === 'orderNotifications' && 'Notifications de commandes'}
                {key === 'stockAlerts' && 'Alertes de stock'}
                {key === 'systemUpdates' && 'Mises à jour système'}
                {key === 'marketingEmails' && 'Emails marketing'}
              </h4>
              <p className="text-sm text-gray-600">
                {key === 'emailNotifications' && 'Recevoir les notifications importantes par email'}
                {key === 'orderNotifications' && 'Être notifié des nouvelles commandes'}
                {key === 'stockAlerts' && 'Alertes quand les stocks sont faibles'}
                {key === 'systemUpdates' && 'Notifications des mises à jour système'}
                {key === 'marketingEmails' && 'Recevoir les emails promotionnels'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, [key]: e.target.checked }
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const SecuritySettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Paramètres de Sécurité</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Authentification à deux facteurs</h4>
            <p className="text-sm text-gray-600">Ajouter une couche de sécurité supplémentaire</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.twoFactorAuth}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                security: { ...prev.security, twoFactorAuth: e.target.checked }
              }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timeout de session (minutes)</label>
            <select
              value={settings.security.sessionTimeout}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                security: { ...prev.security, sessionTimeout: e.target.value }
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 heure</option>
              <option value="120">2 heures</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tentatives de connexion max</label>
            <select
              value={settings.security.loginAttempts}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                security: { ...prev.security, loginAttempts: e.target.value }
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="3">3 tentatives</option>
              <option value="5">5 tentatives</option>
              <option value="10">10 tentatives</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const SystemSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration Système</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nom du site</label>
          <input
            type="text"
            value={settings.system.siteName}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              system: { ...prev.system, siteName: e.target.value }
            }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Devise</label>
          <select
            value={settings.system.currency}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              system: { ...prev.system, currency: e.target.value }
            }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="MAD">Dirham Marocain (MAD)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="USD">Dollar US (USD)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fuseau horaire</label>
          <select
            value={settings.system.timezone}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              system: { ...prev.system, timezone: e.target.value }
            }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Africa/Casablanca">Casablanca (GMT+1)</option>
            <option value="Europe/Paris">Paris (GMT+1)</option>
            <option value="UTC">UTC (GMT+0)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Langue</label>
          <select
            value={settings.system.language}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              system: { ...prev.system, language: e.target.value }
            }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="fr">Français</option>
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description du site</label>
        <textarea
          rows={3}
          value={settings.system.siteDescription}
          onChange={(e) => setSettings(prev => ({
            ...prev,
            system: { ...prev.system, siteDescription: e.target.value }
          }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>
      <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div>
          <h4 className="font-medium text-gray-900">Mode Maintenance</h4>
          <p className="text-sm text-gray-600">Activer pour mettre le site hors ligne temporairement</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.system.maintenanceMode}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              system: { ...prev.system, maintenanceMode: e.target.checked }
            }))}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
        </label>
      </div>
    </div>
  );

  const EmailSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration Email</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Serveur SMTP</label>
          <input
            type="text"
            value={settings.email.smtpHost}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              email: { ...prev.email, smtpHost: e.target.value }
            }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Port SMTP</label>
          <input
            type="text"
            value={settings.email.smtpPort}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              email: { ...prev.email, smtpPort: e.target.value }
            }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nom d'expéditeur</label>
          <input
            type="text"
            value={settings.email.fromName}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              email: { ...prev.email, fromName: e.target.value }
            }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email d'expéditeur</label>
          <input
            type="email"
            value={settings.email.fromEmail}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              email: { ...prev.email, fromEmail: e.target.value }
            }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'system':
        return <SystemSettings />;
      case 'email':
        return <EmailSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-600 mt-1">Configurez votre interface d'administration</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {section.icon}
                  <span className="ml-3 font-medium">{section.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              {renderContent()}

              {/* Save Button */}
              <div className="flex justify-end pt-6 border-t border-gray-200 mt-8">
                <button
                  onClick={() => handleSave(activeSection)}
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;