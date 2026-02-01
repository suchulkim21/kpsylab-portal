const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../pages/index.html');

try {
    const content = fs.readFileSync(indexPath, 'utf8');
    const errors = [];

    // Check 1: .landing-container existence
    if (!content.includes('.landing-container')) {
        errors.push("CRITICAL: '.landing-container' class is missing!");
    }

    // Check 2: Height 100vh
    if (!content.includes('height: 100vh')) {
        errors.push("CRITICAL: 'height: 100vh' is missing for .landing-container!");
    }

    // Check 3: Radial Gradient
    if (!content.includes('radial-gradient')) {
        errors.push("CRITICAL: 'radial-gradient' background is missing!");
    }

    // Check 4: Basic Structure
    if (!content.includes('<!DOCTYPE html>') || !content.includes('</html>')) {
        errors.push("CRITICAL: Malformed HTML structure!");
    }

    if (errors.length > 0) {
        console.error("❌ Integrity Check FAILED:");
        errors.forEach(err => console.error(` - ${err}`));
        process.exit(1);
    } else {
        console.log("✅ Integrity Check PASSED: index.html is safe.");
        process.exit(0);
    }

} catch (err) {
    console.error("❌ Error reading index.html:", err);
    process.exit(1);
}
