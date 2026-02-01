const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function createAdmin() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'mnps_db'
    });

    try {
        const username = 'alyce';
        const password = 'admin1234'; // Default password
        const nickname = 'Admin';
        const hashedPassword = await bcrypt.hash(password, 10);
        const referralCode = 'ADMIN0';

        const [result] = await pool.query(
            `INSERT INTO users (username, password, nickname, referral_code) VALUES (?, ?, ?, ?)`,
            [username, hashedPassword, nickname, referralCode]
        );

        console.log(`Admin user created successfully.`);
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        await pool.end();
    }
}

createAdmin();
