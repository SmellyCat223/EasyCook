import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.4.13:5000',
});

export default instance;