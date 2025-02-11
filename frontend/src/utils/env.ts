export const apiUrl =
  (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000/api';
export const port = (import.meta.env.VITE_PORT as string) || '3000';

export default {
  apiUrl,
  port,
};
