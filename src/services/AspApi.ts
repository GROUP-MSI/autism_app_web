import axios from 'axios';
import { getEnvVariables } from '../utils';

const { VITE_HOST_BACKEND } = getEnvVariables();

export const basicApi = axios.create({
  baseURL: `${VITE_HOST_BACKEND}/api/`,
});