import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Search, 
  Filter, 
  Calendar,
  Users,
  FileText,
  Settings,
  Shield,
  AlertTriangle,
  Info,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { ActivityLog, PaginatedResult, FilterOptions } from '../../types/admin';
import { AdminService } from '../../services/adminService';
import { formatDateTime } from '../../lib/utils';

const ActivityLogs: React.FC = () => {
  const [logs, setLogs] = useState<PaginatedResult<ActivityLog>>({
    data: [],
    pagination: { page: 1, limit: 20, total: 0, hasNext: false, hasPrev: false }
  });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    category: '',
    sortBy: 'timestamp',
    sortOrder: 'desc'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Données mockées pour la démonstration
  const mockLogs: ActivityLog[] = [
    {
      id: '1',
      userId: 'admin-1',
      userName: 'Jean Dupont',
      action: 'Création d\'un nouvel utilisateur',
      details: { email: 'nouveau@user.com', role: 'user' },
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      timestamp: new Date('2024-01-15T14:30:00'),
      category: 'users'
    },
    {
      id: '2',
      userId: 'admin-1',
      userName: 'Marie Martin',
      action: 'Publication d\'un article',
      details: { title: 'Nouveau produit disponible', contentId: 'content-123' },
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      timestamp: new Date('2024-01-15T13:45:00'),
      category: 'content'
    },
    {
      id: '3',
      userId: 'super-admin',
      userName: 'Admin Système',
      action: 'Modification des paramètres de sécurité',
      details: { setting: 'max_login_attempts', oldValue: 3, newValue: 5 },
      ipAddress: '192.168.1.1',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      timestamp: new Date('2024-01-15T12:20:00'),
      category: 'system'
    },
    {
      id: '4',
      userId: 'admin-2',
      userName: 'Pierre Durand',
      action: 'Suppression d\'un utilisateur',
      details: { userId: 'user-456', email: 'ancien@user.com' },
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
      timestamp: new Date('2024-01-15T11:15:00'),
      category: 'users'
    },
    {
      id: '5',
      userId: 'admin-1',
      userName: 'Jean Dupont',
      action: 'Connexion administrative',
      details: { method: 'email_password' },
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      timestamp: new Date('2024-01-15T09:00:00'),
      category: 'auth'
    }
  ];

  // Charger les logs
  const loadLogs = async (page: number = 1) => {
    setLoading(true);
    try {
      // En production, utiliser AdminService.getActivityLogs
      // const result = await AdminService.getActivityLogs(page, 20);
      
      // Pour la démo, utiliser les données mockées
      const filteredLogs = mockLogs.filter(log => {
        if (filters.category && log.category !== filters.category) return false;
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          return log.action.toLowerCase().includes(searchLower) ||
                 log.userName.toLowerCase().includes(searchLower);
        }
        return true;
      });

      setLogs({
        data: filteredLogs,
        pagination: {
          page,
          limit: 20,
          total: filteredLogs.length,
          hasNext: false,
          hasPrev: false
        }
      });
    } catch (error) {
      console.error('Error loading activity logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, [filters]);

  // Gérer la recherche
  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  // Gérer les filtres
  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Obtenir l'icône selon la catégorie
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'users': return Users;
      case 'content': return FileText;
      case 'system': return Settings;
      case 'auth': return Shield;
      case 'api': return Activity;
      default: return Info;
    }
  };

  // Obtenir la couleur du badge selon la catégorie
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'users': return 'info';
      case 'content': return 'success';
      case 'system': return 'warning';
      case 'auth': return 'secondary';
      case 'api': return 'info';
      default: return 'secondary';
    }
  };

  // Badge de catégorie
  const CategoryBadge: React.FC<{ category: string }> = ({ category }) => {
    const Icon = getCategoryIcon(category);
    const color = getCategoryColor(category);

    return (
      <Badge variant={color as any} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {category === 'users' ? 'Utilisateurs' :
         category === 'content' ? 'Contenu' :
         category === 'system' ? 'Système' :
         category === 'auth' ? 'Authentification' :
         category === 'api' ? 'API' : category}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Logs d'Activité</h1>
          <p className="text-gray-600 mt-1">
            Suivi de toutes les actions administratives et événements système
          </p>
        </div>
        <Button
          onClick={() => loadLogs()}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Actualiser
        </Button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-gray-600">Actions utilisateurs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">15</p>
                <p className="text-sm text-gray-600">Modifications contenu</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-gray-600">Connexions admin</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-gray-600">Événements système</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher dans les logs..."
                  value={filters.search || ''}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filtres
              </Button>
            </div>
          </div>

          {/* Filtres étendus */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie
                </label>
                <select
                  value={filters.category || ''}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Toutes les catégories</option>
                  <option value="users">Utilisateurs</option>
                  <option value="content">Contenu</option>
                  <option value="system">Système</option>
                  <option value="auth">Authentification</option>
                  <option value="api">API</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Période
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="today">Aujourd'hui</option>
                  <option value="week">Cette semaine</option>
                  <option value="month">Ce mois</option>
                  <option value="all">Toute la période</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Utilisateur
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Tous les utilisateurs</option>
                  <option value="admin-1">Jean Dupont</option>
                  <option value="admin-2">Marie Martin</option>
                  <option value="super-admin">Admin Système</option>
                </select>
              </div>
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Liste des logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Activité Récente ({logs.pagination.total})
          </CardTitle>
          <CardDescription>
            Chronologie des actions effectuées sur la plateforme
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {logs.data.map((log) => (
                <div key={log.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      {React.createElement(getCategoryIcon(log.category), {
                        className: "h-4 w-4 text-blue-600"
                      })}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-900">
                        {log.action}
                      </p>
                      <div className="flex items-center space-x-2">
                        <CategoryBadge category={log.category} />
                        <span className="text-xs text-gray-500">
                          {formatDateTime(log.timestamp)}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      Par <span className="font-medium">{log.userName}</span>
                      {log.ipAddress && (
                        <span className="text-xs text-gray-500 ml-2">
                          depuis {log.ipAddress}
                        </span>
                      )}
                    </p>
                    
                    {log.details && Object.keys(log.details).length > 0 && (
                      <div className="bg-white p-3 rounded border border-gray-200 mt-2">
                        <p className="text-xs font-medium text-gray-700 mb-1">Détails :</p>
                        <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                          {JSON.stringify(log.details, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {logs.data.length === 0 && (
                <div className="text-center py-12">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Aucun log trouvé</h3>
                  <p className="text-gray-600">
                    {filters.search ? 'Aucun log ne correspond à votre recherche.' : 'Aucune activité enregistrée pour cette période.'}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {logs.pagination.total > logs.pagination.limit && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Affichage de {((logs.pagination.page - 1) * logs.pagination.limit) + 1} à{' '}
            {Math.min(logs.pagination.page * logs.pagination.limit, logs.pagination.total)} sur{' '}
            {logs.pagination.total} logs
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!logs.pagination.hasPrev}
              onClick={() => loadLogs(logs.pagination.page - 1)}
            >
              Précédent
            </Button>
            <span className="text-sm text-gray-600">
              Page {logs.pagination.page}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={!logs.pagination.hasNext}
              onClick={() => loadLogs(logs.pagination.page + 1)}
            >
              Suivant
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityLogs; 