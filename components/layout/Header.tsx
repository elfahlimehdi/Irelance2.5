import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingCart, User, Search, Phone } from 'lucide-react'
import { supabase, getCurrentUser } from '@/lib/supabase'
import { useCart } from '@/hooks/useCart'
import Button from '@/components/ui/Button'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const router = useRouter()
  const { cartItems } = useCart()

  useEffect(() => {
    getCurrentUser().then(setUser)

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ]

  const isActive = (path: string) => router.pathname === path

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const ContactModal = () => (
    <AnimatePresence>
      {isContactOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsContactOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact IRELANCE</h3>
            <div className="space-y-4">
              <a
                href="tel:0661162371"
                className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Phone className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <div className="font-semibold text-gray-900">06 61 16 23 71</div>
                  <div className="text-sm text-gray-600">Mobile Principal</div>
                </div>
              </a>
              <a
                href="tel:0522273539"
                className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Phone className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <div className="font-semibold text-gray-900">05 22 27 35 39</div>
                  <div className="text-sm text-gray-600">Ligne Fixe</div>
                </div>
              </a>
            </div>
            <button
              onClick={() => setIsContactOpen(false)}
              className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Fermer
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-40">
        {/* Top bar */}
        <div className="bg-blue-900 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  <span>06 61 16 23 71</span>
                </div>
                <div className="hidden md:block">
                  <span>h.mekouar@irelance.net</span>
                </div>
              </div>
              <div className="hidden md:block">
                <span>Lun-Ven 08:30-19:00 | Sam 09:00-15:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold text-blue-900">
                IRELANCE
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                      layoutId="activeTab"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Search className="w-5 h-5" />
              </button>

              {/* Cart */}
              <Link href="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {/* Contact Us Button */}
              <Button
                onClick={() => setIsContactOpen(true)}
                variant="secondary"
                size="sm"
                className="hidden md:inline-flex"
              >
                Contact Us
              </Button>

              {/* User menu */}
              {user ? (
                <div className="relative">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                    <User className="w-5 h-5" />
                    <span className="hidden md:block text-sm">{user.email}</span>
                  </button>
                  {/* Add dropdown menu here */}
                </div>
              ) : (
                <Link href="/auth">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="px-4 py-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 text-base font-medium rounded-md ${
                      isActive(item.href)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-2">
                  <Button
                    onClick={() => {
                      setIsContactOpen(true)
                      setIsMenuOpen(false)
                    }}
                    variant="secondary"
                    size="sm"
                    className="w-full"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <ContactModal />
    </>
  )
}

export default Header