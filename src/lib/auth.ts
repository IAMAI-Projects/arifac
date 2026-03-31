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

export function markCourseAsPaid(level: string) {
  if (typeof window !== 'undefined') {
    const user = getUser();
    if (user) {
      const paidCourses = JSON.parse(localStorage.getItem('paidCourses') || '[]');
      if (!paidCourses.includes(level)) {
        paidCourses.push(level);
        localStorage.setItem('paidCourses', JSON.stringify(paidCourses));
      }
    }
  }
}

export function getPaidCourses(): string[] {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('paidCourses') || '[]');
  }
  return [];
}

export function hasPaidForCourse(level: string): boolean {
  return getPaidCourses().includes(level);
}

