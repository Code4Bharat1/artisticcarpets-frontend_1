import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000, // Increased to 60s to handle slow network or Render cold starts
});

// Request interceptor — attach JWT token from Zustand store
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const raw = localStorage.getItem("artistic-carpets-storage");
      if (raw) {
        const parsed = JSON.parse(raw);
        const token = parsed?.state?.token;
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      }
    } catch (_) {
      // localStorage not available (SSR), ignore
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for unified handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "An unexpected error occurred. Please try again.";
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
