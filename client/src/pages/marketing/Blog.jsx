import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import SectionDivider from '../../components/ui/SectionDivider';

/**
 * Shared Genuine Blog Posts Data
 * Sourced from PRD observations and clinical workflow design
 */
export const BLOG_POSTS = [
  {
    slug: 'why-we-built-medflow-ai',
    title: 'Why We Built MedFlow AI: What Crowded Village Clinics Taught Us About Healthcare Digitization',
    date: 'September 12, 2026',
    readTime: '4 min read',
    category: 'Field Observations',
    author: 'MedFlow Clinical Research Team',
    excerpt: 'Watching overcrowded morning queues at free village dispensaries revealed a fundamental truth: smartphone telehealth apps fail where ~80% of citizens lack digital comfort. Healthcare digitization must begin at the physical clinic gate.',
    sections: [
      {
        heading: 'The Ground Reality of Primary Care',
        paragraphs: [
          'In early 2026, our team spent time observing walk-in operations across rural dispensaries and free government clinics. The immediate reality is staggering: early in the morning, hours before doors open, dozens of patients—many of them daily-wage earners or elderly farmers—stand in winding token queues under whatever shade they can find.',
          'When the clinic opens, the chaos accelerates. A single desk clerk hurriedly records names in thick, tattered paper registers. In the monsoon season or during crowded mornings, these physical books get damaged, torn, or lost. For returning patients with chronic illnesses like hypertension or diabetes, longitudinal history essentially disappears.'
        ]
      },
      {
        heading: 'The 5-to-10 Minute Consultation Dilemma',
        paragraphs: [
          'Inside the consultation room, doctors face an insurmountable workload. With a continuous line of walk-in patients waiting outside, a physician has between five and ten minutes per consult. Tragic amounts of that precious time are consumed asking the same introductory questions: "What is your main problem? How many days? Did you take any tablet?"',
          'Instead of physical examinations and empathetic clinical care, the doctor acts as a manual scribe, scribbling hurried notes and handwritten prescription slips.'
        ]
      },
      {
        heading: 'Why Smartphone Telehealth Apps Fail Here',
        paragraphs: [
          'The modern healthtech sector has produced hundreds of smartphone apps, teleconsultation portals, and video call platforms. Yet in India\'s rural heartland, where digital literacy hovers around 20%, asking a patient to download an app, create an account, and upload photos simply does not work.',
          'The solution cannot demand that low-literacy citizens change their behavior. The digital interface must be physically stationed at the clinic gate, spoken in their local language, and completed in under sixty seconds.'
        ]
      },
      {
        heading: 'The MedFlow AI Architecture',
        paragraphs: [
          'MedFlow AI was designed from the ground up to solve the physical clinic bottleneck: a voice-first intake kiosk that structures symptoms into a glanceable clinical summary, an instant token queue, a doctor dashboard that cuts note-taking by 40%, and real-time digital sync to the medicine counter.',
          'By making the core Community tier free forever, we ensure that cost is never a barrier to dignified, organized primary healthcare.'
        ]
      }
    ]
  },
  {
    slug: 'the-40-percent-rule-voice-triage',
    title: 'The 40% Rule: Why Pre-Structured Voice Triage Speeds Up Doctor Consultations',
    date: 'September 14, 2026',
    readTime: '5 min read',
    category: 'Clinical Architecture',
    author: 'MedFlow Product Engineering',
    excerpt: 'When doctors only have 5 to 10 minutes per patient, verbal symptom repetition consumes valuable clinical bandwidth. Here is how dual-agent AI triage structuring restores the doctor-patient relationship.',
    sections: [
      {
        heading: 'The Cognitive Burden of Repetitive Intake',
        paragraphs: [
          'Every primary care physician is intimately familiar with the cognitive fatigue of repetitive triage. By patient number forty in a morning shift, repeatedly probing for symptom duration, fever spikes, or previous medication history becomes mentally exhausting.',
          'This friction doesn\'t just slow down the queue—it creates diagnostic fatigue. When time is scarce, subtle clinical details risk getting lost in the rush.'
        ]
      },
      {
        heading: 'Structuring Raw Natural Speech with Agent 1',
        paragraphs: [
          'When patients speak to the MedFlow kiosk in Hindi or colloquial English ("तीन दिन से बहुत तेज़ बुखार है और ठंड लग रही है"), AI Agent 1 doesn\'t simply transcribe words. It converts conversational speech into a deterministic JSON object containing chief complaint, verified duration, and high-priority severity indicators.',
          'Before submitting, the patient verifies this summary via an audio-visual confirmation card, ensuring total consent and accuracy.'
        ]
      },
      {
        heading: 'Reclaiming 40% of the Consult Window',
        paragraphs: [
          'When the doctor calls the patient\'s token number, their screen already presents the structured triage snapshot. The doctor doesn\'t spend the first 3 minutes establishing basic facts; they glance at the card in 5 seconds and immediately begin physical auscultation, palpation, and focused diagnostic inquiry.',
          'This 40% time saving directly translates to shorter hall queues and higher quality medical assessments per patient.'
        ]
      },
      {
        heading: 'Closing the Loop at the Medicine Counter',
        paragraphs: [
          'Once the diagnosis is confirmed, AI Agent 2 structures the prescription into localized patient instructions and instantly transmits it to the pharmacy screen. The patient walks straight to the dispensary counter without waiting in a second paper chit line.',
          'This is what true clinical workflow synchronization looks like in high-volume public medicine.'
        ]
      }
    ]
  }
];

