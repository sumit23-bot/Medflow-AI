import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import SectionDivider from '../../components/ui/SectionDivider';

/**
 * CaseStudies.jsx — Phase 6 Section F (Steps 37–41)
 * Route: /case-studies
 * Purpose: Honest pre-pilot positioning page.
 *          Zero fabricated case studies, fake clinics, or invented statistics.
 *          Features transparent "What we expect to measure" evaluation framework
 *          based strictly on PRD.md Section 3 (Goals & Success Metrics).
 */
export default function CaseStudies() {
  useEffect(() => {
    document.title = "Clinical Case Studies & Field Pilots — MedFlow AI";

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
      {/* 1. HERO HEADER & PRE-PILOT POSITIONING (Step 38) */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50/70 to-white py-14 md:py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="tag" size="sm">
              PRD SECTION 6 (A6)
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <Badge variant="waiting" size="sm">
              FIELD EVALUATION
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-xs font-mono text-gray-600 uppercase tracking-wider">
              PILOT ONBOARDING PHASE
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink-950 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Clinical Case Studies & Field Pilot Evaluations
          </h1>

          {/* Transparent Pre-Pilot Statement */}
          <div className="max-w-3xl mx-auto bg-gray-50 border border-gray-300 p-6 rounded text-left space-y-3 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-ink-900"></span>
              <span className="font-mono text-xs font-bold text-ink-950 uppercase tracking-wider">
                Transparent Research Commitment
              </span>
            </div>
            <p className="text-base sm:text-lg text-ink-950 font-serif font-medium leading-snug">
              MedFlow AI is currently onboarding its first pilot clinics. Real case studies will be published here as results come in.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 font-sans leading-relaxed">
              We hold clinical research to the highest ethical standards. We do not publish simulated clinic names, fabricated before-and-after numbers, or synthetic testimonials. Every evaluation report featured on this page will be backed by verifiable operational data from active dispensary deployments.
            </p>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE EXPECT TO MEASURE (Step 39 — PRD Section 3) */}
      <section className="reveal-section py-16 px-4 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <SectionDivider label="Evaluation Framework" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink-950">
            What We Expect to Measure
          </h2>
          <p className="text-sm text-gray-600 font-sans max-w-2xl mx-auto">
            Directly derived from PRD Section 3 (Goals & Success Metrics), these five core benchmarks will define the clinical and operational success of our pilot cohorts:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Metric 1: Doctor Consult Time */}
          <Card
            title="1. Doctor Consult Time Reduction"
            subtitle="PRD Goal: Note-Taking Efficiency"
            className="border-t-2 border-t-ink-900 h-full"
            action={<Badge variant="waiting" size="sm">TARGET: -40%</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                <strong>Evaluation Target:</strong> -40% time spent on symptom re-explanation (via pre-structured AI summary).
              </p>
              <p className="text-xs text-gray-600">
                <strong>Methodology:</strong> We will measure the average consultation time per walk-in patient before and after introducing the kiosk triage summary, quantifying how many additional minutes doctors can dedicate to physical examination.
              </p>
              <div className="p-2.5 bg-gray-50 border border-gray-200 rounded text-xs font-mono text-gray-600">
                Benchmark: PRD Section 3 • Goal 1
              </div>
            </div>
          </Card>

          {/* Metric 2: Record Retention */}
          <Card
            title="2. Elimination of Patient Record Loss"
            subtitle="PRD Goal: Digital Archival Integrity"
            className="border-t-2 border-t-charcoal-700 h-full"
            action={<Badge variant="in-consult" size="sm">TARGET: 100%</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                <strong>Evaluation Target:</strong> 100% of visits digitally saved and instantly searchable across longitudinal visits.
              </p>
              <p className="text-xs text-gray-600">
                <strong>Methodology:</strong> Auditing pilot dispensaries against historical paper register attrition rates to verify zero lost histories, tear damage, or monsoon moisture destruction.
              </p>
              <div className="p-2.5 bg-gray-50 border border-gray-200 rounded text-xs font-mono text-gray-600">
                Benchmark: PRD Section 3 • Goal 2
              </div>
            </div>
          </Card>

          {/* Metric 3: Medicine Counter Wait */}
          <Card
            title="3. Medicine-Counter Queue Sync"
            subtitle="PRD Goal: Dispensary Throughput"
            className="border-t-2 border-t-gray-500 h-full"
            action={<Badge variant="at-pharmacy" size="sm">REAL-TIME</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                <strong>Evaluation Target:</strong> Prescription visible at the pharmacy counter within seconds of doctor submission.
              </p>
              <p className="text-xs text-gray-600">
                <strong>Methodology:</strong> Measuring end-to-end latency from clinician prescription submission to pharmacist screen rendering, tracking the reduction in secondary queue wait times for patients.
              </p>
              <div className="p-2.5 bg-gray-50 border border-gray-200 rounded text-xs font-mono text-gray-600">
                Benchmark: PRD Section 3 • Goal 3
              </div>
            </div>
          </Card>

          {/* Metric 4: Platform Adoption */}
          <Card
            title="4. Usability & Platform Adoption"
            subtitle="PRD Goal: Rural Interface Adoption"
            className="border-t-2 border-t-gray-300 h-full"
            action={<Badge variant="tag" size="sm">ADOPTION</Badge>}
          >
            <div className="space-y-3 text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                <strong>Evaluation Target:</strong> Number of clinics onboarded and total walk-in patients served monthly.
              </p>
              <p className="text-xs text-gray-600">
                <strong>Methodology:</strong> Tracking the completion rate of voice-first intake at kiosks among low-literacy patients and quantifying the reduction in reception desk registration burden.
              </p>
              <div className="p-2.5 bg-gray-50 border border-gray-200 rounded text-xs font-mono text-gray-600">
                Benchmark: PRD Section 3 • Goal 4
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. PILOT SITE CRITERIA */}
      <section className="reveal-section py-12 px-4 max-w-5xl mx-auto space-y-6">
        <div>
          <SectionDivider label="Pilot Selection Criteria" />
          <h2 className="text-2xl font-serif font-bold text-ink-950 mt-2">
            Who Can Participate in the Pilot Program
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-sans mt-1">
            We are actively identifying diverse healthcare environments to participate in our structured pre-pilot evaluation:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-sans">
          <div className="p-5 bg-gray-50 border border-gray-200 rounded space-y-2">
            <span className="font-mono uppercase text-[10px] text-gray-500 font-bold">Facility Type 1</span>
            <h3 className="font-serif font-bold text-ink-950 text-sm">Charitable Dispensaries</h3>
            <p className="text-gray-600 leading-relaxed">
              Free or low-cost community clinics serving rural or urban-poor populations with high walk-in morning token queues.
            </p>
          </div>

          <div className="p-5 bg-gray-50 border border-gray-200 rounded space-y-2">
            <span className="font-mono uppercase text-[10px] text-gray-500 font-bold">Facility Type 2</span>
            <h3 className="font-serif font-bold text-ink-950 text-sm">Solo Practitioner Clinics</h3>
            <p className="text-gray-600 leading-relaxed">
              Single-doctor general practices seeking to eliminate manual prescription writing and speed up patient consultation flow.
            </p>
          </div>

          <div className="p-5 bg-gray-50 border border-gray-200 rounded space-y-2">
            <span className="font-mono uppercase text-[10px] text-gray-500 font-bold">Facility Type 3</span>
            <h3 className="font-serif font-bold text-ink-950 text-sm">NGO & Mission Hospitals</h3>
            <p className="text-gray-600 leading-relaxed">
              Primary healthcare networks seeking epidemiological reporting and zero patient register loss across outreach centers.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CLOSING CTA (Step 40) */}
      <section className="reveal-section border-t border-gray-200 bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="waiting" size="sm">
            PILOT PARTNERSHIP
          </Badge>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950">
            Want to be our first case study? Partner with us.
          </h2>

          <p className="text-sm sm:text-base text-gray-700 font-sans max-w-2xl mx-auto leading-relaxed">
            Partner with MedFlow AI to deploy voice-first triage and synchronized dispensary workflows in your clinic. Receive priority onboarding, staff training, and dedicated evaluation support.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/contact">
              <Button variant="primary" size="lg">
                Partner With Us
              </Button>
            </Link>
            <Link to="/demo-request">
              <Button variant="outline" size="lg">
                Request a Live Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
