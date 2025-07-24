import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

/**
 * Supabase environment variables
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Validate required environment variables
 */
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are required');
}

/**
 * Supabase client instance
 */
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Authentication response type
 */
interface AuthResponse {
  data?: any;
  error?: any;
}

/**
 * Sign up a new user with email, password, and full name
 * @param email - User's email address
 * @param password - User's password
 * @param fullName - User's full name
 * @returns Promise with data and error objects
 */
export const signUp = async (email: string, password: string, fullName: string): Promise<AuthResponse> => {
  try {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  return { data, error };
  } catch (error) {
    console.error('Sign up error:', error);
    return { error };
  }
};

/**
 * Sign in user with email and password
 * @param email - User's email address
 * @param password - User's password
 * @returns Promise with data and error objects
 */
export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  try {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
  } catch (error) {
    console.error('Sign in error:', error);
    return { error };
  }
};

/**
 * Sign out current user
 * @returns Promise with error object if any
 */
export const signOut = async (): Promise<{ error?: any }> => {
  try {
  const { error } = await supabase.auth.signOut();
  return { error };
  } catch (error) {
    console.error('Sign out error:', error);
    return { error };
  }
};

/**
 * Get current authenticated user
 * @returns Promise with current user or null
 */
export const getCurrentUser = async (): Promise<User | null> => {
  try {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};