/**
 * Blog.jsx — Phase 6 Section G (Step 47)
 * Route: /resources/blog
 * Purpose: Field notes and articles on primary care digitization, voice triage, and clinic operations.
 */
export default function Blog() {
  useEffect(() => {
    document.title = "Field Notes & Healthcare Articles — MedFlow AI";

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
      {/* 1. HERO HEADER & BREADCRUMB */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50/70 to-white py-12 md:py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link
              to="/resources"
              className="text-xs font-mono uppercase tracking-wider text-gray-600 hover:text-black hover:underline"
            >
              ← Back to all resources
            </Link>
            <span className="text-gray-400 text-xs">•</span>
            <Badge variant="waiting" size="sm">
              PRD SECTION 10 (LEAD MAGNET 8)
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <Badge variant="tag" size="sm">
              FIELD NOTES
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink-950 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Rural HealthTech Field Notes & Articles
          </h1>

          <p className="text-lg md:text-xl text-gray-700 font-sans leading-relaxed max-w-3xl mx-auto">
            Practical essays, engineering field notes, and observational research on modernizing high-volume walk-in clinics without proprietary hardware.
          </p>
        </div>
      </section>

      {/* 2. ARTICLES INDEX (Step 47) */}
      <section className="reveal-section py-16 px-4 max-w-5xl mx-auto space-y-10">
        <div>
          <SectionDivider label="Published Essays" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink-950 mt-2">
            Clinical Insights from the Ground Up
          </h2>
          <p className="text-sm text-gray-600 font-sans mt-1">
            Genuine field research examining how low-cost clinics can replace paper registers and optimize queue throughput.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <Card
              key={post.slug}
              title={post.title}
              subtitle={`${post.date} • ${post.readTime}`}
              className="border-t-4 border-t-ink-900 flex flex-col justify-between h-full bg-white shadow-sm"
              action={<Badge variant="waiting" size="sm">{post.category}</Badge>}
            >
              <div className="space-y-4 pt-2">
                <p className="text-xs sm:text-sm text-gray-700 font-sans leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-mono">
                  <span>By {post.author}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>

              <div className="pt-6 mt-auto">
                <Link to={`/resources/blog/${post.slug}`} className="block w-full">
                  <Button variant="primary" className="w-full">
                    Read Full Article →
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. NEWSLETTER / CONTACT SECTION */}
      <section className="reveal-section border-t border-gray-200 bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <Badge variant="waiting" size="sm">
            CONTRIBUTE
          </Badge>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950">
            Have Clinical Field Insights to Share?
          </h2>

          <p className="text-sm sm:text-base text-gray-700 font-sans leading-relaxed">
            We actively collaborate with doctors, public health researchers, and clinic superintendents to document clinical queue bottlenecks.
          </p>

          <div className="flex justify-center gap-3 pt-2">
            <Link to="/contact">
              <Button variant="primary" size="lg">
                Contact Research Team
              </Button>
            </Link>
            <Link to="/demo-request">
              <Button variant="outline" size="lg">
                Request a Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
