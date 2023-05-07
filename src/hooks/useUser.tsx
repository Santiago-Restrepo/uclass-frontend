//hooks
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAuthFetch } from './useAuthFetch';
//Redux
import {RootState} from '@/app/store';
import { setUser } from '@/features/userSlice';
//Others
import { config } from '@/config';
import { User } from '@/types/user';
const { API_URL } = config;
export const useUser = () => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user);
    const {data: userResponse, authFetch} = useAuthFetch<User>();
    const dispatch = useDispatch();
    const logout = useCallback(() => {
        dispatch(setUser({token: '', name: '', id: ''}))
        if (window) {
            window.localStorage.removeItem('token')
        }
    }, [])
    useEffect(() => {//Effect to check if user is logged in and if not redirect to login page
        const token = localStorage.getItem('token') || user.token;
        if (token) {
            //Set token in redux
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
    }, [user.token, router.pathname]);
    useEffect(() => {//Effect to get user data from token
        const token = localStorage.getItem('token') || user.token;
        if(token){
            if(userResponse){
                dispatch(setUser({
                    name: userResponse.name,
                    id: userResponse.id,
                    email: userResponse.email,
                    token,
                    roles: userResponse.roles
                }))
            }else{
                authFetch(`${API_URL}/users/logged`, {
                    method: 'GET',
                })
                dispatch(setUser({
                    token
                }))
            }
        }
        return () => {
            // cleanup
        }
    }, [user.token, userResponse])
    // useEffect(()=>{
    //     console.log("user", user)
    // },[user])

    return { ...user, logout }
}
