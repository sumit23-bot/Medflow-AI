import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * Public Marketing Layout (Step 48 & 58)
 * Inherits official-style header, main content wrapper, and structured footer
 */
export default function MarketingLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-ink-900 font-sans">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
