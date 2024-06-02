import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.32.202:8081',
});

export default instance;