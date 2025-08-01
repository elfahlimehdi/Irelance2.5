import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Box, Info, Mail } from 'lucide-react';

/**
 * Composant Navigation - Menu flottant accessible
 */
const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Produits', href: '/produits', icon: Box },
    { name: 'À Propos', href: '/a-propos', icon: Info },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  return (
    <>
      {/* Bouton Menu Flottant */}
      <motion.button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-6 right-6 z-[1001] p-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </motion.button>

      {/* Menu Flottant */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 right-6 z-[1000] bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-4 min-w-[200px]"
          >
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      location.pathname === item.href
                        ? 'text-white bg-white/20'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation; 