
# 🏛 Decision Log

## ADR-001: Client-Side Dashboard Hydration
*   **Status:** Accepted
*   **Date:** 2024-05-22
*   **Context:** We need to generate personalized dashboards for users post-automation without a complex user database/auth system for the MVP/Pilot.
*   **Decision:** Use a **"Stateless" Architecture** where the dashboard state is hydrated entirely from a JSON file hosted on a public (read-only) bucket (R2/S3). The file location is determined by a UUID passed in the URL (`?id=uuid`).
*   **Consequences:**
    *   (+) Extremely low latency (CDN served).
    *   (+) No backend database required for the frontend app.
    *   (-) URLs must be kept secret (security via obscurity).
    *   (-) Edits made by the user in the dashboard are hard to persist without a write-back API.

## ADR-002: Tailwind for Styling
*   **Status:** Accepted
*   **Context:** Rapid UI development needed with "Dark Mode" priority.
*   **Decision:** Use Tailwind CSS with a `dark` class strategy.
*   **Consequences:** High velocity, consistent design system (`brand-*`, `accent-*` colors).
