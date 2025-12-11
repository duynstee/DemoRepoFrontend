import axios from 'axios';
import { getToken } from './authService';

const instance = axios.create({
  baseURL: 'https://localhost:44381/api/'
});

instance.interceptors.request.use(config => {
  const token = getToken();
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export default instance;
