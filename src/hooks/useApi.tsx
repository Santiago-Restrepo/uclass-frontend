import { setUser } from '@/features/userSlice';
import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//config
import { config } from '@/config/index';
const { API_URL } = config;
export const useApi = <T,>(initialData: any = null, path?: string, options?: any) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state: any) => state.user);
    
    const [data, setData] = useState<T>(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const logout = useCallback(() => {
        dispatch(setUser({token: '', name: '', id: ''}))
        if (window) {
            window.localStorage.removeItem('token')
        }
    }, [])
    const authFetch = useCallback(async (path:any, options:any) => {
        setLoading(true);
        try {
            if(!token) {
                console.log("no token")
                setData(initialData);
                setLoading(false);
                // logout();
            }else{
                const res = await fetch(`${API_URL}${path}`, {
                    ...options,
                    headers: {
                        ...options?.headers,
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await res.json();
                if(data.message === "jwt expired"){
                    logout();
                    console.log("logout")
                }
                setData(data);
                setLoading(false);
                return data;
            }
        } catch (error: any) {
            setError(error);
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {//Make fetch at the beginning if token and url are provided
        if (token && path) {
            authFetch(path, options);
        }
    }, [token]);
    
    
    return { data, loading, error, authFetch };
    
}
