// verify_length.js
// Checks that every post in the SQLite blog database has content length >= 2000 characters.
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./blog.db', err => {
    if (err) {
        console.error('Failed to open DB:', err.message);
        process.exit(1);
    }
});

db.all('SELECT id, title, LENGTH(content) AS len FROM posts', (err, rows) => {
    if (err) {
        console.error('Error querying posts:', err.message);
        process.exit(1);
    }
    let allOk = true;
    rows.forEach(row => {
        if (row.len < 2000) {
            console.warn(`⚠️ Post ID ${row.id} "${row.title}" length ${row.len} < 2000`);
            allOk = false;
        }
    });
    if (allOk) {
        console.log('✅ All posts have content length >= 2000 characters.');
    } else {
        console.log('❗ Some posts are shorter than 2000 characters. See warnings above.');
    }
    db.close();
});
