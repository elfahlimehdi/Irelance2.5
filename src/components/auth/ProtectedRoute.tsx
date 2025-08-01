import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, ArrowLeft } from 'lucide-react';
import { checkAdminAccess } from '../../lib/clerk';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600 font-medium">Vérification des accès...</p>
    </motion.div>
  </div>
);

const UnauthorizedAccess: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center"
    >
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertTriangle className="w-10 h-10 text-red-600" />
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Accès Non Autorisé
      </h1>
      
      <p className="text-gray-600 mb-6 leading-relaxed">
        Ce tableau de bord administrateur est réservé exclusivement à l'administrateur autorisé d'IRELANCE.
      </p>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-700">
          <Shield className="w-4 h-4" />
          <span>Accès sécurisé par Clerk Authentication</span>
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.location.href = '/'}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour au site principal</span>
      </motion.button>
      
      <p className="text-xs text-gray-500 mt-4">
        © 2024 IRELANCE SARL - Tous droits réservés
      </p>
    </motion.div>
  </div>
);

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  if (!checkAdminAccess(user)) {
    return <UnauthorizedAccess />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;