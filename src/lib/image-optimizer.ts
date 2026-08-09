import { processUploadedFile } from './heic-converter';

/**
 * Optimizes uploaded or camera-captured files for mobile memory efficiency.
 * Resizes images exceeding maxDimension (default: 1920px) to prevent mobile UI freezes.
 */
export async function optimizePhotoInput(
  file: File,
  maxDimension: number = 1920
): Promise<string> {
  // 1. Process HEIC / HEIF if necessary
  const processedDataUrl = await processUploadedFile(file);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      let width = img.naturalWidth || img.width;
      let height = img.naturalHeight || img.height;

      // Check if image needs downscaling
      if (width <= maxDimension && height <= maxDimension) {
        resolve(processedDataUrl);
        return;
      }

      // Calculate scaled dimensions
      if (width > height) {
        if (width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        }
      } else {
        if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(processedDataUrl);
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.92);
      resolve(optimizedDataUrl);
    };

    img.onerror = () => {
      reject(new Error('Failed to load image for optimization.'));
    };

    img.src = processedDataUrl;
  });
}

/**
 * Safely converts Data URL to Blob for Web Share API
 */
export function dataUrlToBlob(dataUrl: string): Blob {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
