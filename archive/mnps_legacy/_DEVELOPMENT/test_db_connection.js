const { pool, initDB } = require('../modules/data_layer/mysql_client');
const bcrypt = require('bcryptjs');

async function test() {
    try {
        console.log('Starting DB Test...');
        await initDB();
        console.log('InitDB success');

        const username = 'test_script_user_' + Date.now();
        const password = 'password123';
        const nickname = 'TestScriptUser';
        const hashedPassword = await bcrypt.hash(password, 10);
        const myReferralCode = Math.random().toString(36).substring(2, 8).toUpperCase();

        console.log('Attempting insert with:', { username, nickname, myReferralCode });
        const [result] = await pool.query(
            `INSERT INTO users (username, password, nickname, referral_code, referred_by) VALUES (?, ?, ?, ?, ?)`,
            [username, hashedPassword, nickname, myReferralCode, null]
        );
        console.log('Insert success:', result);
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        process.exit();
    }
}

test();
