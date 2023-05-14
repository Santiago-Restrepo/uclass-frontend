import { config } from '../config';
const { BACKEND_URL } = config;
import axios from 'axios';
const api = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
});
export const login = async (email: string, password: string) => {
    return api.post(`/auth/signin`, { user: { email, password } }).catch((error) => {
        console.log(error);
        throw new Error(error.response.data.message);
    });
    
}

export const signup = async (name: string, email: string, password: string, repeatPassword: string) => {
    return api.post(`/auth/signup`, { user: { name, email, password, repeatPassword } }).catch((error) => {
        throw new Error(error.response.data.message);
    });
}