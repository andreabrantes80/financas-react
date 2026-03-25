import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;