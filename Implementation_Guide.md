# MedFlow AI — Step-by-Step Implementation Guide

Every task broken into small, executable steps (A to Z)
This follows the PRD exactly. Work top to bottom — each Phase assumes the previous one is done. Check off each step as you go.

---

## PHASE 0 — Environment & Project Setup

1. Create a GitHub repo `medflow-ai` (private, add README with project one-liner).
2. Install Node.js (LTS) and confirm with `node -v`.
3. Create project root folder with two subfolders: `/client` (React frontend) and `/server` (Node/Express backend).
4. In `/client`: run `npm create vite@latest . -- --template react`, then `npm install`.
5. Install Tailwind CSS in `/client` (`npm install -D tailwindcss postcss autoprefixer`, `npx tailwindcss init -p`), configure `tailwind.config.js` content paths.
6. Install React Router: `npm install react-router-dom` (this is what enables the multi-page structure, not single-scroll).
7. In `/server`: run `npm init -y`, install Express: `npm install express cors dotenv`.
8. Create a Supabase project (free tier) at supabase.com — note the Project URL and anon/public key.
9. In Supabase, enable Email/Password auth (and Phone/OTP if available on free tier) under Authentication settings.
10. Create a `.env` file in `/server` and `.env.local` in `/client` — store Supabase URL/keys and Gemini API key (get free key from Google AI Studio). Add both `.env*` files to `.gitignore`.
11. Install Supabase client: `npm install @supabase/supabase-js` in both `/client` and `/server`.
12. Create a shared `supabaseClient.js` in both frontend and backend that initializes the client using env vars.
13. Push initial commit to GitHub.

---

## PHASE 1 — Database Schema (Supabase / Postgres)

14. In Supabase SQL editor, create `clinics` table (`id uuid pk, name, tier, address, languages_supported text[], settings jsonb, created_at`).
15. Create `users` table (`id uuid pk, clinic_id fk, role text check-constrained to allowed roles, name, contact, auth_id fk to Supabase auth.users`).
16. Create `patients` table (`id uuid pk, clinic_id fk, name, phone, age, created_at`).
17. Create `visits` table (`id uuid pk, patient_id fk, clinic_id fk, token_number int, symptom_raw text, symptom_summary_ai text, diagnosis text, prescription_raw text, prescription_structured_ai text, doctor_id fk, status text, created_at`).
18. Create `queue` table (`id uuid pk, clinic_id fk, visit_id fk, status text, updated_at`).
19. Create `subscriptions` table (`id uuid pk, clinic_id fk, tier text, status text, renewal_date date`).
20. Create `leads` table (`id uuid pk, source text, name, contact, clinic_name, created_at`) — for marketing site lead capture.
21. Enable Row Level Security (RLS) on every table.
22. Write RLS policies so every query is scoped by `clinic_id` matching the logged-in user’s clinic (except `leads`, which is insert-only from public, and `super_admin` role, which bypasses clinic scoping).
23. Enable Supabase Realtime on the `queue` table (needed for live queue sync).
24. Seed one test clinic + one test doctor + one test patient row manually, to use during development.

---

## PHASE 2 — Backend API Skeleton

25. In `/server`, create folder structure: `/routes`, `/controllers`, `/middleware`, `/services`.
26. Create `middleware/auth.js` — verifies Supabase JWT on protected routes, attaches `req.user` (`id`, `role`, `clinic_id`).
27. Create `middleware/roleCheck.js` — takes an array of allowed roles, blocks access otherwise.
28. Create `routes/kiosk.js` — `POST /api/kiosk/token` (issue new token + create patient/visit if new) and `POST /api/kiosk/symptom` (accepts raw symptom text/voice transcript).
29. Create `routes/doctor.js` — `GET /api/doctor/queue`, `GET /api/doctor/patient/:id`, `POST /api/doctor/prescription`.
30. Create `routes/pharmacy.js` — `GET /api/pharmacy/queue`, `POST /api/pharmacy/dispense/:visitId`.
31. Create `routes/records.js` — `GET /api/records/search`, `GET /api/records/:patientId`.
32. Create `routes/admin.js` — `GET /api/admin/stats`, `GET/POST /api/admin/staff`, `GET /api/admin/analytics`.
33. Create `routes/superAdmin.js` — `GET /api/super-admin/clinics`, `GET /api/super-admin/analytics`.
34. Create `routes/leads.js` — `POST /api/leads` (public, no auth — for lead magnet form submissions).
35. Create `routes/auth.js` — login/signup wrapper endpoints if needed beyond Supabase client SDK calls.
36. Wire all routes into `server.js` / `app.js` with proper prefixes (`/api/kiosk`, `/api/doctor`, etc.), add `cors()` and `express.json()` middleware.
37. Test each route with a basic tool (Postman/Thunder Client) using dummy data before connecting AI or frontend.

