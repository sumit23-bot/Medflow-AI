import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import SectionDivider from '../../components/ui/SectionDivider';

/**
 * FeaturesAnalytics.jsx — Phase 6 Section D (Step 28)
 * Route: /features/analytics
 * Purpose: Real content for Clinic Admin Analytics (PRD FR14-FR18):
 *          Operational KPIs, hourly arrival distribution, disease outbreak tracking,
 *          and pharmacy drug consumption audits.
 */
export default function FeaturesAnalytics() {
  useEffect(() => {
    document.title = "Clinic Admin Analytics — MedFlow AI";

    const elements = document.querySelectorAll('.reveal-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-ink-900">
      {/* 1. HEADER & BREADCRUMB (Step 29) */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50/70 to-white py-12 md:py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/features"
              className="text-xs font-mono uppercase tracking-wider text-gray-600 hover:text-black hover:underline"
            >
              ← Back to all features
            </Link>
            <span className="text-gray-400 text-xs">•</span>
            <Badge variant="waiting" size="sm">
              PRD SECTION 7.5 (FR14–FR18)
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <Badge variant="at-pharmacy" size="sm">
              ADMIN INTELLIGENCE
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink-950 tracking-tight leading-[1.15]">
            Clinic Admin Analytics: Live Operational KPIs, Surge Forecasting & Disease Surveillance
          </h1>

          <p className="text-lg md:text-xl text-gray-700 font-sans leading-relaxed max-w-3xl">
            Empowering clinic administrators, medical superintendents, and healthcare entrepreneurs with structured clinical intelligence. Replace register guesswork with live patient throughput, peak-hour staffing models, community outbreak detection, and pharmacy stock-out alerts.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to="/app/admin/analytics">
              <Button variant="primary" size="lg">
                View Admin Analytics Demo →
              </Button>
            </Link>
            <Link to="/demo-request">
              <Button variant="outline" size="lg">
                Request Clinic Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THE 4 CORE ANALYTICS MODULES (FR14) */}
      <section className="reveal-section py-16 px-4 max-w-5xl mx-auto space-y-10">
        <div>
          <SectionDivider label="Operational & Clinical Intelligence" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink-950 mt-2">
            Four Real-Time Administrative Engines
          </h2>
          <p className="text-sm text-gray-600 font-sans mt-1 max-w-2xl">
            Every token generated, consult completed, and prescription dispensed continuously streams into executive dashboard views designed for fast decision-making.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FR14 Module 1: Live Operational Overview */}
          <Card
            title="Live Operational KPIs & Queue Bottlenecks"
            subtitle="Requirement FR14 • Clinic Throughput Tracking"
            className="border-t-2 border-t-ink-900 h-full"
            action={<Badge variant="waiting" size="sm">FR14</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                Get an instant snapshot of clinic operations in real time. Track daily patient registrations, active tokens waiting in the reception hall, ongoing consultations, and completed pharmacy dispenses.
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-gray-600">
                <li>Real-time token count: Registrations vs. consultations completed.</li>
                <li>Average patient wait time from kiosk token generation to doctor call.</li>
                <li>Average doctor consult duration to balance throughput with care quality.</li>
              </ul>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs font-mono text-gray-600">
                Routes: /app/admin/dashboard & /app/admin/analytics
              </div>
            </div>
          </Card>

          {/* FR14 Module 2: Hourly Patient Load & Surge Forecasting */}
          <Card
            title="Hourly Arrival Distribution & Shift Optimization"
            subtitle="Requirement FR14 • Resource Allocation"
            className="border-t-2 border-t-charcoal-700 h-full"
            action={<Badge variant="in-consult" size="sm">FR14</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                Analyze patient arrival patterns broken down hour-by-hour across morning and afternoon shifts. Identify sudden morning rushes (typically 8:00 AM – 11:00 AM) and stagger medical staff shifts accordingly.
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-gray-600">
                <li>Hourly distribution histograms to predict daily overcrowding peaks.</li>
                <li>Staff scheduling recommendations based on 7-day rolling walk-in trends.</li>
                <li>Minimizes lobby congestion and prevents doctor burnout during peak surge hours.</li>
              </ul>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs font-mono text-gray-600">
                Metric: Eliminates unpredictable doctor backlog and lobby overcrowding.
              </div>
            </div>
          </Card>

          {/* FR14 Module 3: Epidemiological Trends & Disease Outbreak Tracking */}
          <Card
            title="Community Disease Surveillance & Top Symptoms"
            subtitle="Requirement FR14 • Public Health Alerting"
            className="border-t-2 border-t-gray-500 h-full"
            action={<Badge variant="tag" size="sm">FR14</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                Aggregate AI Agent 1 structured symptoms and Doctor Agent 2 diagnoses to detect public health anomalies automatically. Identify localized disease outbreaks before they escalate into community emergencies.
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-gray-600">
                <li>Automated cluster detection for acute watery diarrhea, seasonal viral fever, and dengue.</li>
                <li>Weekly percentage shifts in top presenting complaints across all age brackets.</li>
                <li>Exportable disease incidence summaries for local health officers and CMO reporting.</li>
              </ul>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs font-mono text-gray-600">
                Surveillance: Zero manual register counting required to detect local epidemics.
              </div>
            </div>
          </Card>

          {/* FR14 Module 4: Medicine Consumption & Stock Audits */}
          <Card
            title="Medicine Consumption & Pharmacy Auditing"
            subtitle="Requirement FR14 • Supply Chain Protection"
            className="border-t-2 border-t-gray-300 h-full"
            action={<Badge variant="at-pharmacy" size="sm">FR14</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                Link doctor prescription outputs with actual pharmacy dispensations in real time. Gain complete visibility into drug utilization patterns and prevent critical antibiotic or analgesic stock-outs.
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-gray-600">
                <li>Daily consumption velocity tracking for high-demand essential medicines (e.g., Paracetamol, Amoxicillin, ORS).</li>
                <li>Early warning alerts when dispensing velocity exceeds remaining stock thresholds.</li>
                <li>Prescription vs. dispensation reconciliation to eliminate medicine leakage.</li>
              </ul>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs font-mono text-gray-600">
                Impact: Prevents patients leaving empty-handed due to unpredicted drug stock-outs.
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. CLINIC ADMINISTRATION & GOVERNANCE (FR15 - FR18) */}
      <section className="reveal-section py-12 px-4 max-w-5xl mx-auto space-y-8">
        <div>
          <SectionDivider label="Administrative Controls" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink-950 mt-2">
            Staff Role Management & Clinic Localization (FR15–FR18)
          </h2>
          <p className="text-sm text-gray-600 font-sans mt-1 max-w-2xl">
            Centralized administrative controls allowing clinic operators to manage user access, billing, and language preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-50 border border-gray-200 rounded space-y-3">
            <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">
              PRD FR15 • User Governance
            </div>
            <h3 className="font-serif font-bold text-ink-950 text-lg">
              Staff & Role Management
            </h3>
            <p className="text-xs text-gray-600 font-sans leading-relaxed">
              Provision and manage role-based credentials for doctors, pharmacists, triage staff, and receptionists. Revoke access instantly to ensure clinical security.
            </p>
            <div className="pt-2 text-xs font-mono text-black">
              Route: /app/admin/staff
            </div>
          </div>

          <div className="p-6 bg-gray-50 border border-gray-200 rounded space-y-3">
            <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">
              PRD FR17 • Commercial Billing
            </div>
            <h3 className="font-serif font-bold text-ink-950 text-lg">
              Subscription & Invoicing
            </h3>
            <p className="text-xs text-gray-600 font-sans leading-relaxed">
              Transparent tier management supporting free charitable clinics and paid commercial medical centers with invoice history and tier upgrades.
            </p>
            <div className="pt-2 text-xs font-mono text-black">
              Route: /app/admin/billing
            </div>
          </div>

          <div className="p-6 bg-gray-50 border border-gray-200 rounded space-y-3">
            <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">
              PRD FR18 • Clinic Settings
            </div>
            <h3 className="font-serif font-bold text-ink-950 text-lg">
              Language & Notification Setup
            </h3>
            <p className="text-xs text-gray-600 font-sans leading-relaxed">
              Configure clinic operating hours, enable or disable Hindi/English voice intake at the kiosk, and toggle automated SMS/WhatsApp follow-up reminders.
            </p>
            <div className="pt-2 text-xs font-mono text-black">
              Route: /app/admin/settings
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLOSING CTA (Step 29) */}
      <section className="reveal-section border-t border-gray-200 bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="waiting" size="sm">
            NEXT STEP
          </Badge>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950">
            Gain Complete Visibility Over Your Clinic Operations
          </h2>

          <p className="text-sm sm:text-base text-gray-700 font-sans max-w-2xl mx-auto leading-relaxed">
            Eliminate operational blind spots. Track throughput, protect drug inventory, and detect public health spikes with MedFlow AI's centralized clinical administration tools.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/app/admin/analytics">
              <Button variant="primary" size="lg">
                Explore Analytics Dashboard
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg">
                View Pricing
              </Button>
            </Link>
            <Link to="/demo-request">
              <Button variant="subtle" size="lg">
                Request Clinic Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
