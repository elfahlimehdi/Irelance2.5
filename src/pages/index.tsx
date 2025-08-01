import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Shield, 
  Camera, 
  Snowflake, 
  Sun, 
  Phone, 
  CheckCircle, 
  Users, 
  Award,
  TrendingUp,
  ArrowRight,
  Laptop,
  Lock,
  Flame,
  Zap
} from 'lucide-react'
import Layout from '@/components/Layout/Layout'
import ProductCard from '../components/ProductCard'
import { Button } from '@/components/ui/button'
import { Product } from '../types'

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulation de données pour éviter les erreurs
    setFeaturedProducts([])
    setCategories([])
    setLoading(false)
  }, [])

  const services = [
    {
      icon: Camera,
      title: 'Surveillance Systems',
      description: 'Professional IP cameras, CCTV systems and video surveillance solutions'
    },
    {
      icon: Shield,
      title: 'Security Systems',
      description: 'Alarms, access control and integrated security systems'
    },
    {
      icon: Snowflake,
      title: 'Air Conditioning',
      description: 'Installation and maintenance of air conditioning and ventilation systems'
    },
    {
      icon: Sun,
      title: 'Solar Energy',
      description: 'Solar panels and renewable energy solutions'
    },
    {
      icon: Laptop,
      title: 'IT Equipment',
      description: 'Professional laptops, computers and IT infrastructure'
    },
    {
      icon: Lock,
      title: 'Access Control',
      description: 'Door access systems and security management'
    },
    {
      icon: Flame,
      title: 'Fire Systems',
      description: 'Fire detection and suppression systems'
    },
    {
      icon: Zap,
      title: 'Electronic Equipment',
      description: 'Various electronic devices and components'
    }
  ]

  const stats = [
    { number: '500+', label: 'Projects Completed', icon: CheckCircle },
    { number: '15+', label: 'Years Experience', icon: Award },
    { number: '98%', label: 'Client Satisfaction', icon: Users },
    { number: '24/7', label: 'Technical Support', icon: TrendingUp }
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block bg-blue-600 text-blue-100 px-4 py-2 rounded-full text-sm font-medium"
                >
                  Since 2006 • Moroccan SARL
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  IRELANCE
                  <span className="block text-2xl md:text-3xl font-normal text-blue-200 mt-2">
                    Professional Technology Solutions
                  </span>
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed">
                  Specialist in IT equipment, security systems, air conditioning 
                  and renewable energy solutions in Morocco.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/contact">
                    <Button variant="secondary" size="lg">
                      <Phone className="w-5 h-5 mr-2" />
                      Free Consultation
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/products">
                    <Button variant="outline" size="lg">
                      View Products
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/5474028/pexels-photo-5474028.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="IRELANCE technology solutions"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-orange-400 rounded-full opacity-20 blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold text-gray-900 mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete and professional solutions for all your technology needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Discover our selection of most popular products
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/products">
              <Button size="lg">
                View All Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Contact us today for a free consultation and discover how we can help you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/contact">
                  <Button variant="secondary" size="lg">
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Us
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="tel:0661162371">
                  <Button variant="outline" size="lg">
                    06 61 16 23 71
                  </Button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}

export default Home