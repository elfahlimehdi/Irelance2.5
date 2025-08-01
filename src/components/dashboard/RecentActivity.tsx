import React from 'react';
import { motion } from 'framer-motion';
import {
  User,
  FileText,
  Settings,
  Shield,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ActivityItem {
  id: string;
  type: 'user' | 'content' | 'system' | 'security';
  title: string;
  description: string;
  timestamp: Date;
  user: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

const RecentActivity: React.FC = () => {
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'user',
      title: 'Nouvel utilisateur inscrit',
      description: 'Ahmed Benali a créé un compte freelancer',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      user: 'Système',
      status: 'success'
    },
    {
      id: '2',
      type: 'content',
      title: 'Article publié',
      description: 'Guide des meilleures pratiques React',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      user: 'Hassan Mekouar',
      status: 'success'
    },
    {
      id: '3',
      type: 'system',
      title: 'Sauvegarde automatique',
      description: 'Sauvegarde quotidienne de la base de données',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      user: 'Système',
      status: 'info'
    },
    {
      id: '4',
      type: 'security',
      title: 'Tentative de connexion',
      description: 'Connexion échouée depuis IP 192.168.1.100',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      user: 'Sécurité',
      status: 'warning'
    },
    {
      id: '5',
      type: 'user',
      title: 'Projet terminé',
      description: 'Site e-commerce livré avec succès',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      user: 'Fatima Alaoui',
      status: 'success'
    },
    {
      id: '6',
      type: 'system',
      title: 'Mise à jour système',
      description: 'Version 2.1.0 déployée avec succès',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      user: 'DevOps',
      status: 'info'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return User;
      case 'content': return FileText;
      case 'system': return Settings;
      case 'security': return Shield;
      default: return Activity;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-500 bg-green-50';
      case 'warning': return 'text-yellow-500 bg-yellow-50';
      case 'error': return 'text-red-500 bg-red-50';
      default: return 'text-blue-500 bg-blue-50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Activité Récente</h3>
          <p className="text-sm text-gray-600">Dernières actions sur la plateforme</p>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Voir tout
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const ActivityIcon = getActivityIcon(activity.type);
          const StatusIcon = getStatusIcon(activity.status);
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <ActivityIcon className="w-5 h-5 text-gray-600" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {activity.title}
                  </p>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${getStatusColor(activity.status)}`}>
                    <StatusIcon className="w-3 h-3" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {activity.description}
                </p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Par {activity.user}</span>
                  <span>•</span>
                  <span>
                    {formatDistanceToNow(activity.timestamp, { 
                      addSuffix: true, 
                      locale: fr 
                    })}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default RecentActivity;