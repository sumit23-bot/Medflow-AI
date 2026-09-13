import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Layouts (Step 48)
import MarketingLayout from './layouts/MarketingLayout';
import AppLayout from './layouts/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Public Marketing Pages (A1–A20)
import Home from './pages/marketing/Home';
import Problem from './pages/marketing/Problem';
import Solution from './pages/marketing/Solution';
import Features from './pages/marketing/Features';
import FeaturesKiosk from './pages/marketing/FeaturesKiosk';
import FeaturesDoctor from './pages/marketing/FeaturesDoctor';
import FeaturesRecords from './pages/marketing/FeaturesRecords';
import FeaturesAnalytics from './pages/marketing/FeaturesAnalytics';
import Pricing from './pages/marketing/Pricing';
import CaseStudies from './pages/marketing/CaseStudies';
import Resources from './pages/marketing/Resources';
import FreeGuide from './pages/marketing/FreeGuide';
import RoiCalculator from './pages/marketing/RoiCalculator';
import Blog from './pages/marketing/Blog';
import BlogPost from './pages/marketing/BlogPost';
import About from './pages/marketing/About';
import Contact from './pages/marketing/Contact';
import DemoRequest from './pages/marketing/DemoRequest';
import Waitlist from './pages/marketing/Waitlist';
import Faq from './pages/marketing/Faq';
import PrivacyPolicy from './pages/marketing/PrivacyPolicy';
import TermsOfService from './pages/marketing/TermsOfService';
import Login from './pages/marketing/Login';
import Signup from './pages/marketing/Signup';

// Product Application Pages (B1–B18)
import Kiosk from './pages/app/Kiosk';
import KioskConfirm from './pages/app/KioskConfirm';
import Queue from './pages/app/Queue';
import DoctorPatientDetail from './pages/app/DoctorPatientDetail';
import DoctorHistory from './pages/app/DoctorHistory';
import PharmacyQueue from './pages/app/PharmacyQueue';
import PharmacyDispense from './pages/app/PharmacyDispense';
import RecordsSearch from './pages/app/RecordsSearch';
import RecordDetail from './pages/app/RecordDetail';
import AdminDashboard from './pages/app/AdminDashboard';
import AdminStaff from './pages/app/AdminStaff';
import AdminAnalytics from './pages/app/AdminAnalytics';
import AdminBilling from './pages/app/AdminBilling';
import AdminSettings from './pages/app/AdminSettings';
import SuperAdminClinics from './pages/app/SuperAdminClinics';
import SuperAdminAnalytics from './pages/app/SuperAdminAnalytics';
import Notifications from './pages/app/Notifications';
import AuthLogin from './pages/app/AuthLogin';
import ForgotPassword from './pages/app/ForgotPassword';

// 404 Fallback
function NotFound() {
  return (
    <div className="py-20 px-4 text-center max-w-lg mx-auto space-y-4">
      <span className="font-mono text-xs uppercase tracking-widest text-gray-400 bg-gray-100 px-2 py-1 rounded">
        404 • Resource Not Found
      </span>
      <h1 className="font-serif text-3xl font-bold text-ink-950">
        Official Notice: Page Not Found
      </h1>
      <p className="text-sm text-gray-600">
        The requested URL could not be located in the clinical directory.
      </p>
      <div className="pt-4">
        <Link to="/" className="inline-block px-4 py-2 bg-ink-900 text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-black">
          Return to Portal Home
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Marketing Website Routes (A1–A20) */}
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/problem" element={<Problem />} />
          <Route path="/solution" element={<Solution />} />
          <Route path="/features" element={<Features />} />
          <Route path="/features/kiosk" element={<FeaturesKiosk />} />
          <Route path="/features/doctor-dashboard" element={<FeaturesDoctor />} />
          <Route path="/features/records" element={<FeaturesRecords />} />
          <Route path="/features/analytics" element={<FeaturesAnalytics />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/free-guide" element={<FreeGuide />} />
          <Route path="/resources/roi-calculator" element={<RoiCalculator />} />
          <Route path="/resources/blog" element={<Blog />} />
          <Route path="/resources/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/demo-request" element={<DemoRequest />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Product Application Routes (B1–B18) */}
        <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          {/* Kiosk Flow (B1–B2) */}
          <Route path="kiosk" element={<Kiosk />} />
          <Route path="kiosk/confirm" element={<KioskConfirm />} />

          {/* Doctor Flow (B3–B5) */}
          <Route path="queue" element={<Queue />} />
          <Route path="doctor/patient/:id" element={<DoctorPatientDetail />} />
          <Route path="doctor/history" element={<DoctorHistory />} />

          {/* Pharmacy Flow (B6–B7) */}
          <Route path="pharmacy/queue" element={<PharmacyQueue />} />
          <Route path="pharmacy/dispense/:id" element={<PharmacyDispense />} />

          {/* Records (B8–B9) */}
          <Route path="records/search" element={<RecordsSearch />} />
          <Route path="records/:patientId" element={<RecordDetail />} />

          {/* Clinic Admin (B10–B14) */}
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/staff" element={<AdminStaff />} />
          <Route path="admin/analytics" element={<AdminAnalytics />} />
          <Route path="admin/billing" element={<AdminBilling />} />
          <Route path="admin/settings" element={<AdminSettings />} />

          {/* Platform Super Admin (B15–B16) */}
          <Route path="super-admin/clinics" element={<SuperAdminClinics />} />
          <Route path="super-admin/analytics" element={<SuperAdminAnalytics />} />

          {/* Notifications (B17) */}
          <Route path="notifications" element={<Notifications />} />

          {/* In-app Auth (B18) */}
          <Route path="auth/login" element={<AuthLogin />} />
          <Route path="auth/forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
