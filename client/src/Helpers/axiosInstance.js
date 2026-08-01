import axios from "axios";
import { mockRequest } from "./mockApi";


// const BASE_URL = `http://localhost:5001`;

// const BASE_URL = `https://edunity-pvt-ltd-api.onrender.com`;

// const axiosInstance = axios.create({
//     baseURL: BASE_URL,
//     withCredentials: true
// });

// // axiosInstance.defaults.baseURL = BASE_URL;
// // axiosInstance.defaults.withCredentials = true;

// export default axiosInstance;


// const BASE_URL = `http://localhost:5001`;
const BASE_URL = `https://edunity-pvt-ltd-api.onrender.com`;

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false"; // default: mock mode

const realAxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const mockAxiosInstance = {
  get: (url, config) => mockRequest("get", url, config),
  post: (url, data, config) => mockRequest("post", url, data),
  put: (url, data, config) => mockRequest("put", url, data),
  delete: (url, config) => mockRequest("delete", url),
};

const axiosInstance = USE_MOCK ? mockAxiosInstance : realAxiosInstance;

export default axiosInstance;