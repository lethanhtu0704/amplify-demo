// Mirrors the shape of FaberAdminUI's constants (PATH, ACCESS_TOKEN), not its values.
export const ACCESS_TOKEN = 'demo_access_token';
export const HISTORY_KEY = 'demo_history';

export const PATH = {
  LOGIN: '/login',
  LOADING: '/loading',
  USERS: '/users',
  USER_DETAIL: '/user-detail',
  ENV_DEMO: '/env-demo',
} as const;

// Same idea as FaberAdminUI: the API base URL is baked in at build time.
// Default points at a public fake API so the demo works with no backend.
export const API_END_POINT =
  process.env.NEXT_PUBLIC_END_POINT || 'https://jsonplaceholder.typicode.com';

export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || 'local';
