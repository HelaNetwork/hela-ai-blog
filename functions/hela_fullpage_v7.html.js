export async function onRequest() {
  return new Response('This page has been removed.', {
    status: 410,
    headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' },
  });
}