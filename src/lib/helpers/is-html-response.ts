// ===================================
// HTML RESPONSE UTILS - Check if response is HTML instead of JSON
// ===================================

/**
 * Check if HTTP response is HTML instead of JSON
 * 
 * @description Checks the Content-Type header to determine if the response
 * contains HTML content. Useful for detecting authentication redirects or
 * error pages from backend services.
 * 
 * @param response - HTTP Response object with headers
 * @returns true if response contains HTML, false otherwise
 * 
 * @example
 * ```typescript
 * const response = await fetch('/api/data');
 * if (isHtmlResponse(response)) {
 *   // Handle HTML response (likely auth redirect)
 *   return ApiResponse.unauthorized('Authentication required');
 * }
 * ```
 */
export function isHtmlResponse(response: Response): boolean {
  const contentType = response.headers.get('content-type');
  return contentType ? contentType.includes('text/html') : false;
}