import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  DocumentSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  AdminUser, 
  ActivityLog, 
  DashboardMetrics, 
  SystemSettings, 
  Content, 
  UserProfile,
  PaginatedResult,
  FilterOptions
} from '../types/admin';

/**
 * Service pour les opérations admin Firebase
 */
export class AdminService {
  
  // Collections Firestore
  private static readonly COLLECTIONS = {
    USERS: 'users',
    USER_PROFILES: 'user_profiles',
    ACTIVITY_LOGS: 'activity_logs',
    SETTINGS: 'app_settings',
    CONTENT: 'content'
  };

  /**
   * Obtenir les métriques du dashboard
   */
  static async getDashboardMetrics(): Promise<DashboardMetrics> {
    try {
      // Récupérer le nombre total d'utilisateurs
      const usersSnapshot = await getDocs(collection(db, this.COLLECTIONS.USERS));
      const totalUsers = usersSnapshot.size;

      // Récupérer les utilisateurs actifs (connectés dans les 30 derniers jours)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const activeUsersQuery = query(
        collection(db, this.COLLECTIONS.USERS),
        where('lastLogin', '>=', Timestamp.fromDate(thirtyDaysAgo))
      );
      const activeUsersSnapshot = await getDocs(activeUsersQuery);
      const activeUsers = activeUsersSnapshot.size;

      // Récupérer le contenu
      const contentSnapshot = await getDocs(collection(db, this.COLLECTIONS.CONTENT));
      const totalContent = contentSnapshot.size;
      
      const publishedContentQuery = query(
        collection(db, this.COLLECTIONS.CONTENT),
        where('status', '==', 'published')
      );
      const publishedContentSnapshot = await getDocs(publishedContentQuery);
      const publishedContent = publishedContentSnapshot.size;

      // Calculer les taux de croissance (données mockées pour l'instant)
      const growthRate = {
        users: 12.5,
        content: 8.3,
        revenue: 15.7
      };

      return {
        totalUsers,
        activeUsers,
        totalContent,
        publishedContent,
        totalOrders: 156, // Mock data
        totalRevenue: 45600, // Mock data
        conversionRate: 3.2, // Mock data
        averageOrderValue: 292.3, // Mock data
        growthRate
      };
    } catch (error) {
      console.error('Error fetching dashboard metrics:', error);
      throw error;
    }
  }

  /**
   * Obtenir les utilisateurs avec pagination et filtres
   */
  static async getUsers(
    options: FilterOptions = {},
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResult<UserProfile>> {
    try {
      let q = query(collection(db, this.COLLECTIONS.USERS));

      // Appliquer les filtres
      if (options.status) {
        q = query(q, where('status', '==', options.status));
      }

      if (options.search) {
        // Note: Firestore ne supporte pas la recherche full-text native
        // En production, utiliser Algolia ou Elasticsearch
        q = query(q, where('email', '>=', options.search));
      }

      // Tri
      const sortField = options.sortBy || 'createdAt';
      const sortOrder = options.sortOrder || 'desc';
      q = query(q, orderBy(sortField, sortOrder));

      // Pagination
      q = query(q, limit(pageSize));
      if (page > 1) {
        // Pour la pagination, nous aurions besoin du dernier document de la page précédente
        // Ceci est une implémentation simplifiée
      }

      const snapshot = await getDocs(q);
      const users = snapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      } as UserProfile));

      // Compter le total (en production, utiliser une collection séparée pour les stats)
      const totalSnapshot = await getDocs(collection(db, this.COLLECTIONS.USERS));
      const total = totalSnapshot.size;

      return {
        data: users,
        pagination: {
          page,
          limit: pageSize,
          total,
          hasNext: users.length === pageSize,
          hasPrev: page > 1
        }
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  /**
   * Créer un nouvel utilisateur
   */
  static async createUser(userData: Partial<UserProfile>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, this.COLLECTIONS.USERS), {
        ...userData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        status: 'active',
        emailVerified: false,
        phoneVerified: false,
        loginCount: 0
      });

      // Logger l'activité
      await this.logActivity({
        userId: 'admin', // À remplacer par l'ID de l'admin actuel
        userName: 'Admin',
        action: 'Création d\'un utilisateur',
        details: { userId: docRef.id, email: userData.email },
        category: 'users'
      });

      return docRef.id;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  /**
   * Mettre à jour un utilisateur
   */
  static async updateUser(uid: string, userData: Partial<UserProfile>): Promise<void> {
    try {
      const userRef = doc(db, this.COLLECTIONS.USERS, uid);
      await updateDoc(userRef, {
        ...userData,
        updatedAt: Timestamp.now()
      });

      // Logger l'activité
      await this.logActivity({
        userId: 'admin',
        userName: 'Admin',
        action: 'Modification d\'un utilisateur',
        details: { userId: uid, changes: userData },
        category: 'users'
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  /**
   * Supprimer un utilisateur
   */
  static async deleteUser(uid: string): Promise<void> {
    try {
      await deleteDoc(doc(db, this.COLLECTIONS.USERS, uid));

      // Logger l'activité
      await this.logActivity({
        userId: 'admin',
        userName: 'Admin',
        action: 'Suppression d\'un utilisateur',
        details: { userId: uid },
        category: 'users'
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  /**
   * Obtenir le contenu avec pagination
   */
  static async getContent(
    options: FilterOptions = {},
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResult<Content>> {
    try {
      let q = query(collection(db, this.COLLECTIONS.CONTENT));

      // Appliquer les filtres
      if (options.status) {
        q = query(q, where('status', '==', options.status));
      }

      if (options.category) {
        q = query(q, where('categories', 'array-contains', options.category));
      }

      // Tri par date de création
      q = query(q, orderBy('createdAt', 'desc'), limit(pageSize));

      const snapshot = await getDocs(q);
      const content = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
        publishedAt: doc.data().publishedAt?.toDate(),
        scheduledFor: doc.data().scheduledFor?.toDate()
      } as Content));

      const totalSnapshot = await getDocs(collection(db, this.COLLECTIONS.CONTENT));
      const total = totalSnapshot.size;

      return {
        data: content,
        pagination: {
          page,
          limit: pageSize,
          total,
          hasNext: content.length === pageSize,
          hasPrev: page > 1
        }
      };
    } catch (error) {
      console.error('Error fetching content:', error);
      throw error;
    }
  }

  /**
   * Obtenir les logs d'activité
   */
  static async getActivityLogs(
    page: number = 1,
    pageSize: number = 20
  ): Promise<PaginatedResult<ActivityLog>> {
    try {
      const q = query(
        collection(db, this.COLLECTIONS.ACTIVITY_LOGS),
        orderBy('timestamp', 'desc'),
        limit(pageSize)
      );

      const snapshot = await getDocs(q);
      const logs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate()
      } as ActivityLog));

      const totalSnapshot = await getDocs(collection(db, this.COLLECTIONS.ACTIVITY_LOGS));
      const total = totalSnapshot.size;

      return {
        data: logs,
        pagination: {
          page,
          limit: pageSize,
          total,
          hasNext: logs.length === pageSize,
          hasPrev: page > 1
        }
      };
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      throw error;
    }
  }

  /**
   * Logger une activité
   */
  static async logActivity(activity: Omit<ActivityLog, 'id' | 'timestamp'>): Promise<void> {
    try {
      await addDoc(collection(db, this.COLLECTIONS.ACTIVITY_LOGS), {
        ...activity,
        timestamp: Timestamp.now()
      });
    } catch (error) {
      console.error('Error logging activity:', error);
      // Ne pas faire échouer l'opération principale pour un problème de log
    }
  }

  /**
   * Obtenir les paramètres système
   */
  static async getSystemSettings(): Promise<SystemSettings> {
    try {
      const settingsSnapshot = await getDocs(collection(db, this.COLLECTIONS.SETTINGS));
      const settings: any = {};
      
      settingsSnapshot.docs.forEach(doc => {
        settings[doc.data().key] = doc.data().value;
      });

      // Valeurs par défaut si aucun paramètre n'existe
      return {
        siteName: settings.siteName || 'irelance',
        siteDescription: settings.siteDescription || 'Plateforme e-commerce irelance',
        contactEmail: settings.contactEmail || 'contact@irelance.ma',
        maintenanceMode: settings.maintenanceMode || false,
        registrationEnabled: settings.registrationEnabled || true,
        emailNotifications: settings.emailNotifications || true,
        backupSchedule: settings.backupSchedule || 'daily',
        maxFileSize: settings.maxFileSize || 10485760, // 10MB
        allowedFileTypes: settings.allowedFileTypes || ['jpg', 'jpeg', 'png', 'gif', 'pdf'],
        theme: settings.theme || 'light'
      };
    } catch (error) {
      console.error('Error fetching system settings:', error);
      throw error;
    }
  }

  /**
   * Mettre à jour un paramètre système
   */
  static async updateSystemSetting(key: string, value: any): Promise<void> {
    try {
      // Vérifier si le paramètre existe
      const settingQuery = query(
        collection(db, this.COLLECTIONS.SETTINGS),
        where('key', '==', key)
      );
      const snapshot = await getDocs(settingQuery);

      if (snapshot.empty) {
        // Créer le paramètre
        await addDoc(collection(db, this.COLLECTIONS.SETTINGS), {
          key,
          value,
          type: typeof value,
          updatedAt: Timestamp.now(),
          updatedBy: 'admin' // À remplacer par l'ID de l'admin actuel
        });
      } else {
        // Mettre à jour le paramètre
        const settingDoc = snapshot.docs[0];
        await updateDoc(settingDoc.ref, {
          value,
          type: typeof value,
          updatedAt: Timestamp.now(),
          updatedBy: 'admin'
        });
      }

      // Logger l'activité
      await this.logActivity({
        userId: 'admin',
        userName: 'Admin',
        action: 'Modification des paramètres système',
        details: { key, value },
        category: 'system'
      });
    } catch (error) {
      console.error('Error updating system setting:', error);
      throw error;
    }
  }
} 