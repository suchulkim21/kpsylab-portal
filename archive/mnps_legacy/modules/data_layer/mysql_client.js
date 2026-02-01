const mysql = require('mysql2/promise');
require('dotenv').config();

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mnps_db',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Initialize Database Schema
async function initDB() {
  let connection;
  try {
    // Create DB if not exists
    const tempPool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      waitForConnections: true,
      connectionLimit: 1
    });

    connection = await tempPool.getConnection();
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'mnps_db'}\``);
    connection.release();
    await tempPool.end();

    // Now use the main pool
    const [rows, fields] = await pool.query('SELECT 1');
    console.log('MySQL Database Connected Successfully.');

    // Create Users Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        nickname VARCHAR(50),
        referral_code VARCHAR(50) UNIQUE,
        referred_by VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Migration: Add nickname if not exists (Safe for existing tables)
    try {
      await pool.query(`ALTER TABLE users ADD COLUMN nickname VARCHAR(50)`);
    } catch (e) {
      // Ignore if column exists
    }

    // Migration: Add points if not exists
    try {
      await pool.query(`ALTER TABLE users ADD COLUMN points INT DEFAULT 0`);
    } catch (e) {
      // Ignore if column exists
    }

    // Create Results Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS results (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        score_m INT,
        score_n INT,
        score_p INT,
        score_s INT,
        sub_scores JSON,
        is_paid BOOLEAN DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `);

    console.log('MySQL Tables Initialized.');

  } catch (error) {
    console.error('MySQL Initialization Error:', error);
  }
}

module.exports = {
  pool,
  initDB
};
