
# 💳 Stripe Payment & Lead Capture Implementation Guide

## ✅ Current Architecture: Hybrid Flow (Security + Integration)

We have implemented a robust hybrid architecture to satisfy both security requirements and external integration needs (CRM/n8n).

1.  **Lead Capture & Data Submission**: Uses the **n8n Webhook** directly. This ensures all lead data (Step 1, Pilot, Invite) flows into your existing automation immediately.
2.  **Payment Processing**: Uses **Cloudflare Functions** (Serverless) to handle Stripe Charge securely. This keeps your Stripe Secret Key hidden from the frontend.

---

## 1. Setup Instructions (Critical for Payment)

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

## 2. API Endpoints

### A. `POST https://app.autowizz.cfd/webhook/new-order` (External)
*   **Purpose**: Lead capture for all flows (Free Pilot, Invite, Step 1 of Paid Checkout).
*   **Data Flow**: Frontend -> External Webhook (n8n).
*   **Why**: Maintains your existing CRM/Data logic without changes.

### B. `POST /api/charge` (Internal Cloudflare Function)
*   **Purpose**: Securely creates and confirms a Stripe Payment Intent.
*   **Data Flow**: Frontend -> Cloudflare Worker -> Stripe API.
*   **Why**: Hides the `sk_live_` key from the browser.
*   **Input**:
    ```json
    {
      "payment_method_id": "pm_...",
      "email": "customer@example.com",
      "name": "Alex Johnson"
    }
    ```
*   **Output**: `{ "success": true, "id": "pi_..." }`

---

## 3. Testing

### Leads (Webhook)
Submitting the form on `/pilot` or Step 1 of `/checkout` should trigger your n8n workflow immediately.

### Payments (Cloudflare)
Step 2 of `/checkout` processes the credit card.
*   **Success**: Redirects to dashboard.
*   **Failure**: Shows Stripe error message (e.g., "Insufficient funds").

---

## 4. Frontend Integration Status

*   **`Checkout.tsx`**: Uses Webhook.
*   **`InviteCheckout.tsx`**: Uses Webhook.
*   **`PaidCheckout.tsx`**: 
    *   Step 1 (Contact Info): Uses Webhook.
    *   Step 2 (Payment): Uses `/api/charge`.

**Next Steps**: Deploy and verify both data streams are working.
