import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export { PUBLISHABLE_KEY };

// Authorized admin configuration
export const AUTHORIZED_ADMIN_EMAIL = import.meta.env.VITE_AUTHORIZED_ADMIN_EMAIL || "h.mekouar@irelance.net";

export const checkAdminAccess = (user: any): boolean => {
  if (!user) return false;
  const userEmail = user.emailAddresses?.[0]?.emailAddress;
  return userEmail === AUTHORIZED_ADMIN_EMAIL;
};