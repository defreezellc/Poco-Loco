import type { APIRoute } from 'astro';
import { sitePath } from '../lib/url';

/** Generated so the sitemap URL follows SITE and BASE_PATH. */
export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://defreezellc.github.io');
  const sitemap = new URL(sitePath('/sitemap-index.xml'), origin);
  const body = `# Indexing is also controlled by the robots meta tag.
# Set indexable: true in src/data/site.ts when the real copy is published.
User-agent: *
Allow: /

Sitemap: ${sitemap.href}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
