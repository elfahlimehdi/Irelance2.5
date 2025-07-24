import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Package, 
  Users, 
  TrendingUp, 
  ShoppingCart,
  Eye,
  Plus,
  Filter,
  Download
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

interface DashboardStats {
  totalProducts: number;
  totalSales: number;
  totalUsers: number;
  revenue: number;
}

interface RecentActivity {
  id: string;
  type: 'product_added' | 'sale' | 'user_registered';
  description: string;
  timestamp: string;
}

interface TopProduct {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  category: string;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalSales: 0,
    totalUsers: 0,
    revenue: 0
  });

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation du chargement des données
    const loadDashboardData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalProducts: 156,
        totalSales: 1247,
        totalUsers: 892,
        revenue: 125430
      });

      setRecentActivities([
        {
          id: '1',
          type: 'product_added',
          description: 'Nouveau produit ajouté : Caméra HD Pro 4K',
          timestamp: '2024-01-18T10:30:00Z'
        },
        {
          id: '2',
          type: 'sale',
          description: 'Vente réalisée : Panneau Solaire 300W',
          timestamp: '2024-01-18T09:15:00Z'
        },
        {
          id: '3',
          type: 'user_registered',
          description: 'Nouvel utilisateur inscrit : Ahmed Benali',
          timestamp: '2024-01-18T08:45:00Z'
        }
      ]);

      setTopProducts([
        { id: '1', name: 'Caméra HD Pro', sales: 145, revenue: 43355, category: 'Caméras' },
        { id: '2', name: 'Panneau Solaire 300W', sales: 89, revenue: 40050, category: 'Solaire' },
        { id: '3', name: 'Caméra Wifi Smart', sales: 76, revenue: 15124, category: 'Caméras' },
        { id: '4', name: 'Kit Panneau Portable', sales: 65, revenue: 11700, category: 'Solaire' },
        { id: '5', name: 'Système d\'Alarme', sales: 54, revenue: 18900, category: 'Sécurité' }
      ]);

      setLoading(false);
    };

    loadDashboardData();
  }, []);

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    trend?: string;
  }> = ({ title, value, icon, color, trend }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p className="text-green-600 text-sm mt-1 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
            <p className="text-gray-600 mt-1">Vue d'ensemble de votre activité</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4 mr-2" />
              Filtrer
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Produits"
            value={stats.totalProducts}
            icon={<Package className="w-6 h-6 text-blue-600" />}
            color="bg-blue-100"
            trend="+12% ce mois"
          />
          <StatCard
            title="Ventes Totales"
            value={stats.totalSales}
            icon={<ShoppingCart className="w-6 h-6 text-green-600" />}
            color="bg-green-100"
            trend="+8% ce mois"
          />
          <StatCard
            title="Utilisateurs"
            value={stats.totalUsers}
            icon={<Users className="w-6 h-6 text-purple-600" />}
            color="bg-purple-100"
            trend="+15% ce mois"
          />
          <StatCard
            title="Chiffre d'Affaires"
            value={`${stats.revenue.toLocaleString()} MAD`}
            icon={<TrendingUp className="w-6 h-6 text-orange-600" />}
            color="bg-orange-100"
            trend="+22% ce mois"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Products Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Produits les Plus Vendus</h2>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{product.sales} ventes</p>
                    <p className="text-sm text-green-600">{product.revenue.toLocaleString()} MAD</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Activités Récentes</h2>
              <Eye className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'product_added' ? 'bg-blue-500' :
                    activity.type === 'sale' ? 'bg-green-500' : 'bg-purple-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm">{activity.description}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {new Date(activity.timestamp).toLocaleString('fr-FR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
              Voir toutes les activités
            </button>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Actions Rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
              <div className="text-center">
                <Plus className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mx-auto mb-2" />
                <p className="text-gray-600 group-hover:text-blue-600 font-medium">Ajouter un Produit</p>
              </div>
            </button>
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group">
              <div className="text-center">
                <BarChart3 className="w-8 h-8 text-gray-400 group-hover:text-green-500 mx-auto mb-2" />
                <p className="text-gray-600 group-hover:text-green-600 font-medium">Voir les Rapports</p>
              </div>
            </button>
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group">
              <div className="text-center">
                <Users className="w-8 h-8 text-gray-400 group-hover:text-purple-500 mx-auto mb-2" />
                <p className="text-gray-600 group-hover:text-purple-600 font-medium">Gérer les Utilisateurs</p>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;