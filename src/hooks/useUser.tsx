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
        const token = localStorage.getItem('token') || user.token;
        if (token) {
            //Set token in redux

            dispatch(setUser({...user, token}))
            if (window) {
                window.localStorage.setItem('token', token)
            }
            if(router.pathname === '/'){
                router.push('/home')
            }
        }else{
            if(router.pathname !== '/' && router.pathname !== '/signup'){
                router.push('/')
            }
        }
        return () => {
            // cleanup
        }

    }, [user.token, router.pathname])
    return { ...user, logout }
}
