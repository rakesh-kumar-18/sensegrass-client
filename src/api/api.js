import axios from "axios";
import conf from "../conf/conf";

const API_URL = `${conf.apiUrl}/api/v1`;

// Create an Axios instance
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export default api;
