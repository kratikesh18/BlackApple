// api.ts
import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const api = axios.create({
  baseURL:
    baseURL || process.env.NODE_ENV == "production"
      ? baseURL
      : "https://blackappple.vercel.app/api",
  withCredentials: true,
});

console.log(baseURL)
export default api;

