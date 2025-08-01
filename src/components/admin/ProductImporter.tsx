import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Database, 
  Trash2, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Package,
  BarChart3,
  Star,
  Users,
  TrendingUp,
  ShoppingCart
} from 'lucide-react';
import importService from '../../services/importProducts';
import { CATEGORIES, IRELANCE_PRODUCTS } from '../../constants/products';
import { isFirebaseAvailable } from '../../lib/firebase';

/**
 * Composant d'administration pour l'import des produits irelance
 * Interface simple et sécurisée pour gérer la base de données
 */
const ProductImporter: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [firebaseConnected, setFirebaseConnected] = useState<boolean>(false);
  const [catalogueInfo, setCatalogueInfo] = useState<any>(null);

  /**
   * Vérifie l'état de Firebase et initialise les données du catalogue
   */
  useEffect(() => {
    // Vérifier Firebase
    setFirebaseConnected(isFirebaseAvailable());
    
    // Analyser le catalogue local
    const catalogueData = analyzeCatalogue();
    setCatalogueInfo(catalogueData);
    
    // Charger les stats Firebase si disponible
    if (isFirebaseAvailable()) {
      loadStats();
    }
  }, []);

  /**
   * Analyse le catalogue local irelance
   */
  const analyzeCatalogue = () => {
    const byCategory = IRELANCE_PRODUCTS.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byBrand = IRELANCE_PRODUCTS.reduce((acc, product) => {
      acc[product.brand] = (acc[product.brand] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const featured = IRELANCE_PRODUCTS.filter(p => p.isFeatured).length;
    const withPromo = IRELANCE_PRODUCTS.filter(p => p.promotionPercentage && p.promotionPercentage > 0).length;
    const avgRating = IRELANCE_PRODUCTS.reduce((sum, p) => sum + p.rating, 0) / IRELANCE_PRODUCTS.length;

    return {
      total: IRELANCE_PRODUCTS.length,
      byCategory,
      byBrand,
      featured,
      withPromo,
      avgRating: avgRating.toFixed(1),
      brands: Object.keys(byBrand).length,
      categories: Object.keys(byCategory).length
    };
  };

  /**
   * Affiche un message temporaire
   */
  const showMessage = (type: 'success' | 'error' | 'info', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  /**
   * Import complet des produits
   */
  const handleFullImport = async () => {
    if (!window.confirm('⚠️ Êtes-vous sûr de vouloir importer tous les produits irelance vers Firebase?')) {
      return;
    }

    setLoading(true);
    try {
      const result = await importService.performFullImport({
        clearExisting: true,
        onProgress: (msg) => {
          console.log(msg);
          setMessage({ type: 'info', text: msg });
        }
      });

      if (result.success) {
        showMessage('success', result.message);
        await loadStats();
      } else {
        showMessage('error', result.message);
      }
    } catch (error) {
      showMessage('error', `Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Import par catégorie
   */
  const handleCategoryImport = async () => {
    if (!selectedCategory) {
      showMessage('error', 'Veuillez sélectionner une catégorie');
      return;
    }

    if (!window.confirm(`Importer tous les produits de la catégorie "${selectedCategory}"?`)) {
      return;
    }

    setLoading(true);
    try {
      const result = await importService.importByCategory(selectedCategory);
      
      if (result.success) {
        showMessage('success', result.message);
        await loadStats();
      } else {
        showMessage('error', result.message);
      }
    } catch (error) {
      showMessage('error', `Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Mise à jour des produits modifiés
   */
  const handleUpdateProducts = async () => {
    if (!window.confirm('Mettre à jour les produits existants avec les dernières données?')) {
      return;
    }

    setLoading(true);
    try {
      const result = await importService.updateChanged();
      
      if (result.success) {
        showMessage('success', result.message);
        await loadStats();
      } else {
        showMessage('error', result.message);
      }
    } catch (error) {
      showMessage('error', `Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Suppression de tous les produits
   */
  const handleClearAll = async () => {
    if (!window.confirm('⚠️ ATTENTION: Cette action va supprimer TOUS les produits de Firebase! Continuer?')) {
      return;
    }

    const confirmation = window.prompt('Tapez "SUPPRIMER" pour confirmer:');
    if (confirmation !== 'SUPPRIMER') {
      showMessage('info', 'Suppression annulée');
      return;
    }

    setLoading(true);
    try {
      const result = await importService.clearAll();
      
      if (result.success) {
        showMessage('success', result.message);
        setStats(null);
      } else {
        showMessage('error', result.message);
      }
    } catch (error) {
      showMessage('error', `Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Charger les statistiques
   */
  const loadStats = async () => {
    try {
      const result = await importService.verify();
      if (result.success) {
        setStats(result.stats);
      }
    } catch (error) {
      console.error('Erreur chargement stats:', error);
    }
  };



  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Database className="w-8 h-8 mr-3 text-blue-600" />
          Gestionnaire des Produits irelance
        </h2>
        <p className="text-gray-600 mb-4">
          Interface d'administration pour importer et gérer les {catalogueInfo?.total || 0} produits du catalogue irelance
        </p>
        
        {/* Statut Firebase */}
        <div className={`flex items-center p-3 rounded-lg ${
          firebaseConnected ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {firebaseConnected ? (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              Firebase connecté et configuré
            </>
          ) : (
            <>
              <AlertCircle className="w-5 h-5 mr-2" />
              Firebase non configuré - Fonctionnement en mode fallback
            </>
          )}
        </div>
      </div>

      {/* Messages */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-lg flex items-center ${
            message.type === 'success' ? 'bg-green-100 text-green-800' :
            message.type === 'error' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          }`}
        >
          {message.type === 'success' ? <CheckCircle className="w-5 h-5 mr-2" /> :
           message.type === 'error' ? <AlertCircle className="w-5 h-5 mr-2" /> :
           <RefreshCw className="w-5 h-5 mr-2" />}
          {message.text}
        </motion.div>
      )}

      {/* Informations du Catalogue Local */}
      {catalogueInfo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 mb-8 border border-blue-200"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center text-blue-900">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Catalogue irelance Disponible
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center bg-white rounded-lg p-4">
              <div className="text-3xl font-bold text-blue-600">{catalogueInfo.total}</div>
              <div className="text-sm text-gray-600">Produits Total</div>
            </div>
            <div className="text-center bg-white rounded-lg p-4">
              <div className="text-3xl font-bold text-green-600">{catalogueInfo.categories}</div>
              <div className="text-sm text-gray-600">Catégories</div>
            </div>
            <div className="text-center bg-white rounded-lg p-4">
              <div className="text-3xl font-bold text-purple-600">{catalogueInfo.brands}</div>
              <div className="text-sm text-gray-600">Marques</div>
            </div>
            <div className="text-center bg-white rounded-lg p-4">
              <div className="text-3xl font-bold text-orange-600">{catalogueInfo.featured}</div>
              <div className="text-sm text-gray-600">En Vedette</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Répartition par catégorie */}
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold mb-3 flex items-center">
                <Package className="w-4 h-4 mr-2" />
                Par Catégorie
              </h4>
              <div className="space-y-2">
                {Object.entries(catalogueInfo.byCategory).map(([category, count]) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 capitalize">{category}</span>
                    <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {count as number}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Répartition par marque */}
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold mb-3 flex items-center">
                <Star className="w-4 h-4 mr-2" />
                Par Marque
              </h4>
              <div className="space-y-2">
                {Object.entries(catalogueInfo.byBrand).map(([brand, count]) => (
                  <div key={brand} className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">{brand}</span>
                    <span className="text-sm font-semibold bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      {count as number}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between bg-white rounded-lg p-4">
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              <span className="text-sm font-medium">Note moyenne: {catalogueInfo.avgRating}/5</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-orange-600" />
              <span className="text-sm font-medium">{catalogueInfo.withPromo} produits en promotion</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Statistiques Firebase */}
      {stats && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-50 rounded-lg p-6 mb-8"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Statistiques de la Base de Données
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Produits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              <div className="text-sm text-gray-600">Actifs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.featured}</div>
              <div className="text-sm text-gray-600">En Vedette</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.inStock}</div>
              <div className="text-sm text-gray-600">En Stock</div>
            </div>
          </div>
          
          {/* Répartition par catégorie */}
          {stats.byCategory && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Par Catégorie:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                {Object.entries(stats.byCategory).map(([category, count]) => (
                  <div key={category} className="flex justify-between">
                    <span className="capitalize">{category}:</span>
                    <span className="font-medium">{count as number}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Actions d'import */}
      <div className="grid gap-6">
        
        {/* Import complet */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Upload className="w-5 h-5 mr-2 text-blue-600" />
            Import Complet
          </h3>
          <p className="text-gray-600 mb-4">
            Importe tous les produits irelance vers Firebase (supprime l'existant et recommence)
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={handleFullImport}
              disabled={loading || !firebaseConnected}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              {loading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
              Import Complet ({catalogueInfo?.total || 0} produits)
            </button>
            {!firebaseConnected && (
              <span className="text-sm text-amber-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                Firebase requis
              </span>
            )}
          </div>
        </div>

        {/* Import par catégorie */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Package className="w-5 h-5 mr-2 text-green-600" />
            Import par Catégorie
          </h3>
          <p className="text-gray-600 mb-4">
            Importe uniquement les produits d'une catégorie spécifique
          </p>
          <div className="flex gap-3 mb-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Sélectionner une catégorie</option>
              {CATEGORIES.filter(cat => cat.id !== 'all').map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleCategoryImport}
              disabled={loading || !selectedCategory || !firebaseConnected}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Importer
            </button>
            {!firebaseConnected && (
              <span className="text-sm text-amber-600 mt-2 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                Firebase requis pour l'import
              </span>
            )}
          </div>
        </div>

        {/* Mise à jour */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <RefreshCw className="w-5 h-5 mr-2 text-purple-600" />
            Mise à Jour
          </h3>
          <p className="text-gray-600 mb-4">
            Met à jour les produits existants avec les dernières données
          </p>
          <button
            onClick={handleUpdateProducts}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
          >
            {loading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
            Mettre à Jour
          </button>
        </div>

        {/* Suppression (zone dangereuse) */}
        <div className="border border-red-200 bg-red-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center text-red-800">
            <Trash2 className="w-5 h-5 mr-2" />
            Zone Dangereuse
          </h3>
          <p className="text-red-700 mb-4">
            ⚠️ Action irréversible: Supprime TOUS les produits de Firebase
          </p>
          <button
            onClick={handleClearAll}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Supprimer Tout
          </button>
        </div>

        {/* Actualiser les statistiques */}
        <div className="text-center">
          <button
            onClick={loadStats}
            disabled={loading}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center mx-auto"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser les Statistiques
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-4 flex items-center">
          <Database className="w-5 h-5 mr-2" />
          Guide d'utilisation - Catalogue irelance
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-blue-800 mb-2">🚀 Actions d'Import</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• <strong>Import Complet</strong>: Import initial de tous les {catalogueInfo?.total || 0} produits</li>
              <li>• <strong>Import par Catégorie</strong>: Import sélectif par catégorie</li>
              <li>• <strong>Mise à Jour</strong>: Synchronisation des modifications</li>
              <li>• <strong>Suppression</strong>: Nettoyage complet (attention!)</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-blue-800 mb-2">📦 Catalogue Disponible</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• <strong>{catalogueInfo?.total || 0} produits</strong> des marques partenaires</li>
              <li>• <strong>{catalogueInfo?.categories || 0} catégories</strong> complètes</li>
              <li>• <strong>{catalogueInfo?.brands || 0} marques</strong> (Hikvision, LG, Samsung, Dell, etc.)</li>
              <li>• <strong>{catalogueInfo?.featured || 0} produits vedettes</strong> mis en avant</li>
              <li>• <strong>{catalogueInfo?.withPromo || 0} promotions</strong> actives</li>
            </ul>
          </div>
        </div>

        {!firebaseConnected && (
          <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
            <div className="flex items-center text-yellow-800">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span className="font-medium">Configuration Firebase requise</span>
            </div>
            <p className="text-yellow-700 text-sm mt-1">
              Pour utiliser les fonctions d'import, configurez Firebase dans le fichier .env.local. 
              Consultez FIREBASE_SETUP_QUICK.md pour les instructions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImporter; 