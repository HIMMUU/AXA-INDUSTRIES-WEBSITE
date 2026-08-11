const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'j0f3i5re';

/**
 * Generates an optimized Cloudinary delivery URL with automatic format and quality parameters.
 */
export function getCloudinaryUrl(
  publicIdOrUrl: string,
  options: {
    width?: number;
    height?: number;
    quality?: string | number;
    format?: string;
    crop?: string;
  } = {}
): string {
  if (!publicIdOrUrl) return '';

  // If already a full HTTP/HTTPS URL
  if (publicIdOrUrl.startsWith('http://') || publicIdOrUrl.startsWith('https://')) {
    if (publicIdOrUrl.includes('res.cloudinary.com')) {
      if (!publicIdOrUrl.includes('/upload/f_auto,q_auto/') && !publicIdOrUrl.includes('/upload/c_')) {
        return publicIdOrUrl.replace('/upload/', '/upload/f_auto,q_auto/');
      }
      return publicIdOrUrl;
    }
    return publicIdOrUrl;
  }

  // If local static path (/images/...)
  if (publicIdOrUrl.startsWith('/')) {
    return publicIdOrUrl;
  }

  // Construct Cloudinary URL from Public ID
  const transformations = ['f_auto', 'q_auto'];
  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.crop) transformations.push(`c_${options.crop}`);
  if (options.quality) transformations.push(`q_${options.quality}`);
  if (options.format) transformations.push(`f_${options.format}`);

  const transformString = transformations.join(',');
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformString}/${publicIdOrUrl}`;
}
