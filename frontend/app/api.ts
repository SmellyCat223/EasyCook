import axios from 'axios';
import { FRONTEND_PORT, IP } from '../base';

const instance = axios.create({
  baseURL: `${IP}:${FRONTEND_PORT}`,
});

export default instance;