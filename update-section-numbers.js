const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, 'seeds', 'iloChecklist.js');
let content = fs.readFileSync(seedPath, 'utf-8');

// Replace section number 2 with 1
content = content.replace(/sectionNumber: '2'/g, "sectionNumber: '1'");

// Replace subsection numbers: 2.X -> 1.X
content = content.replace(/subsectionNumber: '2\./g, "subsectionNumber: '1.");
content = content.replace(/questionNumber: '2\./g, "questionNumber: '1.");
content = content.replace(/categoryNumber: '2\./g, "categoryNumber: '1.");

// Replace comments
content = content.replace(/\/\/ 2\./g, "// 1.");

fs.writeFileSync(seedPath, content, 'utf-8');
console.log('✅ Updated section numbers from 2.x to 1.x');
