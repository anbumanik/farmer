const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  // Hex replacements to Thick Green and Gold
  { regex: /5A5427/gi, replacement: '166534' }, // Dark Olive -> Thick Green
  { regex: /A79057/gi, replacement: 'D4AF37' }, // Golden Brown -> Gold
  { regex: /D3BD99/gi, replacement: 'eaf5ef' }, // Light Beige -> Light Mint
  { regex: /F5CD62/gi, replacement: 'D4AF37' }, // Extra Yellow -> Gold
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      for (const { regex, replacement } of replacements) {
        if (regex.test(content)) {
          content = content.replace(regex, replacement);
          modified = true;
        }
      }
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Replacement complete.');
