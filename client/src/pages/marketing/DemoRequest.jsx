import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import FormInput from '../../components/ui/FormInput';
import SectionDivider from '../../components/ui/SectionDivider';

/**
 * DemoRequest.jsx — Phase 6 Section J (Steps 61–65)
 * Route: /demo-request
 * Purpose: Interactive live demo booking form for clinic owners & administrators.
 *          Wires to POST /api/leads with source: "demo-request".
 */
export default function DemoRequest() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    clinicName: '',
    preferredDateTime: ''
  });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  useEffect(() => {
    document.title = "Schedule a Live Demo — MedFlow AI";

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

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.clinicName.trim()) {
      setStatus({
        state: 'error',
        message: 'Please fill in your name, email, phone number, and clinic name.'
      });
      return;
    }

    setStatus({ state: 'submitting', message: '' });

    try {
      const contactInfo = `${formData.email.trim()} | Phone: ${formData.phone.trim()}${
        formData.preferredDateTime.trim() ? ` | Preferred: ${formData.preferredDateTime.trim()}` : ''
      }`;

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'demo-request',
          name: formData.name.trim(),
          contact: contactInfo,
          clinic_name: formData.clinicName.trim()
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({
          state: 'success',
          message: "We'll reach out within 1-2 business days to schedule your demo."
        });
      } else {
        throw new Error(data.error || 'Failed to submit demo request. Please try again.');
      }
    } catch (err) {
      console.error('Demo request submission error:', err);
      setStatus({
        state: 'error',
        message: 'Unable to submit your demo request right now. Please check your internet connection or email us directly at hello@medflowai.in.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-ink-900">
      {/* 1. HERO HEADER */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50/70 to-white py-12 md:py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="tag" size="sm">
              PRD SECTION 6 (A14)
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <Badge variant="waiting" size="sm">
              PILOT ONBOARDING
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-xs font-mono text-gray-600 uppercase tracking-wider">
              INTERACTIVE WALKTHROUGH
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink-950 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Schedule a Live Demonstration of MedFlow AI
          </h1>

          <p className="text-lg md:text-xl text-gray-700 font-sans leading-relaxed max-w-3xl mx-auto">
            Experience the complete patient flow firsthand — from bilingual voice intake at the kiosk to real-time doctor queue triage and synchronized pharmacy fulfillment.
          </p>
        </div>
      </section>

      {/* 2. FORM & DEMO AGENDA SECTION */}
      <section className="reveal-section py-16 px-4 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Left Column: Booking Form (Steps 62–64) */}
          <div className="md:col-span-7">
            <Card
              title="Request a 20-Minute Demo"
              subtitle="Tailored to your clinic workflow, patient volume, and staff requirements"
              className="border-t-4 border-t-ink-900 shadow-sm"
              action={<Badge variant="waiting" size="sm">LIVE DEMO</Badge>}
            >
              {status.state === 'success' ? (
                <div className="p-8 bg-gray-50 border border-gray-300 rounded space-y-5 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-black text-white font-mono text-2xl shadow-sm">
                    ✓
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-ink-950 text-xl">
                      Demo Request Confirmed
                    </h3>
                    <p className="text-sm font-sans font-medium text-ink-900 leading-relaxed max-w-md mx-auto">
                      {status.message}
                    </p>
                  </div>

                  <div className="p-4 bg-white border border-gray-200 rounded text-left space-y-2 text-xs font-sans">
                    <div className="text-gray-500 font-mono uppercase tracking-wider text-[10px]">
                      Submitted Details
                    </div>
                    <div><strong className="text-ink-950">Name:</strong> {formData.name}</div>
                    <div><strong className="text-ink-950">Clinic:</strong> {formData.clinicName}</div>
                    <div><strong className="text-ink-950">Contact:</strong> {formData.email} • {formData.phone}</div>
                    {formData.preferredDateTime && (
                      <div><strong className="text-ink-950">Preferred Slot:</strong> {formData.preferredDateTime}</div>
                    )}
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setStatus({ state: 'idle', message: '' });
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          clinicName: '',
                          preferredDateTime: ''
                        });
                      }}
                    >
                      Book Another Demonstration
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput
                      label="Your Name"
                      id="demo-name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Dr. Alok Verma"
                      value={formData.name}
                      onChange={handleChange}
                    />

                    <FormInput
                      label="Email Address"
                      id="demo-email"
                      name="email"
                      type="email"
                      required
                      placeholder="e.g. alok@vermaclinic.in"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput
                      label="Phone / WhatsApp Number"
                      id="demo-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                    />

                    <FormInput
                      label="Clinic / Facility Name"
                      id="demo-clinic"
                      name="clinicName"
                      type="text"
                      required
                      placeholder="e.g. Verma Community Clinic"
                      value={formData.clinicName}
                      onChange={handleChange}
                    />
                  </div>

                  <FormInput
                    label="Preferred Date & Time (Optional)"
                    id="demo-datetime"
                    name="preferredDateTime"
                    type="text"
                    placeholder="e.g. Wednesday afternoon, 3 PM IST, or Friday morning"
                    value={formData.preferredDateTime}
                    onChange={handleChange}
                    helperText="We will do our best to accommodate your requested timing."
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
                      className="w-full text-center justify-center py-2.5"
                      disabled={status.state === 'submitting'}
                    >
                      {status.state === 'submitting' ? 'Submitting Request...' : 'Schedule Demo Session →'}
                    </Button>
                  </div>

                  <p className="text-[11px] text-gray-500 font-sans text-center">
                    No software installation or credit card required. Our team will demonstrate the live software over Google Meet or Zoom.
                  </p>
                </form>
              )}
            </Card>
          </div>

          {/* Right Column: Demo Agenda & Features Overview */}
          <div className="md:col-span-5 space-y-6">
            <SectionDivider label="What We Will Demonstrate" />

            <div className="space-y-4">
              <div className="p-5 bg-gray-50 border border-gray-200 rounded space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-ink-950 text-white font-mono text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  <h4 className="font-serif font-bold text-ink-950 text-sm">
                    Voice Kiosk & Patient Intake
                  </h4>
                </div>
                <p className="text-xs text-gray-600 font-sans leading-relaxed pl-8">
                  Witness bilingual voice transcription (Hindi & English), AI Agent 1 symptom structuring (chief complaint, duration, severity), and automated queue token issuance.
                </p>
              </div>

              <div className="p-5 bg-gray-50 border border-gray-200 rounded space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-ink-950 text-white font-mono text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  <h4 className="font-serif font-bold text-ink-950 text-sm">
                    Doctor Queue & Structured Summaries
                  </h4>
                </div>
                <p className="text-xs text-gray-600 font-sans leading-relaxed pl-8">
                  See how the pre-structured intake summary saves up to 40% of consultation note-taking time, paired with AI Agent 2 prescription structuring and fast visit history.
                </p>
              </div>

              <div className="p-5 bg-gray-50 border border-gray-200 rounded space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-ink-950 text-white font-mono text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  <h4 className="font-serif font-bold text-ink-950 text-sm">
                    Real-Time Pharmacy Dispensation
                  </h4>
                </div>
                <p className="text-xs text-gray-600 font-sans leading-relaxed pl-8">
                  Watch live prescriptions arrive at the medicine counter within seconds of doctor submission — eliminating lost paper slips and secondary token bottlenecks.
                </p>
              </div>

              <div className="p-5 bg-gray-50 border border-gray-200 rounded space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-ink-950 text-white font-mono text-xs flex items-center justify-center font-bold">
                    4
                  </span>
                  <h4 className="font-serif font-bold text-ink-950 text-sm">
                    Hardware & Deployment Feasibility
                  </h4>
                </div>
                <p className="text-xs text-gray-600 font-sans leading-relaxed pl-8">
                  Discuss practical setup requirements: runs on existing low-cost tablets, desktops, or touch kiosks with minimal bandwidth requirements.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white border border-gray-200 rounded space-y-3">
              <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                Direct Inquiries
              </div>
              <p className="text-xs text-gray-700 font-sans">
                Need institutional deployment or bulk multi-branch clinic onboarding? Contact our clinical partnerships desk directly:
              </p>
              <div className="pt-1 flex items-center justify-between">
                <a
                  href="mailto:hello@medflowai.in"
                  className="text-xs font-mono text-ink-950 underline font-semibold"
                >
                  hello@medflowai.in
                </a>
                <Link to="/contact">
                  <span className="text-xs font-serif font-bold text-ink-950 hover:underline">
                    Contact Form →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CLOSING CTA BANNER */}
      <section className="reveal-section border-t border-gray-200 bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-base font-serif font-bold text-ink-950">
              Want to try the patient kiosk right now?
            </h3>
            <p className="text-xs text-gray-600 font-sans">
              Test out our live voice triage and token generation interface in your browser immediately.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link to="/app/kiosk">
              <Button variant="outline" size="sm">
                Test Kiosk Live
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="primary" size="sm">
                View Pricing Tiers →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
