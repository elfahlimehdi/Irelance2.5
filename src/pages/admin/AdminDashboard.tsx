import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Globe, Sun } from 'lucide-react';
import StatsCards from '../../components/dashboard/StatsCards';
import Charts from '../../components/dashboard/Charts';
import RecentActivity from '../../components/dashboard/RecentActivity';
import { DashboardMetrics, AnalyticsData } from '../../types/admin';
import { generateMockMetrics, generateTimeseriesData } from '../../lib/mockData';

const AdminDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Load dashboard data
    const loadDashboardData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMetrics(generateMockMetrics());
      setAnalyticsData(generateTimeseriesData(30));
    };

    loadDashboardData();

    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  if (!metrics) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Administrateur
          </h1>
          <p className="text-gray-600 mt-1">
            Vue d'ensemble de la plateforme IRELANCE
          </p>
        </div>
        
        <div className="flex items-center space-x-6 mt-4 lg:mt-0">
          {/* Current Time */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{currentTime.toLocaleTimeString('fr-FR')}</span>
          </div>
          
          {/* Current Date */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{currentTime.toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          
          {/* Weather Widget */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Sun className="w-4 h-4" />
            <span>Casablanca 24°C</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <StatsCards metrics={metrics} />

      {/* Charts */}
      <Charts analyticsData={analyticsData} />

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Actions Rapides
          </h3>
          
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Planifier une réunion</p>
                <p className="text-xs text-gray-600">Organiser un meeting équipe</p>
              </div>
            </button>
            
            <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Publier une annonce</p>
                <p className="text-xs text-gray-600">Nouvelle fonctionnalité</p>
              </div>
            </button>
            
            <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Sun className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Générer un rapport</p>
                <p className="text-xs text-gray-600">Rapport mensuel automatique</p>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;