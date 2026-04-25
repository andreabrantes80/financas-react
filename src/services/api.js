import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://back-financas-1000.onrender.com',
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@buscarToken');

  console.log("TOKEN INTERCEPTOR:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;