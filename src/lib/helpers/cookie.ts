/**
 * Cookie management utilities
 */

/**
 * Remove all cookies from the browser
 * This function clears cookies across different domains and paths
 */
export const removeAllCookies = (): void => {
  const cookies = document.cookie.split(';');
  
  cookies.forEach(cookie => {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
    
    if (name) {
      // Clear cookie by setting it to expire in the past
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname};`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname};`;
    }
  });
};

/**
 * Remove a specific cookie by name
 * @param name - The name of the cookie to remove
 */
export const removeCookie = (name: string): void => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname};`;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname};`;
};

/**
 * Get a cookie value by name
 * @param name - The name of the cookie to get
 * @returns The cookie value or null if not found
 */
export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

/**
 * Set a cookie with options
 * @param name - The name of the cookie
 * @param value - The value of the cookie
 * @param options - Cookie options (expires, path, domain, etc.)
 */
export const setCookie = (
  name: string, 
  value: string, 
  options: {
    expires?: Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
  } = {}
): void => {
  let cookieString = `${name}=${value}`;
  
  if (options.expires) {
    cookieString += `;expires=${options.expires.toUTCString()}`;
  }
  
  if (options.path) {
    cookieString += `;path=${options.path}`;
  }
  
  if (options.domain) {
    cookieString += `;domain=${options.domain}`;
  }
  
  if (options.secure) {
    cookieString += `;secure`;
  }
  
  if (options.sameSite) {
    cookieString += `;samesite=${options.sameSite}`;
  }
  
  document.cookie = cookieString;
};
