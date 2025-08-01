import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './components/Auth/AuthProvider';
import Layout from './components/Layout/Layout';
import AdminLayout from './components/admin/AdminLayout';
import AdminRoute from './components/admin/AdminRoute';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductCategory from './pages/ProductCategory';
import About from './pages/About';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Dashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import Analytics from './pages/admin/Analytics';
import ActivityLogs from './pages/admin/ActivityLogs';
import FirebaseStatus from './components/common/FirebaseStatus';
import ProductImporter from './components/admin/ProductImporter';

/**
 * Main App component - application entry point
 * Sets up routing, authentication provider, and layout structure
 */
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Authentication route - outside of main layout */}
          <Route path="/auth" element={<Auth />} />
          
          {/* Admin routes - protected and with admin layout */}
          <Route path="/admin/*" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="content" element={<div>Content Management</div>} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="api" element={<div>API Management</div>} />
            <Route path="activity" element={<ActivityLogs />} />
            <Route path="settings" element={<div>Settings</div>} />
            <Route path="import" element={<ProductImporter />} />
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
      </Router>
    </AuthProvider>
  );
};

export default App;