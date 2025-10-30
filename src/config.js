// Backend API URL - reads from Vite environment variable
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001';

console.log('API_BASE_URL:', API_BASE_URL); // Debug log

export default API_BASE_URL;
