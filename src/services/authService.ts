const API_URL = 'http://localhost:3000/api';
import axios from 'axios';
export const login = async (email: string, password: string) => {
    return axios.post(`${API_URL}/auth/signin`, { user: { email, password } }).catch((error) => {
        throw new Error(error.response.data.message);
    });
    
}

export const signup = async (name: string, email: string, password: string, repeatPassword: string) => {
    return axios.post(`${API_URL}/auth/signup`, { user: { name, email, password, repeatPassword } }).catch((error) => {
        throw new Error(error.response.data.message);
    });
}