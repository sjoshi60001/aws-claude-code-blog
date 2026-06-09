/**
 * CloudFront Proxy Base Path Helper
 *
 * This helper adds the /proxy/3000/ prefix to all internal navigation URLs
 * for CloudFront proxy compatibility.
 *
 * How the proxy works:
 * - User visits: https://{cloudfront-url}/proxy/3000/posts/slug
 * - CloudFront strips prefix and forwards to Next.js as: /posts/slug
 * - Next.js routes handle requests without the prefix
 * - Client-side links must include /proxy/3000/ for browser navigation
 */

const BASE_PATH = '/proxy/3000';

/**
 * Add base path to a URL for CloudFront proxy navigation
 * @param path - The internal path (e.g., '/posts/my-post')
 * @returns The full path with base path prefix (e.g., '/proxy/3000/posts/my-post')
 */
export function withBasePath(path: string): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // ALWAYS use proxy prefix for client-side navigation
  // CloudFront strips the prefix before forwarding to Next.js
  // This ensures browser URLs include /proxy/3000/ for CloudFront routing
  return `${BASE_PATH}${normalizedPath}`;
}

/**
 * Remove base path from a URL (useful for route matching)
 * @param path - The full path with base path (e.g., '/proxy/3000/posts/my-post')
 * @returns The path without base path (e.g., '/posts/my-post')
 */
export function stripBasePath(path: string): string {
  if (path.startsWith(BASE_PATH)) {
    return path.slice(BASE_PATH.length);
  }
  return path;
}
