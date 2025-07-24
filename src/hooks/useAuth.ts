import { useState, useEffect, createContext, useContext } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, signIn as supabaseSignIn, signUp as supabaseSignUp, signOut as supabaseSignOut } from '../lib/supabase';

/**
 * Authentication context type definition
 */
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

/**
 * Authentication context instance
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Custom hook to access authentication context
 * @returns AuthContextType - The authentication context
 * @throws Error if used outside of AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

/**
 * Custom hook to provide authentication functionality
 * Manages user state, authentication methods, and session handling
 * @returns AuthContextType - Authentication provider value
 */
export const useAuthProvider = (): AuthContextType => {
  // State management
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Initialize authentication state and listen for changes
   */
  useEffect(() => {
    let isMounted = true;
    let subscription: any;

    /**
     * Get initial session and set up auth state listener
     */
    const initializeAuth = async (): Promise<void> => {
      try {
    // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (isMounted) {
      setUser(session?.user ?? null);
      setLoading(false);
        }

        // Listen for authentication state changes
        const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
            if (isMounted) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
          }
    );

        subscription = authSubscription;
      } catch (error) {
        console.error('Authentication initialization error:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Cleanup function
    return () => {
      isMounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  /**
   * Sign in user with email and password
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise with error object if any
   */
  const signIn = async (email: string, password: string): Promise<{ error: any }> => {
    try {
    const { error } = await supabaseSignIn(email, password);
    return { error };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error };
    }
  };

  /**
   * Sign up new user with email, password, and full name
   * @param email - User's email address
   * @param password - User's password
   * @param fullName - User's full name
   * @returns Promise with error object if any
   */
  const signUp = async (email: string, password: string, fullName: string): Promise<{ error: any }> => {
    try {
    const { error } = await supabaseSignUp(email, password, fullName);
    return { error };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error };
    }
  };

  /**
   * Sign out current user
   * @returns Promise that resolves when sign out is complete
   */
  const signOut = async (): Promise<void> => {
    try {
    await supabaseSignOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };
};

export { AuthContext };