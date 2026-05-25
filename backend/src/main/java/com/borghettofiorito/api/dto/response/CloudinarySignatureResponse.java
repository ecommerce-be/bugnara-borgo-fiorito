package com.borghettofiorito.api.dto.response;

/**
 * Payload returned by the upload-signature endpoint.
 *
 * The frontend uses these values to upload a file directly to Cloudinary
 * via the /image/upload endpoint, without ever exposing the api_secret.
 *
 * Flow (Cloudinary signed upload):
 *   1) Frontend asks our backend for a signature
 *   2) Backend computes signature = SHA1(canonical_params + api_secret)
 *   3) Frontend POSTs the file + these params to Cloudinary
 *   4) Cloudinary verifies the signature and stores the file
 *   5) Frontend receives the public URL and notifies the backend
 */
public record CloudinarySignatureResponse(
        String cloudName,
        String apiKey,
        String uploadPreset,
        String folder,
        long timestamp,
        String signature
) {
}
