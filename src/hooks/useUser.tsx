import { setUser } from '@/features/userSlice';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {RootState} from '../app/store';
export const useUser = () => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(setUser({token: ''}))
        if (window) {
            window.localStorage.removeItem('token')
        }
    }
    useEffect(() => {
        if (!user.token) {
            router.push('/login')
        }else{
            router.push('/')
        }
    }, [user.token])
    useLayoutEffect(() => {
        if (!user.token) {
            //Search for token in localstorage
            if(window){
                const token = localStorage.getItem('token');
                if (token) {
                    //Set token in redux
                    dispatch(setUser({token}))
                }
            }
        }else{
            //Save token in localstorage
            localStorage.setItem('token', user.token)
        }
    }, [user.token])
    return { ...user, logout }
}
