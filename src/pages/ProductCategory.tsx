import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Star, ShoppingCart, Loader2 } from 'lucide-react';
import { CATEGORIES } from '../constants/products';
import { Product, ProductCategory as ProductCategoryType } from '../types';
import { useProducts } from '../hooks/useProducts';

/**
 * ProductCategory page component
 * Displays products filtered by category with enhanced UI - Version Firebase
 */
const ProductCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  // Utiliser le hook Firebase pour récupérer les produits
  const { products, loading, error } = useProducts(categoryId as ProductCategoryType);
  
  // Trouver la catégorie correspondante
  const category = categoryId ? CATEGORIES.find(cat => cat.id === categoryId) : null;

  // Gestion des états d'erreur et de catégorie introuvable
  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Catégorie non trouvée</h2>
          <p className="text-gray-600 mb-6">La catégorie demandée n'existe pas.</p>
          <button
            onClick={() => navigate('/produits')}
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour aux produits
          </button>
        </div>
      </div>
    );
  }

  // Gestion des erreurs Firebase
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Erreur de chargement</h2>
          <p className="text-gray-600 mb-6">Impossible de charger les produits: {error}</p>
          <div className="space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Réessayer
            </button>
            <button
              onClick={() => navigate('/produits')}
              className="inline-flex items-center bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour aux produits
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Page Header */}
      <div className="backdrop-blur bg-white/70 shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-blue-600 mb-4">
            <button
              onClick={() => navigate('/')}
              className="hover:text-blue-800 transition-colors"
            >
              Accueil
            </button>
            <span className="text-blue-400">/</span>
            <button
              onClick={() => navigate('/produits')}
              className="hover:text-blue-800 transition-colors"
            >
              Produits
            </button>
            <span className="text-blue-400">/</span>
            <span className="text-blue-900 font-medium">{category.name}</span>
          </nav>

          {/* Header Content */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-blue-900 mb-2 tracking-tight drop-shadow-sm">
                {category.name}
              </h1>
              <p className="text-lg text-blue-700/80">
                {products.length} produit{products.length !== 1 ? 's' : ''} disponible{products.length !== 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={() => navigate('/produits')}
              className="inline-flex items-center bg-white/80 hover:bg-white border border-blue-200 text-blue-700 px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-md"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Toutes les catégories
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600">Chargement des produits...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun produit disponible</h3>
            <p className="text-gray-600 mb-6">
              Il n'y a actuellement aucun produit dans cette catégorie. Les produits peuvent être en cours d'ajout via Firebase.
            </p>
            <button
              onClick={() => navigate('/produits')}
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Voir toutes les catégories
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/90 rounded-2xl shadow-xl border border-blue-100 hover:shadow-blue-200 hover:scale-105 transition-all overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                  <img
                    src={product.mainImage || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600';
                    }}
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Rupture de stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      {product.brand}
                    </span>
                    {product.promotionPercentage && (
                      <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">
                        -{product.promotionPercentage}%
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.shortDescription || product.description}
                  </p>

                  {/* Features */}
                  {product.features && product.features.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {product.features.slice(0, 3).map((feature, featureIndex) => (
                          <span
                            key={featureIndex}
                            className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                        {product.features.length > 3 && (
                          <span className="text-blue-600 text-xs font-medium">
                            +{product.features.length - 3} autres
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through mr-2">
                          {product.originalPrice.toLocaleString()} DH
                        </span>
                      )}
                      <span className="text-2xl font-bold text-blue-600">
                        {product.price.toLocaleString()} DH
                      </span>
                      {product.rating && (
                        <div className="flex items-center mt-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">
                            {product.rating} ({product.reviewCount || 0})
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                        <Star className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        disabled={!product.inStock}
                        className={`p-2 rounded-lg transition-colors ${
                          product.inStock
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategory; 