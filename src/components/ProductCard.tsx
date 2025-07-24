import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';

/**
 * ProductCard component props interface
 */
interface ProductCardProps {
  product: Product;
  index?: number;
}

/**
 * ProductCard component - displays a modern and accessible product card
 * Features: product image, category badge, stock status, features, price, actions
 */
const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  /**
   * Memoized price display with formatting
   */
  const formattedPrice = useMemo((): string => {
    return `${product.price.toLocaleString()} MAD`;
  }, [product.price]);

  /**
   * Memoized features display (limited to 3 with overflow indicator)
   */
  const displayFeatures = useMemo(() => {
    const visibleFeatures = product.features.slice(0, 3);
    const hasMoreFeatures = product.features.length > 3;
    const remainingCount = product.features.length - 3;

    return { visibleFeatures, hasMoreFeatures, remainingCount };
  }, [product.features]);

  /**
   * Handle view product action
   */
  const handleViewProduct = (): void => {
    // TODO: Implement product detail view navigation
    console.log('View product:', product.id);
  };

  /**
   * Handle add to cart action
   */
  const handleAddToCart = (): void => {
    if (!product.inStock) return;
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', product.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Product Image Section */}
      <div className="relative w-full h-72 bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-72"
          loading="lazy"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
            {product.category}
          </span>
        </div>

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Rupture de Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Information Section */}
      <div className="p-6">
        {/* Product Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>

        {/* Product Description */}
        <p className="text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Product Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {displayFeatures.visibleFeatures.map((feature, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
              >
                {feature}
              </span>
            ))}
            {displayFeatures.hasMoreFeatures && (
              <span className="text-gray-500 text-sm">
                +{displayFeatures.remainingCount} autres
              </span>
            )}
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          {/* Price Display */}
          <span className="text-2xl font-bold text-blue-600">
            {formattedPrice}
          </span>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            {/* View Product Button */}
            <button 
              onClick={handleViewProduct}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label={`Voir les détails de ${product.name}`}
            >
              <Eye className="w-5 h-5" />
            </button>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                product.inStock
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              aria-label={product.inStock ? `Ajouter ${product.name} au panier` : `${product.name} indisponible`}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {product.inStock ? 'Ajouter' : 'Indisponible'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard; 