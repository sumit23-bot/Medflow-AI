import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import SectionDivider from '../../components/ui/SectionDivider';

/**
 * Resources.jsx — Phase 6 Section G (Step 42)
 * Route: /resources
 * Purpose: Healthcare resources and field tools hub linking to:
 *          Free Guide, ROI Calculator, and Clinical Blog.
 *          Built with PRD.md Section 10 (Lead Magnets) language.
 */
export default function Resources() {
  useEffect(() => {
    document.title = "Healthcare Resources & Field Tools — MedFlow AI";

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
              PRD SECTION 10
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <Badge variant="waiting" size="sm">
              KNOWLEDGE & TOOLS
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-xs font-mono text-gray-600 uppercase tracking-wider">
              FIELD RESOURCE HUB
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink-950 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Practical Tools & Insights for High-Volume Walk-In Healthcare
          </h1>

          <p className="text-lg md:text-xl text-gray-700 font-sans leading-relaxed max-w-3xl mx-auto">
            Explore our curated collection of operational playbooks, interactive planning tools, and primary care research notes designed to help dispensaries digitize with confidence.
          </p>
        </div>
      </section>

      {/* 2. 3-CARD RESOURCE DIRECTORY (Step 42) */}
      <section className="reveal-section py-16 px-4 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <SectionDivider label="Core Resources" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink-950">
            Field Guides, Calculators & Research Articles
          </h2>
          <p className="text-sm text-gray-600 font-sans max-w-2xl mx-auto">
            Free operational resources developed from direct observational research in crowded village clinics and primary health centers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Free Guide */}
          <Card
            title="Clinic Digitization Playbook"
            subtitle="PRD Item 10.1 • Downloadable Blueprint"
            className="border-t-4 border-t-ink-900 flex flex-col justify-between h-full bg-white"
            action={<Badge variant="waiting" size="sm">PLAYBOOK</Badge>}
          >
            <div className="space-y-4 pt-2">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="font-serif font-bold text-ink-950 text-base">
                  How to Digitize Your Clinic Without Losing a Single Record
                </h3>
              </div>

              <p className="text-xs text-gray-600 font-sans leading-relaxed">
                A step-by-step operational handbook explaining how busy walk-in clinics can transition away from paper registers without disrupting daily patient queues.
              </p>

              <div className="space-y-1.5 text-xs text-gray-700 font-sans">
                <div className="font-mono uppercase text-[10px] text-gray-500 font-bold">Key Topics:</div>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Eliminating physical register damage & paper loss</li>
                  <li>Deploying voice-first bilingual intake kiosks</li>
                  <li>Pre-structuring symptoms to reduce consult rush</li>
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-auto">
              <Link to="/resources/free-guide" className="block w-full">
                <Button variant="primary" className="w-full">
                  Access Free Guide →
                </Button>
              </Link>
            </div>
          </Card>

          {/* Card 2: ROI Calculator */}
          <Card
            title="Clinic Time Savings Calculator"
            subtitle="PRD Item 10.2 • Interactive Planning Tool"
            className="border-t-4 border-t-charcoal-700 flex flex-col justify-between h-full bg-white shadow-sm"
            action={<Badge variant="in-consult" size="sm">CALCULATOR</Badge>}
          >
            <div className="space-y-4 pt-2">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="font-serif font-bold text-ink-950 text-base">
                  Interactive Patient Flow & Hours Saved Modeler
                </h3>
              </div>

              <p className="text-xs text-gray-600 font-sans leading-relaxed">
                Estimate the clinical hours your doctors will reclaim and the total patient records protected from loss based on your clinic's actual daily patient count.
              </p>

              <div className="space-y-1.5 text-xs text-gray-700 font-sans">
                <div className="font-mono uppercase text-[10px] text-gray-500 font-bold">Interactive Metrics:</div>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Daily & monthly clinician hours reclaimed</li>
                  <li>Annual patient visit histories secured (365x)</li>
                  <li>Dispensary prescription sync wait reduction</li>
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-auto">
              <Link to="/resources/roi-calculator" className="block w-full">
                <Button variant="primary" className="w-full">
                  Calculate Savings →
                </Button>
              </Link>
            </div>
          </Card>

          {/* Card 3: Research Blog */}
          <Card
            title="Field Notes & Articles"
            subtitle="PRD Item 10.8 • Clinical Engineering Blog"
            className="border-t-4 border-t-gray-500 flex flex-col justify-between h-full bg-white"
            action={<Badge variant="tag" size="sm">ARTICLES</Badge>}
          >
            <div className="space-y-4 pt-2">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="font-serif font-bold text-ink-950 text-base">
                  Rural HealthTech Field Notes & System Insights
                </h3>
              </div>

              <p className="text-xs text-gray-600 font-sans leading-relaxed">
                In-depth articles examining public healthcare challenges, voice triage in non-English contexts, and practical system architecture for low-connectivity clinics.
              </p>

              <div className="space-y-1.5 text-xs text-gray-700 font-sans">
                <div className="font-mono uppercase text-[10px] text-gray-500 font-bold">Featured Essays:</div>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Why We Built MedFlow AI: Ground reality insights</li>
                  <li>The 40% Rule: Pre-structured voice triage</li>
                  <li>Paperless workflows for daily-wage dispensaries</li>
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-auto">
              <Link to="/resources/blog" className="block w-full">
                <Button variant="outline" className="w-full">
                  Read Articles →
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. CLOSING CTA */}
      <section className="reveal-section border-t border-gray-200 bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="waiting" size="sm">
            NEXT STEPS
          </Badge>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950">
            Looking for Custom Guidance for Your Clinic?
          </h2>

          <p className="text-sm sm:text-base text-gray-700 font-sans max-w-2xl mx-auto leading-relaxed">
            Our deployment team works directly with healthcare providers and NGO networks to design customized triage and queue digitization workflows.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/demo-request">
              <Button variant="primary" size="lg">
                Schedule a Clinic Consultation
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contact Research Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
