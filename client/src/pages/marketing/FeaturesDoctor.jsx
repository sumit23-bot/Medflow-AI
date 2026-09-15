import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import SectionDivider from '../../components/ui/SectionDivider';

/**
 * FeaturesDoctor.jsx — Phase 6 Section D (Step 26)
 * Route: /features/doctor-dashboard
 * Purpose: Real content for Doctor Dashboard (PRD FR5-FR9):
 *          Queue view, AI summary, prescription structuring, and history search.
 */
export default function FeaturesDoctor() {
  useEffect(() => {
    document.title = "Doctor Clinical Dashboard — MedFlow AI";

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
              PRD SECTION 7.2 (FR5–FR9)
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <Badge variant="in-consult" size="sm">
              CLINICIAN WORKSPACE
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink-950 tracking-tight leading-[1.15]">
            Doctor Clinical Dashboard: 40% Less Note-Taking, Total Queue Control
          </h1>

          <p className="text-lg md:text-xl text-gray-700 font-sans leading-relaxed max-w-3xl">
            Built specifically for physicians managing high-volume OPD shifts. Glance at pre-structured intake summaries, review longitudinal history, and structure prescriptions in seconds.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to="/app/queue">
              <Button variant="primary" size="lg">
                View Live Doctor Queue →
              </Button>
            </Link>
            <Link to="/demo-request">
              <Button variant="outline" size="lg">
                Schedule a Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THE 5 DOCTOR WORKFLOW PILLARS (FR5 to FR9) */}
      <section className="reveal-section py-16 px-4 max-w-5xl mx-auto space-y-10">
        <div>
          <SectionDivider label="Physician Interface & Tools" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink-950 mt-2">
            Eliminating Clerical Burden from the Consultation Room
          </h2>
          <p className="text-sm text-gray-600 font-sans mt-1 max-w-2xl">
            Every screen element is optimized for rapid decision-making so doctors spend their limited 5-to-10 minutes examining the patient, not writing in physical logbooks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FR5: Real-time Queue */}
          <Card
            title="Token-Ordered Real-Time Queue"
            subtitle="Requirement FR5 • Live Waiting List"
            className="border-t-2 border-t-ink-900 h-full"
            action={<Badge variant="waiting" size="sm">FR5</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                Doctors view a live waiting queue sorted strictly by assigned token number. As patients check in at the reception kiosk, their token appears automatically without refreshing the browser, complete with wait time indicators.
              </p>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs font-mono text-gray-600">
                Benefit: Eliminates chaotic door-crowding and unauthorized queue jumping in the OPD corridor.
              </div>
            </div>
          </Card>

          {/* FR6: AI Triage Summary & Past History */}
          <Card
            title="Pre-Structured AI Summary & Visit History"
            subtitle="Requirement FR6 • 40% Time Recovery"
            className="border-t-2 border-t-charcoal-700 h-full"
            action={<Badge variant="in-consult" size="sm">FR6</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                Selecting a patient instantly opens their intake card: primary chief complaint, symptom duration, and severity keywords pre-extracted by AI Agent 1, plus prior clinic visit records. The doctor immediately understands the situation before saying a word.
              </p>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs font-mono text-gray-600">
                Benefit: Cuts symptom re-explanation time by 40%, leaving more time for stethoscope and vitals exam.
              </div>
            </div>
          </Card>

          {/* FR7: Structured Diagnosis & Medication Input */}
          <Card
            title="Rapid Structured Form & Shorthand Input"
            subtitle="Requirement FR7 • Minimal Typing"
            className="border-t-2 border-t-gray-500 h-full"
            action={<Badge variant="tag" size="sm">FR7</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                Doctors enter diagnoses and medicines using intelligent auto-suggest dropdowns covering common primary healthcare conditions (URTI, gastroenteritis, hypertension, osteoarthritis) or type rapid clinical shorthand with voice note capabilities.
              </p>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs font-mono text-gray-600">
                Benefit: Rapid data entry designed specifically to match physician clinical muscle memory.
              </div>
            </div>
          </Card>

          {/* FR8: AI Prescription Structuring */}
          <Card
            title="Automated Prescription Structuring (Agent 2)"
            subtitle="Requirement FR8 • Vernacular Instructions"
            className="border-t-2 border-t-gray-400 h-full"
            action={<Badge variant="at-pharmacy" size="sm">FR8</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                AI Agent 2 converts the doctor's rapid notes into standardized dosage regimens (frequency, morning/night, after food) and generates localized vernacular patient instructions in Hindi and English so patients know exactly how to take their medications safely.
              </p>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs font-mono text-gray-600">
                Benefit: Doctor confirms with a single click before the prescription synchronizes to the medicine counter.
              </div>
            </div>
          </Card>
        </div>

        {/* FR9: Historical Search Engine */}
        <Card
          title="Instant Longitudinal Patient Search"
          subtitle="Requirement FR9 • Multi-Parameter Lookup"
          className="border-t-2 border-t-ink-950"
          action={<Badge variant="waiting" size="sm">FR9</Badge>}
        >
          <div className="space-y-3 text-sm text-gray-700 font-sans leading-relaxed">
            <p>
              Physicians can search past patient encounters in real time by patient name, phone number, or past token number directly from the consultation console. Recurring fevers, previous antibiotic courses, or chronic hypertension readings are pulled up in seconds, restoring longitudinal continuity of care that paper registers destroyed.
            </p>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs font-mono text-gray-600">
              Zero paper searching: No more sending clinic peons to rummage through dusty storehouse registers.
            </div>
          </div>
        </Card>
      </section>

      {/* 3. CLOSING CTA (Step 29) */}
      <section className="reveal-section border-t border-gray-200 bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="waiting" size="sm">
            NEXT STEP
          </Badge>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950">
            Experience the Doctor Workspace
          </h2>

          <p className="text-sm sm:text-base text-gray-700 font-sans max-w-2xl mx-auto leading-relaxed">
            Explore the live queue view, inspect structured clinical summaries, and test prescription drafting in our interactive product sandbox.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/app/queue">
              <Button variant="primary" size="lg">
                View Doctor Queue Demo
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg">
                View Pricing Plans
              </Button>
            </Link>
            <Link to="/demo-request">
              <Button variant="subtle" size="lg">
                Schedule a Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

