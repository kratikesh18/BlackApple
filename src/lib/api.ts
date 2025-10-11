// api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || (typeof window !== 'undefined' ? window.location.origin + '/api' : 'http://localhost:3000/api'),
  withCredentials: true
});

export default api;
