// Backend API URL - properly configured for production
const isDevelopment = import.meta.env.MODE === 'development';

export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:4001'
  : 'https://booken-backend.onrender.com';

export default API_BASE_URL;
