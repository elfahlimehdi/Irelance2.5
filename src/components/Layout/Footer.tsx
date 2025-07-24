import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [showNewsletterToast, setShowNewsletterToast] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation simple d'email
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setShowNewsletterToast(true);
      setNewsletterEmail('');
      setTimeout(() => setShowNewsletterToast(false), 2000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-blue-400">IRELANCE</div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Votre partenaire de confiance au Maroc pour tous vos besoins en équipements IT, 
              systèmes de sécurité et solutions technologiques professionnelles.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/irelance"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/produits" className="text-gray-300 hover:text-white transition-colors">
                  Produits
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="text-gray-300 hover:text-white transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Rue 4, No 23, Bd Moulay Youssef<br />
                  Casablanca, Maroc
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <div className="text-gray-300 text-sm">
                  <div>06 61 16 23 71</div>
                  <div>05 22 27 35 39</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300 text-sm">h.mekouar@irelance.net</span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Horaires</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <div className="text-gray-300 text-sm">
                  <div>Lun-Ven: 08:30-19:00</div>
                  <div>Samedi: 09:00-15:00</div>
                  <div>Dimanche: Fermé</div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Newsletter</h4>
              <form className="flex" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="Votre email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-800 text-white text-sm rounded-l-md border border-gray-700 focus:outline-none focus:border-blue-400"
                  required
                />
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-sm rounded-r-md hover:bg-blue-700 transition-colors">
                  OK
                </button>
              </form>
              <AnimatePresence>
                {showNewsletterToast && (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.3 }}
                    className="fixed right-8 bottom-8 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    Adresse enregistrée avec succès !
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2024 IRELANCE SARL. Tous droits réservés.
            </div>
            <div className="text-gray-400 text-sm mt-2 md:mt-0">
              RC: 123456 - IF: 7891011
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;