import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  CheckCircle, 
  Database, 
  X, 
  Settings,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { getFirebaseStatus } from '../../lib/firebase';

/**
 * Composant pour afficher le statut Firebase et des instructions de configuration
 */
const FirebaseStatus: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  const status = getFirebaseStatus();

  // Si Firebase fonctionne, ne pas afficher le composant
  if (status.available) {
    return null;
  }

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-colors"
          title="Statut Firebase"
        >
          <Database className="w-5 h-5" />
        </button>
      </div>
    );
  }

  const copyEnvExample = async () => {
    const envContent = `# Configuration Firebase pour irelance
VITE_FIREBASE_API_KEY=votre_cle_api_firebase
VITE_FIREBASE_AUTH_DOMAIN=votre_projet.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=votre_projet_id
VITE_FIREBASE_STORAGE_BUCKET=votre_projet.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=votre_app_id
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX`;

    try {
      await navigator.clipboard.writeText(envContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erreur copie:', err);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 right-4 z-50 max-w-md"
      >
        <div className="bg-white rounded-lg shadow-xl border border-orange-200 overflow-hidden">
          {/* Header */}
          <div className="bg-orange-50 px-4 py-3 border-b border-orange-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold text-orange-900">Configuration Firebase</h3>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-orange-600 hover:text-orange-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="mb-3">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Mode fallback activé</strong> - Les produits sont chargés depuis les données locales.
              </p>
              
              {!status.configured && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                  <p className="text-sm text-yellow-800">
                    <Settings className="w-4 h-4 inline mr-1" />
                    Configuration Firebase manquante
                  </p>
                </div>
              )}
            </div>

            {/* Status Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
              <div className="flex items-center space-x-1">
                {status.configured ? 
                  <CheckCircle className="w-3 h-3 text-green-500" /> : 
                  <AlertTriangle className="w-3 h-3 text-orange-500" />
                }
                <span className={status.configured ? 'text-green-700' : 'text-orange-700'}>
                  Config
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {status.services.firestore ? 
                  <CheckCircle className="w-3 h-3 text-green-500" /> : 
                  <AlertTriangle className="w-3 h-3 text-orange-500" />
                }
                <span className={status.services.firestore ? 'text-green-700' : 'text-orange-700'}>
                  Firestore
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={copyEnvExample}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-3 rounded-lg transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copié!' : 'Copier .env exemple'}</span>
              </button>
              
              <a
                href="https://console.firebase.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white text-sm py-2 px-3 rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Console Firebase</span>
              </a>
            </div>

            {/* Info */}
            <div className="mt-3 text-xs text-gray-600">
              <p>
                💡 <strong>Fonctionnalité actuelle:</strong> Tous les produits irelance 
                sont disponibles via les données locales. Firebase ajoutera la gestion 
                en temps réel.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FirebaseStatus; 