import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  DollarSign,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { formatCurrency } from '../../lib/utils';

// Données mockées pour les graphiques
const userGrowthData = [
  { month: 'Jan', users: 1200, newUsers: 120 },
  { month: 'Fév', users: 1350, newUsers: 150 },
  { month: 'Mar', users: 1480, newUsers: 130 },
  { month: 'Avr', users: 1620, newUsers: 140 },
  { month: 'Mai', users: 1780, newUsers: 160 },
  { month: 'Jun', users: 1950, newUsers: 170 },
];

const revenueData = [
  { month: 'Jan', revenue: 12000, orders: 45 },
  { month: 'Fév', revenue: 15000, orders: 52 },
  { month: 'Mar', revenue: 18000, orders: 63 },
  { month: 'Avr', revenue: 22000, orders: 71 },
  { month: 'Mai', revenue: 28000, orders: 85 },
  { month: 'Jun', revenue: 35000, orders: 98 },
];

const trafficSourcesData = [
  { name: 'Recherche organique', value: 35, color: '#3b82f6' },
  { name: 'Réseaux sociaux', value: 25, color: '#10b981' },
  { name: 'Email marketing', value: 20, color: '#f59e0b' },
  { name: 'Publicité payante', value: 15, color: '#ef4444' },
  { name: 'Référencement', value: 5, color: '#8b5cf6' },
];

const deviceData = [
  { device: 'Desktop', sessions: 65, color: '#3b82f6' },
  { device: 'Mobile', sessions: 30, color: '#10b981' },
  { device: 'Tablette', sessions: 5, color: '#f59e0b' },
];

const dailyActivityData = [
  { day: 'Lun', users: 450, pageViews: 1200, conversions: 23 },
  { day: 'Mar', users: 520, pageViews: 1350, conversions: 28 },
  { day: 'Mer', users: 480, pageViews: 1180, conversions: 25 },
  { day: 'Jeu', users: 560, pageViews: 1420, conversions: 32 },
  { day: 'Ven', users: 620, pageViews: 1580, conversions: 38 },
  { day: 'Sam', users: 380, pageViews: 980, conversions: 18 },
  { day: 'Dim', users: 320, pageViews: 820, conversions: 15 },
];

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    // Simuler le chargement des données
    setTimeout(() => setLoading(false), 1000);
  };

  const handleExport = () => {
    // Logique d'export en PDF/CSV
    alert('Export des données en cours...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Rapports</h1>
          <p className="text-gray-600 mt-1">
            Analysez les performances de votre plateforme
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">90 derniers jours</option>
            <option value="1y">1 année</option>
          </select>
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
          <Button onClick={handleExport} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Métriques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">
              Sessions totales
            </CardTitle>
            <Eye className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">24,532</div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% vs période précédente
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">
              Nouveaux utilisateurs
            </CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">1,247</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.3% vs période précédente
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">
              Taux de conversion
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">3.8%</div>
            <p className="text-xs text-purple-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +0.5% vs période précédente
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-700">
              Revenus
            </CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">
              {formatCurrency(156750)}
            </div>
            <p className="text-xs text-yellow-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15.7% vs période précédente
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Croissance des utilisateurs */}
        <Card>
          <CardHeader>
            <CardTitle>Croissance des Utilisateurs</CardTitle>
            <CardDescription>
              Évolution du nombre d'utilisateurs sur les 6 derniers mois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#colorUsers)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenus et commandes */}
        <Card>
          <CardHeader>
            <CardTitle>Revenus & Commandes</CardTitle>
            <CardDescription>
              Performance financière et volume de commandes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="revenue" fill="#10b981" name="Revenus (MAD)" />
                <Bar yAxisId="right" dataKey="orders" fill="#f59e0b" name="Commandes" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sources de trafic et appareils */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sources de trafic */}
        <Card>
          <CardHeader>
            <CardTitle>Sources de Trafic</CardTitle>
            <CardDescription>
              Répartition du trafic par canal d'acquisition
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={trafficSourcesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {trafficSourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Répartition par appareil */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition par Appareil</CardTitle>
            <CardDescription>
              Sessions par type d'appareil utilisé
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deviceData.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: device.color }}
                    />
                    <span className="font-medium">{device.device}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{device.sessions}%</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full"
                        style={{ 
                          width: `${device.sessions}%`, 
                          backgroundColor: device.color 
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activité quotidienne */}
      <Card>
        <CardHeader>
          <CardTitle>Activité Quotidienne</CardTitle>
          <CardDescription>
            Métriques détaillées par jour de la semaine
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={dailyActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Utilisateurs"
              />
              <Line 
                type="monotone" 
                dataKey="pageViews" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Pages vues"
              />
              <Line 
                type="monotone" 
                dataKey="conversions" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="Conversions"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tableau des top pages */}
      <Card>
        <CardHeader>
          <CardTitle>Top des Pages</CardTitle>
          <CardDescription>
            Pages les plus visitées cette période
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Page</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Vues</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Visiteurs uniques</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Temps moyen</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Taux de rebond</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { page: '/accueil', views: 12543, uniqueVisitors: 8932, avgTime: '2:15', bounceRate: '35%' },
                  { page: '/produits', views: 8765, uniqueVisitors: 6234, avgTime: '3:42', bounceRate: '28%' },
                  { page: '/a-propos', views: 4321, uniqueVisitors: 3456, avgTime: '1:58', bounceRate: '42%' },
                  { page: '/contact', views: 2987, uniqueVisitors: 2543, avgTime: '1:23', bounceRate: '55%' },
                  { page: '/auth', views: 2156, uniqueVisitors: 1987, avgTime: '0:45', bounceRate: '12%' },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-blue-600">{row.page}</td>
                    <td className="py-3 px-4">{row.views.toLocaleString()}</td>
                    <td className="py-3 px-4">{row.uniqueVisitors.toLocaleString()}</td>
                    <td className="py-3 px-4">{row.avgTime}</td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={
                          parseInt(row.bounceRate) < 30 ? 'success' : 
                          parseInt(row.bounceRate) < 50 ? 'warning' : 'destructive'
                        }
                      >
                        {row.bounceRate}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics; 