---

## PHASE 3 — AI Agents (Backend Services)
38. Create `services/geminiClient.js` — wraps the Gemini API call (model, headers, error handling).
39. Create `services/agentSymptomSummary.js` — Agent 1: prompt template that takes raw symptom text (Hindi/English) → returns structured JSON `{chief_complaint, duration, severity_keywords}`.
40. Create `services/agentPrescriptionStructure.js` — Agent 2: prompt template that takes doctor’s short diagnosis/medicine notes → returns structured JSON `{diagnosis, medicines: [...], patient_instructions_local_language}`.
41. Create `services/agentFollowUp.js` — Agent 3: generates a short WhatsApp/SMS-ready follow-up reminder message from visit data.
42. Add a response cache (simple in-memory map or a cache table) so repeated/demo test calls don’t burn free-tier quota.
43. Add a fallback function: if Gemini API call fails/times out, return a safe mocked structured response so the app never crashes mid-demo.
44. Wire Agent 1 into `POST /api/kiosk/symptom`, Agent 2 into `POST /api/doctor/prescription`, Agent 3 into a scheduled/triggered follow-up job.
45. Write 5-10 test cases (sample symptom sentences in Hindi and English) and confirm each agent returns sensible structured output.

---

## PHASE 4 — Frontend Routing Skeleton (Multi-Page Structure)
46. In `/client/src`, create folders: `/pages/marketing`, `/pages/app`, `/components`, `/layouts`.
47. Set up `App.jsx` with `react-router-dom`’s `<Routes>` mapping every single route from PRD Section 6 (A1-A20 and B1-B18) to its own page component file — one component per route, no shared mega-page.
48. Create `layouts/MarketingLayout.jsx` (header nav + footer for public site) and `layouts/AppLayout.jsx` (sidebar/topbar for the logged-in product).
49. Create a `ProtectedRoute.jsx` wrapper component that checks auth + role before rendering `/app/*` pages, redirecting to `/login` if unauthorized.
50. Stub every page file from the PRD’s page list with a placeholder heading (e.g., `<h1>Pricing</h1>`) so routing can be tested end-to-end before real content is built.
51. Verify: navigate to every one of the ~38 routes manually in the browser, confirm each loads its own distinct page (no scroll-based navigation).

---

## PHASE 5 — Design System (Black & White, Government-Style)
52. Define a Tailwind theme extension: grayscale palette (`ink-900` near-black, `charcoal-700`, `gray-500`, `gray-200`, `white`), no bright accent colors by default.
53. Pick and load two fonts: a serif/institutional font for headings (e.g., a Georgia/Times-like serif), a clean sans-serif for body text. Add via Google Fonts or self-hosted, wire into Tailwind config.
54. Build a reusable `Header.jsx` — official-style top bar (logo/emblem-style mark, site name, formal nav links), similar in spirit to a `.gov.in` header.
55. Build a reusable `Footer.jsx` — structured columns (About, Resources, Legal, Contact), formal tone.
56. Build core reusable components: `Button`, `Card`, `DataTable`, `Badge`, `FormInput`, `SectionDivider` — all styled within the black/white system.
57. Build a simple custom emblem/seal-style logo mark (original design — do not copy any real government emblem) to reinforce the “official” visual tone.
58. Apply the design system to `MarketingLayout` and `AppLayout` so every page inherits consistent header/footer/typography automatically.

---

