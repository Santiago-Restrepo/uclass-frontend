import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
export const useAuthFetch = () => {
    const { token } = useSelector((state: any) => state.user);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const authFetch = useCallback(async (url:any, options:any) => {
        setLoading(true);
        try {
            const res = await fetch(url, {
                ...options,
                headers: {
                    ...options?.headers,
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if(data.message === "jwt expired"){
                // logout();
                console.log("logout")
            }
            setData(data);
            setLoading(false);
        } catch (error: any) {
            setError(error);
            setLoading(false);
        }
    }, [token]);
    
    return { data, loading, error, authFetch };
    
}
