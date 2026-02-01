/**
 * 데이터베이스 백업 스크립트
 * SQLite 및 MySQL 데이터베이스를 백업합니다.
 */

const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { exec } = require('child_process');
const logger = require('../modules/system/logger');

const BACKUP_DIR = path.join(__dirname, '../../backups');
const DATE_FORMAT = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];

// 백업 디렉토리 생성
if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

/**
 * SQLite 데이터베이스 백업
 */
function backupSQLite(dbPath, backupName) {
    return new Promise((resolve, reject) => {
        const backupPath = path.join(BACKUP_DIR, `${backupName}-${DATE_FORMAT}.db`);
        
        // 파일 복사 방식으로 백업
        try {
            fs.copyFileSync(dbPath, backupPath);
            logger.info(`SQLite backup completed: ${backupName}`, { backupPath });
            resolve(backupPath);
        } catch (err) {
            logger.error(`SQLite backup failed: ${backupName}`, { error: err.message });
            reject(err);
        }
    });
}

/**
 * MySQL 데이터베이스 백업 (mysqldump 사용)
 */
function backupMySQL(config, backupName) {
    return new Promise((resolve, reject) => {
        const backupPath = path.join(BACKUP_DIR, `${backupName}-${DATE_FORMAT}.sql`);
        const command = `mysqldump -h ${config.host} -u ${config.user} -p${config.password} ${config.database} > "${backupPath}"`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                logger.error(`MySQL backup failed: ${backupName}`, { error: error.message });
                reject(error);
            } else {
                logger.info(`MySQL backup completed: ${backupName}`, { backupPath });
                resolve(backupPath);
            }
        });
    });
}

/**
 * 오래된 백업 파일 정리 (30일 이상된 파일 삭제)
 */
function cleanupOldBackups() {
    const files = fs.readdirSync(BACKUP_DIR);
    const now = Date.now();
    const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);

    files.forEach(file => {
        const filePath = path.join(BACKUP_DIR, file);
        const stats = fs.statSync(filePath);

        if (stats.mtime.getTime() < thirtyDaysAgo) {
            fs.unlinkSync(filePath);
            logger.info(`Old backup deleted: ${file}`);
        }
    });
}

/**
 * 메인 백업 함수
 */
async function runBackup() {
    logger.info('Database backup process started');

    try {
        // SQLite 백업 (blog.db)
        const blogDbPath = path.join(__dirname, '../blog.db');
        if (fs.existsSync(blogDbPath)) {
            await backupSQLite(blogDbPath, 'blog');
        }

        // SQLite 백업 (mnps.db)
        const mnpsDbPath = process.env.DB_PATH || path.join(__dirname, '../mnps.db');
        if (fs.existsSync(mnpsDbPath)) {
            await backupSQLite(mnpsDbPath, 'mnps');
        }

        // MySQL 백업 (선택사항)
        if (process.env.MYSQL_HOST) {
            await backupMySQL({
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE
            }, 'mysql');
        }

        // 오래된 백업 정리
        cleanupOldBackups();

        logger.info('Database backup process completed successfully');
        console.log('✅ Backup completed successfully!');
    } catch (error) {
        logger.error('Database backup process failed', { error: error.message });
        console.error('❌ Backup failed:', error.message);
        process.exit(1);
    }
}

// 스크립트가 직접 실행된 경우
if (require.main === module) {
    runBackup();
}

module.exports = { runBackup, backupSQLite, backupMySQL };

