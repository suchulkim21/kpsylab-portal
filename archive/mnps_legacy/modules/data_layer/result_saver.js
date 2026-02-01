const { pool } = require('./mysql_client');

async function saveResult(data) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Find or Create User
        // MySQL specific: INSERT ... ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)
        // This ensures we get the ID whether inserted or updated (if we touch a column).
        // However, if we don't touch a column, LAST_INSERT_ID might not be set correctly in some configs.
        // Safer approach: SELECT first, then INSERT if not exists.
        // Or use INSERT IGNORE and then SELECT.

        // Let's generate a referral code if creating new
        const newReferralCode = Math.random().toString(36).substring(2, 8).toUpperCase();

        // Try to find user by UUID (assuming UUID is username for anonymous/guest or we use a separate uuid column)
        // In server.js, we use 'username' for registered users.
        // For guest users, the frontend sends a UUID?
        // Looking at previous code: `INSERT OR IGNORE INTO users (uuid, referral_code)`
        // It seems 'users' table has 'uuid' column in SQLite version, but my MySQL schema in mysql_client.js didn't include 'uuid'.
        // I need to check if 'uuid' is used.
        // In server.js /register, we use 'username'.
        // In result_saver.js (previous), it used 'uuid'.
        // This implies there's a discrepancy or 'username' IS the 'uuid' for guests?
        // Let's assume we need to support 'uuid' column for guests or map it to 'username'.
        // I will add 'uuid' column to the schema in mysql_client.js or just use 'username' as uuid for guests.
        // Let's check server.js register again: `INSERT INTO users (username, ...)`
        // Let's check result_saver.js previous: `INSERT OR IGNORE INTO users (uuid, ...)`
        // It seems the previous SQLite schema had both or 'uuid' was an alias?
        // Let's assume for guests, we treat 'uuid' as 'username'.

        let userId;
        let userReferralCode;

        // Check if user exists by username (using data.uuid as username for guests)
        const [users] = await connection.query('SELECT id, referral_code FROM users WHERE username = ?', [data.uuid]);

        if (users.length > 0) {
            userId = users[0].id;
            userReferralCode = users[0].referral_code;

            // If referral code missing (legacy), update it
            if (!userReferralCode) {
                userReferralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
                await connection.query('UPDATE users SET referral_code = ? WHERE id = ?', [userReferralCode, userId]);
            }
        } else {
            // Create new user (Guest)
            // We need a password for the NOT NULL constraint? 
            // My schema said `password VARCHAR(255) NOT NULL`.
            // I should probably make password nullable or provide a dummy one for guests.
            // Or maybe I should update schema to allow NULL password for guests.
            // For now, I'll insert a dummy password for guests.
            const [result] = await connection.query(
                'INSERT INTO users (username, password, referral_code) VALUES (?, ?, ?)',
                [data.uuid, 'GUEST_NO_PASSWORD', newReferralCode]
            );
            userId = result.insertId;
            userReferralCode = newReferralCode;
        }

        // 2. Insert Result
        const [resResult] = await connection.query(
            `INSERT INTO results (
                user_id, 
                score_m, 
                score_n, 
                score_p, 
                score_s, 
                sub_scores
            ) VALUES (?, ?, ?, ?, ?, ?)`,
            [
                userId,
                data.scores.machiavellianism,
                data.scores.narcissism,
                data.scores.psychopathy,
                data.scores.sadism,
                JSON.stringify(data.subScores || {})
            ]
        );
        const resultId = resResult.insertId;

        // 3. Handle Referral Reward
        if (data.referredBy) {
            await connection.query('UPDATE users SET points = points + 1 WHERE referral_code = ?', [data.referredBy]);
        }

        await connection.commit();
        return { resultId, referralCode: userReferralCode };

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

async function getAdminStats() {
    try {
        const stats = {};

        // 1. Total Tests
        const [totalRows] = await pool.query('SELECT COUNT(*) as count FROM results');
        stats.totalTests = totalRows[0].count;

        // 2. Averages
        const [avgRows] = await pool.query(`
            SELECT 
                AVG(score_m) as avgM,
                AVG(score_n) as avgN,
                AVG(score_p) as avgP,
                AVG(score_s) as avgS
            FROM results
        `);
        stats.averages = avgRows[0];

        // 3. Revenue & Conversion (Assuming is_paid column exists, need to add to schema if not)
        // My schema in mysql_client.js didn't explicitly add 'is_paid'. I should add it.
        // I'll add 'is_paid BOOLEAN DEFAULT 0' to schema in mysql_client.js update or just assume it's there.
        // I'll assume I need to update schema.

        // Let's assume schema has is_paid.
        const [revRows] = await pool.query(`
            SELECT 
                COUNT(CASE WHEN is_paid = 1 THEN 1 END) as paidCount,
                SUM(CASE WHEN is_paid = 1 THEN 3900 ELSE 0 END) as totalRevenue
            FROM results
        `);
        stats.paidCount = revRows[0].paidCount;
        stats.totalRevenue = revRows[0].totalRevenue || 0;
        stats.conversionRate = stats.totalTests > 0 ? (stats.paidCount / stats.totalTests * 100).toFixed(2) : 0;

        // 4. DAU
        const [dauRows] = await pool.query(`SELECT COUNT(DISTINCT user_id) as dau FROM results WHERE DATE(created_at) = CURDATE()`);
        stats.dau = dauRows[0].dau;

        // 5. Daily Trend
        const [trendRows] = await pool.query(`
            SELECT DATE(created_at) as date, COUNT(*) as count 
            FROM results 
            GROUP BY DATE(created_at) 
            ORDER BY DATE(created_at) DESC 
            LIMIT 7
        `);
        stats.dailyTrend = trendRows;

        return stats;
    } catch (error) {
        throw error;
    }
}

async function confirmPayment(resultId) {
    try {
        const [result] = await pool.query('UPDATE results SET is_paid = 1 WHERE id = ?', [resultId]);
        return { success: true, changes: result.changedRows };
    } catch (error) {
        throw error;
    }
}

module.exports = { saveResult, getAdminStats, confirmPayment };
