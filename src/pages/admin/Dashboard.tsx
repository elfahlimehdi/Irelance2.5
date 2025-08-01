import React from 'react';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Activity,
  Eye,
  DollarSign,
  ShoppingCart,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { formatCurrency, formatDate } from '../../lib/utils';

// Données mockées pour la démonstration
const mockMetrics = {
  totalUsers: 1245,
  activeUsers: 342,
  totalContent: 89,
  publishedContent: 67,
  totalOrders: 156,
  totalRevenue: 45600,
  conversionRate: 3.2,
  growthRate: {
    users: 12.5,
    content: 8.3,
    revenue: 15.7
  }
};

const mockRecentActivity = [
  {
    id: '1',
    user: 'Jean Dupont',
    action: 'Création d\'un nouvel utilisateur',
    timestamp: new Date('2024-01-15T10:30:00'),
    type: 'user'
  },
  {
    id: '2',
    user: 'Marie Martin',
    action: 'Publication d\'un article',
    timestamp: new Date('2024-01-15T09:15:00'),
    type: 'content'
  },
  {
    id: '3',
    user: 'Admin',
    action: 'Mise à jour des paramètres système',
    timestamp: new Date('2024-01-15T08:45:00'),
    type: 'system'
  },
  {
    id: '4',
    user: 'Pierre Durand',
    action: 'Modification d\'un produit',
    timestamp: new Date('2024-01-15T08:20:00'),
    type: 'content'
  }
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Vue d'ensemble de votre application irelance
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="success" className="px-3 py-1">
            <Activity className="h-3 w-3 mr-1" />
            Système actif
          </Badge>
          <span className="text-sm text-gray-500">
            Dernière mise à jour: {formatDate(new Date())}
          </span>
        </div>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">
              Utilisateurs totaux
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {mockMetrics.totalUsers.toLocaleString()}
            </div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{mockMetrics.growthRate.users}% ce mois
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">
              Utilisateurs actifs
            </CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {mockMetrics.activeUsers.toLocaleString()}
            </div>
            <p className="text-xs text-green-600">
              {((mockMetrics.activeUsers / mockMetrics.totalUsers) * 100).toFixed(1)}% du total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">
              Contenu publié
            </CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {mockMetrics.publishedContent}
            </div>
            <p className="text-xs text-purple-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{mockMetrics.growthRate.content}% ce mois
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-700">
              Revenus totaux
            </CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">
              {formatCurrency(mockMetrics.totalRevenue)}
            </div>
            <p className="text-xs text-yellow-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{mockMetrics.growthRate.revenue}% ce mois
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Métriques secondaires */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-blue-600" />
              <span>Commandes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {mockMetrics.totalOrders}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Taux de conversion</span>
                <span className="font-medium">{mockMetrics.conversionRate}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Panier moyen</span>
                <span className="font-medium">
                  {formatCurrency(mockMetrics.totalRevenue / mockMetrics.totalOrders)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-green-600" />
              <span>Contenu</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {mockMetrics.totalContent}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Publié</span>
                <span className="font-medium">{mockMetrics.publishedContent}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Brouillon</span>
                <span className="font-medium">{mockMetrics.totalContent - mockMetrics.publishedContent}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <span>Activité</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              24h
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Actions aujourd'hui</span>
                <span className="font-medium">147</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Connexions</span>
                <span className="font-medium">23</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activité récente */}
      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
          <CardDescription>
            Les dernières actions effectuées sur la plateforme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRecentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {activity.type === 'user' && (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                  )}
                  {activity.type === 'content' && (
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <FileText className="h-4 w-4 text-green-600" />
                    </div>
                  )}
                  {activity.type === 'system' && (
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Activity className="h-4 w-4 text-purple-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500">
                    Par {activity.user} • {formatDate(activity.timestamp)}
                  </p>
                </div>
                <Badge 
                  variant={
                    activity.type === 'user' ? 'info' : 
                    activity.type === 'content' ? 'success' : 'secondary'
                  }
                  className="capitalize"
                >
                  {activity.type === 'user' ? 'Utilisateur' : 
                   activity.type === 'content' ? 'Contenu' : 'Système'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard; 