
# Integration Guide: Dynamic Dashboard Generation

This document outlines the architecture and data mapping required to populate the Velocity AI Dashboard dynamically using the processed JSON output hosted on Cloudflare R2.

## 1. Architecture Overview

**Approach:** Client-Side Hydration via Unique ID
1.  **Automation:** Backend generates JSON and saves to R2.
2.  **Delivery:** Client visits `https://velocity.ai/dashboard?id=record_123`.
3.  **Hydration:** The React app reads the `?id=` parameter, fetches the JSON from the R2 public bucket URL, and hydrates the dashboard.

---

## 2. Precise Data Mapping

Based on the provided JSON structure and user requirements, here is the definitive mapping table.

| Frontend Component | Backend JSON Key | Transformation Logic |
| :--- | :--- | :--- |
| **Listing Title** | `Titlu` | Direct assignment. Fallback: "Optimized Listing". |
| **Listing Description** | `listingDescription` | Direct assignment. |
| **Target Persona** | `targetPersona` | Direct assignment. |
| **Emotional Hook** | `emotionalTrigger` | Direct assignment. |
| **Key Selling Points** | `topSellingPoints` | Split string by `,` (comma). |
| **Gallery Images** | `Images` | Split string by `,` to create array. |
| **Download Zip** | `ZIP Images` | Direct assignment. |
| **Video File (Download)** | `Video` | Split string by `,`. **Select the 2nd video** (Index 1) for the download source. |
| **YouTube Integration** | `Youtube ID` | 1. **Copy Link:** `https://youtu.be/{Youtube ID}`<br>2. **Embed:** `<iframe src="https://www.youtube.com/embed/{Youtube ID}"...>` |
| **View Source** | `Url` | Direct assignment. |
| **Date Added** | `CreatedAt` | Format ISO string to readable date. |

---

## 3. Implementation Steps

### Phase 1: Type Definitions (`src/types/Report.ts`)
We will define a strict interface for the raw backend response to handle the specific casing and fields.

```typescript
export interface BackendReport {
  Id: number;
  Url: string;
  Titlu: string;
  CreatedAt: string;
  
  // Strategy
  targetPersona: string;
  emotionalTrigger: string;
  topSellingPoints: string; // Comma-separated string
  
  // Content
  listingDescription: string;
  
  // Media Assets
  Images: string; // Comma-separated URLs
  Video: string; // Comma-separated URLs (We want index 1)
  "ZIP Images": string;
  "Youtube ID": string; // Video ID for embedding
}
```

### Phase 2: Data Transformation (`src/utils/reportMapper.ts`)
We need a utility to sanitize the data before it hits the UI.

1.  **CSV Parsing:** Safely split `Images` and `topSellingPoints`.
2.  **Video Selection:** Logic to `data.Video.split(',')[1]`. Fallback to index 0 if only one exists.
3.  **YouTube Logic:** Construct the embed URL and watch URL from the ID.

### Phase 3: Dashboard Refactor (`src/components/Dashboard.tsx`)
1.  **State Management:** Introduce `isLoading`, `fetchError`, and `reportData`.
2.  **URL Parameter Handling:**
    *   Read `id` query param (e.g., `?id=1765445374748`).
    *   Construct the fetch URL pointing to the R2 bucket.
3.  **UI Updates:**
    *   Replace mock `DATA_SOURCE` with hydrated state.
    *   **New:** Add YouTube Embed player and "Copy YouTube Link" button.
    *   **New:** Ensure the "Download Video" button uses the 2nd video link.

---

## 4. Hosting & Security
*   **Public Bucket:** Ensure the R2 bucket allows public read access.
*   **CORS:** Ensure the bucket headers allow requests from the dashboard domain.
