# MedFlow AI — Product Requirements Document (PRD)

**Version:** 1.0 | **Status:** Hackathon Build → Business-Ready Spec  
**Platform:** Rural Clinic Triage, Digitization & Queue Sync Platform  

---

## 1. Executive Summary
MedFlow AI is an AI-powered, voice-first platform that digitizes the walk-in patient flow at free/low-cost clinics — replacing paper registers, reducing doctor consult time spent on note-taking, and synchronizing the medicine counter with live prescriptions. It is built to be affordable across the full economic spectrum: usable and beneficial whether the clinic serves daily-wage laborers or is run as a private business by a doctor/businessman.

---

## 2. Problem Statement
At overcrowded free/govt. clinics:
- Patients stand in long token lines, then a second long line at the medicine counter.
- Doctors get 5-10 minutes per patient — most of it lost to re-explaining symptoms verbally.
- Paper registers get lost or damaged due to overcrowding — no reliable patient history.
- There is no structured data for clinic administrators to plan staffing, drug stock, or identify disease patterns.

---

## 3. Goals & Success Metrics
| Goal | Metric |
|---|---|
| Reduce doctor time-per-patient spent on note-taking | -40% time on symptom re-explanation (via pre-structured AI summary) |
| Eliminate patient record loss | 100% of visits digitally saved & searchable |
| Reduce medicine-counter wait | Prescription visible at counter within seconds of doctor submission |
| Platform adoption | # of clinics onboarded, # of patients served/month |
| Business sustainability | Monthly recurring revenue from paid tiers (see Section 9) |

---

## 4. Users & Personas
| Persona | Description | Needs |
|---|---|---|
| **Patient (Walk-in)** | Often low-literacy, may not read/write comfortably, local-language speaker | Simple voice input, minimal steps, doesn’t need to hold a phone if a shared kiosk exists |
| **Doctor** | Overloaded, 5-10 min per patient | Fast, glanceable summary; minimal typing; reliable history |
| **Receptionist/Clinic Staff** | Manages token/queue | Simple token issuing, queue visibility |
| **Pharmacist (Medicine Counter)** | Dispenses medicine | Real-time prescription queue, no manual matching |
| **Clinic Owner/Admin (business persona)** | May be a private clinic owner or govt. clinic administrator | Analytics, staff management, billing/subscription control |
| **Platform Admin (MedFlow AI team)** | Manages multi-clinic SaaS backend | Clinic onboarding, monitoring, support |

---

## 5. Scope

### 5.1 In Scope (Full Product — beyond hackathon MVP)
- Public marketing website (multi-page, lead-generation focused)
- Patient kiosk web-app (voice/text symptom intake)
- Doctor dashboard (queue + AI summary + prescription entry)
- Medicine counter dashboard
- Digital patient record system
- Clinic admin dashboard (staff, analytics, billing)
- Platform super-admin (for MedFlow AI’s own team, multi-clinic management)
- Authentication & role-based access (patient/staff/doctor/pharmacist/admin/super-admin)
- Notification system (SMS/WhatsApp follow-ups — free-tier APIs)
- Subscription/billing system (for business model)
- Lead magnet system (see Section 10)

### 5.2 Out of Scope (v1)
- Full ABDM/ABHA government integration (roadmap item — v2)
- Native mobile apps (v1 is a responsive web app; native app is roadmap)
- Insurance claim processing
- Multi-language beyond Hindi + English at launch (expand later)

---

## 6. Information Architecture — Every Page, Separately
Hard requirement: no single long-scroll page. Every section below is its own route/page.

