import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import SectionDivider from '../../components/ui/SectionDivider';

/**
 * Problem.jsx — Phase 6 Section B (A2: /problem)
 * Purpose: Ground-reality story and 4 core clinical pain points strictly matching
 *          PRD Section 2 (Problem Statement).
 */
export default function Problem() {
  useEffect(() => {
    document.title = "The Problem — MedFlow AI";

    // Scroll reveal observer consistent with Home page (Step 16)
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
      {/* 1. HEADER & HERO NARRATIVE (Steps 11, 12, 13 - PRD Section 2) */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50/70 to-white py-14 md:py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="tag" size="sm">
              PRD SECTION 2
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <Badge variant="waiting" size="sm">
              CLINICAL BOTTLENECK ANALYSIS
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
              GROUND REALITY AUDIT
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink-950 tracking-tight leading-[1.15]">
            The Problem: Overcrowded Walk-In Clinics & Paper-Based Failure
          </h1>

          <p className="text-lg md:text-xl text-gray-700 font-sans leading-relaxed max-w-3xl">
            At free and low-cost clinics, hundreds of patients arrive each morning. The manual paper system creates long lines, exhausts doctors in 5-to-10 minute consults, damages paper registers, and disconnects the medicine counter.
          </p>

          {/* PRD Section 2 Narrative Story */}
          <div className="bg-white border border-gray-300 p-6 rounded shadow-sm space-y-4 max-w-4xl text-sm font-sans text-gray-700 leading-relaxed">
            <h2 className="font-serif font-bold text-base text-ink-950 uppercase tracking-wide border-b border-gray-200 pb-2">
              The Ground Reality at Overcrowded Facilities
            </h2>
            <p>
              Free and low-cost clinics serve communities where patients are often daily-wage laborers. Losing half a day waiting in line means losing a day's livelihood. When hundreds of walk-in patients arrive simultaneously at morning OPD opening, the traditional physical paper workflow collapses under volume.
            </p>
            <p>
              Doctors are forced to balance massive patient volume against severe time pressure. With only 5 to 10 minutes available per consult, valuable diagnostic minutes are consumed by verbal re-explanation and laborious handwriting in physical logbooks rather than clinical examination.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE FOUR CORE CLINICAL PAIN POINTS (Step 14 - 4-Card Grid matching Problem Slide) */}
      <section className="reveal-section py-16 px-4 max-w-5xl mx-auto space-y-10">
        <div>
          <SectionDivider label="Key Failure Points" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink-950 mt-2">
            Four Compounding Breakdowns in Daily Clinic Operations
          </h2>
          <p className="text-sm text-gray-600 font-sans mt-1 max-w-2xl">
            Derived directly from PRD Section 2, these four issues compound throughout the day, creating friction for patients, clinicians, and pharmacists alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Long Token Lines */}
          <Card
            title="1. Exhausting Token Lines & Double Waiting"
            subtitle="PRD Section 2.1 • Intake Inefficiency"
            className="border-t-2 border-t-ink-900 h-full flex flex-col justify-between"
            action={<Badge variant="waiting" size="sm">Point 01</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans">
              <p>
                Patients stand in long morning token queues before the clinic even opens. After completing their consultation, they must join a <strong>second long line at the medicine counter</strong> to submit handwritten prescription slips.
              </p>
              <div className="bg-gray-50 border border-gray-200 p-3 rounded text-xs font-mono text-gray-600">
                Impact: 2+ hours wasted in physical lines for 5 minutes of direct doctor contact.
              </div>
            </div>
          </Card>

          {/* Card 2: Rushed Consults */}
          <Card
            title="2. 5–10 Minute Consults Lost to Note-Taking"
            subtitle="PRD Section 2.2 • Doctor Time Loss"
            className="border-t-2 border-t-charcoal-700 h-full flex flex-col justify-between"
            action={<Badge variant="in-consult" size="sm">Point 02</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans">
              <p>
                Doctors get only 5 to 10 minutes per patient. Most of that time is lost to <strong>patients re-explaining symptoms verbally</strong> and the doctor manually writing repetitive notes in physical registers rather than listening or conducting physical exams.
              </p>
              <div className="bg-gray-50 border border-gray-200 p-3 rounded text-xs font-mono text-gray-600">
                Impact: Severe clinician fatigue, high diagnostic stress, and rushed consultations.
              </div>
            </div>
          </Card>

          {/* Card 3: Lost Registers */}
          <Card
            title="3. Lost or Damaged Paper Registers"
            subtitle="PRD Section 2.3 • Medical Record Loss"
            className="border-t-2 border-t-gray-500 h-full flex flex-col justify-between"
            action={<Badge variant="tag" size="sm">Point 03</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans">
              <p>
                Paper registers get lost, torn, or moisture-damaged due to overcrowding and physical handling. <strong>No reliable patient history exists</strong> across multiple visits, forcing doctors to treat repeat chronic patients as complete strangers every time.
              </p>
              <div className="bg-gray-50 border border-gray-200 p-3 rounded text-xs font-mono text-gray-600">
                Impact: Zero continuity of care; inability to track adverse reactions or chronic illnesses.
              </div>
            </div>
          </Card>

          {/* Card 4: Second Medicine Counter Line */}
          <Card
            title="4. Disconnected Pharmacy Counter & Chit Matching"
            subtitle="PRD Section 2.4 • Dispensary Disconnect"
            className="border-t-2 border-t-gray-300 h-full flex flex-col justify-between"
            action={<Badge variant="at-pharmacy" size="sm">Point 04</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans">
              <p>
                Prescriptions are scribbled on paper chits that patients carry across to the dispensary. Pharmacists spend excessive time deciphering illegible doctor handwriting and manually verifying stock, with <strong>zero real-time data sync</strong> between doctor desk and medicine counter.
              </p>
              <div className="bg-gray-50 border border-gray-200 p-3 rounded text-xs font-mono text-gray-600">
                Impact: Dispensing errors, duplicated queues, and untracked inventory depletion.
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. ADMINISTRATIVE IMPACT SECTION */}
      <section className="reveal-section bg-gray-50 border-y border-gray-200 py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-gray-500 font-bold">
              ADMINISTRATIVE BLINDSPOT
            </span>
            <h2 className="text-2xl font-serif font-bold text-ink-950 mt-1">
              Zero Structured Data for Clinic Administrators
            </h2>
            <p className="text-sm text-gray-700 font-sans mt-2 max-w-3xl leading-relaxed">
              Beyond individual visit friction, PRD Section 2 highlights an institutional crisis: because all visit notes remain trapped in paper logs, clinic administrators have <strong>no structured data to plan staffing, track medicine stock depletion, or detect disease outbreak patterns</strong> in their community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-white border border-gray-300 rounded space-y-1">
              <div className="font-mono text-xs text-gray-500 font-semibold uppercase">Staffing Decisions</div>
              <div className="text-sm font-sans font-bold text-ink-950">Zero Hourly Load Visibility</div>
              <p className="text-xs text-gray-600">Inability to anticipate peak morning walk-in rushes versus afternoon lulls.</p>
            </div>
            <div className="p-4 bg-white border border-gray-300 rounded space-y-1">
              <div className="font-mono text-xs text-gray-500 font-semibold uppercase">Drug Inventory</div>
              <div className="text-sm font-sans font-bold text-ink-950">Frequent Stock-Outs</div>
              <p className="text-xs text-gray-600">No real-time linkage between prescribed medicines and pharmacy inventory levels.</p>
            </div>
            <div className="p-4 bg-white border border-gray-300 rounded space-y-1">
              <div className="font-mono text-xs text-gray-500 font-semibold uppercase">Disease Tracking</div>
              <div className="text-sm font-sans font-bold text-ink-950">Unseen Community Trends</div>
              <p className="text-xs text-gray-600">Viral spikes and seasonal waterborne outbreaks go unnoticed until hospitals overflow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLOSING CTA & TRANSITION TO SOLUTION (Step 15) */}
      <section className="reveal-section py-16 px-4 max-w-5xl mx-auto">
        <div className="border border-gray-300 bg-white rounded p-8 text-center space-y-6">
          <Badge variant="waiting" size="sm">
            TRANSITION TO ARCHITECTURE
          </Badge>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950">
            A Broken Workflow Cannot Be Solved with Another Paper Form
          </h2>

          <p className="text-sm sm:text-base text-gray-700 font-sans max-w-2xl mx-auto leading-relaxed">
            Eliminating paper registers, recovering 40% of doctor consult time, and synchronizing the medicine counter requires a voice-first, connected clinical pipeline.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/solution">
              <Button variant="primary" size="lg">
                See how MedFlow AI solves this →
              </Button>
            </Link>
            <Link to="/app/kiosk">
              <Button variant="outline" size="lg">
                Launch Kiosk Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

