import { DashboardMetrics, User, Project, AnalyticsData } from '../types/admin';

export const generateMockMetrics = (): DashboardMetrics => ({
  totalUsers: 1247,
  activeUsers: 342,
  totalRevenue: 156750,
  monthlyGrowth: 12.5,
  totalProjects: 89,
  completedProjects: 67,
  pendingTasks: 15,
  systemHealth: 'excellent'
});

export const generateMockUsers = (count: number = 50): User[] => {
  const names = [
    'Ahmed Benali', 'Fatima Alaoui', 'Omar Tazi', 'Aicha Mansouri', 'Youssef Idrissi',
    'Khadija Berrada', 'Hassan Mekouar', 'Nadia Fassi', 'Rachid Bennani', 'Samira Cherkaoui',
    'Mohamed Lahlou', 'Zineb Amrani', 'Karim Benjelloun', 'Leila Ouali', 'Abdellatif Chraibi'
  ];
  
  const roles = ['Client', 'Freelancer', 'Manager', 'Support'];
  const statuses = ['active', 'inactive', 'suspended'] as const;

  return Array.from({ length: count }, (_, i) => ({
    id: `user-${i + 1}`,
    email: `user${i + 1}@example.com`,
    name: names[i % names.length],
    avatar: `https://images.pexels.com/photos/${2182970 + i}/pexels-photo-${2182970 + i}.jpeg?auto=compress&cs=tinysrgb&w=150`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    role: roles[Math.floor(Math.random() * roles.length)],
    joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
    lastActive: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    stats: {
      projectsCompleted: Math.floor(Math.random() * 20),
      totalRevenue: Math.floor(Math.random() * 50000),
      rating: 3.5 + Math.random() * 1.5
    }
  }));
};

export const generateMockProjects = (count: number = 25): Project[] => {
  const titles = [
    'Site E-commerce', 'Application Mobile', 'Système de Gestion', 'Plateforme Web',
    'API REST', 'Dashboard Analytics', 'Site Vitrine', 'Application React',
    'Backend Node.js', 'Interface Admin', 'Boutique en Ligne', 'CRM Custom'
  ];

  const statuses = ['pending', 'in-progress', 'completed', 'cancelled'] as const;
  const tags = ['React', 'Node.js', 'TypeScript', 'Firebase', 'MongoDB', 'API', 'Mobile', 'Web'];

  return Array.from({ length: count }, (_, i) => ({
    id: `project-${i + 1}`,
    title: titles[i % titles.length],
    description: `Description détaillée du projet ${titles[i % titles.length]}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    clientId: `user-${Math.floor(Math.random() * 20) + 1}`,
    freelancerId: `user-${Math.floor(Math.random() * 20) + 21}`,
    budget: 5000 + Math.floor(Math.random() * 45000),
    createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000),
    deadline: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000),
    tags: tags.slice(0, Math.floor(Math.random() * 4) + 1)
  }));
};

export const generateTimeseriesData = (days: number = 30): AnalyticsData[] => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    
    return {
      date: date.toISOString().split('T')[0],
      metrics: {
        dailyUsers: 50 + Math.floor(Math.random() * 200),
        newSignups: Math.floor(Math.random() * 20),
        revenue: 1000 + Math.floor(Math.random() * 5000),
        projectsCreated: Math.floor(Math.random() * 10),
        completionRate: 0.6 + Math.random() * 0.4
      }
    };
  });
};