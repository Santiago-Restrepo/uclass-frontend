import { useRouter } from "next/router";
import { useEffect, useState } from "react";
//Icons
import { AiOutlineLoading } from "react-icons/ai";
export const  Loading = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url : any) => (url !== router.asPath) && setLoading(true);
        const handleComplete = (url : any) => setLoading(false);

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    })
    
    return (
        <>
            {loading && (
                <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-white opacity-75 z-50">
                    <AiOutlineLoading className="animate-spin text-5xl text-green-500"/>
                </div>
            )}
        </>
    );
}