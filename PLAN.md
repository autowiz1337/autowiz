# 🧠 Project Plan: Velocity AI (Pre-Deployment Upgrade)

## 1. ✅ Completed Phases
- [x] **Dynamic Data Hydration**: Dashboard reads from R2 JSON via `?id=` param.
- [x] **Checkout Integration**: Stripe Elements + Webhook triggers.
- [x] **Visual Overhaul**: "Amazon Orange" buttons + Dark Mode strategy.
- [x] **File Structure Fix**: Standardized `src/` directory for Types and Utils.
- [x] **Netlify Build Repair**: Fixed `.nvmrc` encoding and Node versioning.

---

## 🚀 Phase 10: Vehicle Media Upload (High Priority)
**Goal:** Allow users to upload up to 40 vehicle photos directly in the generator and host them via ImgBB/MinIO.

### 10.1 Data Model Refactor
- [ ] Update `FormData` interface in `ListingGenerator.tsx` to include `media: { files: FileItem[] }`.
- [ ] `FileItem` will track the `File` object, a local `previewURL`, and eventually the `remoteURL`.

### 10.2 Media Upload UI (Step 2)
- [ ] Create a "Vehicle Media" section as Step 2 of 5.
- [ ] Implement a Drag & Drop zone using a hidden file input.
- [ ] Build a grid-based preview gallery with "Remove" functionality.
- [ ] Add validation logic for the 40-image limit.

### 10.3 Integration Logic (The Generator Trigger)
- [ ] Implement `uploadImagesToProvider` utility.
- [ ] Update the `Generate Listing` click handler to be asynchronous.
- [ ] **Sequential Upload**: Upload images one-by-one to ImgBB to prevent browser hang and track progress.
- [ ] **Final Payload**: Append the list of hosted image URLs to the webhook submission sent to `https://app.autowizz.cfd/webhook/new-order`.

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
- [x] **Requirement:** Single Page Apps (SPA) on Netlify require a rewrite rule to handle refreshing pages other than `index.html`.
- [x] **Action:** Create `public/_redirects` file.
    ```text
    /* /index.html 200
    ```

---

## 3. ✨ Phase 5: User Experience & Polish
... (Existing sections continue)
