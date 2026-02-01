const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '../../mnps_sqlite.db');

// SQLite doesn't have a "pool" in the same way, but we'll mock it for compatibility
class SQLitePoolEmulation {
    async query(sql, params) {
        // Convert MySQL syntax to SQLite if necessary (very basic mapping)
        let convertedSql = sql.replace(/`([^`]+)`/g, '"$1"'); // Backticks to double quotes
        convertedSql = convertedSql.replace(/AUTO_INCREMENT/gi, 'AUTOINCREMENT');
        
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(dbPath, (err) => {
                if (err) return reject(err);
            });

            if (convertedSql.trim().toUpperCase().startsWith('SELECT')) {
                db.all(convertedSql, params, (err, rows) => {
                    db.close();
                    if (err) return reject(err);
                    resolve([rows]);
                });
            } else {
                db.run(convertedSql, params, function(err) {
                    db.close();
                    if (err) return reject(err);
                    resolve([{ insertId: this.lastID, affectedRows: this.changes, changedRows: this.changes }]);
                });
            }
        });
    }

    async getConnection() {
        return {
            query: async (sql, params) => {
                return this.query(sql, params);
            },
            beginTransaction: async () => {
                await this.query('BEGIN TRANSACTION');
            },
            commit: async () => {
                await this.query('COMMIT');
            },
            rollback: async () => {
                await this.query('ROLLBACK');
            },
            release: () => {
                // No-op for sqlite mocked connection
            }
        };
    }
}

const pool = new SQLitePoolEmulation();

// Initialize Database Schema
async function initDB() {
    try {
        console.log('Initializing SQLite Database...');
        
        // Create Users Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                nickname TEXT,
                referral_code TEXT UNIQUE,
                referred_by TEXT,
                points INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Create Results Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS results (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                score_m INTEGER,
                score_n INTEGER,
                score_p INTEGER,
                score_s INTEGER,
                sub_scores TEXT,
                is_paid INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
            )
        `);

        console.log('SQLite Database and Tables Initialized.');
    } catch (error) {
        console.error('SQLite Initialization Error:', error);
    }
}

module.exports = {
    pool,
    initDB
};

