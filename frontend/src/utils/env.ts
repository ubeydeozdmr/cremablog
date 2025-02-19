export const apiUrl =
  (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000/api';

export default {
  apiUrl,
};
