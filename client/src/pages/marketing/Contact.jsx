import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import FormInput from '../../components/ui/FormInput';
import SectionDivider from '../../components/ui/SectionDivider';

/**
 * Contact.jsx — Phase 6 Section I (Steps 55–60)
 * Route: /contact
 * Purpose: Real contact form submitting to POST /api/leads with source: "contact".
 *          Includes direct contact information section with placeholder email.
 */
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    clinicName: '',
    message: ''
  });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  useEffect(() => {
    document.title = "Contact & Institutional Partnerships — MedFlow AI";

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

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        state: 'error',
        message: 'Please fill in your name, email address, and message.'
      });
      return;
    }

    setStatus({ state: 'submitting', message: '' });

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'contact',
          name: formData.name.trim(),
          contact: `${formData.email.trim()}${formData.message ? ` | Msg: ${formData.message.trim()}` : ''}`,
          clinic_name: formData.clinicName.trim() || null
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({
          state: 'success',
          message: 'Thank you for contacting MedFlow AI! Your message has been received. Our team will review your inquiry and respond within 1–2 business days.'
        });
      } else {
        throw new Error(data.error || 'Failed to submit message. Please try again.');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setStatus({
        state: 'error',
        message: 'Unable to send message right now. Please check your network connection or email us directly.'
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
              PRD SECTION 6 (A13)
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <Badge variant="waiting" size="sm">
              COMMUNICATION CHANNEL
            </Badge>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-xs font-mono text-gray-600 uppercase tracking-wider">
              PILOTS & INQUIRIES
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink-950 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Contact Our Clinical & Partnerships Team
          </h1>

          <p className="text-lg md:text-xl text-gray-700 font-sans leading-relaxed max-w-3xl mx-auto">
            Whether you manage a charitable dispensary, lead a rural health center, or represent an institutional public health mission, we are ready to discuss field pilots, deployment support, and technical integrations.
          </p>
        </div>
      </section>

      {/* 2. FORM & DIRECT CONTACT SECTION */}
      <section className="reveal-section py-16 px-4 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Left Column: Contact Form (Step 56 & 57) */}
          <div className="md:col-span-7">
            <Card
              title="Send Us a Message"
              subtitle="Direct response within 1–2 business days"
              className="border-t-4 border-t-ink-900 shadow-sm"
              action={<Badge variant="waiting" size="sm">INQUIRY FORM</Badge>}
            >
              {status.state === 'success' ? (
                <div className="p-6 bg-gray-50 border border-gray-300 rounded space-y-4 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white font-mono text-xl">
                    ✓
                  </div>
                  <h3 className="font-serif font-bold text-ink-950 text-lg">
                    Inquiry Submitted Successfully
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 font-sans leading-relaxed">
                    {status.message}
                  </p>
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setStatus({ state: 'idle', message: '' });
                        setFormData({ name: '', email: '', clinicName: '', message: '' });
                      }}
                    >
                      Send Another Message
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput
                      label="Your Name"
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Dr. Ramesh Gupta"
                      value={formData.name}
                      onChange={handleChange}
                    />

                    <FormInput
                      label="Email Address"
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="e.g. ramesh@hospital.org"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <FormInput
                    label="Clinic / Organization Name (Optional)"
                    id="contact-clinic"
                    name="clinicName"
                    type="text"
                    placeholder="e.g. Anand Gramin Dispensary"
                    value={formData.clinicName}
                    onChange={handleChange}
                  />

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-message"
                      className="font-sans text-xs font-semibold text-ink-950 uppercase tracking-wider flex items-center justify-between"
                    >
                      <span>
                        Your Message / Inquiry
                        <span className="text-black ml-1 font-serif">*</span>
                      </span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Tell us about your clinic volume, questions about voice triage, or interest in joining our initial pilot cohort..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm font-sans bg-white border border-gray-300 rounded text-ink-950 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-ink-900 resize-y"
                    />
                  </div>

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
                      {status.state === 'submitting' ? 'Sending Message...' : 'Send Message →'}
                    </Button>
                  </div>

                  <p className="text-[11px] text-gray-500 font-sans text-center">
                    We maintain clinical confidentiality. We will never share your email with third parties.
                  </p>
                </form>
              )}
            </Card>
          </div>

          {/* Right Column: Direct Contact Info (Step 59) */}
          <div className="md:col-span-5 space-y-6">
            <SectionDivider label="Direct Channels" />

            <div className="p-6 bg-gray-50 border border-gray-200 rounded space-y-4">
              <span className="font-mono text-xs font-bold text-ink-950 uppercase tracking-wider">
                Primary Contact
              </span>

              <div className="space-y-1">
                <div className="text-xs font-mono text-gray-500 uppercase">General Inquiries & Pilots</div>
                <a
                  href="mailto:hello@medflowai.in"
                  className="text-base font-serif font-bold text-ink-950 hover:underline block"
                >
                  hello@medflowai.in
                </a>
                <p className="text-xs text-gray-600 font-sans pt-1">
                  Our core support and partnerships inbox for clinic directors and health administrators.
                </p>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-1">
                <div className="text-xs font-mono text-gray-500 uppercase">Response Time</div>
                <div className="text-sm font-sans font-medium text-ink-950">
                  Within 24 to 48 hours
                </div>
                <p className="text-xs text-gray-600 font-sans">
                  Monday to Saturday: 9:00 AM – 6:00 PM IST
                </p>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-1">
                <div className="text-xs font-mono text-gray-500 uppercase">Location & Coverage</div>
                <div className="text-sm font-sans font-medium text-ink-950">
                  India Primary Healthcare Deployment
                </div>
                <p className="text-xs text-gray-600 font-sans">
                  Focused on free and low-cost dispensaries across rural and semi-urban districts.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded space-y-3">
              <span className="font-mono text-xs font-bold text-ink-950 uppercase tracking-wider">
                Looking for a Live Demonstration?
              </span>
              <p className="text-xs text-gray-600 font-sans leading-relaxed">
                If you prefer an interactive walkthrough of our voice kiosk, doctor dashboard, and pharmacy sync, book a dedicated demonstration session.
              </p>
              <div className="pt-1">
                <Link to="/demo-request">
                  <Button variant="outline" size="sm" className="w-full">
                    Book a Live Demo →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CLOSING LINKS */}
      <section className="reveal-section border-t border-gray-200 bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-base font-serif font-bold text-ink-950">
              Want to see our tiered subscription model?
            </h3>
            <p className="text-xs text-gray-600 font-sans">
              Learn about our permanent ₹0 Community tier and affordable clinic plans.
            </p>
          </div>
          <Link to="/pricing" className="shrink-0">
            <Button variant="primary" size="sm">
              View Pricing Tiers →
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
