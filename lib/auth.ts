import { ACCESS_TOKEN, HISTORY_KEY } from './constants';

// localStorage only exists in the browser. With static export, every page is also
// rendered once at BUILD time in Node, so these helpers must only run inside
// useEffect / event handlers, never during render.
export const auth = {
  getToken: () => localStorage.getItem(ACCESS_TOKEN),
  setToken: (token: string) => localStorage.setItem(ACCESS_TOKEN, token),
  clear: () => localStorage.removeItem(ACCESS_TOKEN),
  isAuthenticated: () => Boolean(localStorage.getItem(ACCESS_TOKEN)),
};

// Remembers the last private page, like FaberAdminUI's historyStorage.
export const history = {
  getCur: () => localStorage.getItem(HISTORY_KEY),
  setCur: (path: string) => localStorage.setItem(HISTORY_KEY, path),
};
