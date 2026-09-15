import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import SectionDivider from '../../components/ui/SectionDivider';

/**
 * FeaturesKiosk.jsx — Phase 6 Section D (Step 25)
 * Route: /features/kiosk
 * Purpose: Real content for Patient Kiosk (PRD FR1-FR4) in patient-facing language.
 */
export default function FeaturesKiosk() {
  useEffect(() => {
    document.title = "Patient Triage Kiosk — MedFlow AI";

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
              PRD SECTION 7.1 (FR1–FR4)
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <Badge variant="tag" size="sm">
              PATIENT INTAKE
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink-950 tracking-tight leading-[1.15]">
            Patient Triage Kiosk: Voice-First, Low-Literacy Intake
          </h1>

          <p className="text-lg md:text-xl text-gray-700 font-sans leading-relaxed max-w-3xl">
            Designed so that every walk-in patient—regardless of reading or typing comfort—can register symptoms in their own words and receive a verified queue token in under 60 seconds.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to="/app/kiosk">
              <Button variant="primary" size="lg">
                Launch Live Kiosk Demo →
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

      {/* 2. THE 4 PATIENT KIOSK PILLARS (FR1 to FR4 in Patient-Facing Terms) */}
      <section className="reveal-section py-16 px-4 max-w-5xl mx-auto space-y-10">
        <div>
          <SectionDivider label="Patient Experience & Safeguards" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink-950 mt-2">
            How the Kiosk Serves Walk-In Patients
          </h2>
          <p className="text-sm text-gray-600 font-sans mt-1 max-w-2xl">
            No mobile phone required, no app downloads, and no complex typing. Patients interact through a simple, large-touch screen placed at the clinic reception.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FR1: Voice & Text Intake */}
          <Card
            title="Spoken Symptom Input in Hindi & English"
            subtitle="Requirement FR1 • Natural Spoken Voice"
            className="border-t-2 border-t-ink-900 h-full"
            action={<Badge variant="waiting" size="sm">FR1</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                Patients tap the prominent microphone button and speak freely. Powered by browser-native speech recognition, it listens to everyday casual phrasing in Hindi, English, or mixed Hinglish (such as <em>"3 din se tez bukhar hai aur gale me dard"</em>).
              </p>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs font-mono text-gray-600">
                Fallback: Clinic staff can also type on behalf of patients when ambient noise is high.
              </div>
            </div>
          </Card>

          {/* FR2: AI Clinical Structuring */}
          <Card
            title="Instant Clinical Structuring by AI Agent 1"
            subtitle="Requirement FR2 • Triage Synthesis"
            className="border-t-2 border-t-charcoal-700 h-full"
            action={<Badge variant="in-consult" size="sm">FR2</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                Instead of burdening doctors with messy, rambling transcripts, AI Agent 1 instantly parses the spoken words into structured clinical fields: <strong>primary chief complaint</strong>, <strong>symptom duration</strong>, and <strong>clinical severity keywords</strong>.
              </p>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs font-mono text-gray-600">
                Speed: Triage JSON structured in under 3 seconds with zero manual data entry.
              </div>
            </div>
          </Card>

          {/* FR3: Patient Safeguard Confirmation */}
          <Card
            title="Review & Confirmation Safeguard"
            subtitle="Requirement FR3 • Patient Safety"
            className="border-t-2 border-t-gray-500 h-full"
            action={<Badge variant="tag" size="sm">FR3</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                Before any data reaches the doctor's queue, the patient sees a simple confirmation card showing what the system understood. The patient or assistant can tap "Confirm" to proceed or "Edit" to adjust duration or severity.
              </p>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs font-mono text-gray-600">
                Design: Clear high-contrast cards preventing clinical hallucination from entering records.
              </div>
            </div>
          </Card>

          {/* FR4: Queue Token Generation */}
          <Card
            title="Automated Token Issuance & Queue Placement"
            subtitle="Requirement FR4 • Physical Token Sync"
            className="border-t-2 border-t-gray-300 h-full"
            action={<Badge variant="at-pharmacy" size="sm">FR4</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                Upon confirmation, the kiosk assigns an official daily token number (e.g., Token #14) and adds the patient directly to the live waiting queue. The patient knows exactly where they stand without pushing or arguing at the reception desk.
              </p>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs font-mono text-gray-600">
                Sync: Updates the doctor's live waiting queue screen in real time via database events.
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
            See the Patient Kiosk in Action
          </h2>

          <p className="text-sm sm:text-base text-gray-700 font-sans max-w-2xl mx-auto leading-relaxed">
            Try entering symptoms using your voice or text, experience the instant AI triage summary, and see the token number generate live.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/app/kiosk">
              <Button variant="primary" size="lg">
                Launch Kiosk Demo
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

