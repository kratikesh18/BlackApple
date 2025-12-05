// api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_BASE_URL || "https://bluecocain.vercel.app/api",
  withCredentials: true,
});

export default api;
