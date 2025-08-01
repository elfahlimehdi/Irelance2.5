import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import UserTable from '../../components/users/UserTable';
import { User } from '../../types/admin';
import { generateMockUsers } from '../../lib/mockData';
import toast from 'react-hot-toast';

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(generateMockUsers(50));
      setLoading(false);
    };

    loadUsers();
  }, []);

  const handleEditUser = (user: User) => {
    toast.success(`Édition de ${user.name}`);
    // Implement edit user logic
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
      toast.success('Utilisateur supprimé avec succès');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Chargement des utilisateurs...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Utilisateurs</h1>
        <p className="text-gray-600 mt-1">
          Gérez les comptes utilisateurs de la plateforme
        </p>
      </div>

      <UserTable 
        users={users}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />
    </motion.div>
  );
};

export default AdminUsers;