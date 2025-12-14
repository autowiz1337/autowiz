
# 💳 Checkout Flow Optimization Plan: Stateful Order Tracking

## Objective
Currently, the "Lead Capture" (Step 1) and "Payment Success" (Step 2) are treated as two separate events, creating two disconnected rows in the NocoDB database. 

**Goal:** Capture the **Row ID** returned by NocoDB in Step 1 and use it to **UPDATE** the existing row in Step 2.

---

## 1. The Data Flow

### Current Behavior (Disconnected)
1.  **Step 1:** POST `/webhook` -> Backend creates Row #8 -> Frontend ignores response.
2.  **Step 2:** POST `/webhook` -> Backend creates Row #9 (Duplicate data, different status).

### Target Behavior (Connected)
1.  **Step 1:** POST `/webhook` -> Backend creates Row #8 -> **Frontend captures `Id: 8`**.
2.  **Step 2:** POST `/webhook` -> Frontend sends `{ "Id": 8, "stage": "payment_success" }` -> **Backend updates Row #8**.

---

## 2. Implementation Steps

### Step 1: Modify `PaidCheckout.tsx` (Parent Component)

We need to add a state variable to hold the ID returned from the first API call.

**A. Add State**
```typescript
const [orderId, setOrderId] = useState<number | null>(null);
```

**B. Update `handleStep1Submit`**
The NocoDB response returns an array: `[{ "Id": 8, ... }]`. We must parse this.

```typescript
const handleStep1Submit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch('https://app.autowizz.cfd/webhook/new-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
          ...formData, 
          product: 'pro_optimization',
          stage: 'init', // Initial Stage
          timestamp: new Date().toISOString()
      }),
    });

    if (response.ok) {
      const data = await response.json();
      
      // LOGIC: Capture the ID from the response array
      if (Array.isArray(data) && data.length > 0 && data[0].Id) {
          setOrderId(data[0].Id);
          console.log("Order initiated with ID:", data[0].Id);
      }
      
      setStep(2); // Move to payment
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setIsSubmitting(false);
  }
};
```

### Step 2: Modify `PaymentForm` (Child Component)

We need to pass the `orderId` down to the payment form so it can include it in the final webhook.

**A. Update Props Interface**
```typescript
interface PaymentFormProps {
  onSuccess: () => void;
  formData: FormDataType;
  orderId: number | null; // NEW PROP
}
```

**B. Update Webhook Payload in `handleSubmit`**
When Stripe confirms the payment, we send the update payload.

```typescript
if (paymentMethod) {
     await fetch('https://app.autowizz.cfd/webhook/new-order', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
             // If we have an ID, send it for the UPDATE operation
             Id: orderId, 
             
             // Standard fields
             ...formData,
             product: 'pro_optimization',
             
             // Status Update
             stage: 'payment_success', 
             
             // Payment Metadata
             payment_method_id: paymentMethod.id,
             timestamp: new Date().toISOString()
         })
     });

     onSuccess();
}
```

---

## 3. Payload Specifications

### Step 1 Request (Init)
```json
{
  "name": "Doru Cacat",
  "email": "ccatdoru@aol.cp",
  "listingUrl": "...",
  "stage": "init"
}
```

### Step 1 Response (From NocoDB)
```json
[
  {
    "Id": 8,
    "Name": "Doru Cacat",
    "Step": "init",
    ...
  }
]
```

### Step 2 Request (Update)
*Note: The backend must be configured to look for the "Id" key. If present, perform an SQL UPDATE or NocoDB Update API call instead of Create.*

```json
{
  "Id": 8,  <-- CRITICAL: Matches the row created in Step 1
  "name": "Doru Cacat",
  "stage": "payment_success",
  "payment_method_id": "pm_123456789"
}
```

## 4. Execution Checklist
1.  [ ] Update `PaidCheckout` state to include `orderId`.
2.  [ ] Update `handleStep1Submit` to await and parse JSON response.
3.  [ ] Pass `orderId` to `PaymentForm`.
4.  [ ] Update `PaymentForm` fetch body to include `Id`.
