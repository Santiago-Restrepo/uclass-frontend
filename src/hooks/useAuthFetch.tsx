import { useEffect, useState } from 'react';
import { useUser } from './useUser';
export const useAuthFetch = (url:any, options:any = {}) => {
    const {token} = useUser();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const refetch = async (url:any, options:any) => {
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
            setData(data);
            setLoading(false);
        } catch (error: any) {
            setError(error);
            setLoading(false);
        }
    }
    useEffect(() => {
        if (token && url) {
            refetch(url, options)
        }
    }, [token])
    return { data, loading, error, refetch }
}
