
import { BackendReport, DashboardData } from '../types/Report';

export const mapBackendReportToDashboard = (report: BackendReport): DashboardData => {
  // 1. Parse Comma-Separated Lists
  const images = report.Images ? report.Images.split(',').map(url => url.trim()).filter(Boolean) : [];
  
  // Selling points might be comma separated
  const sellingPoints = report.topSellingPoints 
    ? report.topSellingPoints.split(',').map(sp => sp.trim()).filter(Boolean) 
    : [];

  // 2. Video Logic: Select 2nd video (Index 1), fallback to Index 0 if missing
  const videoUrls = report.Video ? report.Video.split(',').map(v => v.trim()).filter(Boolean) : [];
  const videoDownloadUrl = videoUrls.length >= 2 ? videoUrls[1] : (videoUrls[0] || '');

  // 3. Date Formatting
  const formattedDate = new Date(report.CreatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return {
    id: report.Id,
    title: report.Titlu || "Optimized Listing",
    description: report.listingDescription || "",
    originalUrl: report.Url,
    createdAt: formattedDate,
    
    persona: {
      title: "Target Persona", // Generic title since JSON only provides description
      description: report.targetPersona || "No persona data available."
    },
    emotionalHook: report.emotionalTrigger || "N/A",
    sellingPoints: sellingPoints,
    
    images: images,
    videoDownloadUrl: videoDownloadUrl,
    youtubeId: report["Youtube ID"] || "",
    zipDownloadUrl: report["ZIP Images"] || ""
  };
};
