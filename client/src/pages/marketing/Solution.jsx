import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import SectionDivider from '../../components/ui/SectionDivider';

/**
 * Solution.jsx — Phase 6 Section C (A3: /solution)
 * Purpose: End-to-end 4-step clinical flow and multi-agent AI pipeline strictly
 *          matching PRD Section 7 (Functional Requirements).
 */
export default function Solution() {
  useEffect(() => {
    document.title = "The Solution — MedFlow AI";

    // Scroll reveal observer consistent with Home & Problem pages (Step 16 / 23)
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
      {/* 1. HERO SECTION (Steps 18 & 19 - End-to-End Overview) */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50/70 to-white py-14 md:py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="tag" size="sm">
              PRD SECTION 7
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <Badge variant="waiting" size="sm">
              CLINICAL WORKFLOW ARCHITECTURE
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
              END-TO-END SPECIFICATION
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink-950 tracking-tight leading-[1.15]">
            The Solution: A 4-Step Synchronized, Paperless Clinical Pipeline
          </h1>

          <p className="text-lg md:text-xl text-gray-700 font-sans leading-relaxed max-w-3xl">
            MedFlow AI connects the physical clinic from walk-in patient arrival to medicine dispensing into a unified, voice-first digital loop — replacing paper registers, eliminating verbal symptom re-explanation, and synchronizing the pharmacy counter in real time.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to="/app/kiosk">
              <Button variant="primary" size="lg">
                See it live →
              </Button>
            </Link>
            <Link to="/features">
              <Button variant="outline" size="lg">
                Explore Feature Modules
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. 4-STEP DETAILED FLOW SECTION (Step 20 - Kiosk -> Doctor -> Counter -> Record) */}
      <section className="reveal-section py-16 px-4 max-w-5xl mx-auto space-y-12">
        <div>
          <SectionDivider label="Core Operational Loop" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink-950 mt-2">
            How Every Step Feeds the Next Without Paper
          </h2>
          <p className="text-sm text-gray-600 font-sans mt-1 max-w-2xl">
            Each stage is engineered to eliminate manual data entry, prevent record loss, and transfer clinical context seamlessly to the next team member.
          </p>
        </div>

        <div className="space-y-8">
          {/* Step 1: Patient Kiosk */}
          <Card
            title="Step 1: Patient Kiosk — Voice-First Triage & Token Issuance"
            subtitle="PRD Section 7.1 • FR1 to FR4"
            className="border-l-4 border-l-ink-900 shadow-sm"
            action={<Badge variant="waiting" size="sm">01 / Intake</Badge>}
          >
            <div className="space-y-4 text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                When a walk-in patient arrives at the clinic, they register at a shared touchscreen tablet or counter kiosk without needing their own smartphone. The patient speaks their symptoms naturally in Hindi or English using the browser-native Web Speech API, or types if preferred. AI Agent 1 immediately structures the unstructured symptom narrative into an actionable clinical summary containing the <strong>chief complaint, duration, and severity keywords</strong>.
              </p>
              <p>
                Before submission, the patient or assisting clinic receptionist verifies the structured summary on screen as an essential accuracy safeguard. Once confirmed, the system assigns a unique daily token number and places the patient into the live clinical queue instantly.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-gray-600">
                <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">FR1: Voice/Text in Hindi & English</span>
                <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">FR2: AI Symptom Structuring</span>
                <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">FR3: Patient Safeguard Confirmation</span>
                <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">FR4: Live Token Issuance</span>
              </div>
            </div>
          </Card>

          {/* Step 2: Doctor Dashboard */}
          <Card
            title="Step 2: Doctor Dashboard — Pre-Structured Triage & Rapid Prescription"
            subtitle="PRD Section 7.2 • FR5 to FR9"
            className="border-l-4 border-l-charcoal-700 shadow-sm"
            action={<Badge variant="in-consult" size="sm">02 / Consult</Badge>}
          >
            <div className="space-y-4 text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                The doctor sees a live, real-time queue ordered strictly by token number. When clicking a waiting patient, the doctor is instantly presented with the AI-generated symptom summary alongside any previous visit history on file. Because the doctor does not need to spend the first 3 to 5 minutes verbally extracting and writing down basic complaint history, <strong>note-taking time is reduced by 40%</strong>, allowing full focus on physical examination and diagnosis.
              </p>
              <p>
                To prescribe, the doctor uses rapid structured dropdowns for common primary care diagnoses and medicines, supplemented by voice-to-text or free-text notes. AI Agent 2 immediately converts the doctor's shorthand into a standardized, patient-readable prescription complete with dosage schedules and localized patient care instructions.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-gray-600">
                <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">FR5: Token-Ordered Queue</span>
                <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">FR6: Glanceable AI Summary</span>
                <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">FR7: Structured Rx Dropdowns</span>
                <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">FR8: AI Prescription Structuring</span>
              </div>
            </div>
          </Card>

          {/* Step 3: Medicine Counter */}
          <Card
            title="Step 3: Medicine Counter — Live Dispensary Queue Synchronization"
            subtitle="PRD Section 7.3 • FR10 to FR11"
            className="border-l-4 border-l-gray-500 shadow-sm"
            action={<Badge variant="at-pharmacy" size="sm">03 / Dispense</Badge>}
          >
            <div className="space-y-4 text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                The exact second the doctor confirms the consultation, the digital prescription synchronizes live to the pharmacy counter's active queue. The patient no longer carries a paper chit across the courtyard, and the pharmacist no longer struggles to decipher illegible handwritten notes or match tokens manually.
              </p>
              <p>
                When the patient arrives at the dispensary counter, their prescription is already loaded on the pharmacist's screen. The pharmacist dispenses the required medications according to structured dosages and clicks "Mark as Dispensed", automatically clearing the patient from the active waiting queue and logging the fulfillment.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-gray-600">
                <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">FR10: Instant Realtime Queue Sync</span>
                <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">FR11: Single-Click Dispense Logging</span>
                <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">Zero Paper Slips</span>
              </div>
            </div>
          </Card>

          {/* Step 4: Digital Health Records */}
          <Card
            title="Step 4: Digital Health Records — Permanent, Searchable Archival"
            subtitle="PRD Section 7.4 • FR12 to FR13"
            className="border-l-4 border-l-gray-300 shadow-sm"
            action={<Badge variant="tag" size="sm">04 / Archive</Badge>}
          >
            <div className="space-y-4 text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                Every completed patient visit is permanently encrypted and indexed in the clinic's multi-tenant database. Paper registers that were historically subject to water damage, physical tearing, or misplacement during rush hours are completely eliminated.
              </p>
              <p>
                Clinic staff and doctors can search past visits instantly by patient name, token number, or contact number. Each record preserves the full clinical encounter: date, chief symptoms, doctor diagnosis, prescribed medicines, and dispensing timestamp—ensuring seamless longitudinal care when patients return weeks or months later.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-gray-600">
                <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">FR12: 100% Searchable Digital Archive</span>
                <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">FR13: Permanent Clinical Audit History</span>
                <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">Printable Physical Export</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. MULTI-AGENT AI PIPELINE SECTION (Step 21 - Plain Language Pipeline) */}
      <section className="reveal-section bg-gray-50 border-y border-gray-200 py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-gray-600 font-semibold">
              BACKEND INTELLIGENCE ARCHITECTURE
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink-950 mt-1">
              The 3-Agent Clinical AI Pipeline
            </h2>
            <p className="text-sm text-gray-600 font-sans mt-2 max-w-3xl leading-relaxed">
              MedFlow AI coordinates three specialized, lightweight AI agents built on top of Gemini API. Each agent is purpose-scoped to perform a single clinical translation step, backed by in-memory caching and safe deterministic fallbacks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Agent 1 */}
            <div className="bg-white border border-gray-300 p-6 rounded shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase font-bold text-gray-500">Agent 01</span>
                <Badge variant="waiting" size="sm">Triage Intake</Badge>
              </div>
              <h3 className="font-serif font-bold text-lg text-ink-950">
                Symptom Structuring
              </h3>
              <p className="text-xs font-mono text-gray-500">
                PRD FR2 • /api/kiosk/symptom
              </p>
              <p className="text-sm text-gray-700 leading-relaxed font-sans">
                Converts raw, conversational Hindi, English, or Hinglish spoken symptoms into standardized clinical parameters: <em>chief complaint, duration, and severity keywords</em> before the doctor begins the consultation.
              </p>
            </div>

            {/* Agent 2 */}
            <div className="bg-white border border-gray-300 p-6 rounded shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase font-bold text-gray-500">Agent 02</span>
                <Badge variant="in-consult" size="sm">Consultation</Badge>
              </div>
              <h3 className="font-serif font-bold text-lg text-ink-950">
                Prescription Structuring
              </h3>
              <p className="text-xs font-mono text-gray-500">
                PRD FR8 • /api/doctor/prescription
              </p>
              <p className="text-sm text-gray-700 leading-relaxed font-sans">
                Translates rapid doctor diagnosis and medicine shorthand into structured pharmaceutical arrays with standardized dosages, frequencies, durations, and localized vernacular instructions for the patient.
              </p>
            </div>

            {/* Agent 3 */}
            <div className="bg-white border border-gray-300 p-6 rounded shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase font-bold text-gray-500">Agent 03</span>
                <Badge variant="tag" size="sm">Follow-Up Loop</Badge>
              </div>
              <h3 className="font-serif font-bold text-lg text-ink-950">
                Follow-Up Reminders
              </h3>
              <p className="text-xs font-mono text-gray-500">
                PRD FR21 • Scheduled Service
              </p>
              <p className="text-sm text-gray-700 leading-relaxed font-sans">
                Generates concise, WhatsApp/SMS-ready follow-up messages from the clinical record, reminding chronic care patients when their medicine schedule ends and when to return for checkups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLOSING CTA (Step 22 - "See it live" -> /app/kiosk) */}
      <section className="reveal-section py-16 px-4 max-w-5xl mx-auto">
        <div className="border border-gray-300 bg-white rounded p-8 text-center space-y-6">
          <Badge variant="waiting" size="sm">
            INTERACTIVE SYSTEM DEMO
          </Badge>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950">
            Experience the End-to-End Workflow in Real Time
          </h2>

          <p className="text-sm sm:text-base text-gray-700 font-sans max-w-2xl mx-auto leading-relaxed">
            Test the live patient kiosk with Hindi or English voice input, watch the symptom summary structure automatically, and observe real-time queue synchronization.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/app/kiosk">
              <Button variant="primary" size="lg">
                See it live →
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg">
                View Subscription Tiers
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

