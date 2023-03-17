import { setUser } from '@/features/userSlice';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {RootState} from '../app/store';
export const useUser = () => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const logout = useCallback(() => {
        dispatch(setUser({token: '', name: ''}))
        if (window) {
            window.localStorage.removeItem('token')
        }
    }, [])
    useEffect(() => {
        if (!user.token) {
            router.push('/login');
            if(window){
                const token = localStorage.getItem('token');
                if (token) {
                    //Set token in redux
                    dispatch(setUser({...user, token}))
                }
            }
        }else{
            if(window) {
                localStorage.setItem('token', user.token)
            }
            router.push('/')
        }
        return () => {
            if (window) {
                window.localStorage.removeItem('token')
            }
        }
    }, [user.token])
    return { ...user, logout }
}
