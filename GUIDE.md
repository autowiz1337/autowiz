# Velocity AI - Administrator Guide

## Overview
Velocity AI is a comprehensive automotive listing optimization platform designed to automate and enhance vehicle merchandising.

---

## 1. Landing Page Modules
The landing page serves as the primary conversion funnel. It includes several high-performance modules.

---

## 2. Dashboard Interface
Accessed via the "Log in" button or automatically via a magic link.

### Key Functions
*   **Listing Health**: A gamified widget showing a score (0-100) based on asset quality.
*   **Narrative Editor**: Distraction-free text area to edit AI-generated descriptions.

---

## 3. Listing Generator (`/create`)
The campaign creation core. This multi-step form allows dealers to input vehicle data to feed the AI neural engine.

### Data Flow
1.  **Vehicle Essentials**: Basic VIN-level data (Year, Make, Model).
2.  **Condition & Highlights**: Qualitative data and "Condition Tiers".
3.  **Dealership Voice**: Branding and tone sliders.
4.  **Action Drivers**: Urgency triggers and premium feature categorization.

### Gamification (The Quality Engine)
The form calculates a real-time **Quality Score** (0-100%):
*   **40%**: Required Fields (Foundation)
*   **15%**: Standout Exterior/Interior Narratives
*   **15%**: 5+ Premium Features Selected
*   **10%**: "Wow Factor" Description
*   **10%**: Urgency Triggers
*   **10%**: Special Offer / Service Detail

---

## 4. Checkout Flows
The application supports three distinct checkout experiences based on user segment.

### A. Free Pilot (`/pilot`)
Low-friction entry for free trials. Uses external webhook for data capture.

### B. Paid Stripe Flow (`/checkout`)
Main revenue driver. Integrates Stripe Elements via Cloudflare Worker proxy.

### C. Invite-Only Flow (`/invite`)
VIP/Beta access for pre-selected users. Skip payment, jump directly to generation.

---

## 5. Technical Architecture
### Routing Strategy
Powered by `react-router-dom`. Uses `LegacyRedirectHandler` to maintain compatibility with old query-string based links.

### Persistence
The form uses **Session State Persistence**. Auto-save triggers every 5 seconds to prevent data loss within a browsing session.
