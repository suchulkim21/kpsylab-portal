const { pool } = require('../modules/data_layer/mysql_client');
const bcrypt = require('bcryptjs');

async function checkAndCreateAdmin() {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', ['alyce']);
        if (rows.length > 0) {
            console.log('Admin user "alyce" already exists. Resetting password...');
            const hashedPassword = await bcrypt.hash('password123', 10);
            await pool.query('UPDATE users SET password = ? WHERE username = ?', [hashedPassword, 'alyce']);
            console.log('Password reset to "password123".');
        } else {
            console.log('Admin user "alyce" not found. Creating...');
            const hashedPassword = await bcrypt.hash('password123', 10);
            const myReferralCode = 'ADMIN01';
            await pool.query(
                `INSERT INTO users (username, password, nickname, referral_code) VALUES (?, ?, ?, ?)`,
                ['alyce', hashedPassword, 'AdminAlyce', myReferralCode]
            );
            console.log('Admin user "alyce" created successfully.');
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit();
    }
}

checkAndCreateAdmin();
