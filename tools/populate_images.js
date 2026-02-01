const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../apps/portal/lib/db/blog_seed.json');

try {
    const data = fs.readFileSync(filePath, 'utf8');
    let posts = JSON.parse(data);

    const updatedPosts = posts.map((post, index) => {
        // assigning a unique seed based on index to ensure deterministic images
        // using 16:9 aspect ratio (800x450 is good for standard blog width)
        post.image = `https://picsum.photos/seed/${index + 1}/800/450`;
        return post;
    });

    fs.writeFileSync(filePath, JSON.stringify(updatedPosts, null, 4), 'utf8');
    console.log(`Successfully updated ${updatedPosts.length} posts with Lorem Picsum image URLs.`);

} catch (err) {
    console.error("Error processing file:", err);
}