## PHASE 6 — Build Each Marketing Page (one at a time)
59. `/` Home — hero section (mission statement, CTA), brief value prop, links to Problem/Solution/Pricing.
60. `/problem` — the ground-reality story + stats (long token lines, register loss, etc. from PRD Section 2).
61. `/solution` — kiosk → doctor → counter → record flow, explained step by step.
62. `/features` (+ sub-pages `/features/kiosk`, `/features/doctor-dashboard`, `/features/records`, `/features/analytics`) — one feature deep-dive per page.
63. `/pricing` — render the 4 tiers from PRD Section 9 as a comparison table.
64. `/case-studies` — placeholder structure ready for post-pilot data.
65. `/resources` — hub page linking to guide, calculator, blog.
66. `/resources/free-guide` — lead magnet page: short pitch + email-gated PDF download form (wire to `POST /api/leads` with `source: "free-guide"`).
67. `/resources/roi-calculator` — build the interactive calculator (patients/day input → time saved, records-protected estimate output); on “get full report” wire to `POST /api/leads`.
68. `/resources/blog` + `/resources/blog/[slug]` — simple blog list + template page (content can be added later).
69. `/about` — team + origin story (the clinic observation that inspired the project).
70. `/contact` — contact form wired to `POST /api/leads` with `source: "contact"`.
71. `/demo-request` — booking form (can start as a simple form-to-email/leads-table; calendar tool integration is a later enhancement).
72. `/waitlist` — early access form wired to `POST /api/leads` with `source: "waitlist"`, include referral-code display logic.
73. `/faq` — accordion-style Q&A list.
74. `/privacy-policy` and `/terms-of-service` — standard legal page templates (placeholder legal text; get reviewed before real launch).
75. `/login` and `/signup` — wire to Supabase Auth client SDK (email/password or OTP).

---

## PHASE 7 — Build the Kiosk Flow (B1-B2)
76. Build `/app/kiosk` page: “Get Token” button + symptom input area with a mic icon (Web Speech API) and a text fallback.
77. Wire Web Speech API: on mic click, capture speech, convert to text, display live transcript in the input box (support Hindi + English language codes).
78. On submit, call `POST /api/kiosk/symptom`, show a loading state, then display the AI-structured summary.
79. Build `/app/kiosk/confirm` page: show the structured summary in patient-friendly language, “Confirm” or “Edit” buttons.
80. On confirm, call `POST /api/kiosk/token` to finalize — display the issued token number prominently.
81. Test the full kiosk flow with 5 varied sample symptom inputs (including messy, casual Hindi phrasing) to confirm AI structuring holds up.

---

