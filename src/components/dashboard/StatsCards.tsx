import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  Folder,
  CheckCircle,
  Clock,
  Shield
} from 'lucide-react';
import { DashboardMetrics } from '../../types/admin';
import { cn } from '../../lib/utils';

interface StatsCardsProps {
  metrics: DashboardMetrics;
}

const StatsCards: React.FC<StatsCardsProps> = ({ metrics }) => {
  const cards = [
    {
      title: 'Utilisateurs Totaux',
      value: metrics.totalUsers.toLocaleString(),
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Utilisateurs Actifs',
      value: metrics.activeUsers.toLocaleString(),
      change: '+8.3%',
      changeType: 'positive' as const,
      icon: Activity,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Revenus Totaux',
      value: `${metrics.totalRevenue.toLocaleString()} MAD`,
      change: `+${metrics.monthlyGrowth}%`,
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Croissance Mensuelle',
      value: `${metrics.monthlyGrowth}%`,
      change: '+2.1%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Projets Totaux',
      value: metrics.totalProjects.toString(),
      change: '+5 ce mois',
      changeType: 'positive' as const,
      icon: Folder,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    },
    {
      title: 'Projets Terminés',
      value: metrics.completedProjects.toString(),
      change: `${Math.round((metrics.completedProjects / metrics.totalProjects) * 100)}% taux`,
      changeType: 'positive' as const,
      icon: CheckCircle,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    {
      title: 'Tâches en Attente',
      value: metrics.pendingTasks.toString(),
      change: '-3 depuis hier',
      changeType: 'positive' as const,
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    },
    {
      title: 'État du Système',
      value: metrics.systemHealth === 'excellent' ? 'Excellent' : 
             metrics.systemHealth === 'good' ? 'Bon' :
             metrics.systemHealth === 'warning' ? 'Attention' : 'Critique',
      change: '99.9% uptime',
      changeType: 'positive' as const,
      icon: Shield,
      color: metrics.systemHealth === 'excellent' ? 'from-green-500 to-green-600' :
             metrics.systemHealth === 'good' ? 'from-blue-500 to-blue-600' :
             metrics.systemHealth === 'warning' ? 'from-yellow-500 to-yellow-600' :
             'from-red-500 to-red-600',
      bgColor: metrics.systemHealth === 'excellent' ? 'bg-green-50' :
               metrics.systemHealth === 'good' ? 'bg-blue-50' :
               metrics.systemHealth === 'warning' ? 'bg-yellow-50' :
               'bg-red-50',
      iconColor: metrics.systemHealth === 'excellent' ? 'text-green-600' :
                 metrics.systemHealth === 'good' ? 'text-blue-600' :
                 metrics.systemHealth === 'warning' ? 'text-yellow-600' :
                 'text-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative overflow-hidden"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              {/* Background Gradient */}
              <div className={cn(
                "absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full -mr-16 -mt-16",
                `bg-gradient-to-br ${card.color}`
              )} />
              
              {/* Icon */}
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                card.bgColor
              )}>
                <Icon className={cn("w-6 h-6", card.iconColor)} />
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  {card.value}
                </p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className={cn(
                    "w-4 h-4",
                    card.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                  )} />
                  <span className={cn(
                    "text-sm font-medium",
                    card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  )}>
                    {card.change}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCards;