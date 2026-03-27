// Client-side simulated auth session (for hydration etc)
export function login(email: string, name: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify({ email, name }));
  }
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
    // Also clear session storage used for registration flow
    sessionStorage.removeItem('membershipPaymentData');
  }
}

export function getUser() {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
}

export function isLoggedIn() {
  return !!getUser();
}

