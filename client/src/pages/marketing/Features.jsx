import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import SectionDivider from '../../components/ui/SectionDivider';

/**
 * Features.jsx — Phase 6 Section D (A4: /features)
 * Purpose: Platform features hub linking to the 4 specialized sub-pages:
 *          Kiosk, Doctor Dashboard, Digital Records, and Clinic Admin Analytics.
 */
export default function Features() {
  useEffect(() => {
    document.title = "Platform Features — MedFlow AI";

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
      {/* 1. HERO SECTION (Step 24 - Hub Intro) */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50/70 to-white py-14 md:py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="tag" size="sm">
              PRD SECTION 6 (A4)
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <Badge variant="waiting" size="sm">
              CORE FEATURE DIRECTORY
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
              4 DEDICATED CLINICAL MODULES
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink-950 tracking-tight leading-[1.15]">
            Engineered for High-Volume Walk-In Primary Care
          </h1>

          <p className="text-lg md:text-xl text-gray-700 font-sans leading-relaxed max-w-3xl">
            Unlike generic hospital software or remote telehealth video platforms, MedFlow AI is designed for the physical reality of busy walk-in dispensaries. Explore the four core modules powering the paperless clinic flow.
          </p>
        </div>
      </section>

      {/* 2. 4-CARD FEATURE SUB-PAGE DIRECTORY (Step 24) */}
      <section className="reveal-section py-16 px-4 max-w-5xl mx-auto space-y-10">
        <div>
          <SectionDivider label="Platform Sub-Systems" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink-950 mt-2">
            Explore Dedicated Module Architectures
          </h2>
          <p className="text-sm text-gray-600 font-sans mt-1 max-w-2xl">
            Each sub-system handles a critical transition point in the patient journey, built with zero hardware lock-in and multi-language support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sub-Page 1: Kiosk */}
          <Card
            title="1. Patient Triage Kiosk"
            subtitle="/features/kiosk • PRD Section 7.1"
            className="border-t-2 border-t-ink-900 h-full flex flex-col justify-between"
            action={<Badge variant="waiting" size="sm">Intake</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans">
              <p>
                Voice-first symptom intake in Hindi and English with AI triage structuring, patient confirmation safeguards, and instant token issuance.
              </p>
              <div className="pt-2 border-t border-gray-100 text-xs font-mono text-gray-500">
                Functional Requirements: FR1 to FR4
              </div>
            </div>
            <div className="pt-4 mt-auto">
              <Link
                to="/features/kiosk"
                className="text-xs font-semibold uppercase tracking-wider text-black hover:underline inline-flex items-center gap-1"
              >
                Explore Kiosk Architecture →
              </Link>
            </div>
          </Card>

          {/* Sub-Page 2: Doctor Dashboard */}
          <Card
            title="2. Doctor Clinical Dashboard"
            subtitle="/features/doctor-dashboard • PRD Section 7.2"
            className="border-t-2 border-t-charcoal-700 h-full flex flex-col justify-between"
            action={<Badge variant="in-consult" size="sm">Consultation</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans">
              <p>
                Live token-ordered queue view, pre-structured glanceable summaries that reduce note-taking by 40%, and rapid AI prescription structuring.
              </p>
              <div className="pt-2 border-t border-gray-100 text-xs font-mono text-gray-500">
                Functional Requirements: FR5 to FR9
              </div>
            </div>
            <div className="pt-4 mt-auto">
              <Link
                to="/features/doctor-dashboard"
                className="text-xs font-semibold uppercase tracking-wider text-black hover:underline inline-flex items-center gap-1"
              >
                Explore Doctor Dashboard →
              </Link>
            </div>
          </Card>

          {/* Sub-Page 3: Digital Records */}
          <Card
            title="3. Permanent Digital Records"
            subtitle="/features/records • PRD Section 7.4"
            className="border-t-2 border-t-gray-500 h-full flex flex-col justify-between"
            action={<Badge variant="tag" size="sm">Archival</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans">
              <p>
                Permanent, multi-tenant digital visit histories replacing lost paper registers with instant search by name, token, or contact number.
              </p>
              <div className="pt-2 border-t border-gray-100 text-xs font-mono text-gray-500">
                Functional Requirements: FR12 to FR13
              </div>
            </div>
            <div className="pt-4 mt-auto">
              <Link
                to="/features/records"
                className="text-xs font-semibold uppercase tracking-wider text-black hover:underline inline-flex items-center gap-1"
              >
                Explore Digital Records →
              </Link>
            </div>
          </Card>

          {/* Sub-Page 4: Admin Analytics */}
          <Card
            title="4. Clinic Admin Analytics"
            subtitle="/features/analytics • PRD Section 7.5"
            className="border-t-2 border-t-gray-300 h-full flex flex-col justify-between"
            action={<Badge variant="at-pharmacy" size="sm">Intelligence</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans">
              <p>
                Actionable operational KPIs, hourly patient arrival forecasting, community disease trend tracking, and pharmacy inventory consumption audits.
              </p>
              <div className="pt-2 border-t border-gray-100 text-xs font-mono text-gray-500">
                Functional Requirements: FR14 to FR18
              </div>
            </div>
            <div className="pt-4 mt-auto">
              <Link
                to="/features/analytics"
                className="text-xs font-semibold uppercase tracking-wider text-black hover:underline inline-flex items-center gap-1"
              >
                Explore Admin Analytics →
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. CLOSING CTA SECTION (Step 29) */}
      <section className="reveal-section border-t border-gray-200 bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="waiting" size="sm">
            EVALUATION & ADOPTION
          </Badge>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950">
            Ready to Digitize Your Clinic Operations?
          </h2>

          <p className="text-sm sm:text-base text-gray-700 font-sans max-w-2xl mx-auto leading-relaxed">
            MedFlow AI is available free forever under our Community tier for charitable dispensaries and public clinics, with scalable tiers for private facilities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/demo-request">
              <Button variant="primary" size="lg">
                Book a Live Demo
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg">
                View Pricing Tiers
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

