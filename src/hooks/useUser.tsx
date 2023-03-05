import { useRouter } from 'next/router';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {RootState} from '../app/store';
export const useUser = () => {
    const router = useRouter();
    const dispatch = useDispatch()
    const {user} = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
    }, [user])

    return { user }
}
