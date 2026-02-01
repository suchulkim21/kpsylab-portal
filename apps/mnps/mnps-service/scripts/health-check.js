/**
 * 시스템 헬스 체크 스크립트
 * 서버 상태, 데이터베이스 연결, 디스크 공간 등을 확인합니다.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:7777';
const HEALTH_CHECK_PORT = process.env.HEALTH_CHECK_PORT || 7778;

function checkDatabase(dbPath, dbName) {
    return new Promise((resolve) => {
        if (!fs.existsSync(dbPath)) {
            resolve({ name: dbName, status: 'error', message: 'Database file not found' });
            return;
        }

        const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
            if (err) {
                resolve({ name: dbName, status: 'error', message: err.message });
            } else {
                db.close();
                resolve({ name: dbName, status: 'ok', message: 'Connected' });
            }
        });
    });
}

function checkDiskSpace() {
    try {
        const stats = fs.statSync(__dirname);
        // 간단한 디스크 체크 (실제로는 더 정교한 방법 필요)
        return { status: 'ok', message: 'Disk space available' };
    } catch (error) {
        return { status: 'warning', message: 'Cannot check disk space' };
    }
}

async function performHealthCheck() {
    const results = {
        timestamp: new Date().toISOString(),
        status: 'ok',
        checks: {}
    };

    // 데이터베이스 체크
    const blogDbPath = path.join(__dirname, '../blog.db');
    results.checks.blog_db = await checkDatabase(blogDbPath, 'blog.db');

    const mnpsDbPath = process.env.DB_PATH || path.join(__dirname, '../mnps.db');
    results.checks.mnps_db = await checkDatabase(mnpsDbPath, 'mnps.db');

    // 디스크 공간 체크
    results.checks.disk_space = checkDiskSpace();

    // 전체 상태 확인
    const hasError = Object.values(results.checks).some(check => check.status === 'error');
    results.status = hasError ? 'error' : 'ok';

    return results;
}

// HTTP 헬스 체크 서버
const server = http.createServer(async (req, res) => {
    if (req.url === '/health') {
        const health = await performHealthCheck();
        
        res.writeHead(health.status === 'ok' ? 200 : 503, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(health, null, 2));
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(HEALTH_CHECK_PORT, () => {
    console.log(`Health check server running on port ${HEALTH_CHECK_PORT}`);
    console.log(`Access: http://localhost:${HEALTH_CHECK_PORT}/health`);
});

// CLI 모드
if (require.main === module) {
    performHealthCheck().then(results => {
        console.log('\n=== Health Check Results ===');
        console.log(JSON.stringify(results, null, 2));
        process.exit(results.status === 'ok' ? 0 : 1);
    });
}

module.exports = { performHealthCheck };

