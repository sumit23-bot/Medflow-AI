import React, { useState } from 'react';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import EmblemLogo from '../components/EmblemLogo';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

/**
 * Product App Layout (Step 48 & 58)
 * Sidebar + Topbar for the logged-in clinic product
 */
export default function AppLayout() {
  const navigate = useNavigate();
  // Read simulated or real user from localStorage
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('medflow_user')) || {
        name: 'Dr. Rajesh Sharma',
        role: 'doctor',
        clinic_name: 'Aarogya Seva Kendra (Ward 4)'
      };
    } catch {
      return {
        name: 'Dr. Rajesh Sharma',
        role: 'doctor',
        clinic_name: 'Aarogya Seva Kendra (Ward 4)'
      };
    }
  })();

  const [currentUser, setCurrentUser] = useState(storedUser);

  const handleLogout = () => {
    localStorage.removeItem('medflow_user');
    localStorage.removeItem('medflow_token');
    navigate('/login');
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider font-sans font-semibold rounded transition-colors ${
      isActive
        ? 'bg-ink-900 text-white font-bold'
        : 'text-gray-700 hover:bg-gray-100 hover:text-black'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-ink-900 font-sans">
      {/* Top Application Bar */}
      <header className="bg-white border-b border-gray-300 px-4 py-2.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <EmblemLogo size={36} />
          </Link>
          <div className="hidden sm:block border-l border-gray-300 pl-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Clinic</span>
            <p className="text-sm font-bold text-ink-950 font-serif leading-none mt-0.5">
              {currentUser.clinic_name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-ink-950 leading-tight">{currentUser.name}</p>
            <div className="flex items-center justify-end gap-1.5 mt-0.5">
              <Badge variant="active" size="sm">{currentUser.role}</Badge>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Exit / Logout
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Left Sidebar Navigation */}
        <aside className="w-64 bg-white border-r border-gray-200 p-4 space-y-6 flex-shrink-0 hidden md:block">
          {/* Patient Flow Section */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2 font-serif">
              Clinical Workflow
            </span>
            <nav className="space-y-1">
              <NavLink to="/app/kiosk" className={navClass}>
                <span>🎫</span> Walk-in Kiosk
              </NavLink>
              <NavLink to="/app/queue" className={navClass}>
                <span>🩺</span> Live Doctor Queue
              </NavLink>
              <NavLink to="/app/doctor/history" className={navClass}>
                <span>🔍</span> Doctor Patient Search
              </NavLink>
              <NavLink to="/app/pharmacy/queue" className={navClass}>
                <span>💊</span> Pharmacy Counter
              </NavLink>
              <NavLink to="/app/records/search" className={navClass}>
                <span>📁</span> Digital Health Records
              </NavLink>
            </nav>
          </div>

          {/* Clinic Administration */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2 font-serif">
              Clinic Administration
            </span>
            <nav className="space-y-1">
              <NavLink to="/app/admin/dashboard" className={navClass}>
                <span>📊</span> Executive Dashboard
              </NavLink>
              <NavLink to="/app/admin/staff" className={navClass}>
                <span>👥</span> Staff & Roles
              </NavLink>
              <NavLink to="/app/admin/analytics" className={navClass}>
                <span>📈</span> Clinical Analytics
              </NavLink>
              <NavLink to="/app/admin/billing" className={navClass}>
                <span>💳</span> Subscription & Tier
              </NavLink>
              <NavLink to="/app/admin/settings" className={navClass}>
                <span>⚙️</span> Clinic Settings
              </NavLink>
            </nav>
          </div>

          {/* Super Admin Section */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2 font-serif">
              Platform Governance
            </span>
            <nav className="space-y-1">
              <NavLink to="/app/super-admin/clinics" className={navClass}>
                <span>🏛️</span> All Onboarded Clinics
              </NavLink>
              <NavLink to="/app/super-admin/analytics" className={navClass}>
                <span>🌐</span> Platform Overview
              </NavLink>
            </nav>
          </div>
        </aside>

        {/* Main Application Canvas */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
