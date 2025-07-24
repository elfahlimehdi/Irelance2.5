import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { ContactForm } from '../types';

/**
 * Form submission status type
 */
type SubmitStatus = 'idle' | 'success' | 'error';

/**
 * Contact information item interface
 */
interface ContactInfoItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  details: string[];
  color: string;
}

/**
 * Contact page component - displays contact information and contact form
 * Features: contact form with validation, contact information display, map placeholder
 */
const Contact: React.FC = () => {
  // State management
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  // Form hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactForm>();

  /**
   * Handle form submission
   */
  const onSubmit = useCallback(async (data: ContactForm): Promise<void> => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, send to Supabase or email service
      console.log('Contact form data:', data);
      
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [reset]);

  /**
   * Contact information data
   */
  const contactInfo: ContactInfoItem[] = [
    {
      icon: MapPin,
      title: 'Adresse',
      details: ['Rue 4, No 23, Bd Moulay Youssef', 'Casablanca, Maroc'],
      color: 'text-blue-600'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      details: ['06 61 16 23 71', '05 22 27 35 39'],
      color: 'text-green-600'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['h.mekouar@irelance.net'],
      color: 'text-orange-600'
    },
    {
      icon: Clock,
      title: 'Horaires',
      details: ['Lun-Ven: 08:30-19:00', 'Sam: 09:00-15:00', 'Dim: Fermé'],
      color: 'text-purple-600'
    }
  ];

  /**
   * Render contact information item
   */
  const renderContactInfoItem = useCallback((info: ContactInfoItem, index: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex items-start space-x-4"
    >
      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
        <info.icon className={`w-6 h-6 ${info.color}`} />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">
          {info.title}
        </h3>
        {info.details.map((detail, idx) => (
          <p key={idx} className="text-gray-600 text-sm">
            {detail}
          </p>
        ))}
      </div>
    </motion.div>
  ), []);

  /**
   * Render form input field with validation
   */
  const renderFormField = useCallback((
    name: keyof ContactForm,
    label: string,
    type: string,
    placeholder: string,
    validation: any,
    isRequired: boolean = false
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {isRequired && '*'}
      </label>
      {type === 'select' ? (
        <select
          {...register(name, validation)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            errors[name] ? 'border-red-300' : 'border-gray-300'
          }`}
        >
          <option value="">Sélectionnez un sujet</option>
          <option value="devis">Demande de devis</option>
          <option value="info">Demande d'information</option>
          <option value="support">Support technique</option>
          <option value="partenariat">Partenariat</option>
          <option value="autre">Autre</option>
        </select>
      ) : type === 'textarea' ? (
        <textarea
          rows={6}
          {...register(name, validation)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
            errors[name] ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          {...register(name, validation)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            errors[name] ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder={placeholder}
        />
      )}
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name]?.message}</p>
      )}
    </div>
  ), [register, errors]);

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
              Contactez-Nous
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions 
              et vous accompagner dans vos projets technologiques.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Informations de Contact
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => renderContactInfoItem(info, index))}
              </div>
            </motion.div>

            {/* Quick Contact Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-blue-50 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Rapide
              </h3>
              <div className="space-y-3">
                <a
                  href="tel:0661162371"
                  className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 transition-colors"
                  aria-label="Appeler le numéro de téléphone"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">Appelez maintenant</span>
                </a>
                <a
                  href="mailto:h.mekouar@irelance.net"
                  className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 transition-colors"
                  aria-label="Envoyer un email"
                >
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">Envoyez un email</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Envoyez-nous un Message
              </h2>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-700">
                    Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                  </span>
                </motion.div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-red-700">
                    Une erreur s'est produite. Veuillez réessayer ou nous contacter directement.
                  </span>
                </motion.div>
              )}

              {/* Contact Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderFormField(
                    'name',
                    'Nom complet',
                    'text',
                    'Votre nom complet',
                    { required: 'Le nom est requis' },
                    true
                  )}

                  {renderFormField(
                    'email',
                    'Email',
                    'email',
                    'votre@email.com',
                    {
                      required: 'L\'email est requis',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email invalide'
                      }
                    },
                    true
                  )}
                </div>

                {/* Phone and Subject Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderFormField(
                    'phone',
                    'Téléphone',
                    'tel',
                    '06 XX XX XX XX',
                    {}
                  )}

                  {renderFormField(
                    'subject',
                    'Sujet',
                    'select',
                    '',
                    { required: 'Le sujet est requis' },
                    true
                  )}
                </div>

                {/* Message Field */}
                {renderFormField(
                  'message',
                  'Message',
                  'textarea',
                  'Décrivez votre projet ou votre demande en détail...',
                  { required: 'Le message est requis' },
                  true
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center justify-center px-8 py-4 rounded-lg font-semibold transition-colors ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer le Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Notre Localisation
              </h3>
              <p className="text-gray-600 mt-1">
                Rue 4, No 23, Bd Moulay Youssef, Casablanca
              </p>
            </div>
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              {/* Carte supprimée : ici, il n'y a plus de carte, seulement un espace vide ou un message */}
              <div className="text-gray-400 text-center w-full">
                <p>Aucune carte intégrée pour le moment.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;

