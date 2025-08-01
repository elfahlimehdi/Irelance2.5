import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { UserProfile, FilterOptions, PaginatedResult } from '../../types/admin';
import { AdminService } from '../../services/adminService';
import { formatDate, formatDateTime } from '../../lib/utils';

interface UserManagementProps {}

const UserManagement: React.FC<UserManagementProps> = () => {
  const [users, setUsers] = useState<PaginatedResult<UserProfile>>({
    data: [],
    pagination: { page: 1, limit: 10, total: 0, hasNext: false, hasPrev: false }
  });
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    status: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Charger les utilisateurs
  const loadUsers = async (page: number = 1) => {
    setLoading(true);
    try {
      const result = await AdminService.getUsers(filters, page, 10);
      setUsers(result);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [filters]);

  // Gérer la recherche
  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  // Gérer les filtres
  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Sélectionner/désélectionner un utilisateur
  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  // Sélectionner tous les utilisateurs
  const toggleAllUsers = () => {
    if (selectedUsers.length === users.data.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.data.map(user => user.uid));
    }
  };

  // Supprimer un utilisateur
  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await AdminService.deleteUser(userId);
        await loadUsers(users.pagination.page);
        setSelectedUsers(prev => prev.filter(id => id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Erreur lors de la suppression de l\'utilisateur');
      }
    }
  };

  // Supprimer les utilisateurs sélectionnés
  const handleDeleteSelected = async () => {
    if (selectedUsers.length === 0) return;
    
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedUsers.length} utilisateur(s) ?`)) {
      try {
        await Promise.all(selectedUsers.map(userId => AdminService.deleteUser(userId)));
        await loadUsers(users.pagination.page);
        setSelectedUsers([]);
      } catch (error) {
        console.error('Error deleting users:', error);
        alert('Erreur lors de la suppression des utilisateurs');
      }
    }
  };

  // Badge de statut
  const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const variants = {
      active: 'success',
      inactive: 'secondary',
      suspended: 'destructive'
    } as const;

    const icons = {
      active: CheckCircle,
      inactive: XCircle,
      suspended: AlertCircle
    };

    const Icon = icons[status as keyof typeof icons] || AlertCircle;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status === 'active' ? 'Actif' : 
         status === 'inactive' ? 'Inactif' : 
         status === 'suspended' ? 'Suspendu' : status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
          <p className="text-gray-600 mt-1">
            Gérez les comptes utilisateurs et leurs permissions
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nouvel Utilisateur
        </Button>
      </div>

      {/* Filtres et Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher par email..."
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
            
            {selectedUsers.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {selectedUsers.length} sélectionné(s)
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteSelected}
                  className="flex items-center gap-1"
                >
                  <Trash2 className="h-3 w-3" />
                  Supprimer
                </Button>
              </div>
            )}
          </div>

          {/* Filtres étendus */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Statut
                </label>
                <select
                  value={filters.status || ''}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Tous les statuts</option>
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                  <option value="suspended">Suspendu</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trier par
                </label>
                <select
                  value={filters.sortBy || 'createdAt'}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="createdAt">Date de création</option>
                  <option value="lastLogin">Dernière connexion</option>
                  <option value="email">Email</option>
                  <option value="displayName">Nom</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ordre
                </label>
                <select
                  value={filters.sortOrder || 'desc'}
                  onChange={(e) => handleFilterChange('sortOrder', e.target.value as 'asc' | 'desc')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="desc">Décroissant</option>
                  <option value="asc">Croissant</option>
                </select>
              </div>
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Tableau des utilisateurs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Utilisateurs ({users.pagination.total})
          </CardTitle>
          <CardDescription>
            Liste de tous les utilisateurs de la plateforme
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === users.data.length && users.data.length > 0}
                        onChange={toggleAllUsers}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Utilisateur</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Statut</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Dernière connexion</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Créé le</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.data.map((user) => (
                    <tr key={user.uid} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.uid)}
                          onChange={() => toggleUserSelection(user.uid)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {user.displayName || 'Sans nom'}
                            </p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Mail className="h-3 w-3" />
                            <Badge variant={user.emailVerified ? 'success' : 'warning'} className="text-xs">
                              {user.emailVerified ? 'Vérifié' : 'Non vérifié'}
                            </Badge>
                          </div>
                          {user.phone && (
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Phone className="h-3 w-3" />
                              <Badge variant={user.phoneVerified ? 'success' : 'warning'} className="text-xs">
                                {user.phoneVerified ? 'Vérifié' : 'Non vérifié'}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar className="h-3 w-3" />
                          {user.lastLogin ? formatDateTime(user.lastLogin) : 'Jamais'}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">
                          {formatDate(user.createdAt)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteUser(user.uid)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {users.data.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Aucun utilisateur trouvé</h3>
                  <p className="text-gray-600">
                    {filters.search ? 'Aucun utilisateur ne correspond à votre recherche.' : 'Commencez par créer votre premier utilisateur.'}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {users.pagination.total > users.pagination.limit && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Affichage de {((users.pagination.page - 1) * users.pagination.limit) + 1} à{' '}
            {Math.min(users.pagination.page * users.pagination.limit, users.pagination.total)} sur{' '}
            {users.pagination.total} utilisateurs
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!users.pagination.hasPrev}
              onClick={() => loadUsers(users.pagination.page - 1)}
            >
              Précédent
            </Button>
            <span className="text-sm text-gray-600">
              Page {users.pagination.page}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={!users.pagination.hasNext}
              onClick={() => loadUsers(users.pagination.page + 1)}
            >
              Suivant
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement; 