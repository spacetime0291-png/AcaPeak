export interface Env {
  ASSETS: {
    fetch: (request: Request | string) => Promise<Response>;
  };
}

/**
 * Cloudflare Worker handler for SkolAce Hybrid SSG + CSR.
 * 
 * 1. Static SSG Pages & Assets: Served directly from ./dist via env.ASSETS.
 * 2. Caching Strategy:
 *    - HTML documents & SPA fallback: Always served with `Cache-Control: public, max-age=0, must-revalidate`
 *      so browsers always receive the freshest deployment instantly.
 *    - Hashed assets (/assets/*): Cached immutably with high performance.
 * 3. SPA Fallback: Any unmatched route falls back to /index.html with 200 OK.
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // 1. Fetch static pre-rendered SSG asset from ./dist
    const response = await env.ASSETS.fetch(request);

    // 2. If the file is not found (404), fallback to pre-rendered index.html for SPA client-side hydration
    if (response.status === 404) {
      const fallbackUrl = new URL('/index.html', request.url);
      const fallbackRes = await env.ASSETS.fetch(fallbackUrl.toString());
      const fbHeaders = new Headers(fallbackRes.headers);
      fbHeaders.set('Cache-Control', 'public, max-age=0, must-revalidate');
      return new Response(fallbackRes.body, {
        status: 200,
        statusText: 'OK',
        headers: fbHeaders,
      });
    }

    // 3. For HTML documents or root path, guarantee fresh delivery
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html') || url.pathname === '/' || !url.pathname.includes('.')) {
      const newHeaders = new Headers(response.headers);
      newHeaders.set('Cache-Control', 'public, max-age=0, must-revalidate');
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      });
    }

    return response;
  },
};
