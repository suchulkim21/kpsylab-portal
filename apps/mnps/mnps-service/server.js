const express = require('express');
const session = require('express-session');
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 7777;

// System modules (load before middleware)
const { initDB } = require('./modules/data_layer/mysql_client');
const doomsday = require('./modules/system/doomsday');
const logger = require('./modules/system/logger');

// Middleware
app.use(compression());

// Request logging middleware
app.use((req, res, next) => {
    const startTime = Date.now();
    res.on('finish', () => {
        const responseTime = Date.now() - startTime;
        logger.logRequest(req, res, responseTime);
    });
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'mnps_secret_key_12345',
    resave: false,
    saveUninitialized: false, // Changed to false for security
    cookie: { 
        secure: process.env.NODE_ENV === 'production', // Secure in production
        httpOnly: true, // Prevent XSS attacks
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Static Files
app.use(express.static(path.join(__dirname, 'pages')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/modules', express.static(path.join(__dirname, 'modules')));
app.use('/manifest.json', (req, res) => res.sendFile(path.join(__dirname, 'pages', 'manifest.json')));
app.use('/blog', express.static(path.join(__dirname, 'blog'))); // Serve blog folder

// Check System Integrity (Doomsday Protocol)
doomsday.checkIntegrity();
logger.info('MNPS Server starting...', { 
    port: PORT, 
    nodeEnv: process.env.NODE_ENV || 'development' 
});

// Initialize DB
initDB();

// Routers
const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api');
const viewRouter = require('./routes/view');

app.use('/', viewRouter);
app.use('/api/auth', authRouter);
app.use('/api', apiRouter);

// --- Blog Platform Configuration ---
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./blog.db', (err) => {
    if (err) console.error('Blog DB Error:', err.message);
    else console.log('Connected to the Blog SQLite database.');
});

// Initialize Blog Table
db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT,
    date TEXT,
    tags TEXT,
    image TEXT
)`);

// Blog API Routes
// 1. Get All Posts (with optional search)
app.get('/api/blog/posts', (req, res) => {
    const searchQuery = req.query.q;
    let sql = 'SELECT * FROM posts ORDER BY id DESC';
    let params = [];

    if (searchQuery) {
        sql = 'SELECT * FROM posts WHERE title LIKE ? OR content LIKE ? ORDER BY id DESC';
        params = [`%${searchQuery}%`, `%${searchQuery}%`];
    }

    db.all(sql, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, posts: rows });
    });
});

// 2. Get Single Post
app.get('/api/blog/posts/:id', (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM posts WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, post: row });
    });
});

// 3. Create Post (Simple Admin Check)
app.post('/api/blog/posts', (req, res) => {
    const { title, content, author, tags, image } = req.body;
    const date = new Date().toISOString().split('T')[0];

    db.run(`INSERT INTO posts(title, content, author, date, tags, image) VALUES(?, ?, ?, ?, ?, ?)`,
        [title, content, author, date, tags, image],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, id: this.lastID });
        }
    );
});

// 4. Delete Post
app.delete('/api/blog/posts/:id', (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM posts WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, deleted: this.changes });
    });
});

process.on('uncaughtException', (err) => {
    if (typeof logger !== 'undefined') {
        logger.error('Uncaught Exception - CRITICAL ERROR', { 
            error: err.message, 
            stack: err.stack 
        });
    }
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.error('[CRITICAL ERROR] Uncaught Exception detected!');
    console.error(err);
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

    // Trigger Penalty
    doomsday.reportError();

    // Exit to ensure process restart (if managed by PM2) or stop
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    if (typeof logger !== 'undefined') {
        logger.error('Unhandled Rejection - CRITICAL ERROR', { 
            reason: reason instanceof Error ? reason.message : reason,
            stack: reason instanceof Error ? reason.stack : 'N/A'
        });
    }
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.error('[CRITICAL ERROR] Unhandled Rejection detected!');
    console.error('Reason:', reason);
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

    // Trigger Penalty
    doomsday.reportError();

    // Exit to ensure process restart or stop
    process.exit(1);
});

// Health check endpoint
app.get('/health', async (req, res) => {
    const { performHealthCheck } = require('./scripts/health-check');
    try {
        const health = await performHealthCheck();
        res.status(health.status === 'ok' ? 200 : 503).json(health);
    } catch (error) {
        logger.error('Health check failed', { error: error.message });
        res.status(503).json({ status: 'error', message: 'Health check failed' });
    }
});

// Error Handlers (must be after all routes)
app.use((req, res) => {
    logger.warn('404 Not Found', { url: req.url, method: req.method });
    res.status(404).sendFile(path.join(__dirname, 'pages', '404.html'));
});

app.use((err, req, res, next) => {
    logger.logError(err, req);
    doomsday.reportError();
    res.status(500).sendFile(path.join(__dirname, 'pages', '500.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`🚀 MNPS Server is running on http://localhost:${PORT}`);
    console.log(`💀 Doomsday Error Count: ${doomsday.getState().errorCount} / 100`);
    console.log(`📁 Serving static files from:`);
    console.log(`   - /      -> ${path.join(__dirname, 'pages')}`);
    console.log(`   - /pages -> ${path.join(__dirname, 'pages')}`);
    console.log(`   - /assets-> ${path.join(__dirname, 'assets')}`);
    console.log(`🔒 Security: ${process.env.SESSION_SECRET ? '✅ Session Secret configured' : '⚠️  Using default session secret (NOT FOR PRODUCTION)'}`);
    console.log(`=================================================`);
});
