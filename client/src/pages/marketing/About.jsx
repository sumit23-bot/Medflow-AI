import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import SectionDivider from '../../components/ui/SectionDivider';

/**
 * About.jsx — Phase 6 Section H (Steps 50–54)
 * Route: /about
 * Purpose: First-person mission-driven origin story and PRD Section 1 mission:
 *          Affordability across the economic spectrum, eliminating paper registers,
 *          and restoring clinician bandwidth in high-volume walk-in clinics.
 */
export default function About() {
  useEffect(() => {
    document.title = "About MedFlow AI — Mission, Origin Story & Team";

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
              PRD SECTION 6 (A12)
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <Badge variant="waiting" size="sm">
              OUR ORIGIN & MISSION
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-xs font-mono text-gray-600 uppercase tracking-wider">
              PRIMARY HEALTHCARE FIRST
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink-950 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Built for the Ground Reality of Walk-In Public Healthcare
          </h1>

          <p className="text-lg md:text-xl text-gray-700 font-sans leading-relaxed max-w-3xl mx-auto">
            We are engineers, clinicians, and researchers building voice-first digital infrastructure for the facilities that need it most: overcrowded dispensaries, rural primary centers, and community clinics serving the working public.
          </p>
        </div>
      </section>

      {/* 2. THE ORIGIN STORY (Step 51) */}
      <section className="reveal-section py-16 px-4 max-w-4xl mx-auto space-y-10">
        <div>
          <SectionDivider label="Our Origin Story" />
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 mt-2">
            We Built MedFlow AI After Seeing the Reality at the Clinic Gate
          </h2>
        </div>

        <div className="prose font-sans text-gray-800 space-y-6 leading-relaxed text-base sm:text-lg">
          <p>
            <strong>We built MedFlow AI after standing inside a crowded government dispensary on a hot Tuesday morning.</strong>
          </p>

          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            Long before the doctor arrived at 8:30 AM, more than eighty patients had already formed an anxious line snaking out of the veranda into the dusty courtyard. Many were daily-wage laborers who had surrendered half a day's earnings just to be there. Others were elderly patients with chronic respiratory struggles and mothers carrying infants with high fevers.
          </p>

          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            At the single registration desk, the bottleneck was immediate. A lone receptionist was frantically scribbling names, ages, and symptoms into thick, water-stained paper registers. In the humidity, pages tore easily; over seasons of monsoon rains and morning overcrowding, entire volumes of patient histories had simply vanished. A patient returning after three months had zero record of their prior blood pressure readings or drug reactions.
          </p>

          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            Inside the doctor's consultation chamber, the pressure was unrelenting. With eighty people waiting outside, the physician had only five to ten minutes per consultation. Yet more than half of that precious window was swallowed by verbal repetition: asking the patient to recount their complaints from scratch, clarifying timelines, and handwriting paper prescription chits. The doctor was forced to spend valuable cognitive energy acting as a clerical note-taker rather than conducting thorough physical examinations.
          </p>

          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            And when the consult finally ended, the patient's ordeal was only half over. They were handed a handwritten paper slip and directed to join a second, equally long queue outside the pharmacy counter—waiting another thirty minutes while the pharmacist manually deciphered handwriting and checked inventory stock.
          </p>

          <div className="p-6 bg-gray-50 border-l-4 border-l-ink-900 border-y border-r border-gray-200 rounded-r font-serif text-base text-ink-950 italic">
            "Most healthcare technology is built for urban professionals with smartphones and broadband. But the overwhelming majority of primary healthcare in India happens in walk-in clinics where patients cannot comfortably type or read digital screens. We realized that technology must meet patients where they stand—physically at the clinic gate, spoken in their own language, and requiring zero proprietary hardware."
          </div>

          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            MedFlow AI was designed to dismantle every one of these pain points: an open-access voice kiosk that structures symptoms into a clinical summary before the patient even enters the room; a live queue that saves 40% of the doctor's note-taking time; and instant digital synchronization to the medicine counter so the prescription is already waiting when the patient arrives.
          </p>
        </div>
      </section>

      {/* 3. OUR MISSION (Step 52 — PRD Section 1) */}
      <section className="reveal-section py-14 px-4 max-w-5xl mx-auto space-y-10 border-t border-gray-200">
        <div className="text-center space-y-2">
          <SectionDivider label="Core Mission" />
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950">
            Our Mission: Affordable Digitization Across the Full Economic Spectrum
          </h2>
          <p className="text-sm text-gray-600 font-sans max-w-2xl mx-auto">
            From PRD Section 1: MedFlow AI is engineered to be viable and beneficial whether a clinic serves daily-wage laborers at zero fee or operates as a private commercial healthcare practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            title="Zero Cost for the Underserved"
            subtitle="PRD Section 1 • Community Tier"
            className="border-t-2 border-t-ink-900 h-full"
            action={<Badge variant="waiting" size="sm">FREE FOREVER</Badge>}
          >
            <div className="space-y-3 text-xs sm:text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                Cost must never be the obstacle that prevents a charitable dispensary or village outpost from adopting modern triage. Our Community tier provides core voice intake, queue management, and digital records at ₹0 forever.
              </p>
            </div>
          </Card>

          <Card
            title="100% Record Permanence"
            subtitle="PRD Section 1 • Archival Integrity"
            className="border-t-2 border-t-charcoal-700 h-full"
            action={<Badge variant="in-consult" size="sm">ZERO DATA LOSS</Badge>}
          >
            <div className="space-y-3 text-xs sm:text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                Every walk-in visit is encrypted and digitally indexed across visits by name, phone, or daily token. No returning patient is ever treated without longitudinal clinical context, completely ending paper register loss.
              </p>
            </div>
          </Card>

          <Card
            title="Clinician-Centric Design"
            subtitle="PRD Section 1 • -40% Note-Taking Time"
            className="border-t-2 border-t-gray-500 h-full"
            action={<Badge variant="at-pharmacy" size="sm">CLINICIAN FIRST</Badge>}
          >
            <div className="space-y-3 text-xs sm:text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                By pre-structuring natural symptoms into glanceable intake cards, we reclaim 40% of consultation time otherwise lost to clerical repetition. Doctors spend their time examining and caring for patients.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* 4. THREE CORE PRINCIPLES */}
      <section className="reveal-section py-12 px-4 max-w-5xl mx-auto space-y-6">
        <div>
          <SectionDivider label="Operating Principles" />
          <h2 className="text-2xl font-serif font-bold text-ink-950 mt-2">
            How We Build & Deploy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm font-sans">
          <div className="p-6 bg-gray-50 border border-gray-200 rounded space-y-2">
            <span className="font-mono text-xs font-bold text-ink-950 uppercase">Principle 1: In-Person First, Not Remote Telehealth</span>
            <p className="text-gray-600 leading-relaxed">
              Primary healthcare is inherently physical. Patients need auscultation, palpation, and immediate medication dispensing. We build software to power the physical dispensary, not to replace the human doctor with a video call.
            </p>
          </div>

          <div className="p-6 bg-gray-50 border border-gray-200 rounded space-y-2">
            <span className="font-mono text-xs font-bold text-ink-950 uppercase">Principle 2: Zero Hardware Lock-In</span>
            <p className="text-gray-600 leading-relaxed">
              MedFlow AI runs in standard web browsers on everyday tablets, laptops, and second-hand computers. Clinics do not need to purchase expensive proprietary kiosks or specialized hardware to go fully paperless.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CLOSING CTA (Step 53) */}
      <section className="reveal-section border-t border-gray-200 bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="waiting" size="sm">
            NEXT STEP
          </Badge>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950">
            Read More About How It Works
          </h2>

          <p className="text-sm sm:text-base text-gray-700 font-sans max-w-2xl mx-auto leading-relaxed">
            Discover the complete 4-step synchronized flow—from patient voice intake at the kiosk, to the doctor's live queue, through to the synchronized medicine counter and digital records.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/solution">
              <Button variant="primary" size="lg">
                Read More About How It Works →
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg">
                Explore Subscription Tiers
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="subtle" size="lg">
                Contact Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
