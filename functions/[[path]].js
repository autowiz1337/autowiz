export async function onRequest(context) {
  // Attempt to fetch the static asset
  const response = await context.next();

  // If the asset exists (status 200-399), return it
  if (response.status !== 404) {
    return response;
  }

  // If 404 (not found), it's likely a client-side route (e.g. /dashboard)
  // Serve index.html instead, allowing React Router to handle the view.
  return context.env.ASSETS.fetch(new URL('/', context.request.url));
}