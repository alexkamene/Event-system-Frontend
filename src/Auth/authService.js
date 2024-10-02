// src/services/authService.js
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const navigaate=useNavigate
const API_URL = 'https://expense-trackerserver.onrender.com/';

const register = async (username, password) => {
    const response = await axios.post(API_URL + 'Register', { username, password });
    return response.data;
};

const login = async (username, password) => {
    const response = await axios.post(API_URL + 'login', { username, password });
    if (response.data.token) {

   // Clear any previous data in localStorage before setting new data
   localStorage.removeItem('token');
   localStorage.removeItem('userId');
   localStorage.removeItem('user');


      //creates a new user
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('username',response.data.username);
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId')
   localStorage.removeItem('username')
  

    
};

 



export default {
    register,
    login,
    logout,

};
