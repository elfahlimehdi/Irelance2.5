import { useAuth } from './useAuth';
import { UserRole, Permission } from '../types/admin';

// Définition des permissions par rôle
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  super_admin: [
    'users.read', 'users.write', 'users.delete',
    'content.read', 'content.write', 'content.delete',
    'analytics.read',
    'settings.read', 'settings.write',
    'system.read', 'system.write'
  ],
  admin: [
    'users.read', 'users.write',
    'content.read', 'content.write', 'content.delete',
    'analytics.read',
    'settings.read'
  ],
  moderator: [
    'users.read',
    'content.read', 'content.write',
    'analytics.read'
  ],
  user: []
};

export const useAdminAuth = () => {
  const { user, loading, signOut } = useAuth();

  // Vérifier si l'utilisateur est admin
  const isAdmin = (): boolean => {
    return user?.isAdmin === true;
  };

  // Obtenir le rôle de l'utilisateur (à implémenter avec custom claims)
  const getUserRole = (): UserRole => {
    // TODO: Implémenter avec Firebase custom claims
    if (user?.isAdmin) {
      return 'admin'; // Par défaut pour le moment
    }
    return 'user';
  };

  // Vérifier une permission spécifique
  const hasPermission = (permission: Permission): boolean => {
    if (!user || !isAdmin()) return false;
    
    const userRole = getUserRole();
    const permissions = ROLE_PERMISSIONS[userRole];
    
    return permissions.includes(permission);
  };

  // Vérifier plusieurs permissions (toutes requises)
  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  };

  // Vérifier une des permissions (au moins une requise)
  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  // Vérifier le rôle minimum requis
  const hasMinimumRole = (requiredRole: UserRole): boolean => {
    if (!user || !isAdmin()) return false;
    
    const userRole = getUserRole();
    const roleHierarchy: UserRole[] = ['user', 'moderator', 'admin', 'super_admin'];
    
    const userRoleIndex = roleHierarchy.indexOf(userRole);
    const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
    
    return userRoleIndex >= requiredRoleIndex;
  };

  // Obtenir toutes les permissions de l'utilisateur
  const getUserPermissions = (): Permission[] => {
    if (!user || !isAdmin()) return [];
    
    const userRole = getUserRole();
    return ROLE_PERMISSIONS[userRole];
  };

  // Rediriger vers l'accueil si pas admin
  const requireAdmin = (): boolean => {
    if (!loading && !isAdmin()) {
      window.location.href = '/';
      return false;
    }
    return true;
  };

  return {
    user,
    loading,
    signOut,
    isAdmin,
    getUserRole,
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
    hasMinimumRole,
    getUserPermissions,
    requireAdmin
  };
}; 