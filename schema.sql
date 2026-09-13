-- ==============================================================================
-- MedFlow AI — Supabase / Postgres Database Schema (Phase 1)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. CLINICS TABLE
CREATE TABLE IF NOT EXISTS public.clinics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    tier TEXT NOT NULL DEFAULT 'community' CHECK (tier IN ('community', 'clinic_plus', 'business', 'enterprise')),
    address TEXT,
    languages_supported TEXT[] DEFAULT ARRAY['hi', 'en'],
    settings JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. USERS TABLE (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID REFERENCES public.clinics(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('patient', 'staff', 'doctor', 'pharmacist', 'admin', 'super_admin')),
    name TEXT NOT NULL,
    contact TEXT,
    auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PATIENTS TABLE
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID REFERENCES public.clinics(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    age INT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. VISITS TABLE
CREATE TABLE IF NOT EXISTS public.visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
    clinic_id UUID REFERENCES public.clinics(id) ON DELETE CASCADE NOT NULL,
    token_number INT NOT NULL,
    symptom_raw TEXT,
    symptom_summary_ai JSONB,
    diagnosis TEXT,
    prescription_raw TEXT,
    prescription_structured_ai JSONB,
    doctor_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'in-consult', 'at-pharmacy', 'dispensed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. QUEUE TABLE
CREATE TABLE IF NOT EXISTS public.queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID REFERENCES public.clinics(id) ON DELETE CASCADE NOT NULL,
    visit_id UUID REFERENCES public.visits(id) ON DELETE CASCADE NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'in-consult', 'at-pharmacy', 'dispensed')),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. SUBSCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID REFERENCES public.clinics(id) ON DELETE CASCADE NOT NULL UNIQUE,
    tier TEXT NOT NULL DEFAULT 'community' CHECK (tier IN ('community', 'clinic_plus', 'business', 'enterprise')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'past_due', 'cancelled', 'trial')),
    renewal_date DATE
);

-- 7. LEADS TABLE (Public Marketing Site capture)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source TEXT NOT NULL,
    name TEXT,
    contact TEXT,
    clinic_name TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- HELPER FUNCTIONS FOR RLS
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.get_current_user_clinic_id()
RETURNS UUID AS $$
    SELECT clinic_id FROM public.users WHERE auth_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
    SELECT role FROM public.users WHERE auth_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Clinics policy
CREATE POLICY "Super admin all or clinic users view own clinic" ON public.clinics
FOR ALL USING (
    public.get_current_user_role() = 'super_admin' OR id = public.get_current_user_clinic_id()
);

-- Users policy
CREATE POLICY "Super admin all or clinic users view/edit own clinic users" ON public.users
FOR ALL USING (
    public.get_current_user_role() = 'super_admin' OR clinic_id = public.get_current_user_clinic_id()
);

-- Patients policy
CREATE POLICY "Super admin all or clinic scoped patients" ON public.patients
FOR ALL USING (
    public.get_current_user_role() = 'super_admin' OR clinic_id = public.get_current_user_clinic_id()
);

-- Visits policy
CREATE POLICY "Super admin all or clinic scoped visits" ON public.visits
FOR ALL USING (
    public.get_current_user_role() = 'super_admin' OR clinic_id = public.get_current_user_clinic_id()
);

-- Queue policy
CREATE POLICY "Super admin all or clinic scoped queue" ON public.queue
FOR ALL USING (
    public.get_current_user_role() = 'super_admin' OR clinic_id = public.get_current_user_clinic_id()
);

-- Subscriptions policy
CREATE POLICY "Super admin all or clinic scoped subscriptions" ON public.subscriptions
FOR ALL USING (
    public.get_current_user_role() = 'super_admin' OR clinic_id = public.get_current_user_clinic_id()
);

-- Leads policy (Public can insert; Super Admin or Clinic Admin can view)
CREATE POLICY "Public insert leads" ON public.leads
FOR INSERT WITH CHECK (true);

CREATE POLICY "Super Admin view leads" ON public.leads
FOR SELECT USING (
    public.get_current_user_role() = 'super_admin' OR public.get_current_user_role() = 'admin'
);

-- ==============================================================================
-- REALTIME REPLICATION FOR LIVE QUEUE SYNC (Step 23)
-- ==============================================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'queue'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.queue;
  END IF;
END
$$;

-- ==============================================================================
-- SEED TEST DATA (Step 24)
-- ==============================================================================

-- 1 Test Clinic
INSERT INTO public.clinics (id, name, tier, address, languages_supported)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    'Aarogya Seva Kendra (Test Clinic)',
    'community',
    'Ward 4, Primary Health Centre, Rural District',
    ARRAY['hi', 'en']
) ON CONFLICT (id) DO NOTHING;

-- 1 Test Doctor
INSERT INTO public.users (id, clinic_id, role, name, contact)
VALUES (
    '22222222-2222-2222-2222-222222222222',
    '11111111-1111-1111-1111-111111111111',
    'doctor',
    'Dr. Rajesh Sharma (MBBS)',
    '+919876543210'
) ON CONFLICT (id) DO NOTHING;

-- 1 Test Patient
INSERT INTO public.patients (id, clinic_id, name, phone, age)
VALUES (
    '33333333-3333-3333-3333-333333333333',
    '11111111-1111-1111-1111-111111111111',
    'Ramesh Kumar',
    '+919811122233',
    42
) ON CONFLICT (id) DO NOTHING;

-- 1 Initial Visit & Queue item for testing
INSERT INTO public.visits (id, patient_id, clinic_id, token_number, symptom_raw, status)
VALUES (
    '44444444-4444-4444-4444-444444444444',
    '33333333-3333-3333-3333-333333333333',
    '11111111-1111-1111-1111-111111111111',
    101,
    '3 din se tez bukhar aur gale me dard hai',
    'waiting'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.queue (clinic_id, visit_id, status)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    '44444444-4444-4444-4444-444444444444',
    'waiting'
) ON CONFLICT (visit_id) DO NOTHING;
