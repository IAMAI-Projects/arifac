// src/lib/frappe.ts

const FRAPPE_BASE = process.env.NEXT_PUBLIC_FRAPPE_URL || 'https://arifac.iamai.in';

export async function frappeGet<T>(endpoint: string, token?: string): Promise<T> {
  const res = await fetch(`${FRAPPE_BASE}/api/${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function frappePost<T>(endpoint: string, body: object, token?: string): Promise<T> {
  const res = await fetch(`${FRAPPE_BASE}/api/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Auth
export async function frappeLogin(usr: string, pwd: string) {
  const res = await fetch(`${FRAPPE_BASE}/api/method/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usr, pwd }),
    credentials: 'include',
  });
  return res.json();
}

// Courses
export const getCourses = () =>
  frappeGet<{ data: FrappeCourse[] }>('resource/LMS Course?fields=["*"]&limit=50');

export const getCourse = (name: string) =>
  frappeGet<{ data: FrappeCourse }>(`resource/LMS Course/${name}`);

export const getChapters = (course: string) =>
  frappeGet<{ data: FrappeChapter[] }>(
    `resource/Course Chapter?filters=[["course","=","${course}"]]&fields=["*"]&order_by=idx asc`
  );

export const getLessons = (chapter: string) =>
  frappeGet<{ data: FrappeLesson[] }>(
    `resource/Course Lesson?filters=[["chapter","=","${chapter}"]]&fields=["*"]&order_by=idx asc`
  );

// Progress
export const markProgress = (lesson: string, token: string) =>
  frappePost('method/lms.lms.api.save_progress', { lesson, status: 'Complete' }, token);

export const getProgress = (course: string, token: string) =>
  frappeGet<{ message: Record<string, string> }>(
    `method/lms.lms.api.get_progress?course=${course}`,
    token
  );

// Types
export interface FrappeCourse {
  name: string;
  title: string;
  short_introduction: string;
  image: string;
  paid_course: 0 | 1;
  course_price: number;
  published: 0 | 1;
}

export interface FrappeChapter {
  name: string;
  title: string;
  course: string;
  idx: number;
}

export interface FrappeLesson {
  name: string;
  title: string;
  chapter: string;
  content: string;
  youtube?: string;
  idx: number;
}