## PHASE 8 — Build the Doctor Dashboard (B3-B5)
82. Build `/app/queue` page: real-time list of waiting patients (token #, wait time), subscribed to Supabase Realtime updates on the queue table.
83. Build `/app/doctor/patient/[id]` page: show AI symptom summary, patient’s past visit history (if any), diagnosis input (dropdown + free text), medicine input (dropdown + free text), voice-to-text option for notes.
84. On submit, call `POST /api/doctor/prescription`, trigger Agent 2, show the AI-structured prescription for the doctor to confirm before finalizing.
85. Update the visit’s status and push it into the pharmacy queue (via the queue table) on confirmation.
86. Build `/app/doctor/history` page: search bar (name/token/phone) hitting `GET /api/records/search`, results table linking to full record view.
87. Test: simulate 5 patients through kiosk → confirm they appear correctly in the doctor’s real-time queue.

---

## PHASE 9 — Build the Medicine Counter (B6-B7)
88. Build `/app/pharmacy/queue` page: real-time list of pending prescriptions (subscribed to queue table where status = “at-pharmacy”).
89. Build `/app/pharmacy/dispense/[id]` page: show prescription details, “Mark as Dispensed” button.
90. On dispense, call `POST /api/pharmacy/dispense/:visitId`, update visit status to “dispensed,” remove from active queue.
91. Test: confirm a doctor’s submitted prescription appears at the pharmacy queue within seconds (validates Realtime sync).

---

## PHASE 10 — Build Digital Records (B8-B9)
92. Build `/app/records/search` page: search by name/token/phone, results list.
93. Build `/app/records/[patientId]` page: full visit history for that patient (symptom, diagnosis, prescription, date, doctor) in a clean, printable table format.
94. Add a “print/export” button (basic browser print styling) for cases where clinic staff need a physical copy.

---

## PHASE 11 — Build Clinic Admin Dashboard (B10-B14)
95. Build `/app/admin/dashboard` page: cards showing patients today, average wait time, top 5 symptoms/diagnoses (pull from `GET /api/admin/stats`).
96. Build `/app/admin/staff` page: table of staff accounts, add/remove/edit role form (calls `GET/POST /api/admin/staff`).
97. Build `/app/admin/analytics` page: charts/tables for disease trends, patient load by hour, medicine usage (pull from `GET /api/admin/analytics`).
98. Build `/app/admin/billing` page: display current subscription tier, renewal date, upgrade/downgrade options (payment integration can be stubbed initially, wired to Razorpay/Stripe later — see Phase 14).
99. Build `/app/admin/settings` page: clinic profile fields, supported languages toggle, notification preferences form.

---

## PHASE 12 — Build Platform Super-Admin (B15-B16)
100. Build `/app/super-admin/clinics` page: table of all onboarded clinics with tier/status, accessible only to super_admin role.
101. Build `/app/super-admin/analytics` page: aggregate platform-wide stats (total clinics, total patients served, revenue by tier).

---

## PHASE 13 — Notifications
102. Set up WhatsApp Cloud API free-tier account (Meta for Developers), get test phone number + access token.
103. Create `services/notifyWhatsApp.js` — sends a templated follow-up message using Agent 3’s generated text.
104. Add a simple scheduled trigger (can be manual/admin-triggered in v1, or a cron job in `/server` for scheduled follow-ups) that calls this service for chronic-care patients.
105. Build `/app/notifications` — a simple public page a patient can land on via the WhatsApp/SMS link to see their reminder details.
106. Add an email fallback (e.g., using a free-tier transactional email service) for clinics/patients without WhatsApp.

---

## PHASE 14 — Business Model Wiring (Billing)
107. Decide payment provider (Razorpay recommended for India — has a free-to-integrate sandbox).
108. Create a Razorpay test account, get API keys.
109. Wire subscriptions table updates to Razorpay webhook events (payment success → update tier/status).
110. Build the actual upgrade/downgrade flow on `/pricing` and `/app/admin/billing` (select tier → Razorpay checkout → webhook confirms → tier updated).
111. Gate certain features (e.g., unlimited patients, multi-branch admin) behind tier checks in backend middleware — reuse `roleCheck.js` pattern for `tierCheck.js`.
112. Keep the Community tier fully functional with zero payment flow required — this must never be blocked by billing code.

---

## PHASE 15 — Lead Magnet Wiring (Marketing → Growth Loop)
113. Confirm every lead magnet page (free guide, ROI calculator, waitlist, demo request, newsletter, webinar signup) correctly posts to `POST /api/leads` with a distinct source value.
114. Build a simple `/app/super-admin` (or admin-only) leads view to see captured leads by source — useful for tracking which lead magnet performs best.
115. Set up basic email capture confirmation (auto-response email on signup, using the same free-tier email service from Phase 13).
116. Implement the referral program logic: generate a unique referral code per clinic/user, track referred signups, apply the free-month/extended-tier reward.

---

## PHASE 16 — Testing & QA
117. Write basic end-to-end test scenarios covering: kiosk → doctor → pharmacy → record flow (can be manual test scripts if no time for automated tests).
118. Test role-based access: confirm a pharmacist cannot access `/app/admin/*`, a doctor cannot access `/app/super-admin/*`, etc.
119. Test multi-tenant isolation: confirm Clinic A’s staff cannot see Clinic B’s patients/records.
120. Test on a low-end/slow-network simulation (Chrome DevTools throttling) to confirm kiosk usability holds up.
121. Test all ~38 routes load correctly with no broken links, no console errors.
122. Run the AI fallback test: manually break the Gemini API key temporarily and confirm the app doesn’t crash (fallback response kicks in).

---

## PHASE 17 — Deployment
123. Deploy `/client` to Vercel (connect GitHub repo, set environment variables in Vercel dashboard).
124. Deploy `/server` to Render (connect GitHub repo, set environment variables in Render dashboard).
125. Point frontend API calls to the deployed backend URL (update `.env.production`).
126. Set up a custom domain (optional but recommended for the “official government-style” credibility — a clean `.com` / `.in` domain, not a default subdomain, if budget allows even a low-cost one).
127. Do a final full walkthrough on the live deployed URL, on both desktop and mobile viewport sizes.

---

## PHASE 18 — Demo & Pitch Prep
128. Prepare 5-10 realistic fake patient scenarios covering varied symptoms (for a smooth live demo).
129. Pre-cache/mock those specific scenarios’ AI responses so the live demo never depends on a live API call succeeding under pressure.
130. Rehearse the demo script: kiosk (as a patient) → doctor dashboard (as the doctor) → pharmacy (as the pharmacist) → show the digital record — a full loop in under 3 minutes.
131. Align this demo flow with the pitch deck narrative already built (problem story → live demo → business model → roadmap).

---

## Ongoing / Post-Hackathon (Business Continuation)
132. Collect real feedback from a pilot clinic (even one) to validate the AI’s real-world accuracy and refine prompts.
133. Iterate on the Community-tier pricing/eligibility criteria based on real clinic conversations.
134. Begin ABDM integration research (v2 roadmap) once pilot data is in hand.
135. Formalize legal review of Privacy Policy/Terms before onboarding any real patient data at scale.
