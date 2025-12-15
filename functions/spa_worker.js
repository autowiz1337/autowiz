
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // --- API: LEAD CAPTURE (Step 1) ---
    // Replaces n8n webhook for Step 1. Currently just returns success to allow flow to proceed.
    if (url.pathname === '/api/lead' && request.method === 'POST') {
        return new Response(JSON.stringify({ success: true, message: "Lead captured locally" }), {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // --- API: CHARGE CARD (Step 2) ---
    // Handles Stripe PaymentIntent Creation & Confirmation
    if (url.pathname === '/api/charge' && request.method === 'POST') {
        const stripeKey = env.STRIPE_SECRET_KEY;
        
        if (!stripeKey) {
            return new Response(JSON.stringify({ error: 'Server misconfigured: Missing Stripe Key' }), { 
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        try {
            const reqBody = await request.json();
            const { payment_method_id, email, name } = reqBody;
            
            if (!payment_method_id) {
                 return new Response(JSON.stringify({ error: 'Missing payment_method_id' }), { status: 400 });
            }

            // Construct form data for Stripe API (x-www-form-urlencoded)
            const stripeData = new URLSearchParams();
            stripeData.append('amount', '49900'); // $499.00
            stripeData.append('currency', 'usd');
            stripeData.append('payment_method', payment_method_id);
            stripeData.append('confirm', 'true');
            // Automatic payment methods configuration
            stripeData.append('automatic_payment_methods[enabled]', 'true');
            stripeData.append('automatic_payment_methods[allow_redirects]', 'never');
            // Metadata & Receipts
            stripeData.append('receipt_email', email);
            if(name) stripeData.append('description', `Velocity AI Charge for ${name}`);

            const stripeResponse = await fetch('https://api.stripe.com/v1/payment_intents', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${stripeKey}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: stripeData
            });
            
            const stripeJson = await stripeResponse.json();
            
            if (stripeJson.error) {
                 return new Response(JSON.stringify({ error: stripeJson.error.message }), { 
                     status: 400, 
                     headers: { 'Content-Type': 'application/json' } 
                 });
            }
            
            return new Response(JSON.stringify({ success: true, id: stripeJson.id }), { 
                headers: { 'Content-Type': 'application/json' } 
            });

        } catch (e) {
            return new Response(JSON.stringify({ error: e.message || 'Internal Server Error' }), { 
                status: 500, 
                headers: { 'Content-Type': 'application/json' } 
            });
        }
    }

    // --- API PROXY FOR R2 (CORS BYPASS) ---
    if (url.pathname === '/api/proxy-r2') {
      const id = url.searchParams.get('id');
      if (!id) return new Response('Missing ID', { status: 400 });

      // Hardcoded R2 Base URL (Public Bucket) - Synced with Dashboard config
      const r2BaseUrl = 'https://pub-ce9ab66f3fc6436f92644d16b5892006.r2.dev';
      
      // Handle case where ID is a full URL or just a filename
      let targetUrl = '';
      if (id.startsWith('http')) {
          targetUrl = id; 
      } else {
          targetUrl = `${r2BaseUrl}/${id}`;
      }

      try {
        const response = await fetch(targetUrl);
        
        // Re-create headers to ensure mutable and add CORS
        const newHeaders = new Headers(response.headers);
        newHeaders.set('Access-Control-Allow-Origin', '*');
        newHeaders.set('Content-Type', 'application/json');

        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: 'Failed to fetch from R2 upstream' }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // --- STATIC ASSET SERVING ---
    // 1. Attempt to fetch the asset from the Workers Assets binding
    // This serves files from ./dist directly
    let response = await env.ASSETS.fetch(request);

    // 2. If found (200-399), return it immediately
    if (response.status !== 404) {
      return response;
    }

    // --- SPA FALLBACK ---
    // 3. If 404, check if it looks like a file extension (e.g. image.png, style.css)
    // If it has an extension, it's a genuine 404 (missing asset).
    // If no extension, it's likely a client-side route (e.g. /dashboard), so serve index.html.
    const pathname = url.pathname;
    const isFile = pathname.split('/').pop().includes('.');
    
    if (!isFile) {
       // Serve index.html for client-side routing
       return await env.ASSETS.fetch(new URL('/', request.url));
    }

    // Return the original 404 response for missing files
    return response;
  }
};
