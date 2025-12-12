export async function onRequest(context) {
  // 1. Attempt to fetch the asset from the build output (static files)
  const response = await context.next();

  // 2. If found (200, 304, etc), return it immediately.
  if (response.status !== 404) {
    return response;
  }

  // 3. If 404, it means the user requested a client-side route (e.g., /dashboard).
  //    Serve index.html instead so React Router can take over.
  const indexResponse = await context.env.ASSETS.fetch(new URL('/', context.request.url));
  
  return indexResponse;
}