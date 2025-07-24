import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Facebook } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
R            <div className="text-2xl font-bold text-blue-400">IRELANCE</div>
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
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/produits" className="text-gray-300 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="text-gray-300 hover:text-white transition-colors">
                  About
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

          {/* Business Hours & Logo */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Business Hours</h3>
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

            {/* IRELANCE Logo */}
            <div className="mt-6 pt-6 border-t border-gray-800">
              <div className="text-right">
                <div className="text-xl font-bold text-blue-400">IRELANCE</div>
                <div className="text-xs text-gray-400 mt-1">Professional Solutions</div>
              </div>
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
  )
}

export default Footer