const app = require('./server');

const PORT = 5099; // Isolated port for testing

async function runTests() {
  console.log('====================================================');
  console.log('🧪 Starting MedFlow AI Phase 2 API Verification Tests');
  console.log('====================================================\n');

  const server = app.listen(PORT);
  const baseUrl = `http://localhost:${PORT}`;

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ FAIL: ${name}`);
      console.error(`   ${err.message}`);
      failed++;
    }
  }

  try {
    // 1. Health check
    await test('GET /health (Server Health Check)', async () => {
      const res = await fetch(`${baseUrl}/health`);
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      if (data.status !== 'healthy') throw new Error('Expected status healthy');
    });

    // 2. Leads endpoint (Public)
    await test('POST /api/leads (Marketing Lead Capture)', async () => {
      const res = await fetch(`${baseUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'free-guide',
          name: 'Dr. Anil Mehta',
          contact: 'anil@example.com',
          clinic_name: 'Mehta Clinic'
        })
      });
      if (res.status !== 201) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      if (!data.success) throw new Error('Expected success: true');
    });

    // 3. Kiosk Symptom Input (Public)
    await test('POST /api/kiosk/symptom (Kiosk Symptom Intake)', async () => {
      const res = await fetch(`${baseUrl}/api/kiosk/symptom`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptom_raw: '3 din se tez bukhar aur gale me dard hai',
          language: 'hi'
        })
      });
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      if (!data.success || !data.data.chief_complaint) throw new Error('Missing structured data');
    });

    // 4. Kiosk Token Generation (Public)
    await test('POST /api/kiosk/token (Kiosk Issue Token)', async () => {
      const res = await fetch(`${baseUrl}/api/kiosk/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clinic_id: '11111111-1111-1111-1111-111111111111',
          patient: { name: 'Ramesh Kumar', phone: '+919811122233', age: 42 },
          symptom_raw: '3 din se tez bukhar'
        })
      });
      if (res.status !== 201) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      if (!data.success || !data.data.token_number) throw new Error('Missing token number');
    });

    // 5. Auth Middleware Protection Check
    await test('GET /api/doctor/queue (Blocks Unauthenticated Access)', async () => {
      const res = await fetch(`${baseUrl}/api/doctor/queue`);
      if (res.status !== 401) throw new Error(`Expected 401 Unauthorized, got ${res.status}`);
    });

    // 6. Role Check Protection Check
    await test('GET /api/super-admin/clinics (Blocks unauthorized role)', async () => {
      const res = await fetch(`${baseUrl}/api/super-admin/clinics`, {
        headers: {
          'x-dev-user-id': 'doc-1',
          'x-dev-role': 'doctor' // Doctor should not access super_admin
        }
      });
      if (res.status !== 403) throw new Error(`Expected 403 Forbidden, got ${res.status}`);
    });

    // 7. Doctor Queue (Authorized)
    await test('GET /api/doctor/queue (Doctor Queue Access)', async () => {
      const res = await fetch(`${baseUrl}/api/doctor/queue`, {
        headers: { 'x-dev-role': 'doctor' }
      });
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      if (!data.success) throw new Error('Expected success true');
    });

    // 8. Doctor Patient Detail
    await test('GET /api/doctor/patient/:id (Patient History & AI Summary)', async () => {
      const res = await fetch(`${baseUrl}/api/doctor/patient/33333333-3333-3333-3333-333333333333`, {
        headers: { 'x-dev-role': 'doctor' }
      });
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      if (!data.data.patient || !data.data.history) throw new Error('Missing patient or history');
    });

    // 9. Doctor Prescription Submission
    await test('POST /api/doctor/prescription (Submit Diagnosis & Rx)', async () => {
      const res = await fetch(`${baseUrl}/api/doctor/prescription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-dev-role': 'doctor'
        },
        body: JSON.stringify({
          visit_id: '44444444-4444-4444-4444-444444444444',
          diagnosis: 'Acute Pharyngitis',
          prescription_raw: 'Paracetamol 650mg TDS x 3 days'
        })
      });
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      if (!data.success) throw new Error('Expected success true');
    });

    // 10. Pharmacy Queue
    await test('GET /api/pharmacy/queue (Pharmacist Queue)', async () => {
      const res = await fetch(`${baseUrl}/api/pharmacy/queue`, {
        headers: { 'x-dev-role': 'pharmacist' }
      });
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      if (!data.success) throw new Error('Expected success true');
    });

    // 11. Pharmacy Dispense
    await test('POST /api/pharmacy/dispense/:visitId (Mark Dispensed)', async () => {
      const res = await fetch(`${baseUrl}/api/pharmacy/dispense/44444444-4444-4444-4444-444444444444`, {
        method: 'POST',
        headers: { 'x-dev-role': 'pharmacist' }
      });
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      if (!data.success) throw new Error('Expected success true');
    });

    // 12. Records Search
    await test('GET /api/records/search?q=Ramesh (Search Records)', async () => {
      const res = await fetch(`${baseUrl}/api/records/search?q=Ramesh`, {
        headers: { 'x-dev-role': 'staff' }
      });
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      if (!data.success || !Array.isArray(data.data)) throw new Error('Expected data array');
    });

    // 13. Records Patient Detail
    await test('GET /api/records/:patientId (Full Digital Health Record)', async () => {
      const res = await fetch(`${baseUrl}/api/records/33333333-3333-3333-3333-333333333333`, {
        headers: { 'x-dev-role': 'doctor' }
      });
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      if (!data.data.patient || !data.data.visits) throw new Error('Expected full record history');
    });

    // 14. Admin Stats & Analytics
    await test('GET /api/admin/stats (Admin Dashboard KPIs)', async () => {
      const res = await fetch(`${baseUrl}/api/admin/stats`, {
        headers: { 'x-dev-role': 'admin' }
      });
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      if (!data.data.patients_today) throw new Error('Expected patients_today metric');
    });

    await test('GET /api/admin/analytics (Admin Disease & Load Reports)', async () => {
      const res = await fetch(`${baseUrl}/api/admin/analytics`, {
        headers: { 'x-dev-role': 'admin' }
      });
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      if (!data.data.patient_load_by_hour) throw new Error('Expected load by hour');
    });

    // 15. Admin Staff Management
    await test('GET /api/admin/staff & POST /api/admin/staff (Staff Management)', async () => {
      const getRes = await fetch(`${baseUrl}/api/admin/staff`, {
        headers: { 'x-dev-role': 'admin' }
      });
      if (getRes.status !== 200) throw new Error(`GET Status ${getRes.status}`);

      const postRes = await fetch(`${baseUrl}/api/admin/staff`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-dev-role': 'admin'
        },
        body: JSON.stringify({
          name: 'Pooja Verma',
          role: 'pharmacist',
          contact: '+919876543211'
        })
      });
      if (postRes.status !== 201) throw new Error(`POST Status ${postRes.status}`);
    });

    // 16. Super Admin Endpoints
    await test('GET /api/super-admin/clinics & /analytics (Super Admin Platform View)', async () => {
      const clinicsRes = await fetch(`${baseUrl}/api/super-admin/clinics`, {
        headers: { 'x-dev-role': 'super_admin' }
      });
      if (clinicsRes.status !== 200) throw new Error(`Clinics Status ${clinicsRes.status}`);

      const analyticsRes = await fetch(`${baseUrl}/api/super-admin/analytics`, {
        headers: { 'x-dev-role': 'super_admin' }
      });
      if (analyticsRes.status !== 200) throw new Error(`Analytics Status ${analyticsRes.status}`);
    });

    // 17. Auth Endpoints (Signup -> Login -> Me)
    await test('POST /api/auth/signup, /login & GET /api/auth/me (Auth Lifecycle)', async () => {
      const testEmail = `doctor_${Date.now()}@medflow.ai`;
      const testPassword = 'TestPassword123!';

      // 1. Signup fresh test user
      const signupRes = await fetch(`${baseUrl}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          password: testPassword,
          clinic_name: 'Test Aarogya Clinic',
          name: 'Dr. Test Sharma',
          role: 'doctor'
        })
      });
      if (signupRes.status !== 201) {
        const errData = await signupRes.json();
        throw new Error(`Signup Status ${signupRes.status}: ${JSON.stringify(errData)}`);
      }

      // 2. Login with created credentials
      const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: testEmail, password: testPassword })
      });
      if (loginRes.status !== 200) {
        const errData = await loginRes.json();
        throw new Error(`Login Status ${loginRes.status}: ${JSON.stringify(errData)}`);
      }
      const loginData = await loginRes.json();
      if (!loginData.success) throw new Error('Expected login success: true');

      // 3. Verify /me with auth token or dev header
      const meRes = await fetch(`${baseUrl}/api/auth/me`, {
        headers: loginData.token 
          ? { 'Authorization': `Bearer ${loginData.token}` } 
          : { 'x-dev-role': 'doctor', 'x-dev-name': 'Dr. Test Sharma' }
      });
      if (meRes.status !== 200) throw new Error(`Me Status ${meRes.status}`);
    });

  } finally {
    server.close();
  }

  console.log('\n====================================================');
  console.log(`🏁 Summary: ${passed} passed, ${failed} failed`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
