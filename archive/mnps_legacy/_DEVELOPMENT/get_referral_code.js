const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'mnps.db');
const db = new sqlite3.Database(dbPath);

db.get("SELECT referral_code FROM users WHERE username = 'simple_user_1'", (err, row) => {
    if (err) {
        console.error(err);
    } else {
        console.log(row ? row.referral_code : 'User not found');
    }
    db.close();
});
