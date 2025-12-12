export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // 1. Attempt to fetch the asset from the Workers Assets binding
    // This serves files from ./dist directly
    let response = await env.ASSETS.fetch(request);

    // 2. If found (200-399), return it immediately
    if (response.status !== 404) {
      return response;
    }

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