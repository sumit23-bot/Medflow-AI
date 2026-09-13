const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SEED_CLINIC_ID = '11111111-1111-1111-1111-111111111111';
const SEED_DOCTOR_ID = '22222222-2222-2222-2222-222222222222';
const SEED_PATIENT_ID = '33333333-3333-3333-3333-333333333333';
const SEED_VISIT_ID = '44444444-4444-4444-4444-444444444444';

function getAdminClient() {
  const url = process.env.SUPABASE_URL || '';
  const key = 
    process.env.SUPABASE_SECRET_KEY || 
    process.env.SUPABASE_SERVICE_ROLE_KEY || 
    process.env.SUPABASE_PUBLISHABLE_KEY || 
    process.env.SUPABASE_ANON_KEY || 
    '';

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

async function cleanupTestData() {
  console.log('====================================================');
  console.log('🧹 Starting Supabase Test Data Cleanup');
  console.log('====================================================\n');

  const supabase = getAdminClient();

  if (!supabase) {
    console.error('❌ Supabase client is not configured.');
    return null;
  }

  const report = {
    authUsersDeleted: 0,
    publicUsersDeleted: 0,
    clinicsDeleted: 0,
    visitsDeleted: 0,
    queueDeleted: 0,
    patientsDeleted: 0,
    leadsDeleted: 0,
    seedReset: false
  };

  try {
    // 1. Clean up Test Queue entries (except seed visit)
    const { data: queueToDelete, error: qFindErr } = await supabase
      .from('queue')
      .select('id, visit_id')
      .neq('visit_id', SEED_VISIT_ID);

    if (qFindErr) console.warn('Queue find error:', qFindErr.message);

    if (queueToDelete && queueToDelete.length > 0) {
      const qIds = queueToDelete.map(q => q.id);
      const { error } = await supabase.from('queue').delete().in('id', qIds);
      if (error) console.warn('Warning deleting queue:', error.message);
      else report.queueDeleted = queueToDelete.length;
    }

    // 2. Clean up Test Visits (except seed visit)
    const { data: visitsToDelete, error: vFindErr } = await supabase
      .from('visits')
      .select('id')
      .neq('id', SEED_VISIT_ID);

    if (vFindErr) console.warn('Visits find error:', vFindErr.message);

    if (visitsToDelete && visitsToDelete.length > 0) {
      const vIds = visitsToDelete.map(v => v.id);
      const { error } = await supabase.from('visits').delete().in('id', vIds);
      if (error) console.warn('Warning deleting visits:', error.message);
      else report.visitsDeleted = visitsToDelete.length;
    }

    // 3. Clean up Test Patients (except seed patient)
    const { data: patientsToDelete, error: pFindErr } = await supabase
      .from('patients')
      .select('id')
      .neq('id', SEED_PATIENT_ID);

    if (pFindErr) console.warn('Patients find error:', pFindErr.message);

    if (patientsToDelete && patientsToDelete.length > 0) {
      const pIds = patientsToDelete.map(p => p.id);
      const { error } = await supabase.from('patients').delete().in('id', pIds);
      if (error) console.warn('Warning deleting patients:', error.message);
      else report.patientsDeleted = patientsToDelete.length;
    }

    // 4. Clean up Test Staff / Users (except seed doctor)
    const { data: usersToDelete, error: uFindErr } = await supabase
      .from('users')
      .select('id, auth_id, name')
      .neq('id', SEED_DOCTOR_ID);

    if (uFindErr) console.warn('Users find error:', uFindErr.message);

    if (usersToDelete && usersToDelete.length > 0) {
      for (const u of usersToDelete) {
        if (u.auth_id && supabase.auth.admin) {
          try {
            await supabase.auth.admin.deleteUser(u.auth_id);
            report.authUsersDeleted++;
          } catch (e) {
            // Ignore if auth user already deleted
          }
        }
      }

      const uIds = usersToDelete.map(u => u.id);
      const { error } = await supabase.from('users').delete().in('id', uIds);
      if (error) console.warn('Warning deleting users:', error.message);
      else report.publicUsersDeleted = usersToDelete.length;
    }

    // 5. Clean up any leftover auth users with test emails (@medflow.ai)
    if (supabase.auth.admin) {
      const { data: authUsersData } = await supabase.auth.admin.listUsers();
      if (authUsersData && authUsersData.users) {
        for (const au of authUsersData.users) {
          if (au.email && au.email.includes('doctor_') && au.email.endsWith('@medflow.ai')) {
            try {
              await supabase.auth.admin.deleteUser(au.id);
              report.authUsersDeleted++;
            } catch (e) {}
          }
        }
      }
    }

    // 6. Clean up Test Clinics (except seed clinic)
    const { data: clinicsToDelete, error: cFindErr } = await supabase
      .from('clinics')
      .select('id')
      .neq('id', SEED_CLINIC_ID);

    if (cFindErr) console.warn('Clinics find error:', cFindErr.message);

    if (clinicsToDelete && clinicsToDelete.length > 0) {
      const cIds = clinicsToDelete.map(c => c.id);
      const { error } = await supabase.from('clinics').delete().in('id', cIds);
      if (error) console.warn('Warning deleting clinics:', error.message);
      else report.clinicsDeleted = clinicsToDelete.length;
    }

    // 7. Clean up Test Leads
    const { data: leadsToDelete, error: lFindErr } = await supabase
      .from('leads')
      .select('id')
      .or('contact.eq.anil@example.com,source.eq.free-guide');

    if (lFindErr) console.warn('Leads find error:', lFindErr.message);

    if (leadsToDelete && leadsToDelete.length > 0) {
      const lIds = leadsToDelete.map(l => l.id);
      const { error } = await supabase.from('leads').delete().in('id', lIds);
      if (error) console.warn('Warning deleting leads:', error.message);
      else report.leadsDeleted = leadsToDelete.length;
    }

    // 8. Reset Seed Visit & Queue to 'waiting' state
    await supabase
      .from('visits')
      .update({
        status: 'waiting',
        diagnosis: null,
        prescription_raw: null,
        prescription_structured_ai: null
      })
      .eq('id', SEED_VISIT_ID);

    await supabase
      .from('queue')
      .update({
        status: 'waiting'
      })
      .eq('visit_id', SEED_VISIT_ID);

    report.seedReset = true;

  } catch (err) {
    console.error('Error during cleanup:', err);
  }

  console.log('----------------------------------------------------');
  console.log('📊 Cleanup Summary:');
  console.log(` - Test Queue Entries Deleted: ${report.queueDeleted}`);
  console.log(` - Test Visits Deleted:        ${report.visitsDeleted}`);
  console.log(` - Test Patients Deleted:      ${report.patientsDeleted}`);
  console.log(` - Test Users Deleted:         ${report.publicUsersDeleted}`);
  console.log(` - Auth Users Deleted:         ${report.authUsersDeleted}`);
  console.log(` - Test Clinics Deleted:       ${report.clinicsDeleted}`);
  console.log(` - Test Leads Deleted:         ${report.leadsDeleted}`);
  console.log(` - Seed Data Reset to Clean:   ${report.seedReset ? 'Yes' : 'No'}`);
  console.log('====================================================\n');

  return report;
}

if (require.main === module) {
  cleanupTestData().then(() => process.exit(0));
}

module.exports = { cleanupTestData };
