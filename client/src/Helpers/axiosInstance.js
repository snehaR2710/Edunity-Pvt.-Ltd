import axios from "axios";


// const BASE_URL = `http://localhost:5001`;

const BASE_URL = `https://edunity-pvt-ltd-api.onrender.com`;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // This ensures cookies are sent with requests
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000, // 10 seconds timeout
});

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;