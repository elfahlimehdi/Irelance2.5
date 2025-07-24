import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  DollarSign,
  Package,
  Users,
  ShoppingCart,
  AlertTriangle,
  Star
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

interface SalesData {
  period: string;
  sales: number;
  revenue: number;
}

interface TopProduct {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  category: string;
}

interface LowStockProduct {
  id: string;
  name: string;
  stock: number;
  category: string;
}

interface CategoryAnalysis {
  category: string;
  products: number;
  sales: number;
  revenue: number;
  growth: number;
}

const AdminReports: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<LowStockProduct[]>([]);
  const [categoryAnalysis, setCategoryAnalysis] = useState<CategoryAnalysis[]>([]);

  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalSales: 0,
    averageOrderValue: 0,
    conversionRate: 0
  });

  useEffect(() => {
    loadReportsData();
  }, [selectedPeriod]);

  const loadReportsData = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Données de ventes par période
    setSalesData([
      { period: 'Jan', sales: 145, revenue: 43355 },
      { period: 'Fév', sales: 132, revenue: 39840 },
      { period: 'Mar', sales: 168, revenue: 52480 },
      { period: 'Avr', sales: 156, revenue: 48720 },
      { period: 'Mai', sales: 189, revenue: 58590 },
      { period: 'Jun', sales: 201, revenue: 62310 }
    ]);

    // Top produits
    setTopProducts([
      { id: '1', name: 'Caméra HD Pro', sales: 145, revenue: 43355, category: 'Caméras' },
      { id: '2', name: 'Panneau Solaire 300W', sales: 89, revenue: 40050, category: 'Solaire' },
      { id: '3', name: 'Caméra Wifi Smart', sales: 76, revenue: 15124, category: 'Caméras' },
      { id: '4', name: 'Kit Panneau Portable', sales: 65, revenue: 11700, category: 'Solaire' },
      { id: '5', name: 'Système d\'Alarme', sales: 54, revenue: 18900, category: 'Sécurité' }
    ]);

    // Produits en rupture de stock
    setLowStockProducts([
      { id: '1', name: 'Caméra Extérieure Pro', stock: 2, category: 'Caméras' },
      { id: '2', name: 'Batterie Lithium 12V', stock: 1, category: 'Accessoires' },
      { id: '3', name: 'Régulateur MPPT 40A', stock: 3, category: 'Technologies' },
      { id: '4', name: 'Détecteur de Mouvement', stock: 2, category: 'Sécurité' }
    ]);

    // Analyse par catégorie
    setCategoryAnalysis([
      { category: 'Caméras de surveillance', products: 15, sales: 234, revenue: 69420, growth: 12.5 },
      { category: 'Panneaux solaires', products: 8, sales: 156, revenue: 52680, growth: 8.3 },
      { category: 'Équipements de sécurité', products: 12, sales: 89, revenue: 31150, growth: 15.7 },
      { category: 'Accessoires', products: 23, sales: 145, revenue: 18900, growth: -2.1 },
      { category: 'Technologies', products: 6, sales: 67, revenue: 24580, growth: 22.4 }
    ]);

    // Statistiques générales
    setStats({
      totalRevenue: 196730,
      totalSales: 691,
      averageOrderValue: 284.7,
      conversionRate: 3.2
    });

    setLoading(false);
  };

  const exportData = (format: 'csv' | 'pdf') => {
    // Simulation de l'export
    const filename = `rapport_${selectedPeriod}_${new Date().toISOString().split('T')[0]}.${format}`;
    console.log(`Export des données en ${format.toUpperCase()}: ${filename}`);
    // Ici, vous implémenteriez la logique d'export réelle
  };

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    trend?: number;
  }> = ({ title, value, icon, color, trend }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend !== undefined && (
            <p className={`text-sm mt-1 flex items-center ${
              trend >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className={`w-4 h-4 mr-1 ${trend < 0 ? 'rotate-180' : ''}`} />
              {Math.abs(trend)}% ce mois
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
            <h1 className="text-3xl font-bold text-gray-900">Rapports et Analytics</h1>
            <p className="text-gray-600 mt-1">Analysez les performances de votre boutique</p>
          </div>
          <div className="flex space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="quarter">Ce trimestre</option>
              <option value="year">Cette année</option>
            </select>
            <button
              onClick={() => exportData('csv')}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              CSV
            </button>
            <button
              onClick={() => exportData('pdf')}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              PDF
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Chiffre d'Affaires"
            value={`${stats.totalRevenue.toLocaleString()} MAD`}
            icon={<DollarSign className="w-6 h-6 text-green-600" />}
            color="bg-green-100"
            trend={12.5}
          />
          <StatCard
            title="Ventes Totales"
            value={stats.totalSales}
            icon={<ShoppingCart className="w-6 h-6 text-blue-600" />}
            color="bg-blue-100"
            trend={8.3}
          />
          <StatCard
            title="Panier Moyen"
            value={`${stats.averageOrderValue.toFixed(1)} MAD`}
            icon={<BarChart3 className="w-6 h-6 text-purple-600" />}
            color="bg-purple-100"
            trend={5.7}
          />
          <StatCard
            title="Taux de Conversion"
            value={`${stats.conversionRate}%`}
            icon={<TrendingUp className="w-6 h-6 text-orange-600" />}
            color="bg-orange-100"
            trend={-1.2}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Évolution des Ventes</h2>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {salesData.map((data, index) => (
                <div key={data.period} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-gray-900">{data.period}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{data.sales} ventes</p>
                    <p className="text-sm text-green-600">{data.revenue.toLocaleString()} MAD</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Top Produits</h2>
              <Star className="w-5 h-5 text-gray-400" />
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
                    <p className="font-semibold text-gray-900">{product.sales}</p>
                    <p className="text-sm text-green-600">{product.revenue.toLocaleString()} MAD</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Low Stock Alert */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Stocks Faibles</h2>
              <AlertTriangle className="w-5 h-5 text-orange-500" />
            </div>
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      {product.stock} restant{product.stock > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Analyse par Catégorie</h2>
              <Package className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {categoryAnalysis.map((category) => (
                <div key={category.category} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{category.category}</h3>
                    <span className={`text-sm font-medium ${
                      category.growth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {category.growth >= 0 ? '+' : ''}{category.growth}%
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="block font-medium">{category.products}</span>
                      <span>Produits</span>
                    </div>
                    <div>
                      <span className="block font-medium">{category.sales}</span>
                      <span>Ventes</span>
                    </div>
                    <div>
                      <span className="block font-medium">{category.revenue.toLocaleString()}</span>
                      <span>MAD</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReports;