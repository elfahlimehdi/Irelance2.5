import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Phone
} from 'lucide-react'
import Layout from '@/components/Layout/Layout'
import { Button } from '@/components/ui/button'
import Card from '@/components/ui/Card'
// import { getProduct, addToCart, logUserAction } from '@/lib/supabase' - Temporairement désactivé
// import { Database } from '@/types/database' - Temporairement désactivé
import toast from 'react-hot-toast'
import { Product } from '../../types'

const ProductDetail: React.FC = () => {
  const router = useRouter()
  const { slug } = router.query
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    if (slug && typeof slug === 'string') {
      fetchProduct(slug)
    }
  }, [slug])

  const fetchProduct = async (productSlug: string) => {
    try {
      const { data, error } = await getProduct(productSlug)
      if (error) throw error
      if (data) {
        setProduct(data)
        await logUserAction('view_product', data.id)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      toast.error('Product not found')
      router.push('/products')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (!product) return
    
    try {
      await addToCart(product.id, quantity)
      await logUserAction('add_to_cart', product.id, undefined, { quantity })
      toast.success(`${product.name} added to cart!`)
    } catch (error) {
      toast.error('Please sign in to add items to cart')
    }
  }

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (!product?.images.length) return
    
    if (direction === 'prev') {
      setCurrentImageIndex(prev => 
        prev === 0 ? product.images.length - 1 : prev - 1
      )
    } else {
      setCurrentImageIndex(prev => 
        prev === product.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
            <Button onClick={() => router.push('/products')}>
              Back to Products
            </Button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <button onClick={() => router.push('/')} className="hover:text-blue-600">
              Home
            </button>
            <span>/</span>
            <button onClick={() => router.push('/products')} className="hover:text-blue-600">
              Products
            </button>
            <span>/</span>
            <button onClick={() => router.push(`/categories/${product.category?.slug}`)} className="hover:text-blue-600">
              {product.category?.name}
            </button>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <Card className="relative overflow-hidden">
                <div className="aspect-w-1 aspect-h-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={product.images[currentImageIndex] || '/placeholder-product.jpg'}
                        alt={product.name}
                        width={600}
                        height={600}
                        className="w-full h-96 object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Image Navigation */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => handleImageNavigation('prev')}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={() => handleImageNavigation('next')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                  </>
                )}

                {/* Stock Status */}
                <div className="absolute top-4 left-4">
                  {product.stock_quantity > 0 ? (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      In Stock
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>
              </Card>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Brand & Category */}
              <div className="flex items-center space-x-4">
                {product.brand && (
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {product.brand.name}
                  </span>
                )}
                {product.category && (
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {product.category.name}
                  </span>
                )}
              </div>

              {/* Product Name */}
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600">(4.8) • 24 reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-blue-600">
                  {product.price.toLocaleString()} MAD
                </span>
                {product.compare_price && product.compare_price > product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    {product.compare_price.toLocaleString()} MAD
                  </span>
                )}
              </div>

              {/* Short Description */}
              {product.short_description && (
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.short_description}
                </p>
              )}

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">Quantity:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:text-gray-900"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:text-gray-900"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                    <Button
                      onClick={handleAddToCart}
                      disabled={product.stock_quantity === 0}
                      size="lg"
                      className="w-full"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                  </motion.div>
                  <Button variant="outline" size="lg">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Contact for Quote */}
              <Card className="p-4 bg-blue-50 border border-blue-200">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Need a custom quote?</p>
                    <p className="text-sm text-blue-700">Call us at 06 61 16 23 71 for bulk orders</p>
                  </div>
                </div>
              </Card>

              {/* Service Features */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Free Delivery</p>
                  <p className="text-xs text-gray-600">Orders over 1000 MAD</p>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Warranty</p>
                  <p className="text-xs text-gray-600">{product.warranty_period || '1 year'}</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                  <p className="text-xs text-gray-600">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <Card>
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {['description', 'specifications', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                        activeTab === tab
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'description' && (
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {product.description || 'No description available.'}
                    </p>
                  </div>
                )}

                {activeTab === 'specifications' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-900 capitalize">
                          {key.replace(/_/g, ' ')}:
                        </span>
                        <span className="text-gray-700">{value as string}</span>
                      </div>
                    ))}
                    {product.sku && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-900">SKU:</span>
                        <span className="text-gray-700">{product.sku}</span>
                      </div>
                    )}
                    {product.weight && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-900">Weight:</span>
                        <span className="text-gray-700">{product.weight} kg</span>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Reviews feature coming soon!</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetail