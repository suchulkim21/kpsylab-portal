const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'mnps.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    console.log('Checking results table schema...');
    db.all("PRAGMA table_info(results)", (err, rows) => {
        if (err) {
            console.error('Error getting table info:', err);
            db.close();
            return;
        }

        const hasIsPaid = rows.some(row => row.name === 'is_paid');
        if (!hasIsPaid) {
            console.log('Adding is_paid column...');
            db.run("ALTER TABLE results ADD COLUMN is_paid BOOLEAN DEFAULT 0", (err) => {
                if (err) {
                    console.error('Error adding column:', err);
                } else {
                    console.log('Column added successfully.');
                }
                db.close();
            });
        } else {
            console.log('is_paid column already exists.');
            db.close();
        }
    });
});
