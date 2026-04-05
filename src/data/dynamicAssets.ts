import { parseStoryInfo, parseHeroInfo } from "@/utils/storyParser";

export interface StoryItem {
  id: number;
  title: string;
  location: string;
  image: string;
}

export interface HeroSlide {
  title: string;
  tag: string;
  desc: string;
  location: string;
  image: string;
}

/**
 * Fetches the live list of beneficiary story images from the server.
 * This reads the public/assets/beneficiary_stories folder at RUNTIME,
 * so adding or deleting a file is reflected on page refresh.
 */
export async function fetchStories(): Promise<StoryItem[]> {
  try {
    const res = await fetch('/__api/beneficiary-stories');
    const files: string[] = await res.json();
    return files.map((filename, index) => {
      const { title, location } = parseStoryInfo(filename);
      return {
        id: index + 1,
        title,
        location,
        image: `/assets/beneficiary_stories/${filename}`,
      };
    });
  } catch {
    return [];
  }
}

/**
 * Fetches the live list of hero gallery images from the server.
 * This reads the public/assets/homepage_gallery folder at RUNTIME.
 */
export async function fetchHeroSlides(): Promise<HeroSlide[]> {
  try {
    const res = await fetch('/__api/homepage-gallery');
    const files: string[] = await res.json();
    return files.map((filename) => {
      const info = parseHeroInfo(filename);
      return {
        ...info,
        image: `/assets/homepage_gallery/${filename}`,
      };
    });
  } catch {
    return [];
  }
}
