
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
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
