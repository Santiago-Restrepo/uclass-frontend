import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
//Props
export const useAuthFetch = (initialData: any = null) => {
    const { token } = useSelector((state: any) => state.user);
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const authFetch = useCallback(async (url:any, options:any) => {
        setLoading(true);
        try {
            if(!token) {
                setData(initialData);
                setLoading(false);
            }else{
                const res = await fetch(url, {
                    ...options,
                    headers: {
                        ...options?.headers,
                        "Content-Type": "application/json",
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
            }
        } catch (error: any) {
            setError(error);
            setLoading(false);
        }
    }, [token]);
    
    return { data, loading, error, authFetch };
    
}
