
# 🚀 Deployment Guide: Velocity AI on Cloudflare Pages

This guide outlines the steps to deploy the Velocity AI React application to **Cloudflare Pages**. Cloudflare Pages is chosen for its global edge network, free tier limits (unlimited bandwidth), and seamless Git integration.

---

## 1. Prerequisites

1.  **GitHub Repository**: Ensure your code is pushed to a repository on GitHub.
2.  **Cloudflare Account**: You need a free account at [dash.cloudflare.com](https://dash.cloudflare.com).
3.  **Project State**: Ensure `npm run build` runs locally without errors.

---

## 2. Configuration Check

Before deploying, ensure these files exist in your project to handle Single Page App (SPA) routing correctly.

### A. SPA Rewrite Rule
Check `public/_redirects`. It must contain:
```text
/* /index.html 200
```
*Why?* This tells Cloudflare to serve `index.html` for all routes (like `/dashboard` or `/checkout`) so React Router can handle the navigation.

### B. Node Version
Check `.nvmrc` or `package.json`.
*   We have locked the engine to **Node v20** to ensure build stability.

---

## 3. Step-by-Step Deployment

### Step 1: Connect Git
1.  Log in to the **Cloudflare Dashboard**.
2.  Go to **Workers & Pages** > **Create Application**.
3.  Select the **Pages** tab.
4.  Click **Connect to Git**.
5.  Select your GitHub account and the **autowiz** repository.

### Step 2: Configure Build Settings
Cloudflare usually detects these automatically, but verify them to ensure a successful Vite build.

*   **Project Name**: `velocity-ai` (or your preferred name)
*   **Production Branch**: `main`
*   **Framework Preset**: Select **Vite**
*   **Build Command**: `npm run build`
*   **Output Directory**: `dist`

### Step 3: Environment Variables (Optional)
If you move your Stripe Key or API endpoints to environment variables in the future, add them here.
*   *Current State:* Your Stripe key is hardcoded in `PaidCheckout.tsx`, so no immediate action is needed here.

### Step 4: Deploy
1.  Click **Save and Deploy**.
2.  Cloudflare will clone your repo, install dependencies (using `npm ci`), and run the build command.
3.  Wait for the "Success!" message.

---

## 4. Post-Deployment Checks

### 1. Verify Routing (The "Refresh Test")
1.  Open your new live URL (e.g., `https://velocity-ai.pages.dev`).
2.  Navigate to `/checkout` or `/dashboard`.
3.  **Refresh the page.**
4.  *Pass Condition:* The page reloads correctly without a 404 error.
    *   *Fail?* Ensure `public/_redirects` was included in the build output.

### 2. Verify R2 Data Access (CORS)
The Dashboard fetches JSON files from your R2 public bucket.
1.  Navigate to `/dashboard?id=record_1765533411401.json`.
2.  Open the Browser Console (F12).
3.  Check for red **CORS Errors**.
    *   *If Error:* You must update your R2 Bucket CORS configuration to allow your new Cloudflare Pages domain.

**R2 CORS Configuration Example:**
```json
[
  {
    "AllowedOrigins": [
      "http://localhost:5173",
      "https://velocity-ai.pages.dev",
      "https://your-custom-domain.com"
    ],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"]
  }
]
```

---

## 5. Custom Domain (Optional)

1.  In Cloudflare Pages Project > **Custom Domains**.
2.  Click **Set up a custom domain**.
3.  Enter your domain (e.g., `app.autowizz.cfd`).
4.  Cloudflare will automatically configure the DNS records.

---

## 6. Troubleshooting

*   **Build Failed: "Command not found: vite"**: Ensure `npm install` ran correctly. Check the "Install dependencies" log.
*   **Build Failed: Node Version Mismatch**: Go to **Settings** > **Environment variables** in Cloudflare Pages and add a variable:
    *   Key: `NODE_VERSION`
    *   Value: `20`
*   **404 on Refresh**: The `_redirects` file is missing from the `dist` folder. Ensure it is in the `public` folder of your source code.
