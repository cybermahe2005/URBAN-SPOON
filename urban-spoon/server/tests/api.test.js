require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const http = require('http');
const { app } = require('../server');
const { connectDB } = require('../config/db');
const mongoose = require('mongoose');

let server;
const PORT = 5055; // Dedicated test port
const BASE_URL = `http://localhost:${PORT}/api`;

const runTests = async () => {
  console.log('====================================================');
  console.log('  URBAN SPOON FULL-STACK INTEGRATION TEST SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  const assert = (condition, description) => {
    if (condition) {
      console.log(`  [PASS] ${description}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${description}`);
      failed++;
    }
  };

  try {
    // 0. Connect Database
    await connectDB();

    // 1. Start Server on test port
    await new Promise((resolve) => {
      server = app.listen(PORT, resolve);
    });
    console.log(`Test server running at http://localhost:${PORT}\n`);

    // Helper request function using native fetch
    const request = async (path, options = {}) => {
      const url = `${BASE_URL}${path}`;
      const { headers, ...restOptions } = options;
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...(headers || {}),
        },
        ...restOptions,
      });
      const data = await res.json().catch(() => null);
      return { status: res.status, data };
    };

    // TEST 1: Health Check
    console.log('Test Suite 1: Health & Public Endpoints');
    const health = await request('/health');
    assert(health.status === 200 && health.data.status === 'healthy', 'GET /api/health returns 200 and healthy status');

    // TEST 2: Submit Valid Table Inquiry
    console.log('\nTest Suite 2: Public Table Inquiry (Level 4)');
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    const createRes = await request('/inquiries', {
      method: 'POST',
      body: JSON.stringify({
        customerName: 'Victoria Sterling',
        phoneNumber: '+1 555-789-0123',
        bookingDate: tomorrow,
        numberOfGuests: 4,
        specialRequests: 'Quiet window booth requested for business dinner.',
      }),
    });
    assert(createRes.status === 201, 'POST /api/inquiries returns 201 Created');
    assert(createRes.data.success === true, 'POST /api/inquiries response has success: true');
    assert(createRes.data.data.status === 'Pending', 'Inquiry defaults to status "Pending"');
    const createdId = createRes.data.data._id;

    // TEST 3: Validation Error Handling
    console.log('\nTest Suite 3: Validation and Error Handling');
    const invalidRes = await request('/inquiries', {
      method: 'POST',
      body: JSON.stringify({
        customerName: '', // Empty name
        phoneNumber: 'invalid-phone-abc', // Invalid phone
        bookingDate: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // Past date
        numberOfGuests: -5, // Negative guests
      }),
    });
    assert(invalidRes.status === 400, 'POST /api/inquiries with invalid payload returns 400 Bad Request');
    assert(invalidRes.data.success === false, 'Returns structured validation errors');

    // TEST 4: Admin Authentication (Level 5)
    console.log('\nTest Suite 4: Admin Authentication & Security');
    const loginFail = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'admin@urbanspoon.com',
        password: 'wrongpassword',
      }),
    });
    assert(loginFail.status === 401, 'POST /api/auth/login with wrong password returns 401 Unauthorized');

    const loginSuccess = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'admin@urbanspoon.com',
        password: 'admin123',
      }),
    });
    assert(loginSuccess.status === 200, 'POST /api/auth/login with valid credentials returns 200 OK');
    assert(!!loginSuccess.data.data.token, 'Returns signed JWT token');
    const adminToken = loginSuccess.data.data.token;

    // TEST 5: Protected Endpoint Rejection Without Token
    console.log('\nTest Suite 5: Protected Routes Access Control');
    const unauthInquiries = await request('/inquiries');
    assert(unauthInquiries.status === 401, 'GET /api/inquiries without token returns 401 Unauthorized');

    // TEST 6: Protected GET All Inquiries
    const authInquiries = await request('/inquiries', {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    assert(authInquiries.status === 200, 'GET /api/inquiries with Bearer token returns 200 OK');
    assert(Array.isArray(authInquiries.data.data), 'Returns inquiries list');
    assert(authInquiries.data.stats && authInquiries.data.stats.total > 0, 'Returns summary statistics object');

    // TEST 7: Update Inquiry Status (PATCH)
    console.log('\nTest Suite 6: Inquiry Status Management');
    const patchRes = await request(`/inquiries/${createdId}/status`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({ status: 'Confirmed' }),
    });
    if (patchRes.status !== 200) {
      console.log('PATCH returned status:', patchRes.status, 'data:', patchRes.data);
    }
    assert(patchRes.status === 200, 'PATCH /api/inquiries/:id/status returns 200 OK');
    assert(patchRes.data.data.status === 'Confirmed', 'Status successfully changed to Confirmed');

    // TEST 8: Invalid ObjectId Handling
    console.log('\nTest Suite 7: ObjectId Validation');
    const invalidIdRes = await request('/inquiries/not-a-valid-id', {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    assert(invalidIdRes.status === 400, 'GET /api/inquiries/:id with invalid ObjectId returns 400');

    // TEST 9: Delete Inquiry
    console.log('\nTest Suite 8: Delete Operations');
    const deleteRes = await request(`/inquiries/${createdId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    assert(deleteRes.status === 200, 'DELETE /api/inquiries/:id returns 200 OK');

    // Verify it is deleted
    const verifyDelete = await request(`/inquiries/${createdId}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    assert(verifyDelete.status === 404, 'Deleted inquiry returns 404 Not Found');

    console.log('\n====================================================');
    console.log(`  TEST RESULTS: ${passed} Passed, ${failed} Failed`);
    console.log('====================================================\n');
  } catch (err) {
    console.error('Test Suite Exception:', err);
    failed++;
  } finally {
    if (server) {
      server.close();
    }
    await mongoose.disconnect();
    process.exit(failed > 0 ? 1 : 0);
  }
};

runTests();
