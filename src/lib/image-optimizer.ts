/**
 * Client-Side WebP Converter & Image Compressor
 * Converts raw uploaded image files (PNG/JPG/JPEG) to high-efficiency WebP format.
 * Reduces file sizes by up to 70-80% for sub-second page loading speed.
 */

export interface WebPOptimizationResult {
  file: File;
  dataUrl: string;
  originalSize: number;
  optimizedSize: number;
  compressionRatio: number;
}

export async function convertImageToWebP(
  file: File,
  quality: number = 0.82,
  maxWidth: number = 1200
): Promise<WebPOptimizationResult> {
  return new Promise((resolve, reject) => {
    const originalSize = file.size;
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Downscale image if it exceeds maxWidth
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get 2D canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Export as WebP
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('WebP blob conversion failed'));
              return;
            }

            const optimizedFileName = file.name.replace(/\.[^/.]+$/, '') + '.webp';
            const optimizedFile = new File([blob], optimizedFileName, {
              type: 'image/webp',
              lastModified: Date.now(),
            });

            const dataUrl = canvas.toDataURL('image/webp', quality);
            const optimizedSize = blob.size;
            const compressionRatio = Math.round(
              ((originalSize - optimizedSize) / originalSize) * 100
            );

            resolve({
              file: optimizedFile,
              dataUrl,
              originalSize,
              optimizedSize,
              compressionRatio: Math.max(0, compressionRatio),
            });
          },
          'image/webp',
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image file'));
      img.src = event.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
