
# 💳 Stripe Payment Simulation & Testing Guide

## 🛑 Critical Concept: Tokenization vs. Charge

You asked: *"Is there another step we have to take to get the money?"*
**YES. This is the most important part of the integration.**

### 1. Tokenization (Frontend / React)
*   **Analogy:** This is like handing your credit card to a waiter. You are giving them access, but you haven't paid the bill yet.
*   **Technical:** The React app calls `stripe.createPaymentMethod`.
*   **Result:** Stripe verifies the card numbers are valid and gives you a secure ID (`pm_...`).
*   **Money Moved:** **$0.00**.
*   **Stripe Dashboard:** Appears in "Logs" but **NOT** in "Payments".

### 2. Charge (Backend / n8n)
*   **Analogy:** This is the waiter actually running the card through the machine.
*   **Technical:** Your n8n workflow receives the ID (`pm_...`) and sends a request to Stripe to `create` and `confirm` a Payment Intent.
*   **Result:** Money is transferred from the client's bank to your Stripe account.
*   **Money Moved:** **$499.00**.
*   **Stripe Dashboard:** Appears as "Succeeded" in the "Payments" tab.

**⚠️ IF YOU STOP AFTER THE FRONTEND, YOU WILL NOT GET PAID. YOU MUST SETUP THE BACKEND (SECTION 2).**

---

## 1. How to Simulate & Verify (Step-by-Step)

### Phase 1: Verify Frontend Tokenization
Even without the backend, you can prove the React form is working.

1.  **Open Browser Console**: Go to the Checkout page (`/checkout`), right-click -> Inspect -> **Network** tab.
2.  **Enter Test Card**:
    *   Card: `4242 4242 4242 4242`
    *   Date: Future (e.g., 12/30)
    *   CVC: `123`
    *   Zip: `12345`
3.  **Click "Complete Order"**:
    *   Look for a request to `api.stripe.com` in the Network tab (specifically `payment_methods`).

#### ✅ Is my response a success?
**YES.** If you received a JSON response similar to the one below, your frontend is working perfectly:

```json
{
  "id": "pm_1SeWtpIUPUeJt7pnP33x24vS",  // <--- KEY SUCCESS INDICATOR (pm_...)
  "object": "payment_method",
  "card": {
    "brand": "visa",
    "last4": "4242"
  },
  "livemode": false,
  "type": "card"
}
```

*   **What this means:** Stripe has validated the card numbers and generated a secure token (`pm_...`).
*   **What this is NOT:** This is *not* a charge. No money has moved yet.

### Phase 2: Check Stripe Developer Logs
Because the action above was just "Tokenization" and not a "Charge", **you will NOT see this in the standard "Payments" tab.**

To see this event in your Dashboard:

1.  Log into your Stripe Dashboard.
2.  Toggle **Test Mode** (Top right orange toggle).
3.  Go to **Developers** (top right) -> **Logs** (tab on the left).
4.  Look for a generic API entry: `POST /v1/payment_methods`.
    *   **Status 200 OK**: Matches the JSON you saw in the browser.
    *   Click it to see the Request body (card details masked) and the Response body (the JSON you pasted).

### Phase 3: Verify Backend Handoff
1.  In the Browser Network tab, look for the request to your webhook: `https://app.autowizz.cfd/webhook/new-order`.
2.  Check the **Payload**:
    ```json
    {
      "product": "pro_optimization",
      "stage": "payment_success",
      "payment_method_id": "pm_1SeWtpIUPUeJt7pnP33x24vS", // The ID from Phase 1
      "email": "user@example.com"
    }
    ```
3.  If this request is sent successfully, the frontend work is complete.

---

## 2. Option A: Charging with n8n (External Backend)

### ❌ The Error: `ReferenceError: stripe is not defined`
If you paste Node.js code into an **n8n Code Node**, it fails because n8n does not load the `stripe` library by default.

### ✅ The Fix: Use the "HTTP Request" Node
Instead of writing JavaScript code, add an **HTTP Request** node in your n8n workflow to call the Stripe API directly. This works in all n8n environments (Cloud & Self-Hosted).

