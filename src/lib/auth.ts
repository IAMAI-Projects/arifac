'use client';

export const AUTH_KEY = 'arifac_auth_token';
export const PAID_COURSES_KEY = 'arifac_paid_courses';

export interface User {
    email: string;
    name: string;
}

export const login = (email: string, name: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(AUTH_KEY, JSON.stringify({ email, name }));
};

export const logout = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(AUTH_KEY);
};

export const getUser = (): User | null => {
    if (typeof window === 'undefined') return null;
    const auth = localStorage.getItem(AUTH_KEY);
    return auth ? JSON.parse(auth) : null;
};

export const isLoggedIn = (): boolean => {
    return getUser() !== null;
};

export const markCourseAsPaid = (level: string) => {
    if (typeof window === 'undefined') return;
    const paid = getPaidCourses();
    if (!paid.includes(level)) {
        localStorage.setItem(PAID_COURSES_KEY, JSON.stringify([...paid, level]));
    }
};

export const getPaidCourses = (): string[] => {
    if (typeof window === 'undefined') return [];
    const paid = localStorage.getItem(PAID_COURSES_KEY);
    return paid ? JSON.parse(paid) : [];
};

export const hasPaidForCourse = (level: string): boolean => {
    return getPaidCourses().includes(level);
};
