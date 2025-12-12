
# 🧠 Project Plan: Velocity AI (Pre-Deployment Upgrade)

## 1. ✅ Completed Phases
- [x] **Dynamic Data Hydration**: Dashboard reads from R2 JSON via `?id=` param.
- [x] **Checkout Integration**: Stripe Elements + Webhook triggers.
- [x] **Visual Overhaul**: "Amazon Orange" buttons + Dark Mode strategy.
- [x] **File Structure Fix**: Standardized `src/` directory for Types and Utils.

---

## 2. 🚀 Phase 4: Architecture & Navigation (High Priority)
**Goal:** Fix the "Back Button" problem and ensure deep linking works on Netlify.

### 2.1 Implement React Router (`react-router-dom`)
*   **Current State:** App uses `useState` (`currentPage`) for navigation. If a user refreshes the page on Checkout, they lose their place.
*   **Improvement:** Switch to client-side routing.
    *   `/` -> Landing Page
    *   `/dashboard` -> Dashboard (reads `?id=`)
    *   `/checkout` -> Free Pilot
    *   `/upgrade` -> Paid Stripe Flow
*   **Benefit:** Better browser history support and shareable links.

### 2.2 Netlify SPA Configuration
*   **Requirement:** Single Page Apps (SPA) on Netlify require a rewrite rule to handle refreshing pages other than `index.html`.
*   **Action:** Create `public/_redirects` file.
    ```text
    /* /index.html 200
    ```

---

## 3. ✨ Phase 5: User Experience & Polish
**Goal:** Make the app feel like a premium SaaS, not a prototype.

### 3.1 Persistence Layer (LocalStorage)
*   **Problem:** If a user edits a description in the Dashboard and refreshes, their work is lost because we don't have a database write-back yet.
*   **Solution:** Implement `useLocalStorage` hook for the Dashboard editor.
*   **Benefit:** "Drafts" are saved automatically to the user's browser.

### 3.2 Professional Notification System ("Toasts")
*   **Current State:** We use `alert("Payment Successful!")` or simple text renders.
*   **Improvement:** Integrate `sonner` or `react-hot-toast`.
*   **Usage:**
    *   "Link Copied to Clipboard"
    *   "Draft Saved"
    *   "Payment Processing..."

### 3.3 Celebration Effects
*   **Action:** Add `canvas-confetti` on successful payment or lead submission.
*   **Psychology:** Dopamine hit increases user satisfaction and perceived value.

---

## 4. 🔍 Phase 6: SEO & Meta Data
**Goal:** Ensure the link looks good when shared on Social Media/Slack.

### 4.1 Dynamic Meta Tags (`react-helmet-async`)
*   **Action:** Inject unique `<title>` and `<meta name="description">` tags for each route.
*   **Landing:** "Velocity AI | Automate Your Dealership"
*   **Dashboard:** "Vehicle Report: 2022 BMW X5 | Velocity AI"

---

## 5. 🛡 Phase 7: Robustness & cleanup
**Goal:** Minimize console errors and bundle size.

### 5.1 Optimization
*   **Action:** Remove the Tailwind CDN script from `index.html` and rely solely on the build step (`npm run build`).
    *   *Why?* CDN blocks the render (FOUC) and downloads the entire CSS library. Build step purges unused CSS for faster load times.
*   **Action:** Add an `ErrorBoundary` component to catch React crashes gracefully (e.g., if Stripe fails to load).

## 6. Execution Order for Next Coding Session
1.  **Install Router**: `npm install react-router-dom`
2.  **Refactor App.tsx**: Implement Routes.
3.  **Add Redirects**: Create `public/_redirects`.
4.  **Add Toast**: Replace alerts with Toasts.
5.  **Dashboard Persistence**: Add LocalStorage logic.
