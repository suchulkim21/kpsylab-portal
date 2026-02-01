const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./blog.db');

db.serialize(() => {
    // 1. Check current value
    db.get("SELECT image FROM posts WHERE id = 16", (err, row) => {
        if (err) console.error(err);
        console.log("Current Image URL for ID 16:", row.image);
    });

    // 2. Update to local path
    const localPath = '/blog/assets/images/post-16.jpg';
    db.run("UPDATE posts SET image = ? WHERE id = 16", [localPath], function (err) {
        if (err) return console.error(err.message);
        console.log(`Row(s) updated: ${this.changes}`);
    });

    // 3. Verify update
    db.get("SELECT image FROM posts WHERE id = 16", (err, row) => {
        if (err) console.error(err);
        console.log("New Image URL for ID 16:", row.image);
    });
});

db.close();
