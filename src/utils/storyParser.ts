/**
 * Automatically parses beneficiary story filenames to extract titles and locations.
 * Format expected: "Title @ Location.png" or "Title, Location.png"
 */
export const parseStoryInfo = (path: string) => {
  const fileName = path.split('/').pop() || "";
  // Remove extension and common suffixes
  let cleanName = fileName
    .replace(/\.[^/.]+$/, "") // Remove extension
    .replace(/\s(one|two|three|four|five|- Copy)$/i, "") // Remove enumeration
    .replace(/ÔÇô/g, "-") // Clean special characters if any
    .trim();

  let title = cleanName;
  let location = "Welfare Recipient";

  if (cleanName.includes('@')) {
    const parts = cleanName.split('@');
    title = parts[0].trim();
    location = parts[1].trim();
  } else if (cleanName.includes(',')) {
    const parts = cleanName.split(',');
    title = parts[0].trim();
    location = parts[1].trim() || "Telangana";
  } else if (cleanName.includes('-')) {
    const parts = cleanName.split('-');
    title = parts[0].trim();
    location = parts[parts.length - 1].trim();
  }

  return { 
    title: title || "Beneficiary Story", 
    location: location || "Telangana" 
  };
};

/**
 * Enhanced parser for Hero Gallery items that generates tags and descriptions.
 */
export const parseHeroInfo = (path: string) => {
  const { title, location } = parseStoryInfo(path);
  
  let tag = "MINORITY WELFARE";
  let desc = `Supporting the community through our latest welfare initiatives in ${location}.`;

  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("training") || lowerTitle.includes("programme")) {
    tag = "TRAINING PROGRAMME";
    desc = `Empowering citizens with professional skills and vocational training in ${location}.`;
  } else if (lowerTitle.includes("christmas") || lowerTitle.includes("celebration")) {
    tag = "CELEBRATIONS";
    desc = `Spreading joy and community spirit across the region during our festive celebrations.`;
  } else if (lowerTitle.includes("scheme") || lowerTitle.includes("shakti")) {
    tag = "WOMEN EMPOWERMENT";
    desc = `Focused initiatives to empower women and provide financial stability through state schemes.`;
  } else if (lowerTitle.includes("skill") || lowerTitle.includes("hardware")) {
    tag = "SKILL DEVELOPMENT";
    desc = `Building critical digital and technical skills for the youth of ${location}.`;
  }

  return { title, tag, desc, location };
};
