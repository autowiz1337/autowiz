
export interface BackendReport {
  Id?: number;
  Url?: string;
  Titlu?: string;
  Title?: string; // Add variant
  CreatedAt?: string;
  
  targetPersona?: string;
  TargetPersona?: string;
  
  emotionalTrigger?: string;
  EmotionalTrigger?: string;
  
  topSellingPoints?: string | string[];
  TopSellingPoints?: string | string[];
  
  listingDescription?: string;
  ListingDescription?: string;
  
  Images?: string | string[];
  Video?: string | string[];
  
  "ZIP Images"?: string;
  "Youtube ID"?: string;
  YoutubeID?: string;
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
