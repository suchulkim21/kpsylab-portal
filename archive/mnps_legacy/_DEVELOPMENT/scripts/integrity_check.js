const fs = require('fs');
const path = require('path');

const FILES_TO_CHECK = [
    'pages/index.html',
    'pages/result.html',
    'pages/stage1.html'
];

const CHECKS = {
    'pages/index.html': [
        { pattern: /<html/g, maxCount: 1, message: 'Multiple <html> tags found' },
        { pattern: /<body/g, maxCount: 1, message: 'Multiple <body> tags found' },
        { pattern: /function startNewAssessment/g, minCount: 1, message: 'startNewAssessment function missing' },
        { pattern: /localStorage\.clear\(\)/g, minCount: 1, message: 'localStorage.clear() missing' }
    ],
    'pages/result.html': [
        { pattern: /<html/g, maxCount: 1, message: 'Multiple <html> tags found' },
        { pattern: /position:\s*sticky/g, minCount: 1, message: 'Sticky navbar CSS missing' },
        { pattern: /<nav/g, minCount: 1, message: 'Navigation bar missing' }
    ]
};

function checkIntegrity() {
    let hasError = false;
    const projectRoot = path.join(__dirname, '..');

    console.log('Starting Integrity Check...');

    FILES_TO_CHECK.forEach(file => {
        const filePath = path.join(projectRoot, file);
        if (!fs.existsSync(filePath)) {
            console.error(`[MISSING] ${file} not found.`);
            hasError = true;
            return;
        }

        const content = fs.readFileSync(filePath, 'utf8');
        const checks = CHECKS[file] || [];

        // 1. Basic Duplication Check (Naive)
        const htmlTags = (content.match(/<html/g) || []).length;
        if (htmlTags > 1) {
            console.error(`[DUPLICATION] ${file} has ${htmlTags} <html> tags.`);
            hasError = true;
        }

        // 2. Specific Checks
        checks.forEach(check => {
            const matches = (content.match(check.pattern) || []).length;
            if (check.maxCount !== undefined && matches > check.maxCount) {
                console.error(`[FAIL] ${file}: ${check.message} (Found: ${matches}, Max: ${check.maxCount})`);
                hasError = true;
            }
            if (check.minCount !== undefined && matches < check.minCount) {
                console.error(`[FAIL] ${file}: ${check.message} (Found: ${matches}, Min: ${check.minCount})`);
                hasError = true;
            }
        });
    });

    if (hasError) {
        console.error('\n❌ Integrity Check FAILED. Please fix the issues above.');
        process.exit(1);
    } else {
        console.log('\n✅ Integrity Check PASSED. All files look good.');
    }
}

checkIntegrity();
