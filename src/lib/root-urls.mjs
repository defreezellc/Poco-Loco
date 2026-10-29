/**
 * Prefix root-relative URLs in Markdown (`/menu`, `/images/a.jpg`) with the
 * deploy base. Shared by astro.config.mjs so the same rule covers articles.
 */

export function normalizeBase(value) {
  if (!value || value === '/') return '/';
  const withLeading = value.startsWith('/') ? value : `/${value}`;
  return withLeading.replace(/\/$/, '') || '/';
}

export function prefixRootUrl(value, base) {
  const prefix = !base || base === '/' ? '' : base;
  if (!prefix) return value;
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//')) return value;
  if (value === prefix || value.startsWith(`${prefix}/`)) return value;
  return `${prefix}${value}`;
}

/** Sätteri HAST plugin. Rewrites root-relative href/src in Markdown. */
export function hastBasePlugin(base) {
  return {
    name: 'prefix-base-path',
    element: {
      filter: ['a', 'img'],
      visit(node, ctx) {
        const props = node.properties ?? {};
        for (const key of ['href', 'src']) {
          const value = props[key];
          if (typeof value !== 'string') continue;
          const next = prefixRootUrl(value, base);
          if (next !== value) ctx.setProperty(node, key, next);
        }
      },
    },
  };
}
