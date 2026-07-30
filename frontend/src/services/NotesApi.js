import axios from 'axios';

export const Api = axios.create({
    baseURL: "http://localhost:8081"
});
export default Api;
