import axios from "axios";
import conf from "../conf/conf";

const API_URL = `${conf.apiUrl}/api`;

// Create an Axios instance
const api = axios.create({
    baseURL: API_URL
});

export default api;
