export interface Env {
  ASSETS: {
    fetch: (request: Request | string) => Promise<Response>;
  };
}

const VALID_SUBTESTS = new Set(['pu', 'ppu', 'pbm', 'pk', 'lbi', 'lbe', 'pm']);

/**
 * Cloudflare Worker handler for SkolAce Hybrid SSG + CSR.
 *
 * With `"run_worker_first": false` and `"not_found_handling": "none"` in wrangler.jsonc:
 * 1. All static SSG HTML, JS, CSS, JSON, SVG, ads.txt, robots.txt, and sitemap.xml
 *    are served directly by Cloudflare Edge CDN with 0 Worker invocations.
 * 2. Only non-matching paths reach this Worker to:
 *    - 301 redirect legacy paths (/subtest/*, /materi/*) to Clean Path URLs.
 *    - Serve SPA fallback (/200.html) with 200 OK for client-only /drilling routes.
 *    - Return true HTTP 404 with /404.html for unknown URLs (preventing Soft 404).
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/+$/, '') || '/';

    // 1. Legacy Path 301 Redirects (/subtest/:code & /materi/:id)
    const subtestMatch = pathname.match(/^\/subtest\/([a-z0-9-]+)$/i);
    if (subtestMatch) {
      const code = subtestMatch[1].toLowerCase();
      const target = new URL(`/utbk/${code}${url.search}`, url.origin);
      return Response.redirect(target.toString(), 301);
    }

    const materiMatch = pathname.match(/^\/materi\/([a-z0-9-]+)$/i);
    if (materiMatch) {
      const id = materiMatch[1].toLowerCase();
      const prefix = id.split('-')[0];
      const subCode = VALID_SUBTESTS.has(prefix) ? prefix : 'pu';
      const target = new URL(`/utbk/${subCode}/${id}`, url.origin);
      return Response.redirect(target.toString(), 301);
    }

    // 2. Attempt to fetch static asset first
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) {
      return response;
    }

    // 3. Client-side SPA route (/drilling or /drilling/:subtest) -> serve 200.html
    if (pathname === '/drilling' || /^\/drilling\/[a-z0-9-]+$/i.test(pathname)) {
      const spaUrl = new URL('/200.html', url.origin);
      const spaRes = await env.ASSETS.fetch(spaUrl.toString());
      const headers = new Headers(spaRes.headers);
      headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
      headers.set('X-Robots-Tag', 'noindex, follow');
      return new Response(spaRes.body, {
        status: 200,
        statusText: 'OK',
        headers,
      });
    }

    // 4. All other unknown routes -> true HTTP 404 (eliminates Soft 404 for SEO/AdSense)
    const notFoundUrl = new URL('/404.html', url.origin);
    const notFoundRes = await env.ASSETS.fetch(notFoundUrl.toString());
    const notFoundHeaders = new Headers(notFoundRes.headers);
    notFoundHeaders.set('Cache-Control', 'public, max-age=0, must-revalidate');
    notFoundHeaders.set('X-Robots-Tag', 'noindex, follow');
    return new Response(notFoundRes.body, {
      status: 404,
      statusText: 'Not Found',
      headers: notFoundHeaders,
    });
  },
};
