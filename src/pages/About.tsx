import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Award, 
  CheckCircle,
  Zap,
  Shield,
  Handshake
} from 'lucide-react';

/**
 * Company value interface
 */
interface CompanyValue {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

/**
 * Team member interface
 */
interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
}

/**
 * Achievement interface
 */
interface Achievement {
  number: string;
  label: string;
}

/**
 * About page component - displays company information, team, and achievements
 * Features: mission/vision/values, team showcase, achievements, why choose us section
 */
const About: React.FC = () => {
  /**
   * Company values data
   */
  const values: CompanyValue[] = useMemo(() => [
    {
      icon: Zap,
      title: 'Dynamisme',
      description: 'Une équipe énergique et proactive, toujours prête à relever de nouveaux défis technologiques.'
    },
    {
      icon: Shield,
      title: 'Rigueur',
      description: 'Nous appliquons les plus hauts standards de qualité dans tous nos projets et installations.'
    },
    {
      icon: Handshake,
      title: 'Honnêteté',
      description: 'Transparence totale avec nos clients, des conseils sincères et des prix justes.'
    }
  ], []);

  /**
   * Team members data
   */
  const team: TeamMember[] = useMemo(() => [
    {
      name: 'Hassan Mekouar',
      role: 'Directeur Général',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Expert en solutions technologiques avec plus de 15 ans d\'expérience'
    },
    {
      name: 'Amina Benali',
      role: 'Responsable Technique',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Spécialiste en systèmes de sécurité et surveillance'
    },
    {
      name: 'Omar Tazi',
      role: 'Chef de Projet',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Expert en climatisation et énergie renouvelable'
    },
    {
      name: 'Fatima Alaoui',
      role: 'Service Client',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Responsable de la satisfaction client et du support technique'
    }
  ], []);

  /**
   * Company achievements data
   */
  const achievements: Achievement[] = useMemo(() => [
    { number: '500+', label: 'Projets Réalisés' },
    { number: '15+', label: 'Années d\'Expérience' },
    { number: '98%', label: 'Satisfaction Client' },
    { number: '50+', label: 'Partenaires' }
  ], []);

  /**
   * Why choose us benefits list
   */
  const benefits = useMemo(() => [
    'Plus de 15 années d\'expérience dans le secteur',
    'Équipe certifiée et formée aux dernières technologies',
    'Service après-vente et support technique 24/7',
    'Garantie sur tous nos produits et installations',
    'Devis gratuit et conseils personnalisés',
    'Partenariats avec les meilleures marques mondiales'
  ], []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              À Propos d'IRELANCE
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Depuis 2006, nous sommes votre partenaire de confiance pour toutes vos solutions 
              technologiques au Maroc. Une SARL marocaine qui allie expertise technique et 
              service client d'excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Notre Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                Fournir des solutions technologiques innovantes et fiables qui répondent 
                aux besoins spécifiques de nos clients, en garantissant la qualité, 
                la sécurité et la performance.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Notre Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                Devenir le leader marocain des solutions technologiques intégrées, 
                en contribuant à la transformation digitale des entreprises et 
                à l'amélioration du quotidien des particuliers.
              </p>
            </motion.div>

            {/* Values Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nos Valeurs</h3>
              <p className="text-gray-600 leading-relaxed">
                L'excellence, l'intégrité et l'innovation guident chacune de nos actions. 
                Nous croyons en la construction de relations durables basées sur 
                la confiance mutuelle et la satisfaction client.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Company Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Valeurs Fondamentales
            </h2>
            <p className="text-xl text-gray-600">
              Les principes qui guident notre travail au quotidien
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Notre Équipe
            </h2>
            <p className="text-xl text-gray-600">
              Des professionnels passionnés et expérimentés à votre service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Nos Réalisations
            </h2>
            <p className="text-xl text-blue-100">
              Des chiffres qui témoignent de notre expertise et de votre confiance
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, type: 'spring' }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">
                  {achievement.number}
                </div>
                <div className="text-blue-100 font-medium">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Benefits List */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Pourquoi Choisir IRELANCE ?
              </h2>
              <div className="space-y-6">
                {benefits.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Company Image with Certification Badge */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Équipe IRELANCE au travail"
                className="rounded-2xl shadow-2xl"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Certifié ISO</div>
                    <div className="text-sm text-gray-600">Qualité garantie</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;