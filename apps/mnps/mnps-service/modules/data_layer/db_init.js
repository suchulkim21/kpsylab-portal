const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../mnps.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // Drop existing tables to ensure schema update (Dev mode only)
    db.run("DROP TABLE IF EXISTS users");
    db.run("DROP TABLE IF EXISTS results");

    // Users Table (Hybrid: Anonymous + Registered)
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uuid TEXT UNIQUE,              -- For Anonymous Users
        username TEXT UNIQUE,          -- For Registered Users (Email)
        password TEXT,                 -- For Registered Users (Hashed)
        nickname TEXT,                 -- Display Name
        referral_code TEXT UNIQUE,     -- Referral Code
        referred_by TEXT,              -- Who referred this user
        points INTEGER DEFAULT 0,      -- Reward Points
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login DATETIME
    )`);

    // Results Table
    db.run(`CREATE TABLE IF NOT EXISTS results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        machiavellianism_score INTEGER,
        narcissism_score INTEGER,
        psychopathy_score INTEGER,
        sadism_score INTEGER,
        total_score INTEGER,
        is_paid BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`);

    console.log("Database initialized successfully with new schema.");
});

db.close();
