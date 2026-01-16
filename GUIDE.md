# Velocity AI - Administrator Guide

## Overview
Velocity AI is a comprehensive automotive listing optimization platform designed to automate and enhance vehicle merchandising.

---

## 1. Landing Page Modules
The landing page serves as the primary conversion funnel. It includes several high-performance modules designed to drive users toward the Listing Generator or Paid Checkout flows.

---

## 2. Dashboard Interface
Accessed via the "Log in" button or automatically via a magic link (e.g., `/dashboard?id=RECORID_ID`).

### Key Functions
*   **Listing Health**: A gamified widget showing a score (0-100) based on asset quality.
*   **Narrative Editor**: Distraction-free text area to edit AI-generated descriptions. Supports local draft saving.

---

## 3. Listing Generator (`/create`)
The campaign creation core. This multi-step form allows dealers to input vehicle data to feed the AI neural engine.

### Data Flow
1.  **Vehicle Essentials**: Basic VIN-level data (Year, Make, Model).
2.  **Vehicle Media**: Users upload up to 40 photos via drag-and-drop.
3.  **Condition & Highlights**: Qualitative data and "Condition Tiers".
4.  **Dealership Voice**: Branding and tone sliders.
5.  **Action Drivers**: Urgency triggers and premium feature categorization.

### Media Handling & Hosted Assets (ImgBB Integration)
Vehicle images are temporarily hosted using the ImgBB API to allow the backend automation (n8n/Python) to access them via public URLs.

#### 1. API Configuration
The ImgBB integration is located in `src/components/ListingGenerator.tsx` within the `uploadAllImages` function.
*   **API Key**: Change the `IMGBB_API_KEY` constant inside the `uploadAllImages` function.
*   **Storage Duration**: Images are set to auto-delete after **12 hours** (`expiration=43200`) to ensure data privacy for the dealership.

#### 2. Sequential Upload Engine
To prevent browser hang and handle large batches (up to 40 high-res files), the app uses an asynchronous sequential loop:
- It uploads images one-by-one.
- It tracks real-time progress which is displayed to the user via a `Loader2` overlay.
- If an upload fails, it logs the error but continues the queue to ensure the maximum number of assets reach the generator.

#### 3. Final Webhook Payload
Once all images are hosted, the resulting array of URLs is appended to the `media.imageUrls` field in the final JSON payload sent to `https://app.autowizz.cfd/webhook/new-order`.

---

## 4. Checkout Flows
The application supports three distinct checkout experiences based on user segment.

### A. Free Pilot (`/pilot`)
Low-friction entry for free trials. Uses external webhook for data capture.

### B. Paid Stripe Flow (`/checkout`)
Main revenue driver. Integrates Stripe Elements via a Cloudflare Worker proxy (`/api/charge`) to keep Secret Keys hidden.

### C. Invite-Only Flow (`/invite`)
VIP/Beta access for pre-selected users. Skip payment, jump directly to generation.

---

## 5. Technical Architecture
### Routing Strategy
Powered by `react-router-dom`. Uses `LegacyRedirectHandler` in `App.tsx` to maintain compatibility with old query-string based links (`?page=...`).

### Persistence
The form uses **Session State Persistence**. Auto-save triggers every 5 seconds to prevent data loss within a browsing session. The Dashboard also saves local drafts to `localStorage` to preserve user edits.