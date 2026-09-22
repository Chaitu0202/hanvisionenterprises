/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider } from './context/AppContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { ToastContainer } from './components/common/ToastContainer';

// Public Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { ManufacturingPage } from './pages/ManufacturingPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { RequestQuotePage } from './pages/RequestQuotePage';
import { ContactPage } from './pages/ContactPage';

// Admin Pages
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

const AppContent: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  const renderRoute = () => {
    // Exact routes
    if (currentPath === '/') return <HomePage />;
    if (currentPath === '/products') return <ProductsPage />;
    if (currentPath === '/solutions') return <SolutionsPage />;
    if (currentPath === '/manufacturing') return <ManufacturingPage />;
    if (currentPath === '/about') return <AboutPage />;
    if (currentPath === '/gallery') return <GalleryPage />;
    if (currentPath === '/request-quote') return <RequestQuotePage />;
    if (currentPath === '/contact') return <ContactPage />;
    if (currentPath === '/admin/login') return <AdminLoginPage />;
    if (currentPath === '/admin/dashboard' || currentPath === '/admin') return <AdminDashboardPage />;

    // Dynamic Product Detail route: /products/:slug
    if (currentPath.startsWith('/products/')) {
      const slug = currentPath.replace('/products/', '').split('?')[0];
      if (slug) {
        return <ProductDetailPage slug={slug} />;
      }
    }

    // 404 Fallback
    return (
      <div className="max-w-xl mx-auto my-24 p-8 text-center bg-[#172228] border border-white/10 rounded-3xl space-y-4">
        <span className="text-4xl font-extrabold text-[#F28B35]">404</span>
        <h1 className="text-2xl font-bold text-[#F4F6F5]">Page Not Found</h1>
        <p className="text-xs text-[#A6B2B7]">
          The packaging resource or page you requested could not be located.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 rounded-xl bg-[#F28B35] text-[#0B1114] font-bold text-xs inline-flex items-center gap-2"
        >
          Return to Homepage
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1114] text-[#F4F6F5] selection:bg-[#F28B35] selection:text-[#0B1114]">
      <Navbar />
      <main className="flex-1 w-full">{renderRoute()}</main>
      <Footer />
      <WhatsAppButton />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </AppProvider>
  );
}

