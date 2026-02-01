"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assembleParagraphs = assembleParagraphs;
exports.formatClinicalTone = formatClinicalTone;
function assembleParagraphs(blocks) {
    return blocks
        .filter(b => b.condition !== false)
        .map(b => b.content)
        .join("\n\n");
}
function formatClinicalTone(text) {
    // Basic post-processing to ensure clinical tone (optional regex replacements)
    return text.replace(/요\./g, "다.").replace(/에요/g, "다");
}
