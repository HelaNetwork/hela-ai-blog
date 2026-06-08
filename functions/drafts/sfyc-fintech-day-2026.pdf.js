export async function onRequest() {
  return new Response('This file has been removed.', {
    status: 410,
    headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' },
  });
}