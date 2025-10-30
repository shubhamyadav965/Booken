import axios from "axios";

// Create axios instance with Render backend URL - HARDCODED for production
const axiosInstance = axios.create({
  baseURL: "https://booken-backend.onrender.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(
      "🌐 API Request:",
      config.method.toUpperCase(),
      config.baseURL + config.url
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", response.status);
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
