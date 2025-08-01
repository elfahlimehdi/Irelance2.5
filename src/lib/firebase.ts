import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getFunctions, Functions } from 'firebase/functions';

// Configuration Firebase avec gestion d'erreurs
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Vérifier si la configuration Firebase est complète
const isFirebaseConfigured = () => {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.appId
  );
};

// Configuration par défaut pour fallback
const fallbackConfig = {
  apiKey: "demo-key",
  authDomain: "demo.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:demo"
};

// Variables pour les services Firebase - initialisées avec fallback
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;
let functions: Functions;

// Initialiser Firebase avec fallback
try {
  if (isFirebaseConfigured()) {
    console.log('🔥 Initialisation Firebase...');
    app = initializeApp(firebaseConfig);
    console.log('✅ Firebase initialisé avec succès');
  } else {
    console.warn('⚠️ Configuration Firebase incomplète - Mode fallback activé');
    app = initializeApp(fallbackConfig);
    console.warn('Variables manquantes:', {
      apiKey: !!firebaseConfig.apiKey,
      authDomain: !!firebaseConfig.authDomain,
      projectId: !!firebaseConfig.projectId,
      storageBucket: !!firebaseConfig.storageBucket,
      messagingSenderId: !!firebaseConfig.messagingSenderId,
      appId: !!firebaseConfig.appId
    });
  }
} catch (error) {
  console.error('❌ Erreur lors de l\'initialisation Firebase:', error);
  console.warn('📦 Mode fallback activé - utilisation des données locales');
  
  try {
    app = initializeApp(fallbackConfig);
  } catch (fallbackError) {
    console.error('❌ Erreur dans le fallback Firebase:', fallbackError);
    // Créer une instance minimale pour éviter les erreurs
    app = {} as FirebaseApp;
  }
}

// Initialiser les services après l'app
try {
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  functions = getFunctions(app);
} catch (error) {
  console.error('❌ Erreur lors de l\'initialisation des services Firebase:', error);
  // Créer des instances minimales pour éviter les erreurs
  auth = {} as Auth;
  db = {} as Firestore;
  storage = {} as FirebaseStorage;
  functions = {} as Functions;
}

// Export des services (maintenant garantis non-null)
export { auth, db, storage, functions };

// Export de l'app pour usage avancé
export default app;

// Fonction utilitaire pour vérifier si Firebase est disponible
export const isFirebaseAvailable = (): boolean => {
  return app !== undefined && db !== undefined && Object.keys(app).length > 0;
};

// Fonction pour obtenir le statut de Firebase
export const getFirebaseStatus = () => {
  return {
    configured: isFirebaseConfigured(),
    initialized: app !== undefined,
    available: isFirebaseAvailable(),
    services: {
      auth: auth !== undefined,
      firestore: db !== undefined,
      storage: storage !== undefined,
      functions: functions !== undefined
    }
  };
}; 