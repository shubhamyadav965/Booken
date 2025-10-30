// Replace with your actual Render URL from Step 2.4
export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://booken-backend.onrender.com'  // ← Replace with YOUR Render URL
  : 'http://localhost:4001';

export default API_BASE_URL;
