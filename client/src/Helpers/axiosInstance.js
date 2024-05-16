import axios from "axios";


// const BASE_URL = `${window.location.origin}/api/v1/`;

const BASE_URL = `https://edunity-pvt-ltd-api.onrender.com/api/v1/`;

// const BASE_URL = "https://edunity-pvt-ltd-api.vercel.app/api/v1/"

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;