// Base path for GitHub Pages deployment
// Change this if deploying to a different repository name
export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/me' : '';

// Helper function to get asset URL
export function getAssetUrl(path: string): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${normalizedPath}`;
}

