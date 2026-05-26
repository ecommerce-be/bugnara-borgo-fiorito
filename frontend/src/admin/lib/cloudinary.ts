import type { CloudinarySignature } from './adminTypes';

/**
 * Uploads a file directly to Cloudinary using a signed signature
 * obtained from our backend. This way the api_secret never leaves
 * the server and the upload bypasses our backend (faster, no GB
 * passing through our infra).
 *
 * Returns the public URL of the uploaded image.
 */
export async function uploadToCloudinary(
  file: File,
  signature: CloudinarySignature,
  onProgress?: (percentage: number) => void
): Promise<string> {
  const url = `https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`;

  const form = new FormData();
  form.append('file', file);
  form.append('api_key', signature.apiKey);
  form.append('timestamp', String(signature.timestamp));
  form.append('upload_preset', signature.uploadPreset);
  form.append('folder', signature.folder);
  form.append('signature', signature.signature);

  // Use XHR (not fetch) so we get upload progress events
  return await new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);

    if (onProgress) {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      });
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response.secure_url as string);
        } catch (e) {
          reject(new Error('Invalid Cloudinary response'));
        }
      } else {
        reject(new Error(`Cloudinary upload failed (${xhr.status}): ${xhr.responseText}`));
      }
    };

    xhr.onerror = () => reject(new Error('Cloudinary upload network error'));
    xhr.send(form);
  });
}
