import React from 'react';
import Header from './Header';
import Footer from './Footer';

/**
 * Layout component props interface
 */
interface LayoutProps {
  /** Child components to render within the layout */
  children: React.ReactNode;
}

/**
 * Layout component - provides consistent page structure
 * Wraps content with header and footer, ensures full height layout
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header navigation */}
      <Header />
      
      {/* Main content area */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;