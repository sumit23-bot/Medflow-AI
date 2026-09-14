import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import SectionDivider from '../../components/ui/SectionDivider';

/**
 * Home.jsx — Phase 6 Section A (A1: /)
 * Purpose: Official landing: mission statement, high-level value prop, 4-step flow,
 *          why medflow ai, illustrative market stats strip, and closing CTAs.
 */
export default function Home() {
  useEffect(() => {
    document.title = "MedFlow AI — Rural Clinic Triage & Digitization Platform";

    // Scroll reveal observer (Step 9)
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
      {/* 1. HERO SECTION (Steps 1, 2, 3, 4) */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50/70 to-white py-14 md:py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Institutional Eyebrow */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="waiting" size="sm">
              PRIMARY HEALTHCARE ARCHITECTURE
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <Badge variant="tag" size="sm">
              VOICE-FIRST OPD TRIAGE
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
              PRD SPECIFICATION V1.0
            </span>
          </div>

          {/* Hero Headline (Step 2 - PRD Section 1 Executive Summary) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink-950 tracking-tight leading-[1.15]">
            MedFlow AI is an AI-powered, voice-first platform that digitizes the walk-in patient flow at free and low-cost clinics.
          </h1>

          {/* Hero Sub-headline (Step 3 - Core Value Prop) */}
          <p className="text-lg md:text-xl text-gray-700 font-sans leading-relaxed max-w-3xl">
            Engineered to replace lost paper registers with permanent digital records, reduce doctor note-taking time by 40%, and synchronize the medicine dispensary counter with live prescriptions in real time.
          </p>

          {/* Value Prop Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-gray-600">
            <div className="p-3 bg-white border border-gray-200 rounded flex items-center gap-2">
              <span className="font-bold text-black font-sans">01 /</span>
              <span>Eliminates Lost Paper Registers</span>
            </div>
            <div className="p-3 bg-white border border-gray-200 rounded flex items-center gap-2">
              <span className="font-bold text-black font-sans">02 /</span>
              <span>-40% Doctor Triage Note Time</span>
            </div>
            <div className="p-3 bg-white border border-gray-200 rounded flex items-center gap-2">
              <span className="font-bold text-black font-sans">03 /</span>
              <span>Instant Pharmacy Queue Sync</span>
            </div>
          </div>

          {/* Hero CTA Buttons (Step 4) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
            <Link to="/app/kiosk">
              <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-sm">
                Launch Kiosk Demo
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                See Pricing
              </Button>
            </Link>
            <Link to="/solution" className="sm:ml-auto">
              <span className="text-xs uppercase font-mono tracking-wider font-semibold text-gray-700 hover:text-black inline-flex items-center gap-1 py-2">
                Explore End-to-End Solution →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. 4-STEP VISUAL SUMMARY SECTION (Step 5: Kiosk -> Doctor -> Counter -> Record) */}
      <section className="reveal-section py-16 px-4 max-w-5xl mx-auto">
        <div className="mb-10 text-left">
          <SectionDivider label="Standard Operational Flow" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink-950 mt-2">
            The 4-Step Synchronized Clinical Flow
          </h2>
          <p className="text-sm text-gray-600 font-sans mt-1 max-w-2xl">
            From patient entry to drug dispensing, every step feeds the next without paper chits, repeated explanations, or lost files.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {/* Step 1: Kiosk */}
          <div className="flex flex-col h-full">
            <Card
              title="1. Patient Kiosk"
              subtitle="Voice / Text Intake"
              className="h-full flex flex-col justify-between border-t-2 border-t-ink-900"
              action={<Badge variant="waiting" size="sm">Step 01</Badge>}
            >
              <div className="space-y-3 text-sm text-gray-700 font-sans flex-grow">
                <p>
                  Patient speaks or types symptoms in Hindi or English. AI Agent structures the chief complaint, duration, and severity keywords.
                </p>
                <div className="pt-2 border-t border-gray-100 text-xs font-mono text-gray-500">
                  Issues physical/screen token number
                </div>
              </div>
              <div className="pt-4 mt-auto">
                <Link to="/app/kiosk" className="text-xs font-semibold uppercase tracking-wider text-black hover:underline inline-flex items-center gap-1">
                  Open Kiosk UI →
                </Link>
              </div>
            </Card>
          </div>

          {/* Step 2: Doctor Dashboard */}
          <div className="flex flex-col h-full">
            <Card
              title="2. Doctor Desk"
              subtitle="Queue & Diagnosis"
              className="h-full flex flex-col justify-between border-t-2 border-t-charcoal-700"
              action={<Badge variant="in-consult" size="sm">Step 02</Badge>}
            >
              <div className="space-y-3 text-sm text-gray-700 font-sans flex-grow">
                <p>
                  Doctor sees waiting queue ordered by token. Pre-structured AI summary eliminates verbal re-explanation, cutting consult note time by 40%.
                </p>
                <div className="pt-2 border-t border-gray-100 text-xs font-mono text-gray-500">
                  Structured diagnosis & Rx entry
                </div>
              </div>
              <div className="pt-4 mt-auto">
                <Link to="/app/queue" className="text-xs font-semibold uppercase tracking-wider text-black hover:underline inline-flex items-center gap-1">
                  View Live Queue →
                </Link>
              </div>
            </Card>
          </div>

          {/* Step 3: Medicine Counter */}
          <div className="flex flex-col h-full">
            <Card
              title="3. Medicine Counter"
              subtitle="Live Pharmacy Sync"
              className="h-full flex flex-col justify-between border-t-2 border-t-gray-500"
              action={<Badge variant="at-pharmacy" size="sm">Step 03</Badge>}
            >
              <div className="space-y-3 text-sm text-gray-700 font-sans flex-grow">
                <p>
                  Prescription appears at pharmacy the second doctor clicks submit. Pharmacist dispenses with zero manual paper matching.
                </p>
                <div className="pt-2 border-t border-gray-100 text-xs font-mono text-gray-500">
                  Single-click "Dispense" log
                </div>
              </div>
              <div className="pt-4 mt-auto">
                <Link to="/app/pharmacy/queue" className="text-xs font-semibold uppercase tracking-wider text-black hover:underline inline-flex items-center gap-1">
                  View Counter Queue →
                </Link>
              </div>
            </Card>
          </div>

          {/* Step 4: Digital Records */}
          <div className="flex flex-col h-full">
            <Card
              title="4. Digital Record"
              subtitle="Permanent & Searchable"
              className="h-full flex flex-col justify-between border-t-2 border-t-gray-300"
              action={<Badge variant="tag" size="sm">Step 04</Badge>}
            >
              <div className="space-y-3 text-sm text-gray-700 font-sans flex-grow">
                <p>
                  100% of visits permanently saved. Searchable instantly by name, token, or phone number—ending paper register loss forever.
                </p>
                <div className="pt-2 border-t border-gray-100 text-xs font-mono text-gray-500">
                  Auditable past visit history
                </div>
              </div>
              <div className="pt-4 mt-auto">
                <Link to="/app/records/search" className="text-xs font-semibold uppercase tracking-wider text-black hover:underline inline-flex items-center gap-1">
                  Search Patient Records →
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. "WHY MEDFLOW AI" SECTION (Step 6: PRD Section 4 USP-equivalent reasoning) */}
      <section className="reveal-section bg-gray-50 border-y border-gray-200 py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-gray-600 font-semibold">
              Ground Reality Architecture
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink-950 mt-1">
              Why MedFlow AI: Purpose-Built for High-Volume Walk-In Clinics
            </h2>
            <p className="text-sm text-gray-600 font-sans mt-2 max-w-3xl">
              Most healthtech software is built for private appointments, scheduled video calls, and smartphone-equipped urban patients. MedFlow AI is engineered for the physical chaos of crowded primary care clinics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Point 1: In-person not remote */}
            <div className="bg-white border border-gray-300 p-6 rounded shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-ink-900 text-white font-mono text-xs flex items-center justify-center font-bold">
                  01
                </div>
                <h3 className="font-serif font-bold text-lg text-ink-950">
                  In-Person Walk-In, Not Remote Telehealth
                </h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed font-sans">
                Built specifically for physical clinics where daily-wage laborers queue at dawn. It optimizes physical on-site triage, in-person consultation flow, and physical pharmacy lines rather than requiring high-speed personal devices.
              </p>
            </div>

            {/* Point 2: Voice-first */}
            <div className="bg-white border border-gray-300 p-6 rounded shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-ink-900 text-white font-mono text-xs flex items-center justify-center font-bold">
                  02
                </div>
                <h3 className="font-serif font-bold text-lg text-ink-950">
                  Voice-First & Low-Literacy Accessible
                </h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed font-sans">
                Patients who cannot comfortably read or write can speak their symptoms naturally into a shared clinic kiosk in Hindi or English. Large visual touch targets and staff-assisted confirmation guarantee zero friction.
              </p>
            </div>

            {/* Point 3: Zero record loss */}
            <div className="bg-white border border-gray-300 p-6 rounded shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-ink-900 text-white font-mono text-xs flex items-center justify-center font-bold">
                  03
                </div>
                <h3 className="font-serif font-bold text-lg text-ink-950">
                  Zero Patient Record Loss
                </h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed font-sans">
                Paper registers routinely suffer physical wear, dampness, or misplacement during rush hours. MedFlow AI creates a permanent, role-scoped digital audit log where every visit is searchable by name, token, or contact number.
              </p>
            </div>

            {/* Point 4: Multi-agent AI */}
            <div className="bg-white border border-gray-300 p-6 rounded shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-ink-900 text-white font-mono text-xs flex items-center justify-center font-bold">
                  04
                </div>
                <h3 className="font-serif font-bold text-lg text-ink-950">
                  Multi-Agent Clinical AI Pipeline
                </h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed font-sans">
                Three specialized, lightweight AI agents handle the repetitive administrative load: symptom structuring at triage, prescription digitization during doctor consultation, and automated WhatsApp follow-up reminders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STATS STRIP (Step 7: Market context clearly labeled) */}
      <section className="reveal-section py-16 px-4 max-w-5xl mx-auto">
        <div className="border border-gray-300 bg-white rounded p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-gray-500 font-bold">
                Macro Landscape
              </span>
              <h3 className="font-serif font-bold text-xl text-ink-950">
                Primary Healthcare Digitization Landscape
              </h3>
            </div>
            <Badge variant="tag" size="sm">
              Illustrative Market Context
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-serif font-bold text-ink-950">
                $5.7B+
              </div>
              <div className="text-xs uppercase font-mono tracking-wider text-gray-500 font-semibold">
                Digital Health Sector Growth
              </div>
              <p className="text-xs text-gray-600 font-sans leading-relaxed">
                Projected transition of Indian digital healthcare delivery infrastructure toward digitized primary facilities by 2027.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-serif font-bold text-ink-950">
                100M+
              </div>
              <div className="text-xs uppercase font-mono tracking-wider text-gray-500 font-semibold">
                National Teleconsultation Proof
              </div>
              <p className="text-xs text-gray-600 font-sans leading-relaxed">
                Recorded teleconsultations through government initiatives like eSanjeevani, demonstrating scalable public readiness for digital care.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-serif font-bold text-ink-950">
                ~38%
              </div>
              <div className="text-xs uppercase font-mono tracking-wider text-gray-500 font-semibold">
                Rural Digital Literacy
              </div>
              <p className="text-xs text-gray-600 font-sans leading-relaxed">
                Rural demographic context establishing why shared voice-first physical kiosk interfaces succeed where personal smartphone apps stall.
              </p>
            </div>
          </div>

          {/* Explicit Labeling Requirement (Step 7) */}
          <div className="bg-gray-50 border border-gray-200 p-3 rounded text-xs text-gray-600 font-sans flex items-start gap-2">
            <span className="font-bold text-black uppercase font-mono text-[10px]">Note:</span>
            <span>
              The statistics above represent broad public healthcare benchmarks and sector market context from national surveys and health missions. They are presented for illustrative industry scale and are not MedFlow AI internal usage figures.
            </span>
          </div>
        </div>
      </section>

      {/* 5. CLOSING CTA SECTION (Step 8: Buttons to /demo-request and /waitlist) */}
      <section className="reveal-section border-t border-gray-300 bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="waiting" size="sm">
            ONBOARDING & EVALUATION
          </Badge>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-ink-950 tracking-tight">
            Ready to see it in action?
          </h2>

          <p className="text-sm sm:text-base text-gray-700 font-sans max-w-2xl mx-auto leading-relaxed">
            Deploy the voice-first triage kiosk, reduce doctor consult fatigue, and eliminate paper register loss across your clinic network. Request a live guided walkthrough or apply for priority onboarding.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/demo-request">
              <Button variant="primary" size="lg" className="w-full sm:w-auto px-6">
                Request a Live Demo
              </Button>
            </Link>
            <Link to="/waitlist">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-6">
                Join Early Access Waitlist
              </Button>
            </Link>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-gray-500">
            <span>• No Credit Card Required</span>
            <span>• Community Tier Free Forever</span>
            <span>• Deployable on Existing Tablets & Laptops</span>
          </div>
        </div>
      </section>
    </div>
  );
}
