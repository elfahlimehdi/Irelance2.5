// Types pour le système d'administration

export type UserRole = 'super_admin' | 'admin' | 'moderator' | 'user';

export type Permission = 
  | 'users.read'
  | 'users.write'
  | 'users.delete'
  | 'content.read'
  | 'content.write'
  | 'content.delete'
  | 'analytics.read'
  | 'settings.read'
  | 'settings.write'
  | 'system.read'
  | 'system.write';

export interface AdminUser {
  uid: string;
  email: string;
  displayName?: string;
  role: UserRole;
  permissions: Permission[];
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  avatar?: string;
  phone?: string;
  department?: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
  category: 'auth' | 'users' | 'content' | 'system' | 'api';
}

export interface DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  totalContent: number;
  publishedContent: number;
  totalOrders?: number;
  totalRevenue?: number;
  conversionRate?: number;
  averageOrderValue?: number;
  growthRate: {
    users: number;
    content: number;
    revenue?: number;
  };
}

export interface SystemSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  emailNotifications: boolean;
  backupSchedule: 'daily' | 'weekly' | 'monthly';
  maxFileSize: number;
  allowedFileTypes: string[];
  theme: 'light' | 'dark' | 'auto';
}

export interface ApiEndpoint {
  id: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
  isActive: boolean;
  requestsToday: number;
  averageResponseTime: number;
  errorRate: number;
  lastCalled?: Date;
}

export interface Content {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  type: 'article' | 'page' | 'product' | 'announcement';
  status: 'draft' | 'published' | 'archived' | 'scheduled';
  authorId: string;
  authorName: string;
  tags: string[];
  categories: string[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  scheduledFor?: Date;
  viewCount: number;
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  preferences: {
    language: string;
    timezone: string;
    emailNotifications: boolean;
    smsNotifications: boolean;
  };
  status: 'active' | 'inactive' | 'suspended';
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  loginCount: number;
}

export interface AdminDashboardTab {
  id: string;
  label: string;
  icon: React.ComponentType;
  path: string;
  permission?: Permission;
  badge?: number;
}

export interface FilterOptions {
  search?: string;
  status?: string;
  role?: UserRole;
  dateRange?: {
    start: Date;
    end: Date;
  };
  category?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Résultats paginés
export interface PaginatedResult<T> {
  data: T[];
  pagination: PaginationState;
} 