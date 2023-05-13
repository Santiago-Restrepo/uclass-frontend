//hooks
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useApi } from './useApi';
//Redux
import {RootState} from '@/app/store';
import { setUser } from '@/features/userSlice';
//Others
import { User } from '@/types/user';
export const useUser = () => {
    const user = useSelector((state: RootState) => state.user);
    const {data: userResponse, authFetch} = useApi<User>();
    const dispatch = useDispatch();
    const logout = useCallback(() => {
        dispatch(setUser({token: '', name: '', id: ''}));
    }, [])
    useEffect(() => {//Effect to get user data from token
        if(userResponse){
            dispatch(setUser({
                name: userResponse.name,
                id: userResponse.id,
                email: userResponse.email,
                roles: userResponse.roles
            }))
        }else{
            if(user.name) return;
            authFetch(`/users/logged`, {
                method: 'GET',
            });
        }
        
        return () => {
            // cleanup
        }
    }, [userResponse])

    return { ...user, logout }
}
