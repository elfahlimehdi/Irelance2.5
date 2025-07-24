import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, Eye, Heart } from 'lucide-react'
import { Database } from '@/types/database'
import { addToCart, logUserAction } from '@/lib/supabase'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import toast from 'react-hot-toast'

type Product = Database['public']['Tables']['products']['Row'] & {
  category: Database['public']['Tables']['categories']['Row']
  brand: Database['public']['Tables']['brands']['Row']
}

interface ProductCardProps {
  product: Product
  index?: number
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    try {
      await addToCart(product.id, 1)
      await logUserAction('add_to_cart', product.id)
      toast.success('Product added to cart!')
    } catch (error) {
      toast.error('Please sign in to add items to cart')
    }
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Implement quick view modal
    toast.info('Quick view coming soon!')
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Implement wishlist functionality
    toast.info('Wishlist coming soon!')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card hover className="group">
        <Link href={`/products/${product.slug}`}>
          <div className="relative overflow-hidden">
            {/* Product Image */}
            <div className="aspect-w-1 aspect-h-1 w-full">
              <Image
                src={product.images[0] || '/placeholder-product.jpg'}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleQuickView}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <Eye className="w-4 h-4 text-gray-700" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleWishlist}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <Heart className="w-4 h-4 text-gray-700" />
                </motion.button>
              </div>
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col space-y-2">
              {product.compare_price && product.compare_price > product.price && (
                <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                  -{Math.round(((product.compare_price - product.price) / product.compare_price) * 100)}%
                </span>
              )}
              {product.stock_quantity < 5 && product.stock_quantity > 0 && (
                <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                  Low Stock
                </span>
              )}
              {product.stock_quantity === 0 && (
                <span className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-medium">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Brand Logo */}
            {product.brand && (
              <div className="absolute top-4 right-4">
                <div className="bg-white rounded-full p-2 shadow-lg">
                  <span className="text-xs font-medium text-gray-700">{product.brand.name}</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-6">
            {/* Category */}
            {product.category && (
              <span className="text-sm text-blue-600 font-medium">
                {product.category.name}
              </span>
            )}

            {/* Product Name */}
            <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>

            {/* Short Description */}
            {product.short_description && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.short_description}
              </p>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {product.features.slice(0, 3).map((feature, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                  {product.features.length > 3 && (
                    <span className="text-gray-500 text-xs">
                      +{product.features.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-blue-600">
                  {product.price.toLocaleString()} MAD
                </span>
                {product.compare_price && product.compare_price > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    {product.compare_price.toLocaleString()} MAD
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0}
                className="w-full"
                variant={product.stock_quantity === 0 ? 'ghost' : 'primary'}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </motion.div>
          </div>
        </Link>
      </Card>
    </motion.div>
  )
}

export default ProductCard