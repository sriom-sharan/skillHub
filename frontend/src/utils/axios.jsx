import axios from 'axios';

 const instance  = axios.create({
  baseURL: 'https://skillhub-8nsp.onrender.com',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem("token")}`
  },
});

export default instance;
// https://skillhub-8nsp.onrender.com
// http://localhost:3000/