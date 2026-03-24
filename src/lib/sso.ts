/**
 * Edmingle SSO Helper
 * Triggers automatic Edmingle login after local authentication.
 * Redirects the user to the secure SSO API route.
 */
export const triggerEdmingleSSO = (email?: string, name?: string, contactNumber?: string) => {
  const baseUrl = '/api/sso';
  const params = new URLSearchParams();
  
  if (email) params.append('email', email);
  if (name) {
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ' ';
    params.append('first_name', firstName);
    params.append('last_name', lastName);
  }
  if (contactNumber) params.append('contact_number', contactNumber);
  
  // Navigate to the SSO API route which handles JWT signing and final redirection
  window.location.href = `${baseUrl}?${params.toString()}`;
};
