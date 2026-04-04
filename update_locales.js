import fs from 'fs';
import path from 'path';

const langCodes = {
  'en': 'en-IN',
  'bn': 'bn-IN',
  'gu': 'gu-IN',
  'hi': 'hi-IN',
  'kn': 'kn-IN',
  'ml': 'ml-IN',
  'mr': 'mr-IN',
  'or': 'or-IN',
  'pa': 'pa-IN',
  'ta': 'ta-IN',
  'te': 'te-IN',
  'ur': 'ur-IN',
  'as': 'as-IN',
  'mni': 'mni-IN',
  'kok': 'kok-IN',
  'sa': 'sa-IN',
  'ks': 'ks-IN',
  'ne': 'ne-IN',
  'mai': 'mai-IN',
  'brx': 'brx-IN',
  'sat': 'sat-IN',
  'doi': 'doi-IN'
};

const localesDir = 'public/locales';
const langDirs = fs.readdirSync(localesDir);

langDirs.forEach(lang => {
  const dirPath = path.join(localesDir, lang);
  if (!fs.statSync(dirPath).isDirectory()) return;

  const filePath = path.join(dirPath, 'translation.json');
  if (fs.existsSync(filePath)) {
    try {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // Update lang_code
      content['lang_code'] = langCodes[lang] || lang;
      
      // Update common_all if missing
      if (!content['common_all']) {
        content['common_all'] = 'All'; // Generic fallback
      }

      fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
      console.log(`Updated ${lang}/translation.json`);
    } catch (e) {
      console.error(`Error updating ${lang}: ${e.message}`);
    }
  }
});
