import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';

// Types
interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  created_at: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, name?: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Convertir Firebase User en AuthUser
  const convertFirebaseUser = async (firebaseUser: User): Promise<AuthUser> => {
    // Récupérer les données utilisateur depuis Firestore
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);
    
    const userData = userDoc.exists() ? userDoc.data() : {};
    
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: userData.name || firebaseUser.displayName || '',
      avatar: userData.avatar || firebaseUser.photoURL || '',
      created_at: userData.created_at || firebaseUser.metadata.creationTime || new Date().toISOString(),
      isAdmin: userData.isAdmin || false
    };
  };

  // Écouter les changements d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const authUser = await convertFirebaseUser(firebaseUser);
          setUser(authUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error converting Firebase user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Connexion
  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const authUser = await convertFirebaseUser(userCredential.user);
      setUser(authUser);
      return { success: true };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { 
        success: false, 
        error: getFirebaseErrorMessage(error.code) 
      };
    }
  };

  // Inscription
  const signUp = async (email: string, password: string, name?: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Mettre à jour le profil avec le nom
      if (name) {
        await updateProfile(user, { displayName: name });
      }

      // Créer le document utilisateur dans Firestore
      const userData = {
        name: name || '',
        email: user.email,
        created_at: new Date().toISOString(),
        isAdmin: false, // Par défaut, les nouveaux utilisateurs ne sont pas admin
        avatar: ''
      };

      await setDoc(doc(db, 'users', user.uid), userData);

      const authUser = await convertFirebaseUser(user);
      setUser(authUser);

      return { success: true };
    } catch (error: any) {
      console.error('Sign up error:', error);
      return { 
        success: false, 
        error: getFirebaseErrorMessage(error.code) 
      };
    }
  };

  // Déconnexion
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Réinitialisation de mot de passe
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error: any) {
      console.error('Password reset error:', error);
      return { 
        success: false, 
        error: getFirebaseErrorMessage(error.code) 
      };
    }
  };

  // Messages d'erreur Firebase en français
  const getFirebaseErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Aucun utilisateur trouvé avec cette adresse email';
      case 'auth/wrong-password':
        return 'Mot de passe incorrect';
      case 'auth/email-already-in-use':
        return 'Cette adresse email est déjà utilisée';
      case 'auth/weak-password':
        return 'Le mot de passe doit contenir au moins 6 caractères';
      case 'auth/invalid-email':
        return 'Adresse email invalide';
      case 'auth/too-many-requests':
        return 'Trop de tentatives. Veuillez réessayer plus tard';
      default:
        return 'Une erreur est survenue';
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;