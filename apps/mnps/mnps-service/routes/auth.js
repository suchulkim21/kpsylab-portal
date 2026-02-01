const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { pool } = require('../modules/data_layer/mysql_client');

// Register
router.post('/register', async (req, res) => {
    const { username, password, nickname, referral_code } = req.body;
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const myReferralCode = Math.random().toString(36).substring(2, 8).toUpperCase();

        const [result] = await pool.query(
            `INSERT INTO users (username, password, nickname, referral_code, referred_by) VALUES (?, ?, ?, ?, ?)`,
            [username, hashedPassword, nickname, myReferralCode, referral_code || null]
        );

        res.json({ success: true, message: 'User registered successfully.' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, message: 'Username already exists.' });
        }
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Server error during registration.' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await pool.query(`SELECT * FROM users WHERE username = ?`, [username]);
        const user = rows[0];

        if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials.' });

        // Create Session
        req.session.userId = user.id;
        req.session.username = user.username;
        req.session.nickname = user.nickname;
        req.session.referral_code = user.referral_code;

        res.json({ success: true, message: 'Login successful.', user: { username: user.username, nickname: user.nickname, referral_code: user.referral_code } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Database error.' });
    }
});

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ success: false, message: 'Logout failed.' });
        res.json({ success: true, message: 'Logged out.' });
    });
});

// Me (Get Current User)
router.get('/me', async (req, res) => {
    if (!req.session.userId) {
        return res.json({ success: false, user: null });
    }

    try {
        const [rows] = await pool.query(`SELECT id, username, nickname, referral_code, referred_by, points FROM users WHERE id = ?`, [req.session.userId]);
        const row = rows[0];

        if (!row) {
            return res.json({ success: false, user: null });
        }
        res.json({
            success: true,
            user: {
                id: row.id,
                username: row.username,
                nickname: row.nickname,
                referral_code: row.referral_code,
                referred_by: row.referred_by,
                points: row.points || 0
            }
        });
    } catch (error) {
        console.error('Auth check error:', error);
        res.json({ success: false, user: null });
    }
});

module.exports = router;
