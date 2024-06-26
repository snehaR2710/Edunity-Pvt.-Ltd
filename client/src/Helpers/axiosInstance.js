import axios from "axios";


// const BASE_URL = `http://localhost:5001`;

const BASE_URL = `https://edunity-pvt-ltd-api.onrender.com`;

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;