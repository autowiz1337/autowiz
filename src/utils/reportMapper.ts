
import { BackendReport, DashboardData } from '../types/Report';

// Helper to safely get string array from string (CSV) or Array
const parseList = (input: string | string[] | undefined): string[] => {
  if (!input) return [];
  if (Array.isArray(input)) return input.map(i => String(i).trim());
  if (typeof input === 'string') return input.split(',').map(s => s.trim()).filter(Boolean);
  return [];
};

// Helper to find key case-insensitively or via aliases
const getValue = (obj: any, keys: string[]): any => {
  if (!obj) return undefined;
  for (const key of keys) {
    if (obj[key] !== undefined && obj[key] !== null) return obj[key];
  }
  return undefined;
};

export const mapBackendReportToDashboard = (report: any): DashboardData => {
  // Relaxed type 'any' for report input to handle inconsistent JSON casing

  const rawImages = getValue(report, ['Images', 'images']);
  const images = parseList(rawImages);

  const rawSellingPoints = getValue(report, ['topSellingPoints', 'TopSellingPoints', 'sellingPoints']);
  const sellingPoints = parseList(rawSellingPoints);

  const rawVideo = getValue(report, ['Video', 'video', 'Videos', 'videos']);
  const videoUrls = parseList(rawVideo);
  // Select 2nd video (Index 1), fallback to Index 0
  const videoDownloadUrl = videoUrls.length >= 2 ? videoUrls[1] : (videoUrls[0] || '');

  const dateStr = getValue(report, ['CreatedAt', 'createdAt', 'Created_At']) || new Date().toISOString();
  let formattedDate = "Recently";
  try {
      formattedDate = new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
  } catch (e) {
      formattedDate = dateStr;
  }

  return {
    id: getValue(report, ['Id', 'id', 'ID']) || 0,
    title: getValue(report, ['Titlu', 'Title', 'title']) || "Optimized Listing",
    description: getValue(report, ['listingDescription', 'ListingDescription', 'description']) || "",
    originalUrl: getValue(report, ['Url', 'url', 'URL']) || "#",
    createdAt: formattedDate,
    
    persona: {
      title: "Target Persona",
      description: getValue(report, ['targetPersona', 'TargetPersona', 'persona']) || "No persona data available."
    },
    emotionalHook: getValue(report, ['emotionalTrigger', 'EmotionalTrigger', 'hook']) || "N/A",
    sellingPoints: sellingPoints,
    
    images: images,
    videoDownloadUrl: videoDownloadUrl,
    youtubeId: getValue(report, ['Youtube ID', 'YoutubeID', 'youtubeId', 'youtube_id']) || "",
    zipDownloadUrl: getValue(report, ['ZIP Images', 'ZipImages', 'zipUrl']) || ""
  };
};
