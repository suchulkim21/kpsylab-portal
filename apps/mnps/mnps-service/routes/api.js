const express = require('express');
const router = express.Router();
const { pool } = require('../modules/data_layer/mysql_client');
const { saveResult, getAdminStats, confirmPayment } = require('../modules/data_layer/result_saver');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    if (req.session.username === 'alyce') {
        next();
    } else {
        res.status(403).json({ success: false, message: 'Access denied. Admin only.' });
    }
};

router.post('/results', async (req, res) => {
    saveResult(req.body)
        .then(result => res.json({ success: true, resultId: result.resultId, referralCode: result.referralCode }))
        .catch(error => {
            console.error('Error saving result:', error);
            res.status(500).json({ success: false, error: error.message });
        });
});

router.get('/results/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM results WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Result not found' });
        }
        const row = rows[0];
        res.json({
            success: true,
            resultId: row.id,
            scores: {
                machiavellianism: row.score_m,
                narcissism: row.score_n,
                psychopathy: row.score_p,
                sadism: row.score_s
            },
            subScores: row.sub_scores,
            isPaid: !!row.is_paid
        });
    } catch (error) {
        console.error('Error fetching result:', error);
        res.status(500).json({ success: false, error: 'Database error' });
    }
});

router.post('/payments/confirm', async (req, res) => {
    try {
        const { resultId } = req.body;
        await confirmPayment(resultId);
        res.json({ success: true });
    } catch (error) {
        console.error('Error confirming payment:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/admin/stats', isAdmin, async (req, res) => {
    try {
        const stats = await getAdminStats();
        res.json({ success: true, stats });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/status', (req, res) => {
    res.json({ status: 'ok', message: 'MNPS Server is running' });
});

router.get('/config', (req, res) => {
    res.json({
        success: true,
        kakaoJsKey: process.env.KAKAO_JS_KEY || ''
    });
});

module.exports = router;
