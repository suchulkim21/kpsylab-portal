const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkAdmin() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'mnps_db'
    });

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', ['alyce']);
        if (rows.length > 0) {
            console.log('Admin user "alyce" exists.');
            console.log('Nickname:', rows[0].nickname);
        } else {
            console.log('Admin user "alyce" does NOT exist.');
        }
    } catch (error) {
        console.error('Error checking admin:', error);
    } finally {
        await pool.end();
    }
}

checkAdmin();
