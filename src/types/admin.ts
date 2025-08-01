export interface DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyGrowth: number;
  totalProjects: number;
  completedProjects: number;
  pendingTasks: number;
  systemHealth: 'excellent' | 'good' | 'warning' | 'critical';
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'suspended';
  role: string;
  joinDate: Date;
  lastActive: Date;
  stats: {
    projectsCompleted: number;
    totalRevenue: number;
    rating: number;
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  clientId: string;
  freelancerId: string;
  budget: number;
  createdAt: Date;
  deadline: Date;
  tags: string[];
}

export interface AnalyticsData {
  date: string;
  metrics: {
    dailyUsers: number;
    newSignups: number;
    revenue: number;
    projectsCreated: number;
    completionRate: number;
  };
}

export interface SystemLog {
  id: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error';
  message: string;
  userId?: string;
  metadata: Record<string, any>;
}

export interface ContentItem {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  author: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  category: string;
}