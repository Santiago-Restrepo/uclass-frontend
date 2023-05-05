import { useRouter } from "next/router";
import { useEffect, useState } from "react";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { setNavigation } from "@/features/navigationSlice";
import { RootState } from '../app/store';
const EXCEPTIONS = ['/sign-up'];
/**
 * Saves the current URL before changing the route.
 */
export const useNavigationPath = () => {
    const [previousRoute, setPreviousRouter] = useState('');
    const {navigation} = useSelector((state: RootState) => state.navigation);
    const dispatch = useDispatch();
    const router = useRouter();
    const handleBeforeHistoryChange = (url: String) => {
        console.log('url', url);
        const [nextUrl] = url?.split('?') || [];

        if (
            !(EXCEPTIONS.includes(nextUrl) || EXCEPTIONS.includes(router.asPath)) &&
            nextUrl !== router.asPath
        ) {
            setPreviousRouter(router.asPath);
            const newNavigation = [...navigation];
            if(newNavigation.length > 2) newNavigation.shift();
            if(newNavigation[newNavigation.length - 1] && router.asPath.includes(newNavigation[newNavigation.length - 1]) ){
                newNavigation.push(router.asPath.replace(newNavigation[newNavigation.length - 1], ''));
            }else{
                newNavigation.push(router.asPath);
            }
            dispatch(setNavigation(newNavigation));
        
        }
    };

    useEffect(() => {
        router.events.on('beforeHistoryChange', handleBeforeHistoryChange);
        return () => {
        router.events.off('beforeHistoryChange', handleBeforeHistoryChange);
        };
    }, [router]);

    return { previousRoute };
};