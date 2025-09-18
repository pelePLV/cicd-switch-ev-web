// ===================================
// QUERY UTILS - URL query parameter helper functions
// ===================================

/**
 * Build clean query string from object parameters
 * 
 * @description Converts an object containing query parameters into a properly formatted URL query string.
 * Automatically filters out undefined and null values to prevent invalid query parameters.
 * Uses native URLSearchParams for proper encoding and URL-safe formatting.
 * This function is particularly useful for building API requests with optional parameters.
 * 
 * @param params - Object containing key-value pairs for query parameters
 *                 Can contain strings, numbers, booleans, or undefined/null values
 *                 Undefined and null values will be automatically filtered out
 * 
 * @returns Clean query string without leading '?' (empty string if no valid parameters)
 * 
 * @example
 * ```typescript
 * // Basic usage with mixed parameter types
 * const queryString = buildQueryString({
 *   search: 'battery station',
 *   limit: 10,
 *   page: 1,
 *   active: true,
 *   optional: undefined // This will be filtered out
 * })
 * // Returns: "search=battery+station&limit=10&page=1&active=true"
 * 
 * // Usage with API routes
 * const apiUrl = `${baseUrl}/api/switches${queryString ? `?${queryString}` : ''}`
 * 
 * // Empty object handling
 * const emptyQuery = buildQueryString({})
 * // Returns: "" (empty string)
 * 
 * // All undefined values
 * const noParams = buildQueryString({ a: undefined, b: null })
 * // Returns: "" (empty string)
 * ```
 */
export function buildQueryString(params: Record<string, any>): string {
  // Filter out undefined and null values to prevent invalid query parameters
  // This ensures only meaningful parameters are included in the final query string
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined && value !== null)
  );
  
  // Use native URLSearchParams for proper encoding and URL-safe formatting
  // Automatically handles special characters, spaces, and encoding requirements
  return new URLSearchParams(cleanParams).toString();
}

/**
 * Parse URL search parameters into typed object
 * 
 * @description Converts URLSearchParams into a plain object with string values.
 * Useful for extracting query parameters from Next.js request URLs.
 * 
 * @param searchParams - URLSearchParams instance from request URL
 * 
 * @returns Object with string keys and string values from query parameters
 * 
 * @example
 * ```typescript
 * // In Next.js API route
 * const { searchParams } = new URL(req.url);
 * const queryObject = parseSearchParams(searchParams);
 * // Returns: { limit: "10", page: "1", search: "battery station" }
 * ```
 */
export function parseSearchParams(searchParams: URLSearchParams): Record<string, string> {
  return Object.fromEntries(searchParams.entries());
}