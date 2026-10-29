/**
 * Root-relative paths (`/menu`, `/images/photo.jpg`) stay that way in content.
 * `sitePath` adds the Astro `base` so they work at `/Poco-Loco/` and at `/`.
 */

/** Base path with no trailing slash. Empty when the site is served from `/`. */
export function basePath(): string {
  const raw = import.meta.env.BASE_URL || '/';
  if (raw === '/') return '';
  return raw.replace(/\/$/, '');
}

/** Prefix a root-relative path with the deploy base. Leaves external URLs alone. */
export function sitePath(path = '/'): string {
  if (!path.startsWith('/')) return path;
  const base = basePath();
  if (base && (path === base || path.startsWith(`${base}/`))) return path;
  if (!path || path === '/') return base ? `${base}/` : '/';
  return `${base}${path}`;
}

/** Drop the base and a trailing slash so `/Poco-Loco/menu/` compares equal to `/menu`. */
export function logicalPath(pathname: string): string {
  const base = basePath();
  let path = pathname || '/';
  if (base && (path === base || path.startsWith(`${base}/`))) {
    path = path.slice(base.length) || '/';
  }
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return path || '/';
}
