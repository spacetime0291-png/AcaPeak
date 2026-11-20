export interface Env {
  ASSETS: {
    fetch: (request: Request | string) => Promise<Response>;
  };
}

/**
 * Cloudflare Worker handler for SkolAce Hybrid SSG + CSR.
 * 
 * 1. Static SSG Pages & Assets: Served directly from ./dist via env.ASSETS.
 * 2. SPA Fallback: Any unmatched route (such as dynamic /drilling/*) falls back to /index.html with 200 OK
 *    so React Router can hydrate and mount the interactive view client-side.
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // 1. Fetch static pre-rendered SSG asset from ./dist
    const response = await env.ASSETS.fetch(request);

    // 2. If the file is not found (404), fallback to pre-rendered index.html for SPA client-side hydration
    if (response.status === 404) {
      const fallbackUrl = new URL('/index.html', request.url);
      return env.ASSETS.fetch(fallbackUrl.toString());
    }

    return response;
  },
};
