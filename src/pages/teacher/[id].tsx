import Head from 'next/head'
import Image from 'next/image';
//Hooks
import { useUser } from '@/hooks/useUser'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthFetch } from '@/hooks/useAuthFetch';
//Types
import { Teacher as TeacherType } from '@/types/teacher';
//components
import { Screen } from '@/components/Screen';
import { NavBar } from '@/components/NavBar';
//Others
import { config } from '@/config';
const { API_URL } = config;
//Icons
import {AiOutlineLoading3Quarters, AiFillStar} from 'react-icons/ai';
export default function Teacher() {
    useUser();
    const router = useRouter()
    //Call authFetch hook with a generic type
    const {data, error, loading, authFetch} = useAuthFetch<TeacherType>(null);
    
    const { id } = router.query
    useEffect(() => {
        authFetch(`${API_URL}/teachers/${id}`, {
            method: 'GET',
        });
    }, [])

    return (
        <>
            <Head>
                <title>Uclass</title>
                <meta name="description" content="Uclass app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Screen>
                <NavBar />
                <div className='w-full h-full py-5'>
                    {
                        loading && (
                            <div className='flex justify-center items-center'>
                                <AiOutlineLoading3Quarters className='animate-spin text-4xl' size={20} color='gray'/>
                            </div>
                        )
                    }
                    {
                        error && (
                            <div className='flex justify-center items-center'>
                                <h1>Error</h1>
                            </div>
                        )
                    }
                    {
                        data && (
                            <div className='flex flex-col justify-center items-center border-b-2 border-gray-200 rounded-md p-5'>
                                <div className='flex gap-4'>
                                    <div className="imageWrapper w-24 h-24 aspect-square relative">
                                        <Image
                                            src={data.photo || '/images/teacher.png'}
                                            alt="Picture of the author"
                                            fill={true}
                                            style={{borderRadius: '100%', objectFit: 'cover', aspectRatio: '1/1'}}
                                        />
                                    </div>
                                    <div className='flex flex-col justify-center'>
                                        <h2 className='pb-1 text-xl font-semibold text-gray-800 leading-none'>{data.name}</h2>
                                        <h3 className='pb-1 text-xl font-normal text-gray-500 leading-none'>{data.description}</h3>
                                        <h4 className='text-lg font-thin text-gray-400 break-all leading-none'>{data.email}</h4>
                                    </div>
                                </div>
                                <div className='flex justify-between items-end w-full'>
                                    <div className='flex justify-center items-center'>
                                        <AiFillStar className='text-yellow-500' size={40}/>
                                        <h1 className='text-4xl font-semibold text-yellow-500 ml-2'>{data.rating}</h1>
                                    </div>
                                    <button
                                        className='mt-5 px-2 py-2 text-lg font-semibold text-white bg-green-600 rounded-md sm:px-5'
                                    >
                                        Crear reseña
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </Screen>
        </>
    )
}
