import axios from 'axios';

const api = axios.create({
  baseURL: 'https://back-financas-1000.onrender.com', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;