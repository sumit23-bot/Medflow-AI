import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import EmblemLogo from './EmblemLogo';
import Button from './ui/Button';

/**
 * Reusable Header Component (Step 54)
 * Official-style header with top flag/utility strip and formal navigation
 */
export default function Header() {
  const navLinkClass = ({ isActive }) =>
    `text-xs uppercase tracking-wider font-semibold font-sans px-2.5 py-1.5 transition-colors ${
      isActive
        ? 'text-black border-b-2 border-black font-bold'
        : 'text-gray-700 hover:text-black hover:bg-gray-100/60 rounded-sm'
    }`;

  return (
    <header className="border-b border-gray-300 bg-white sticky top-0 z-50">
      {/* Top micro-strip resembling an official portal banner */}
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-1 text-[11px] text-gray-700 flex justify-between items-center font-sans tracking-wide">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-black">🇮🇳 COMMUNITY HEALTHCARE MISSION</span>
          <span className="text-gray-400">|</span>
          <span>Standardized Clinical Triage & Paperless Digitization</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Language: <strong>Hindi / English</strong></span>
          <Link to="/contact" className="hover:underline font-medium text-black">Support Desk</Link>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-decoration-none">
          <EmblemLogo size={44} />
        </Link>

        {/* Primary Formal Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/problem" className={navLinkClass}>Problem</NavLink>
          <NavLink to="/solution" className={navLinkClass}>Solution</NavLink>
          <NavLink to="/features" className={navLinkClass}>Features</NavLink>
          <NavLink to="/pricing" className={navLinkClass}>Pricing</NavLink>
          <NavLink to="/resources" className={navLinkClass}>Resources</NavLink>
          <NavLink to="/case-studies" className={navLinkClass}>Case Studies</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-2">
          <Link to="/app/kiosk">
            <Button variant="outline" size="sm">
              Launch Kiosk
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="primary" size="sm">
              Staff Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
