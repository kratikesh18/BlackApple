// api.ts
import axios from "axios";
const baseURL =  process.env.API_BASE_URL
const api = axios.create({
  baseURL:  baseURL|| process.env.NODE_ENV=="production"?"https://bluecocain.vercel.app/api":"http://127.0.0.1:3000/api",
  withCredentials: true,
});

export default api;
