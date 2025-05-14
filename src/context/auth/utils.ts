
import axios from 'axios';

// Set up axios interceptor for auth
export const setupAuthInterceptor = () => {
  const interceptor = axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );

  return () => {
    axios.interceptors.request.eject(interceptor);
  };
};
