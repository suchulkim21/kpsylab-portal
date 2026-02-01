const fs = require('fs');
const https = require('https');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// 20 High Quality Unsplash Images (Manually Curated & Verified)
const imageUrls = [
    "https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=800&q=80", // 1. MNPS Intro
    "https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?w=800&q=80", // 2. Machiavellianism
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80", // 3. Narcissism
    "https://images.unsplash.com/photo-1606103836293-0a063ee20566?w=800&q=80", // 4. Psychopathy
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80", // 5. Digital Sadism
    "https://images.unsplash.com/photo-1578958505797-06bca05c8e9f?w=800&q=80", // 6. Gaslighting
    "https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80", // 7. CEO
    "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?w=800&q=80", // 8. Cold Empathy (REPLACED)
    "https://images.unsplash.com/photo-1606628697412-0cc4a23031c4?w=800&q=80", // 9. Romance
    "https://images.unsplash.com/photo-1606628703404-cded8e7aa98f?w=800&q=80", // 10. Moral Licensing
    "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&q=80", // 11. SNS
    "https://images.unsplash.com/photo-1503269094014-238e74b0b63b?w=800&q=80", // 12. Passive Aggression
    "https://plus.unsplash.com/premium_photo-1679695191632-7cd0ed724310?w=800&q=80", // 13. Evo Psych
    "https://plus.unsplash.com/premium_photo-1710681610926-ddc321f7809a?w=800&q=80", // 14. Humor
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80", // 15. Negotiation
    "https://images.unsplash.com/photo-1505678393-27a3c3f972b9?w=800&q=80", // 16. Jungian Shadow (REPLACED)
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80", // 17. Psychopath Love
    "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=800&q=80", // 18. Art
    "https://images.unsplash.com/photo-1473679408190-0693dd22fe6a?w=800&q=80", // 19. Child Psych
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"  // 20. Leadership
];

const downloadImage = (url, filename) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filename);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to consume '${url}' status: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(() => resolve(filename));
            });
        }).on('error', (err) => {
            fs.unlink(filename, () => { }); // Delete the file on error
            reject(err);
        });
    });
};

const run = async () => {
    const db = new sqlite3.Database('./blog.db');
    console.log("Starting image downloads...");

    for (let i = 0; i < imageUrls.length; i++) {
        const url = imageUrls[i];
        const filename = `blog/assets/images/post-${i + 1}.jpg`;
        const localPath = `/blog/assets/images/post-${i + 1}.jpg`;

        try {
            await downloadImage(url, filename);
            console.log(`Downloaded: ${filename}`);

            // Update Database with local path
            db.run(`UPDATE posts SET image = ? WHERE id = ?`, [localPath, i + 1], function (err) {
                if (err) console.error(err);
            });

        } catch (error) {
            console.error(`Error downloading ${url}:`, error.message);
            // Fallback to placeholder if download fails
            const placeholder = `https://placehold.co/800x400/1a1a1a/FFF?text=Image+${i + 1}`;
            db.run(`UPDATE posts SET image = ? WHERE id = ?`, [placeholder, i + 1]);
        }
    }

    console.log("All downloads processed and database updated.");
    db.close();
};

run();