### A. Public Marketing Website (for lead generation & business credibility)
- `A1: /` — Home (Government-style official landing: mission statement, high-level value prop, CTA to demo/pricing)
- `A2: /problem` — The problem (data, stats, ground-reality story: queue, register loss)
- `A3: /solution` — How MedFlow AI works (kiosk → doctor → counter → record flow explained)
- `A4: /features` — Detailed feature breakdown (sub-pages: `/features/kiosk`, `/features/doctor-dashboard`, `/features/records`, `/features/analytics`)
- `A5: /pricing` — Tiered pricing (Community to Business)
- `A6: /case-studies` — Real clinic results / projected impact study
- `A7: /resources` — Resources hub
- `A8: /resources/free-guide` — Downloadable PDF guide lead magnet
- `A9: /resources/roi-calculator` — Interactive ROI/time savings calculator
- `A10: /resources/blog` — Blog index
- `A11: /resources/blog/[slug]` — Individual blog post template
- `A12: /about` — Team, mission, origin story
- `A13: /contact` — Contact form, clinic partnership inquiry
- `A14: /demo-request` — Book a live demo lead capture
- `A15: /waitlist` — Early access signup with referral code
- `A16: /faq` — Frequently asked questions
- `A17: /privacy-policy` — Legal privacy policy
- `A18: /terms-of-service` — Legal terms of service
- `A19: /login` — Clinic staff/admin login
- `A20: /signup` — New clinic onboarding signup

### B. Product Application (the working software)
- `B1: /app/kiosk` — Public/Patient: Token generation + voice/text symptom intake
- `B2: /app/kiosk/confirm` — Patient: Confirm AI-structured symptom summary before submitting
- `B3: /app/queue` — Staff/Doctor: Live queue view
- `B4: /app/doctor/patient/[id]` — Doctor: Patient detail, AI summary, history, diagnosis/prescription entry
- `B5: /app/doctor/history` — Doctor: Search past patients/visits
- `B6: /app/pharmacy/queue` — Pharmacist: Live prescription queue
- `B7: /app/pharmacy/dispense/[id]` — Pharmacist: Mark medicine as dispensed
- `B8: /app/records/search` — Staff/Doctor/Admin: Search all patient records
- `B9: /app/records/[patientId]` — Staff/Doctor/Admin: Full patient record/history view
- `B10: /app/admin/dashboard` — Clinic Admin: Overview (patients today, avg wait time, common ailments)
- `B11: /app/admin/staff` — Clinic Admin: Manage doctor/staff/pharmacist accounts
- `B12: /app/admin/analytics` — Clinic Admin: Detailed reports (disease trends, load by hour, drug usage)
- `B13: /app/admin/billing` — Clinic Admin: Subscription plan, invoices, payment
- `B14: /app/admin/settings` — Clinic Admin: Clinic profile, language settings, notification settings
- `B15: /app/super-admin/clinics` — Platform Admin: List/manage all onboarded clinics
- `B16: /app/super-admin/analytics` — Platform Admin: Platform-wide usage & revenue analytics
- `B17: /app/notifications` — Patient (via SMS/WhatsApp link): Follow-up reminder view
- `B18: /app/auth/login`, `/app/auth/forgot-password` — All roles: Auth flows

---

## 7. Functional Requirements
- **FR1-FR4 (Kiosk):** Voice (Web Speech API Hindi+English) / text intake, AI Agent 1 symptom structuring (`chief_complaint`, `duration`, `severity_keywords`), patient confirmation, token generation.
- **FR5-FR9 (Doctor):** Real-time queue by token, AI summary review + history, structured prescription entry, AI Agent 2 prescription structuring, search past visits.
- **FR10-FR11 (Pharmacy):** Real-time queue of prescriptions, mark dispensed & remove from active queue.
- **FR12-FR13 (Records):** Permanent digital storage, searchable by name/token/phone, full visit history.
- **FR14-FR18 (Admin):** Stats, staff role management, analytics reports, subscription management, settings.
- **FR19-FR20 (Super-Admin):** Clinic management, aggregate platform usage & revenue.
- **FR21 (Notifications):** Automated WhatsApp/SMS reminders for follow-ups.
- **FR22-FR23 (Auth):** Role-based access control (patient/staff/doctor/pharmacist/admin/super_admin).

---

## 8. Technical Architecture (v1 — Free Tier)
- **Frontend:** React (Vite) + React Router (multi-page) + Tailwind CSS
- **Backend:** Node.js + Express (REST API)
- **Database:** Supabase (Postgres) — multi-tenant schema (`clinic_id` on all core tables)
- **Auth:** Supabase Auth with custom role management
- **Realtime:** Supabase Realtime (`queue` table updates)
- **AI:** Google Gemini API (free tier) — 3 agents
- **Voice:** Browser-native Web Speech API
