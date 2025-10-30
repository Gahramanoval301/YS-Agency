import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});


axiosInstance.interceptors.request.use(
  (config) => {

    return config;
  },
  (err) => Promise.reject(err)
);
export default axiosInstance;
