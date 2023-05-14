import { setUser } from '@/features/userSlice';
import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
const { API_URL } = config;
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});
//config
import { config } from '@/config/index';
export const useApi = <T,>(initialData: any = null, path?: string, options?: any) => {
    const [data, setData] = useState<T>(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const logout = useCallback(() => {
        console.log("logout")
    }, [])
    const authFetch = useCallback(async (path:any, options:any) => {
        setLoading(true);
        try {
            const {data} = await api(`${path}`, {
                ...options,
                headers: {
                    ...options?.headers,
                    "Content-Type": "application/json"
                }
            });
            
            if(data.message === "jwt expired"){
                logout();
                console.log("logout")
            }
            setData(data);
            setLoading(false);
            return data;
        } catch (error: any) {
            console.log("error", error)
            setError(error);
            setLoading(false);
        }
    }, []);

    useEffect(() => {//Make fetch at the beginning if token and url are provided
        if (path) {
            authFetch(path, options);
        }
    }, []);
    
    
    return { data, loading, error, authFetch };
    
}
