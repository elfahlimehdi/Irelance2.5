import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
  Star,
  Box,
  Rocket,
  Sparkles
} from 'lucide-react';
import ImageSlider from '../components/ImageSlider';

const Home: React.FC = () => {
  const services = [
    {
      icon: Camera,
      title: 'Systèmes de Surveillance',
      description: 'Caméras IP, systèmes CCTV et solutions de vidéosurveillance professionnelles'
    },
    {
      icon: Shield,
      title: 'Sécurité Électronique',
      description: 'Alarmes, contrôle d\'accès et systèmes de sécurité intégrés'
    },
    {
      icon: Snowflake,
      title: 'Climatisation',
      description: 'Installation et maintenance de systèmes de climatisation et ventilation'
    },
    {
      icon: Sun,
      title: 'Énergie Solaire',
      description: 'Panneaux solaires et solutions d\'énergie renouvelable'
    }
  ];

  const stats = [
    { number: '500+', label: 'Projets Réalisés', icon: CheckCircle },
    { number: '15+', label: 'Années d\'Expérience', icon: Award },
    { number: '98%', label: 'Satisfaction Client', icon: Users },
    { number: '24/7', label: 'Support Technique', icon: TrendingUp }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Caméra IP 4K',
      price: '2,500',
      image: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Surveillance'
    },
    {
      id: 2,
      name: 'Climatiseur Inverter',
      price: '8,500',
      image: 'https://images.pexels.com/photos/8005394/pexels-photo-8005394.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Climatisation'
    },
    {
      id: 3,
      name: 'Panneau Solaire 300W',
      price: '1,200',
      image: 'https://images.pexels.com/photos/9875409/pexels-photo-9875409.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Solaire'
    }
  ];

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        {/* Overlay flou et atténué */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            background: "rgba(0,0,0,0.25)"
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-lg md:text-xl font-bold text-white mb-1 text-left">
                  IRELANCE
                </h1>
                <span className="block text-2xl md:text-4xl font-bold text-blue-100 mb-4 text-left">
                  Solutions Technologiques Professionnelles
                </span>
                <motion.p
                  className="text-xl text-blue-100 leading-relaxed font-semibold"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                >
                  Spécialiste en équipements informatiques, systèmes de sécurité, 
                  climatisation et solutions d'énergie renouvelable au Maroc.
                </motion.p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors group"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Consultation Gratuite
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/produits"
                    className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-semibold transition-colors"
                  >
                    Voir nos Produits
                  </Link>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center items-center"
            >
              <div className="relative z-10 w-full">
                <ImageSlider />
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
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-8 h-8 text-blue-400" />
              <span className="sr-only">Notre Expertise</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Notre Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions complètes et professionnelles pour tous vos besoins technologiques
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
            <div className="flex items-center justify-center gap-2 mb-2">
              <Box className="w-8 h-8 text-blue-400" />
              <span className="sr-only">Produits Vedettes</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Produits Vedettes
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez notre sélection de produits les plus populaires
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
                      {product.price} MAD
                    </span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Voir Détails
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/produits"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors group"
            >
              Voir Tous les Produits
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
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
            <div className="flex items-center justify-center gap-2 mb-2">
              <Rocket className="w-8 h-8 text-orange-400" />
              <span className="sr-only">Contact</span>
            </div>
            <h2 className="text-4xl font-bold">
              Prêt à Démarrer Votre Projet ?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui pour une consultation gratuite et 
              découvrez comment nous pouvons vous aider.
            </p>
            <div className="flex flex-col gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Nous Contacter
                </button>
              </motion.div>
            </div>
            {/* Modal for phone number selection */}
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-8 max-w-xs w-full text-gray-900 text-center">
                  <h3 className="text-xl font-bold mb-4">Choisissez un numéro à appeler</h3>
                  <div className="flex flex-col gap-4">
                    <a href="tel:0661162371" className="block bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-blue-700 transition-colors">06 61 16 23 71</a>
                    <a href="tel:0522273539" className="block bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-blue-700 transition-colors">05 22 27 35 39</a>
                  </div>
                  <button onClick={() => setShowModal(false)} className="mt-6 text-blue-600 hover:underline">Annuler</button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;