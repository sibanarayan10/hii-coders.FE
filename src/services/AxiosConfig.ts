import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  validateStatus: (status) => {
    if (status == 401) {
      window.location.href = '/sign-in';
      return false;
    }
    return true;
  },
};

export const api = axios.create(config);
