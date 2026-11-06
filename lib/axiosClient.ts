import axios from 'axios';
import { API_END_POINT } from './constants';
import { auth } from './auth';

// Same pattern as FaberAdminUI: Bearer token from localStorage on every request,
// and a refreshed token read back from the `new-access-token` response header.
// Cross-origin, the browser only lets JS read that header if the API sends
// `Access-Control-Expose-Headers: new-access-token`.
const axiosClient = axios.create({
  baseURL: API_END_POINT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

export const lastRefresh = { header: null as string | null, at: null as string | null };

axiosClient.interceptors.request.use(config => {
  const token = auth.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(response => {
  const newToken = response.headers['new-access-token'];
  lastRefresh.header = newToken ?? null;
  lastRefresh.at = new Date().toISOString();
  if (newToken) auth.setToken(newToken);
  return response.data;
});

export default axiosClient;
