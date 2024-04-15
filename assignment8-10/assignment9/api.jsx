import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:1000' });

export const loginUser = async (email, password) => {
    return API.post('/assignment9/login', { email, password });
};

export const logoutUser = async () => {
    return API.post('/user/logout');
};

export const fetchJobListen = async () => {
    // Endpoint to fetch jobs might look something like this
    return API.get('/assignment9/JobListen');
};


export const fetchCompany= async () => {
    return API.get('/assignment9/Company');
};

export default API;