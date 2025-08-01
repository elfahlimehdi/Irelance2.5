import { useUser } from '@clerk/clerk-react';
import { checkAdminAccess } from '../lib/clerk';

export const useAdminAuth = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  const isAuthorizedAdmin = checkAdminAccess(user);

  return {
    user,
    isLoaded,
    isSignedIn,
    isAuthorizedAdmin,
    adminEmail: user?.emailAddresses?.[0]?.emailAddress,
    adminName: user?.fullName || user?.firstName || 'Administrateur'
  };
};