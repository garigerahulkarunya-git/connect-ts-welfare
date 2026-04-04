import fs from 'fs';
import path from 'path';

const localesDir = 'public/locales';
try {
  const dirs = fs.readdirSync(localesDir);
  dirs.forEach(lang => {
    const langDir = path.join(localesDir, lang);
    if (!fs.lstatSync(langDir).isDirectory()) return;
    const filePath = path.join(langDir, 'translation.json');
    if (fs.existsSync(filePath)) {
      try {
        JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch (e) {
        console.log(`ERROR: ${filePath} - ${e.message}`);
      }
    }
  });
} catch (e) {
  console.error(e);
}
