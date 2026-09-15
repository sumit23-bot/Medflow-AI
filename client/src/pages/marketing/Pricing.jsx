import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import SectionDivider from '../../components/ui/SectionDivider';

/**
 * Pricing.jsx — Phase 6 Section E (Steps 31–36)
 * Route: /pricing
 * Purpose: 4-tier pricing model based strictly on PRD.md Section 9.
 *          Principle: pricing tiers scaled to who's paying, cross-subsidizing free community care.
 *          Zero invented rupee figures — exact phrasing per specification.
 */
export default function Pricing() {
  useEffect(() => {
    document.title = "Pricing & Plans — MedFlow AI";

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
      {/* 1. HERO HEADER */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50/70 to-white py-14 md:py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="tag" size="sm">
              PRD SECTION 9
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <Badge variant="waiting" size="sm">
              AFFORDABLE FOR EVERYONE
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-xs font-mono text-gray-600 uppercase tracking-wider">
              CROSS-SUBSIDY ARCHITECTURE
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink-950 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Pricing Scaled to Who's Paying: From Free Charitable Clinics to Healthcare Groups
          </h1>

          <p className="text-lg md:text-xl text-gray-700 font-sans leading-relaxed max-w-3xl mx-auto">
            Cost should never be the reason a dispensary serving daily-wage laborers cannot adopt modern clinical tools. Higher commercial tiers monetize private practices and hospital networks, cross-subsidizing free community access.
          </p>
        </div>
      </section>

      {/* 2. THE 4 PRICING CARDS (Step 32, 33, 34) */}
      <section className="reveal-section py-16 px-4 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <SectionDivider label="Subscription Tiers" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink-950">
            Four Dedicated Tiers for Every Stage of Healthcare Delivery
          </h2>
          <p className="text-sm text-gray-600 font-sans max-w-2xl mx-auto">
            All tiers include our core voice-first triage and digital record engine with zero proprietary hardware requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* TIER 1: Community (Free / ₹0) */}
          <Card
            title="Community"
            subtitle="Free Govt. Clinics & NGO Dispensaries"
            className="border-t-4 border-t-ink-900 flex flex-col justify-between h-full bg-white"
            action={<Badge variant="waiting" size="sm">FREE / ₹0</Badge>}
          >
            <div className="space-y-4 pt-2">
              {/* Pricing Callout */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-ink-950">₹0</span>
                  <span className="text-xs font-mono text-gray-500 uppercase">/ Free Forever</span>
                </div>
                <p className="text-xs text-gray-600 font-sans mt-1">
                  Free, or government-scheme-subsidized for qualifying charitable facilities.
                </p>
              </div>

              {/* Target Persona */}
              <div className="text-xs font-sans text-gray-700 bg-gray-50 p-2.5 rounded border border-gray-200">
                <strong>Who it's for:</strong> Free govt. clinics, NGO dispensaries, and clinics serving daily-wage laborers.
              </div>

              {/* What's Included */}
              <div className="space-y-2 text-xs font-sans text-gray-700">
                <div className="font-mono uppercase text-[11px] text-gray-500 font-semibold tracking-wider">
                  What's included:
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-ink-900 font-bold font-mono">✓</span>
                    <span>Core kiosk intake (voice & text)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ink-900 font-bold font-mono">✓</span>
                    <span>Doctor clinical dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ink-900 font-bold font-mono">✓</span>
                    <span>Digital records for 1 clinic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ink-900 font-bold font-mono">✓</span>
                    <span>Limited monthly patient volume</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ink-900 font-bold font-mono">✓</span>
                    <span>Community support forum</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6 mt-auto">
              <Link to="/signup" className="block w-full">
                <Button variant="primary" className="w-full">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </Card>

          {/* TIER 2: Clinic Plus */}
          <Card
            title="Clinic Plus"
            subtitle="Private Clinics & Solo Practitioners"
            className="border-t-4 border-t-charcoal-700 flex flex-col justify-between h-full bg-white shadow-sm"
            action={<Badge variant="in-consult" size="sm">POPULAR</Badge>}
          >
            <div className="space-y-4 pt-2">
              {/* Pricing Callout */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex flex-col">
                  <span className="text-lg font-serif font-bold text-ink-950">Affordable monthly plan</span>
                  <span className="text-xs font-mono text-gray-500 mt-0.5">Contact us for a quote</span>
                </div>
                <p className="text-xs text-gray-600 font-sans mt-1">
                  Low flat monthly fee tailored to be easily affordable for a small healthcare practice.
                </p>
              </div>

              {/* Target Persona */}
              <div className="text-xs font-sans text-gray-700 bg-gray-50 p-2.5 rounded border border-gray-200">
                <strong>Who it's for:</strong> Small private clinics, general physicians, and single-doctor practices.
              </div>

              {/* What's Included */}
              <div className="space-y-2 text-xs font-sans text-gray-700">
                <div className="font-mono uppercase text-[11px] text-gray-500 font-semibold tracking-wider">
                  What's included:
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-ink-900 font-bold font-mono">✓</span>
                    <span><strong>Unlimited patients</strong> (no monthly caps)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ink-900 font-bold font-mono">✓</span>
                    <span>Medicine counter synchronization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ink-900 font-bold font-mono">✓</span>
                    <span>Automated WhatsApp follow-up reminders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ink-900 font-bold font-mono">✓</span>
                    <span>Basic operational analytics & reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ink-900 font-bold font-mono">✓</span>
                    <span>Standard email & chat assistance</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6 mt-auto">
              <Link to="/demo-request" className="block w-full">
                <Button variant="primary" className="w-full">
                  Request Pricing
                </Button>
              </Link>
            </div>
          </Card>

          {/* TIER 3: Business / Multi-Branch */}
          <Card
            title="Business / Multi-Branch"
            subtitle="Chains & Healthcare Groups"
            className="border-t-4 border-t-gray-500 flex flex-col justify-between h-full bg-white"
            action={<Badge variant="at-pharmacy" size="sm">GROWTH</Badge>}
          >
            <div className="space-y-4 pt-2">
              {/* Pricing Callout */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex flex-col">
                  <span className="text-lg font-serif font-bold text-ink-950">Custom pricing</span>
                  <span className="text-xs font-mono text-gray-500 mt-0.5">Per-branch monthly quote</span>
                </div>
                <p className="text-xs text-gray-600 font-sans mt-1">
                  Volume discounts based on number of clinic locations and operational scale.
                </p>
              </div>

              {/* Target Persona */}
              <div className="text-xs font-sans text-gray-700 bg-gray-50 p-2.5 rounded border border-gray-200">
                <strong>Who it's for:</strong> Clinic chains, private nursing homes, and businessman-run healthcare groups.
              </div>

              {/* What's Included */}
              <div className="space-y-2 text-xs font-sans text-gray-700">
                <div className="font-mono uppercase text-[11px] text-gray-500 font-semibold tracking-wider">
                  What's included:
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-ink-900 font-bold font-mono">✓</span>
                    <span>Multi-clinic central admin console</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ink-900 font-bold font-mono">✓</span>
                    <span>Advanced epidemiological & load analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ink-900 font-bold font-mono">✓</span>
                    <span>Priority SLA & dedicated support manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ink-900 font-bold font-mono">✓</span>
                    <span>Custom branding & clinic identity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ink-900 font-bold font-mono">✓</span>
                    <span>Staff role management at enterprise scale</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6 mt-auto">
              <Link to="/demo-request" className="block w-full">
                <Button variant="outline" className="w-full">
                  Request Pricing
                </Button>
              </Link>
            </div>
          </Card>

          {/* TIER 4: Government / NGO Partnership */}
          <Card
            title="Govt / NGO Partnership"
            subtitle="Health Missions & NGO Networks"
            className="border-t-4 border-t-gray-300 flex flex-col justify-between h-full bg-white"
            action={<Badge variant="tag" size="sm">ENTERPRISE</Badge>}
          >
            <div className="space-y-4 pt-2">
              {/* Pricing Callout */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex flex-col">
                  <span className="text-lg font-serif font-bold text-ink-950">Custom / Grant-funded</span>
                  <span className="text-xs font-mono text-gray-500 mt-0.5">Institutional partnership</span>
                </div>
                <p className="text-xs text-gray-600 font-sans mt-1">
                  Structured for state health departments, district pilot grants, and CSR initiatives.
                </p>
              </div>

              {/* Target Persona */}
              <div className="text-xs font-sans text-gray-700 bg-gray-50 p-2.5 rounded border border-gray-200">
                <strong>Who it's for:</strong> State health departments, district CMOs, and large NGO networks.
              </div>

              {/* What's Included */}
              <div className="space-y-2 text-xs font-sans text-gray-700">
                <div className="font-mono uppercase text-[11px] text-gray-500 font-semibold tracking-wider">
                  What's included:
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-ink-900 font-bold font-mono">✓</span>
                    <span>Bulk multi-facility deployment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ink-900 font-bold font-mono">✓</span>
                    <span>ABDM integration (roadmap alignment)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ink-900 font-bold font-mono">✓</span>
                    <span>Dedicated clinical onboarding & staff training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ink-900 font-bold font-mono">✓</span>
                    <span>Aligned with schemes like DHIS incentives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ink-900 font-bold font-mono">✓</span>
                    <span>Aggregated public health incidence reporting</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6 mt-auto">
              <Link to="/contact" className="block w-full">
                <Button variant="secondary" className="w-full">
                  Partner With Us
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. DETAILED FEATURE COMPARISON TABLE */}
      <section className="reveal-section py-12 px-4 max-w-5xl mx-auto space-y-6">
        <div>
          <SectionDivider label="Feature Comparison" />
          <h2 className="text-2xl font-serif font-bold text-ink-950 mt-2">
            Detailed Tier Capabilities Matrix
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-sans mt-1">
            Compare capabilities across tiers to select the right fit for your clinical infrastructure.
          </p>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded">
          <table className="w-full text-left border-collapse text-xs font-sans">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="p-3.5 font-mono uppercase text-gray-600 font-bold">Feature / Capability</th>
                <th className="p-3.5 font-mono uppercase text-gray-900 font-bold">Community</th>
                <th className="p-3.5 font-mono uppercase text-gray-900 font-bold">Clinic Plus</th>
                <th className="p-3.5 font-mono uppercase text-gray-900 font-bold">Business</th>
                <th className="p-3.5 font-mono uppercase text-gray-900 font-bold">Govt / NGO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="p-3.5 font-medium text-ink-950">Patient Triage Kiosk (Voice & Text)</td>
                <td className="p-3.5 text-gray-700">Included</td>
                <td className="p-3.5 text-gray-700">Included</td>
                <td className="p-3.5 text-gray-700">Included</td>
                <td className="p-3.5 text-gray-700">Included</td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="p-3.5 font-medium text-ink-950">Doctor Queue & AI Rx Structuring</td>
                <td className="p-3.5 text-gray-700">Included</td>
                <td className="p-3.5 text-gray-700">Included</td>
                <td className="p-3.5 text-gray-700">Included</td>
                <td className="p-3.5 text-gray-700">Included</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-ink-950">Monthly Patient Volume</td>
                <td className="p-3.5 text-gray-600">Limited Volume</td>
                <td className="p-3.5 font-semibold text-ink-950">Unlimited</td>
                <td className="p-3.5 font-semibold text-ink-950">Unlimited</td>
                <td className="p-3.5 font-semibold text-ink-950">Unlimited (Bulk)</td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="p-3.5 font-medium text-ink-950">Medicine Counter Synchronization</td>
                <td className="p-3.5 text-gray-400">—</td>
                <td className="p-3.5 text-gray-700">Included</td>
                <td className="p-3.5 text-gray-700">Included</td>
                <td className="p-3.5 text-gray-700">Included</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-ink-950">WhatsApp Follow-Up Reminders</td>
                <td className="p-3.5 text-gray-400">—</td>
                <td className="p-3.5 text-gray-700">Included</td>
                <td className="p-3.5 text-gray-700">Included</td>
                <td className="p-3.5 text-gray-700">Included</td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="p-3.5 font-medium text-ink-950">Analytics & Disease Surveillance</td>
                <td className="p-3.5 text-gray-400">—</td>
                <td className="p-3.5 text-gray-700">Basic</td>
                <td className="p-3.5 text-gray-700">Advanced Multi-Branch</td>
                <td className="p-3.5 text-gray-700">Public Health Reporting</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-ink-950">Centralized Multi-Clinic Console</td>
                <td className="p-3.5 text-gray-400">—</td>
                <td className="p-3.5 text-gray-400">—</td>
                <td className="p-3.5 text-gray-700">Included</td>
                <td className="p-3.5 text-gray-700">Included</td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="p-3.5 font-medium text-ink-950">ABDM Integration & Scheme Alignment</td>
                <td className="p-3.5 text-gray-400">—</td>
                <td className="p-3.5 text-gray-400">—</td>
                <td className="p-3.5 text-gray-400">—</td>
                <td className="p-3.5 font-semibold text-ink-950">Roadmap Alignment</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. CROSS-SUBSIDY PRINCIPLE & FAQ NOTE (Step 35) */}
      <section className="reveal-section py-12 px-4 max-w-5xl mx-auto">
        <div className="bg-gray-50 border border-gray-200 p-8 rounded space-y-6">
          <div className="flex items-center gap-2">
            <Badge variant="waiting" size="sm">
              CORE PHILOSOPHY
            </Badge>
            <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
              PRD SECTION 9 PRINCIPLE
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-ink-950">
            Why is the Community tier free forever?
          </h3>

          <div className="space-y-4 text-sm text-gray-700 font-sans leading-relaxed">
            <p>
              MedFlow AI operates on a <strong>cross-subsidy principle</strong>: pricing tiers are scaled to who is paying, rather than forcing a rigid one-size-fits-all model.
            </p>
            <p>
              A permanent free tier ensures that cost is never the barrier stopping a clinic serving daily-wage laborers, migrant workers, or rural villages from adopting digitized triage and secure records. Our higher commercial tiers monetize private practices, clinic chains, and hospitals that can pay more—directly funding and sustaining free software access for charitable and public dispensaries.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="p-4 bg-white border border-gray-200 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-serif font-bold text-ink-950">
                  India's Digital Health Incentive Scheme (DHIS)
                </h4>
                <p className="text-xs text-gray-600 font-sans mt-0.5">
                  Qualify for government incentives by transitioning your clinic records to digital formats with MedFlow AI.
                </p>
              </div>
              <Link to="/demo-request" className="shrink-0">
                <Button variant="outline" size="sm">
                  Learn About DHIS →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CLOSING CTA SECTION */}
      <section className="reveal-section border-t border-gray-200 bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="tag" size="sm">
            GET STARTED TODAY
          </Badge>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950">
            Choose the Right Plan for Your Healthcare Facility
          </h2>

          <p className="text-sm sm:text-base text-gray-700 font-sans max-w-2xl mx-auto leading-relaxed">
            Whether you are managing a single charitable dispensary or a multi-location clinic group, MedFlow AI deploys in minutes with zero upfront hardware investment.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/signup">
              <Button variant="primary" size="lg">
                Get Started Free
              </Button>
            </Link>
            <Link to="/demo-request">
              <Button variant="outline" size="lg">
                Request Pricing & Demo
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="subtle" size="lg">
                Partner With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
