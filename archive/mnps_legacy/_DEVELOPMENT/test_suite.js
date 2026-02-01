const http = require('http');
const assert = require('assert');

const BASE_URL = 'http://localhost:7777';

// Utility to make HTTP requests
function request(method, path, data = null, cookie = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 7777,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (cookie) {
            options.headers['Cookie'] = cookie;
        }

        if (data) {
            options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(data));
        }

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(body);
                    resolve({ statusCode: res.statusCode, body: parsed, headers: res.headers });
                } catch (e) {
                    resolve({ statusCode: res.statusCode, body, headers: res.headers });
                }
            });
        });

        req.on('error', reject);

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

// Test Cases
async function runTests() {
    console.log('Starting MNPS Test Suite...\n');
    let passed = 0;
    let failed = 0;

    async function test(name, fn) {
        try {
            process.stdout.write(`[TEST] ${name}... `);
            await fn();
            console.log('PASS');
            passed++;
        } catch (error) {
            console.log('FAIL');
            console.error('  Error:', error.message);
            failed++;
        }
    }

    let adminCookie = null;

    // 0. Admin Login
    await test('Admin Login', async () => {
        const data = { username: 'alyce', password: '1234' };
        const res = await request('POST', '/api/auth/login', data);
        assert.strictEqual(res.statusCode, 200);
        assert.strictEqual(res.body.success, true);

        // Extract cookie
        if (res.headers['set-cookie']) {
            adminCookie = res.headers['set-cookie'][0].split(';')[0];
        }
        assert.ok(adminCookie, 'Session cookie should be set');
    });

    // 1. Health Check
    await test('Server Health Check', async () => {
        const res = await request('GET', '/api/status'); // Using status endpoint
        assert.strictEqual(res.statusCode, 200);
        assert.strictEqual(res.body.status, 'ok');
    });

    // 2. Save Result
    let resultId;
    await test('Save Assessment Result', async () => {
        const data = {
            uuid: 'test-user-' + Date.now(),
            fingerprint: 'test-fp',
            scores: {
                machiavellianism: 5,
                narcissism: 5,
                psychopathy: 5,
                sadism: 5
            },
            totalScore: 20
        };
        const res = await request('POST', '/api/results', data);
        assert.strictEqual(res.statusCode, 200);
        assert.strictEqual(res.body.success, true);
        assert.ok(res.body.resultId);
        resultId = res.body.resultId;
    });

    // 3. Verify Stats Update
    await test('Verify Stats Update', async () => {
        const res = await request('GET', '/api/admin/stats', null, adminCookie);
        assert.strictEqual(res.statusCode, 200);
        assert.ok(res.body.stats.totalTests > 0);
    });

    // 4. Confirm Payment
    await test('Confirm Payment', async () => {
        assert.ok(resultId, 'Result ID required from previous test');
        const res = await request('POST', '/api/payments/confirm', { resultId });
        assert.strictEqual(res.statusCode, 200);
        assert.strictEqual(res.body.success, true);
    });

    console.log(`\nTest Summary: ${passed} Passed, ${failed} Failed`);
    if (failed > 0) process.exit(1);
}

runTests();
