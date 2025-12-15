
# 💳 Stripe Payment & Lead Capture Implementation Guide

## ✅ Current Architecture: Serverless (No n8n)

We have implemented **Option B**, which uses Cloudflare Pages Functions to handle backend logic securely. This removes the dependency on external automation tools like n8n for critical payment processing.

### Why this is better:
1.  **Security**: Your Stripe Secret Key is stored in Cloudflare Environment Variables, never exposed to the frontend.
2.  **Speed**: Logic runs on the Edge, closer to the user.
3.  **Simplicity**: One codebase manages both frontend and backend.

---

## 1. Setup Instructions (Critical)

To make the payment system work, you **MUST** configure your Cloudflare environment.

1.  Log in to the **Cloudflare Dashboard**.
2.  Navigate to **Workers & Pages**.
3.  Select your project (`autowiz`).
4.  Go to **Settings** > **Variables and Secrets**.
5.  Click **Add variable**.
    *   **Variable name**: `STRIPE_SECRET_KEY`
    *   **Value**: `sk_live_...` (Your actual Stripe Secret Key from the Stripe Dashboard).
    *   **Encrypt**: Click "Encrypt" to keep it hidden.
6.  **Redeploy** your project for the changes to take effect.

---

## 2. API Endpoints Created

The file `functions/spa_worker.js` now handles two API routes:

### A. `POST /api/charge`
*   **Purpose**: Creates and confirms a Stripe Payment Intent.
*   **Input**:
    ```json
    {
      "payment_method_id": "pm_...",
      "email": "customer@example.com",
      "name": "Alex Johnson"
    }
    ```
*   **Output**: `{ "success": true, "id": "pi_..." }`

### B. `POST /api/lead`
*   **Purpose**: Captures lead data from Step 1, Free Pilot, or Invite flows.
*   **Current Behavior**: Logs the lead to the Cloudflare Worker console and returns success.
*   **Future Upgrade**: You can edit `functions/spa_worker.js` to send this data to a CRM, Google Sheet, or email service via their APIs.

---

## 3. Testing Payments

You can test the flow using Stripe Test Cards (if you use your `sk_test_` key in Cloudflare).

| Scenario | Card Number | Result |
| :--- | :--- | :--- |
| **Success** | `4242 4242 4242 4242` | Returns success, redirects to dashboard. |
| **Declined** | `4000 0000 0000 0002` | Shows "Your card was declined" error. |

---

## 4. Frontend Integration Status

*   **`PaidCheckout.tsx`**: Updated to POST to `/api/charge`.
*   **`Checkout.tsx`**: Updated to POST to `/api/lead`.
*   **`InviteCheckout.tsx`**: Updated to POST to `/api/lead`.

**Next Steps**: Once you deploy, verify the "Network" tab in your browser developer tools to ensure requests are hitting your domain (e.g., `https://app.autowizz.cfd/api/charge`) and returning `200 OK`.
