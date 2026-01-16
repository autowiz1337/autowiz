# Velocity AI - Administrator Guide

## Overview
Velocity AI is a comprehensive automotive listing optimization platform designed to automate and enhance vehicle merchandising through AI-driven visual and narrative enhancement.

---

## 1. Landing Page Modules
The landing page serves as the primary conversion funnel. It includes several high-performance modules:
*   **Hero**: High-impact value proposition and direct URL entry.
*   **Visual IQ Slider**: Interactive A/B comparison of raw vs. studio-enhanced photos.
*   **Avatar Insights**: Visualizing the target persona logic.
*   **Performance Comparison**: Statistical breakdown of AI vs. traditional processes.

---

## 2. Dashboard Interface (`/dashboard`)
The dashboard is the delivery mechanism for optimized assets.

### Key Functions
*   **Draft Persistence**: Edits made to descriptions or titles are auto-saved to local browser memory, allowing users to return to their work.
*   **Asset Distribution**: One-click deep-linking to major regional listing platforms (Autovit, olx, etc.).
*   **Media Gallery**: High-resolution studio renders with direct .ZIP download capability.

---

## 3. Listing Generator (`/create`)
The engine of the platform. A high-conversion, multi-step interface for data collection.

### Responsive Architecture
*   **Desktop**: Features a sticky sidebar navigation for quick jumping between steps.
*   **Mobile**: Sidebar is hidden to prioritize vertical real estate; a compact gamified header tracks quality and completion.

### Data Flow Steps
1.  **Essentials**: Core VIN-level data (Year, Make, Model, Price).
2.  **Media**: Sequential upload interface for up to 40 images.
3.  **Condition**: Qualitative condition tiers and standout feature narratives.
4.  **Branding**: Calibration of dealership voice and tone sliders (Storytelling/Formality).
5.  **Drivers**: High-intensity urgency triggers and premium feature selection.

### Media Handling & ImgBB Integration
Images uploaded in Step 2 are processed through the **ImgBB API**.
*   **Sequential Upload**: Images are uploaded one-by-one to ensure stable progress tracking and avoid browser memory spikes.
*   **Auto-Deletion**: All temporary assets are set to auto-expire after **12 hours** (`expiration=43200`) to respect privacy and manage storage.
*   **Configuration**: The API key is defined in `src/components/ListingGenerator.tsx` within the `uploadAllImages` constant.

---

## 4. Technical Architecture

### State Management
The application utilizes a unified `FormData` interface with deep nesting to maintain structured data. Auto-save triggers every 5 seconds to ensure zero data loss during long sessions.

### Routing Strategy
Powered by `react-router-dom`. 
*   Uses a `LegacyRedirectHandler` to ensure old marketing links (using `?page=`) still function by redirecting to the correct semantic path.
*   **Production Deployment**: Requires a `_redirects` file (provided in `public/`) to handle SPA navigation on Cloudflare/Netlify.

### Reliability & Quality Scoring
The **Quality Engine** (0-100%) uses a weighted heuristic to encourage users to fill optional but high-value fields (like "Wow Factors" or "Special Offers"), which directly improves the final AI output quality.
