import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Menu, 
  X, 
  Bell, 
  Search,
  User,
  LogOut,
  Shield,
  Database,
  Activity
} from 'lucide-react';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';
import { AdminDashboardTab } from '../../types/admin';

const adminTabs: AdminDashboardTab[] = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: LayoutDashboard, 
    path: '/admin' 
  },
  { 
    id: 'users', 
    label: 'Utilisateurs', 
    icon: Users, 
    path: '/admin/users', 
    permission: 'users.read',
    badge: 12 
  },
  { 
    id: 'content', 
    label: 'Contenu', 
    icon: FileText, 
    path: '/admin/content', 
    permission: 'content.read',
    badge: 5 
  },
  { 
    id: 'analytics', 
    label: 'Analytics', 
    icon: BarChart3, 
    path: '/admin/analytics', 
    permission: 'analytics.read' 
  },
  { 
    id: 'api', 
    label: 'API Management', 
    icon: Database, 
    path: '/admin/api', 
    permission: 'system.read' 
  },
  { 
    id: 'activity', 
    label: 'Logs d\'activité', 
    icon: Activity, 
    path: '/admin/activity', 
    permission: 'system.read' 
  },
  { 
    id: 'settings', 
    label: 'Paramètres', 
    icon: Settings, 
    path: '/admin/settings', 
    permission: 'settings.read' 
  }
];

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, signOut, hasPermission, getUserRole } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const filteredTabs = adminTabs.filter(tab => 
    !tab.permission || hasPermission(tab.permission)
  );

  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-lg transform transition-transform duration-200 ease-in-out",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Admin</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {filteredTabs.map((tab) => {
              const Icon = tab.icon as React.ComponentType<{ className?: string }>;
              const isActive = currentPath === tab.path || 
                (tab.path !== '/admin' && currentPath.startsWith(tab.path));
              
              return (
                <button
                  key={tab.id}
                  onClick={() => navigate(tab.path)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors",
                    isActive 
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {tab.badge}
                    </Badge>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || user?.email}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {getUserRole().replace('_', ' ')}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="w-full"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={cn(
        "transition-all duration-200 ease-in-out",
        sidebarOpen ? "lg:ml-72" : "ml-0"
      )}>
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16">
          <div className="flex items-center justify-between h-full px-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <div className="hidden md:flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  3
                </Badge>
              </Button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {user?.name || 'Admin'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout; 