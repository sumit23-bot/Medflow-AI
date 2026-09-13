import React from 'react';
import { Link } from 'react-router-dom';
import EmblemLogo from './EmblemLogo';

/**
 * Reusable Footer Component (Step 55)
 * Structured columns (About, Resources, Legal, Contact) in formal government style
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-300 font-sans text-xs text-gray-700 mt-auto">
      {/* Top Border Accent */}
      <div className="h-1 bg-ink-900 w-full" />

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Column 1: Organization & Emblem */}
        <div className="md:col-span-2 space-y-4">
          <EmblemLogo size={46} />
          <p className="text-gray-600 leading-relaxed pr-6 text-xs">
            MedFlow AI is an AI-powered triage, token synchronization, and paperless prescription infrastructure platform designed for free, charitable, and rural health clinics across India.
          </p>
          <div className="p-3 bg-gray-50 border border-gray-200 rounded text-[11px] text-gray-600">
            <strong>Accessibility Notice:</strong> Compatible with low-bandwidth clinic connections and regional voice inputs (Hindi + English).
          </div>
        </div>

        {/* Column 2: Architecture & Solution */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold uppercase tracking-wider text-ink-950 text-xs border-b border-gray-200 pb-1">
            Platform
          </h4>
          <ul className="space-y-2">
            <li><Link to="/problem" className="hover:text-black hover:underline">The Rural Clinic Challenge</Link></li>
            <li><Link to="/solution" className="hover:text-black hover:underline">The 4-Step Flow</Link></li>
            <li><Link to="/features/kiosk" className="hover:text-black hover:underline">Voice Symptom Kiosk</Link></li>
            <li><Link to="/features/doctor-dashboard" className="hover:text-black hover:underline">Doctor Triage Queue</Link></li>
            <li><Link to="/features/records" className="hover:text-black hover:underline">Digital Records</Link></li>
            <li><Link to="/pricing" className="hover:text-black hover:underline">Tiered Pricing (₹0 Community)</Link></li>
          </ul>
        </div>

        {/* Column 3: Resources & Tools */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold uppercase tracking-wider text-ink-950 text-xs border-b border-gray-200 pb-1">
            Resources
          </h4>
          <ul className="space-y-2">
            <li><Link to="/resources/free-guide" className="hover:text-black hover:underline">Free Digitization Guide</Link></li>
            <li><Link to="/resources/roi-calculator" className="hover:text-black hover:underline">Clinic Time-Saved Calculator</Link></li>
            <li><Link to="/resources/blog" className="hover:text-black hover:underline">Healthcare Field Notes</Link></li>
            <li><Link to="/case-studies" className="hover:text-black hover:underline">Field Impact Studies</Link></li>
            <li><Link to="/faq" className="hover:text-black hover:underline">Frequently Asked Questions</Link></li>
            <li><Link to="/demo-request" className="hover:text-black hover:underline">Schedule Live Clinic Demo</Link></li>
          </ul>
        </div>

        {/* Column 4: Institutional & Legal */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold uppercase tracking-wider text-ink-950 text-xs border-b border-gray-200 pb-1">
            Compliance & Legal
          </h4>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-black hover:underline">About Project & Origin</Link></li>
            <li><Link to="/contact" className="hover:text-black hover:underline">Clinic Partnership Inquiry</Link></li>
            <li><Link to="/waitlist" className="hover:text-black hover:underline">Early Access Waitlist</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-black hover:underline">Privacy & Data Governance</Link></li>
            <li><Link to="/terms-of-service" className="hover:text-black hover:underline">Terms of Service</Link></li>
            <li><Link to="/login" className="hover:text-black hover:underline">Staff Secure Portal</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Disclaimer Strip */}
      <div className="border-t border-gray-200 bg-gray-50/80 px-4 py-4 text-center text-[11px] text-gray-500 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <span>© {currentYear} MedFlow AI Platform. Developed for Public Healthcare Digitization.</span>
          <span>Designed with Government-Grade Restrained Aesthetic • Multi-Tenant Isolated Architecture</span>
        </div>
      </div>
    </footer>
  );
}
