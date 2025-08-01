import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../hooks/useAdminAuth';

interface AdminRouteProps {
  children: React.ReactNode;
}

/**
 * Composant pour protéger les routes admin
 * Redirige vers la page d'accueil si l'utilisateur n'est pas admin
 */
const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAdmin, loading } = useAdminAuth();
  const location = useLocation();

  // Afficher un loader pendant le chargement
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Rediriger si pas admin
  if (!isAdmin()) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute; 