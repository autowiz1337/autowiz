# Velocity AI - Administrator Guide

## Overview
Velocity AI is a comprehensive automotive listing optimization platform designed to automate and enhance vehicle merchandising using neural copywriting and visual processing.

---

## 1. Landing Page Modules
The landing page serves as the primary conversion funnel. It includes several high-performance modules designed to drive users toward the Listing Generator or Paid Checkout flows.

---

## 2. Dashboard Interface
Accessed via the "Log in" button or automatically via a magic link (e.g., `/dashboard?id=RECORID_ID`).

### Key Functions
*   **Listing Health**: A gamified widget showing a score (0-100) based on asset quality.
*   **Narrative Editor**: Distraction-free text area to edit AI-generated descriptions. Supports local draft saving to `localStorage`.
*   **Market Alert Ticker**: Real-time ticker integrated with external valuation data (simulated) to provide dealers with competitive context.

---

## 3. Listing Generator (`/create`)
The campaign creation core. This multi-step form allows dealers to input vehicle data to feed the AI neural engine.

### A. The Magic Start (VIN/URL Decoding)
The form begins with a "Magic Start" input.
*   **Functionality**: Users can paste a **VIN** or an **Inventory URL** (e.g., Autovit.ro).
*   **Service**: Driven by `src/services/vinService.ts`.
*   **Behavior**: The service scans the identifier and auto-populates technical specifications (Year, Make, Model, Trim, Colors, and sometimes Price/Mileage) to reduce manual entry friction by ~80%.

### B. Data Flow & Steps
1.  **Vehicle Intelligence**: Magic Scan + Verification of technical data.
2.  **Visual Assets**: High-volume image upload (Up to 40 photos).
3.  **Condition & Vibe**: Qualitative assessment using visual "Condition Tiers".
4.  **Dealership DNA**: Branding profiles and psychological tone sliders.
5.  **Conversion Drivers**: Selection of premium equipment and urgency triggers.

### C. Quality Score Gamification
The form features a real-time Quality Score (0-100%) to encourage high-quality data submission:
*   **40% Base**: Completion of core technical specs and condition tier.
*   **15% Standout**: Completion of Exterior/Interior selling angle narratives.
*   **15% Premium**: Selection of at least 5 premium equipment items.
*   **10% Wow Factor**: Completion of the primary "buyer hook" field.
*   **10% Urgency**: Selection of at least one urgency trigger.
*   **10% Incentives**: Inclusion of a special dealer offer or explicit "None" selection.
*   **Bonus 5%**: Uploading 10 or more vehicle images.

### D. Media Handling & Sequential Upload (ImgBB)
Vehicle images are hosted via the ImgBB API to provide public URLs for backend processing.

#### 1. Configuration
Located in `src/components/ListingGenerator.tsx` within the `uploadAllImages` function.
*   **Storage Duration**: Set to **12 hours** (`expiration=43200`) for privacy.

#### 2. Sequential Engine
To handle up to 40 high-res files without browser instability:
*   Uses an asynchronous `for` loop to upload files one-by-one.
*   Displays a full-screen loading overlay with real-time percentage progress.
*   Resulting URLs are bundled into the final webhook payload.

---

## 4. Checkout Flows
The application supports three distinct checkout experiences:

### A. Free Pilot (`/pilot`)
Low-friction entry. Directly triggers the capture webhook.

### B. Paid Stripe Flow (`/checkout`)
Processes a $499 charge via `src/components/PaidCheckout.tsx` using a Cloudflare Worker proxy (`/api/charge`) to maintain PCI compliance and hide secret keys.

### C. Invite-Only Flow (`/invite`)
Beta access for pre-vetted dealers. Skips payment, triggers generation immediately.

---

## 5. Technical Architecture
### Routing Strategy
Powered by `react-router-dom`. Includes a `LegacyRedirectHandler` to support legacy `?page=...` URLs.

### Webhook Destination
All finalized listings are sent to: `https://app.autowizz.cfd/webhook/new-order`.
Payload includes full vehicle data, dealership profile, and the array of hosted ImgBB URLs.