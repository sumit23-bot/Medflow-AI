import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import SectionDivider from '../../components/ui/SectionDivider';

/**
 * FeaturesRecords.jsx — Phase 6 Section D (Step 27)
 * Route: /features/records
 * Purpose: Real content for Digital Records (PRD FR12-FR13):
 *          Permanent, searchable records replacing paper registers.
 */
export default function FeaturesRecords() {
  useEffect(() => {
    document.title = "Permanent Digital Records — MedFlow AI";

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
              PRD SECTION 7.4 (FR12–FR13)
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <Badge variant="tag" size="sm">
              DIGITAL ARCHIVE
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink-950 tracking-tight leading-[1.15]">
            Digital Health Records: 100% Digital Retention, Zero Register Loss
          </h1>

          <p className="text-lg md:text-xl text-gray-700 font-sans leading-relaxed max-w-3xl">
            Eliminating physical paper registers forever. Every patient visit is permanently indexed, encrypted, and instantly retrievable across months or years of clinical care.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to="/app/records/search">
              <Button variant="primary" size="lg">
                Try Records Search Demo →
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

      {/* 2. THE 4 RECORDS CAPABILITIES (FR12 & FR13) */}
      <section className="reveal-section py-16 px-4 max-w-5xl mx-auto space-y-10">
        <div>
          <SectionDivider label="Archival Architecture" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink-950 mt-2">
            Built to Protect Community Health Data
          </h2>
          <p className="text-sm text-gray-600 font-sans mt-1 max-w-2xl">
            In overcrowded clinics, paper registers routinely get torn, wet, or lost during monsoon months and crowded morning rushes. MedFlow AI creates a fail-safe digital record for every visit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FR12: Permanent Searchable Storage */}
          <Card
            title="100% Permanent & Searchable Storage"
            subtitle="Requirement FR12 • Zero Record Loss"
            className="border-t-2 border-t-ink-900 h-full"
            action={<Badge variant="waiting" size="sm">FR12</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                Every completed patient visit is permanently saved in the clinic's database. Records are searchable within fractions of a second by <strong>patient name</strong>, <strong>assigned token number</strong>, or <strong>contact phone number</strong>.
              </p>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs font-mono text-gray-600">
                Data Isolation: Strict multi-tenant row-level security (RLS) guarantees that clinic data never leaks across branches or facilities.
              </div>
            </div>
          </Card>

          {/* FR13: Complete Clinical Record Schema */}
          <Card
            title="Complete Clinical Encounter History"
            subtitle="Requirement FR13 • Standardized Audit Trail"
            className="border-t-2 border-t-charcoal-700 h-full"
            action={<Badge variant="in-consult" size="sm">FR13</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                Each digital record preserves the entire encounter chain: visit timestamp, raw & structured intake symptoms, attending doctor name, precise diagnosis, full structured prescription (medicines, dosages, duration), and pharmacy dispensing status.
              </p>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs font-mono text-gray-600">
                Auditable: Provides a full forensic timeline for administrative reviews, patient referrals, and legal compliance.
              </div>
            </div>
          </Card>

          {/* Longitudinal Continuity */}
          <Card
            title="Longitudinal Care for Chronic Illnesses"
            subtitle="Patient Timeline • Diabetes & Hypertension"
            className="border-t-2 border-t-gray-500 h-full"
            action={<Badge variant="tag" size="sm">Continuity</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                When an elderly laborer returns three months later with recurring joint pain or hypertension, the doctor does not need to guess what was previously prescribed. The complete chronological history displays at a glance, preventing duplicate drug courses and dangerous contraindications.
              </p>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs font-mono text-gray-600">
                Clinical Impact: Transforms episodic, disconnected charity visits into continuous longitudinal primary healthcare.
              </div>
            </div>
          </Card>

          {/* Print & Export Readiness */}
          <Card
            title="Print & Physical Referral Export"
            subtitle="Step 94 Spec • Clean Black & White Print"
            className="border-t-2 border-t-gray-300 h-full"
            action={<Badge variant="at-pharmacy" size="sm">Export</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                For patients who need to present physical medical proof to government schemes, employers, or district tertiary hospitals, MedFlow AI includes a clean, high-contrast browser print stylesheet that generates formal paper summaries in one click.
              </p>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs font-mono text-gray-600">
                Design: Clean monochrome format formatted for standard A4 and thermal receipt printers.
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. CLOSING CTA (Step 29) */}
      <section className="reveal-section border-t border-gray-200 bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="waiting" size="sm">
            NEXT STEP
          </Badge>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950">
            Search Digital Health Records Live
          </h2>

          <p className="text-sm sm:text-base text-gray-700 font-sans max-w-2xl mx-auto leading-relaxed">
            Test the records search engine by typing patient names or token numbers and inspect the full chronological visit timeline.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/app/records/search">
              <Button variant="primary" size="lg">
                Search Patient Records Demo
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg">
                See Pricing
              </Button>
            </Link>
            <Link to="/demo-request">
              <Button variant="subtle" size="lg">
                Book a Walkthrough
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

