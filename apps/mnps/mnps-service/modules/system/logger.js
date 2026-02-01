/**
 * MNPS 로깅 시스템
 * 프로덕션 환경에서 사용할 수 있는 구조화된 로깅 시스템
 */

const fs = require('fs');
const path = require('path');

class Logger {
    constructor() {
        this.logDir = path.join(__dirname, '../../logs');
        this.ensureLogDirectory();
        this.logLevel = process.env.LOG_LEVEL || 'info';
    }

    ensureLogDirectory() {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    getLogFile(level) {
        const today = new Date().toISOString().split('T')[0];
        return path.join(this.logDir, `${level}-${today}.log`);
    }

    formatMessage(level, message, meta = {}) {
        const timestamp = new Date().toISOString();
        const metaStr = Object.keys(meta).length > 0 ? JSON.stringify(meta) : '';
        return `[${timestamp}] [${level.toUpperCase()}] ${message} ${metaStr}\n`;
    }

    writeLog(level, message, meta = {}) {
        const logFile = this.getLogFile(level);
        const logMessage = this.formatMessage(level, message, meta);
        
        // 콘솔 출력
        if (level === 'error') {
            console.error(logMessage.trim());
        } else if (level === 'warn') {
            console.warn(logMessage.trim());
        } else {
            console.log(logMessage.trim());
        }

        // 파일에 쓰기 (비동기)
        fs.appendFile(logFile, logMessage, (err) => {
            if (err) console.error('Log file write error:', err);
        });
    }

    info(message, meta = {}) {
        if (this.shouldLog('info')) {
            this.writeLog('info', message, meta);
        }
    }

    warn(message, meta = {}) {
        if (this.shouldLog('warn')) {
            this.writeLog('warn', message, meta);
        }
    }

    error(message, meta = {}) {
        if (this.shouldLog('error')) {
            this.writeLog('error', message, meta);
        }
    }

    debug(message, meta = {}) {
        if (this.shouldLog('debug')) {
            this.writeLog('debug', message, meta);
        }
    }

    shouldLog(level) {
        const levels = { debug: 0, info: 1, warn: 2, error: 3 };
        return levels[level] >= levels[this.logLevel];
    }

    // 요청 로깅
    logRequest(req, res, responseTime) {
        this.info('HTTP Request', {
            method: req.method,
            url: req.url,
            ip: req.ip || req.connection.remoteAddress,
            status: res.statusCode,
            responseTime: `${responseTime}ms`,
            userAgent: req.get('user-agent')
        });
    }

    // 에러 로깅
    logError(error, req = null) {
        this.error('Application Error', {
            message: error.message,
            stack: error.stack,
            url: req ? req.url : 'N/A',
            method: req ? req.method : 'N/A',
            ip: req ? (req.ip || req.connection.remoteAddress) : 'N/A'
        });
    }

    // 데이터베이스 쿼리 로깅
    logQuery(query, params = [], duration = null) {
        if (this.shouldLog('debug')) {
            this.debug('Database Query', {
                query: query.substring(0, 200), // 첫 200자만
                params: params.length,
                duration: duration ? `${duration}ms` : null
            });
        }
    }
}

module.exports = new Logger();

