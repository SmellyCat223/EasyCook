import axios from "axios";

const apiUrl = "http://192.168.1.113:8081/api/";

interface User {
  username: string;
  email: string;
  password: string;
}

// register the user service
export const registerUser = async (user: User) => {
  try {
    const response = await axios.post(`${apiUrl}user/login`, user);
    return response.data;
  } catch (error) {
    return error;
  }
};

// login the user service
export const loginUser = async (user: User) => {
  try {
    const response = await axios.post(`${apiUrl}user/register`, user);
    return response.data;
  } catch (error) {
    return error;
  }
};