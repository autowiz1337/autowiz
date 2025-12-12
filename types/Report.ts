
export interface BackendReport {
  Id: number;
  Url: string;
  Titlu?: string; // Optional as per mapping table fallback
  CreatedAt: string;
  
  // Strategy
  targetPersona: string;
  emotionalTrigger: string;
  topSellingPoints: string; // Comma-separated string
  
  // Content
  listingDescription: string;
  descriptionWordCount?: number;
  
  // Media Assets
  Images: string; // Comma-separated URLs
  Video: string; // Comma-separated URLs (We select index 1)
  "ZIP Images": string;
  "Youtube ID": string; // Video ID for embedding
}

export interface DashboardData {
  id: number;
  title: string;
  description: string;
  originalUrl: string;
  createdAt: string;
  
  // Strategy
  persona: {
    title: string;
    description: string;
  };
  emotionalHook: string;
  sellingPoints: string[];
  
  // Media
  images: string[];
  videoDownloadUrl: string; // The selected mp4 (Index 1)
  youtubeId: string;
  zipDownloadUrl: string;
}
