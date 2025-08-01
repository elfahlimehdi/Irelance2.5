import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './components/Auth/AuthProvider';
import Layout from './components/Layout/Layout';
import AdminLayout from './components/layout/AdminLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductCategory from './pages/ProductCategory';
import About from './pages/About';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import FirebaseStatus from './components/common/FirebaseStatus';
import { PUBLISHABLE_KEY } from './lib/clerk';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

/**
 * Main App component - application entry point
 * Sets up Clerk authentication, React Query, routing, and layout structure
 */
const App: React.FC = () => {
  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Authentication route - outside of main layout */}
              <Route path="/auth" element={<Auth />} />
              
              {/* Admin routes - protected with Clerk authentication */}
              <Route path="/admin/*" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="analytics" element={<AdminAnalytics />} />
                <Route path="projects" element={<div>Projets - En développement</div>} />
                <Route path="content" element={<div>Contenu - En développement</div>} />
                <Route path="activity" element={<div>Activité - En développement</div>} />
                <Route path="settings" element={<div>Paramètres - En développement</div>} />
              </Route>
              
              {/* Main application routes - wrapped in layout */}
              <Route path="/*" element={
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/produits" element={<Products />} />
                    <Route path="/produits/:categoryId" element={<ProductCategory />} />
                    <Route path="/a-propos" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </Layout>
              } />
            </Routes>
            <FirebaseStatus />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#fff',
                  color: '#374151',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  border: '1px solid #e5e7eb'
                }
              }}
            />
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default App;