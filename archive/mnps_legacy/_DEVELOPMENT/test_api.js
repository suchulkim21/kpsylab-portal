const http = require('http');

function postResult() {
    const data = JSON.stringify({
        uuid: 'test-uuid-' + Date.now(),
        fingerprint: 'test-fingerprint',
        scores: {
            machiavellianism: 10,
            narcissism: 20,
            psychopathy: 30,
            sadism: 40
        },
        totalScore: 100
    });

    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/results',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = http.request(options, (res) => {
        console.log(`POST /api/results Status: ${res.statusCode}`);
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            console.log('POST Response:', body);
            getStats();
        });
    });

    req.on('error', (error) => {
        console.error('POST Error:', error);
    });

    req.write(data);
    req.end();
}

function getStats() {
    http.get('http://localhost:3000/api/admin/stats', (res) => {
        console.log(`GET /api/admin/stats Status: ${res.statusCode}`);
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            console.log('GET Response:', body);
        });
    }).on('error', (error) => {
        console.error('GET Error:', error);
    });
}

postResult();
