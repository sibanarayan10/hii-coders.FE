import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BACKEND_URL,
  //   withCredentials: true,
};

export const api = axios.create(config);
