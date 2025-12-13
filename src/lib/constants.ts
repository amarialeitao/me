// Base path for GitHub Pages deployment
// This matches the basePath in next.config.js
export const BASE_PATH = '/me';

// Helper function to get asset URL
export function getAssetUrl(path: string): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${normalizedPath}`;
}
