/**
 * Helper to normalize and resolve asset paths safely across web and Capacitor platforms.
 * Files in the public directory are served at the root path, so we ensure a leading slash is present
 * and strip any accidental 'public/' prefixes.
 */
export const getAssetPath = (path: string | undefined): string => {
  if (!path) return '/icons/placeholder.png';

  let cleanPath = path.trim();

  // Strip public prefix if it exists in the JSON path
  if (cleanPath.startsWith('public/')) {
    cleanPath = cleanPath.substring(7);
  }

  // Ensure there is a leading slash if not a remote URL
  if (!cleanPath.startsWith('/') && !cleanPath.startsWith('http://') && !cleanPath.startsWith('https://')) {
    cleanPath = '/' + cleanPath;
  }

  // Normalize case-sensitivity for icons folder just in case
  if (cleanPath.startsWith('/Icons/')) {
    cleanPath = '/icons/' + cleanPath.substring(7);
  }

  return cleanPath;
};