#### Configuration Settings:
*   **Method:** `POST`
*   **URL:** `https://api.stripe.com/v1/payment_intents`
*   **Authentication:** 
    *   Select **Generic Credential Type** -> **Header Auth**.
    *   Create a credential with Name: `Authorization` and Value: `Bearer sk_test_YOUR_SECRET_KEY` (Replace with your actual Secret Key).
*   **Send Body:** Toggle to `On`.
*   **Body Content Type:** `Form-Urlencoded`.
*   **Body Parameters:** Add the following fields:

| Name | Value (Expression) |
| :--- | :--- |
| `amount` | `49900` (for $499.00) |
| `currency` | `usd` |
| `payment_method` | `{{ $json.payment_method_id }}` (Data from React) |
| `confirm` | `true` |
| `automatic_payment_methods[enabled]` | `true` |
| `automatic_payment_methods[allow_redirects]` | `never` |

---

## 3. Option B: Charging WITHOUT n8n (Cloudflare Functions)

You asked: *"Can we implement the whole process... without using n8n?"*
**YES.** Since your project is hosted on Cloudflare Pages (indicated by `wrangler.json`), you can use **Cloudflare Functions**. This acts as your backend.

### ⚠️ Why you can't just use React
You **cannot** put the Stripe Secret Key (`sk_live_...`) in your React frontend code. If you do, hackers will steal it and drain your bank account. You *must* have a secure server environment. Cloudflare Functions provides this.

### Step 1: Create the Function File
Create a new file in your project: `functions/api/charge.js`

```javascript
export async function onRequestPost(context) {
  // 1. Get the Secret Key from Cloudflare Environment Variables
  const STRIPE_SECRET_KEY = context.env.STRIPE_SECRET_KEY;
  
  if (!STRIPE_SECRET_KEY) {
    return new Response("Missing Stripe Key", { status: 500 });
  }

  try {
    // 2. Parse the JSON sent from React
    const { payment_method_id, email } = await context.request.json();

    // 3. Call Stripe API directly (Manual fetch to avoid node dependencies issues)
    const stripeResponse = await fetch("https://api.stripe.com/v1/payment_intents", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        amount: "49900", // $499.00
        currency: "usd",
        payment_method: payment_method_id,
        confirm: "true",
        "automatic_payment_methods[enabled]": "true",
        "automatic_payment_methods[allow_redirects]": "never",
        receipt_email: email
      })
    });

    const result = await stripeResponse.json();

    if (result.error) {
      throw new Error(result.error.message);
    }

    return new Response(JSON.stringify({ success: true, id: result.id }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}
```

### Step 2: Configure Environment Variable
In your Cloudflare Dashboard (Pages > Your Project > Settings > Environment Variables):
*   **Variable Name:** `STRIPE_SECRET_KEY`
*   **Value:** `sk_live_...` (Your actual secret key)

### Step 3: Update React (`PaidCheckout.tsx`)
Change the fetch URL from the n8n webhook to your new internal function.

**Old (n8n):**
```javascript
await fetch('https://app.autowizz.cfd/webhook/new-order', ...
```

**New (Cloudflare):**
```javascript
await fetch('/api/charge', ...
```

---

## 4. Test Card Numbers (Simulation)

Use these specific numbers to test different scenarios in the React form:

| Scenario | Card Number | Result |
| :--- | :--- | :--- |
| **Success** | `4242 4242 4242 4242` | Frontend creates token `pm_...` |
| **Card Declined** | `4000 0000 0000 0002` | React form shows "Your card was declined." |
| **Insufficient Funds** | `4000 0000 0000 9995` | React form shows "Insufficient funds." |
| **Invalid CVC** | Use any number, but wrong CVC | React form shows "Your card's security code is incorrect." |

## 5. Checklist for Launch
- [ ] **Frontend**: `pk_test` replaced with `pk_live` in `PaidCheckout.tsx`.
- [ ] **Backend**: 
    *   **If using n8n:** Update n8n credentials to use `sk_live`.
    *   **If using Cloudflare:** Add `STRIPE_SECRET_KEY` (live) to Cloudflare Dashboard.
