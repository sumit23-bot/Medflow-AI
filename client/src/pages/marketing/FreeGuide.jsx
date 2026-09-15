import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import FormInput from '../../components/ui/FormInput';
import SectionDivider from '../../components/ui/SectionDivider';

/**
 * FreeGuide.jsx — Phase 6 Section G (Steps 43–44)
 * Route: /resources/free-guide
 * Purpose: Lead magnet page for "How to Digitize Your Clinic Without Losing a Single Record".
 *          Submits to POST /api/leads with source: "free-guide".
 *          Honest success message: "Thanks — check your email for the guide" (no fake download link).
 */
export default function FreeGuide() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    clinicName: ''
  });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  useEffect(() => {
    document.title = "Free Clinic Digitization Guide — MedFlow AI";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setStatus({ state: 'error', message: 'Please provide both your name and email address.' });
      return;
    }

    setStatus({ state: 'submitting', message: '' });

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'free-guide',
          name: formData.name.trim(),
          contact: formData.email.trim(),
          clinic_name: formData.clinicName.trim() || null
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({
          state: 'success',
          message: 'Thanks — check your email for the guide! As we finalize publication, your copy will be delivered straight to your inbox.'
        });
      } else {
        throw new Error(data.error || 'Failed to request guide. Please try again.');
      }
    } catch (err) {
      console.error('Guide lead submission error:', err);
      setStatus({
        state: 'error',
        message: err.message || 'Unable to submit request. Please check your connection and try again.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-ink-900">
      {/* 1. HEADER & BREADCRUMB */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50/70 to-white py-12 md:py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/resources"
              className="text-xs font-mono uppercase tracking-wider text-gray-600 hover:text-black hover:underline"
            >
              ← Back to all resources
            </Link>
            <span className="text-gray-400 text-xs">•</span>
            <Badge variant="waiting" size="sm">
              PRD SECTION 10 (LEAD MAGNET 1)
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <Badge variant="tag" size="sm">
              FREE HANDBOOK
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink-950 tracking-tight leading-[1.15] max-w-4xl">
            How to Digitize Your Clinic Without Losing a Single Record
          </h1>

          <p className="text-lg md:text-xl text-gray-700 font-sans leading-relaxed max-w-3xl">
            The complete operational blueprint for high-volume walk-in clinics, charitable dispensaries, and private medical practices transitioning from physical paper registers to modern digital flow.
          </p>
        </div>
      </section>

      {/* 2. PITCH & FORM SECTION */}
      <section className="reveal-section py-16 px-4 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Left Column: What's Inside the Guide (Pitch) */}
          <div className="md:col-span-7 space-y-6">
            <SectionDivider label="Inside the Handbook" />
            <h2 className="text-2xl font-serif font-bold text-ink-950">
              A Practical Field Guide for Healthcare Administrators
            </h2>

            <p className="text-sm text-gray-700 font-sans leading-relaxed">
              Paper registers are vulnerable to tear, moisture damage, and chaotic morning rushes. This comprehensive guide outlines how rural clinics and high-volume dispensaries can implement a fail-safe digital pipeline without heavy infrastructure investments.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 bg-gray-50 border border-gray-200 rounded space-y-1">
                <div className="font-mono text-xs font-bold text-ink-950 uppercase">Chapter 1: The Paper Register Crisis</div>
                <p className="text-xs text-gray-600 font-sans">
                  The hidden operational costs of lost patient history, misplaced token cards, and secondary dispensary queues.
                </p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded space-y-1">
                <div className="font-mono text-xs font-bold text-ink-950 uppercase">Chapter 2: Low-Literacy Voice Intake</div>
                <p className="text-xs text-gray-600 font-sans">
                  Deploying bilingual voice-first triage kiosks (Hindi & English) so patients can register without typing or reception friction.
                </p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded space-y-1">
                <div className="font-mono text-xs font-bold text-ink-950 uppercase">Chapter 3: Reclaiming 40% Doctor Time</div>
                <p className="text-xs text-gray-600 font-sans">
                  How glanceable, pre-structured symptom summaries eliminate repetitive verbal questions during 5–10 minute consultations.
                </p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded space-y-1">
                <div className="font-mono text-xs font-bold text-ink-950 uppercase">Chapter 4: Government Incentive Roadmap</div>
                <p className="text-xs text-gray-600 font-sans">
                  Aligning your dispensary with India's Digital Health Incentive Scheme (DHIS) and ABDM readiness standards.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Capture Form */}
          <div className="md:col-span-5">
            <Card
              title="Request Your Free Copy"
              subtitle="Instant Access • Zero Cost"
              className="border-t-4 border-t-ink-900 sticky top-6 shadow-sm"
              action={<Badge variant="waiting" size="sm">PDF GUIDE</Badge>}
            >
              {status.state === 'success' ? (
                <div className="p-6 bg-gray-50 border border-gray-300 rounded space-y-4 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white font-mono text-xl">
                    ✓
                  </div>
                  <h3 className="font-serif font-bold text-ink-950 text-lg">
                    Request Received!
                  </h3>
                  <p className="text-xs text-gray-700 font-sans leading-relaxed">
                    {status.message}
                  </p>
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setStatus({ state: 'idle', message: '' });
                        setFormData({ name: '', email: '', clinicName: '' });
                      }}
                    >
                      Submit Another Email
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                  <p className="text-xs text-gray-600 font-sans">
                    Enter your details below to receive the complete handbook directly in your inbox.
                  </p>

                  <FormInput
                    label="Full Name"
                    id="guide-name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Sharma"
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <FormInput
                    label="Email Address"
                    id="guide-email"
                    name="email"
                    type="email"
                    required
                    placeholder="e.g. doctor@clinic.org"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <FormInput
                    label="Clinic / Organization (Optional)"
                    id="guide-clinic"
                    name="clinicName"
                    type="text"
                    placeholder="e.g. Seva Charitable Dispensary"
                    value={formData.clinicName}
                    onChange={handleChange}
                  />

                  {status.state === 'error' && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 font-sans">
                      {status.message}
                    </div>
                  )}

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      disabled={status.state === 'submitting'}
                    >
                      {status.state === 'submitting' ? 'Submitting Request...' : 'Send Me the Free Guide →'}
                    </Button>
                  </div>

                  <p className="text-[11px] text-gray-500 font-sans text-center">
                    We respect clinical privacy. Your contact info will never be sold or shared.
                  </p>
                </form>
              )}
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
