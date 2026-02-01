const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function updateAdminPassword() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'mnps_db'
    });

    try {
        const username = 'alyce';
        const newPassword = '1234';
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const [result] = await pool.query(
            `UPDATE users SET password = ? WHERE username = ?`,
            [hashedPassword, username]
        );

        if (result.affectedRows > 0) {
            console.log(`Password for user "${username}" updated successfully.`);
        } else {
            console.log(`User "${username}" not found.`);
        }
    } catch (error) {
        console.error('Error updating password:', error);
    } finally {
        await pool.end();
    }
}

updateAdminPassword();
