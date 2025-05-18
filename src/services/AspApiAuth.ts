import axios from 'axios';
import { getEnvVariables } from '../utils';

const { VITE_HOST_BACKEND } = getEnvVariables();


const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL: `${baseURL}/api/`,
  });

  instance.interceptors.request.use(async (request) => {
    
    let token = localStorage.getItem('token');

    if (token) request.headers.set('Authorization', `Bearer ${token}`);
    
    return request;
  }, (error) => {
    return Promise.reject(error)
  });

  return instance;
};

export const aspApi = createAxiosInstance(VITE_HOST_BACKEND);