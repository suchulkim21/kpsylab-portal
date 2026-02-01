const express = require('express');
const session = require('express-session');
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 7777;

// Middleware
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'mnps_secret_key_12345',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Static Files
app.use(express.static(path.join(__dirname, 'pages')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/modules', express.static(path.join(__dirname, 'modules')));
app.use('/manifest.json', (req, res) => res.sendFile(path.join(__dirname, 'pages', 'manifest.json')));
app.use('/blog', express.static(path.join(__dirname, 'blog'))); // Serve blog folder

const { initDB } = require('./modules/data_layer/mysql_client');
const doomsday = require('./modules/system/doomsday');

// Check System Integrity (Doomsday Protocol)
doomsday.checkIntegrity();

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
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.error('[CRITICAL ERROR] Unhandled Rejection detected!');
    console.error('Reason:', reason);
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

    // Trigger Penalty
    doomsday.reportError();

    // Exit to ensure process restart or stop
    process.exit(1);
});

// Start Server
app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`🚀 MNPS Server is running on http://localhost:${PORT}`);
    console.log(`💀 Doomsday Error Count: ${doomsday.getState().errorCount} / 12`);
    console.log(`📁 Serving static files from:`);
    console.log(`   - /      -> ${path.join(__dirname, 'pages')}`);
    console.log(`   - /pages -> ${path.join(__dirname, 'pages')}`);
    console.log(`   - /assets-> ${path.join(__dirname, 'assets')}`);
    console.log(`=================================================`);
});
