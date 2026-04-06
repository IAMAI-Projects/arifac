/**
 * Centralized utility to determine the base URL of the application.
 * Priority:
 * 1. NEXT_PUBLIC_APP_URL environment variable
 * 2. NEXT_PUBLIC_BASE_URL environment variable
 * 3. NEXT_PUBLIC_FRONTEND_URL environment variable
 * 4. Development environment -> http://localhost:3000
 * 5. Staging/Production fallback -> https://stage.arifac.com
 */
export function getBaseUrl(): string {
  // Check for various environment variables used in the project
  const envUrl = 
    process.env.NEXT_PUBLIC_APP_URL || 
    process.env.NEXT_PUBLIC_BASE_URL || 
    process.env.NEXT_PUBLIC_FRONTEND_URL;

  if (envUrl) {
    return envUrl;
  }
  
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  
  // Staging/Production fallback
  return 'https://stage.arifac.com';
}
