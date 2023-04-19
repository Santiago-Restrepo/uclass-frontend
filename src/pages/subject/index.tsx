import { useEffect, useLayoutEffect, useState } from 'react';
import Head from 'next/head'
import { useUser } from '@/hooks/useUser'
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';
import Link from 'next/link';
//components
import { Screen } from '@/components/Screen';
import { NavBar } from '@/components/NavBar';
import { Searcher } from '@/components/Searcher';
//Others
import { config } from '@/config';
import { useAuthFetch } from '@/hooks/useAuthFetch';
//Types
const { API_URL } = config;
import { Subject } from '@/types/subject';
//Icons
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import {IoIosPaper} from 'react-icons/io';
import { colors } from '@/styles/colors';

export default function Subjects() {
    useUser();
    const { searchers } = useSelector((state: RootState) => state.searcher);
    const {token} = useSelector((state: RootState) => state.user);
    const subjectSearcher = searchers.find(searcher => searcher.appPath === '/subject');
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const {data, error, loading, authFetch} = useAuthFetch([]);
    useEffect(() => {
        if(token){
            authFetch(`${API_URL}/subjects/populated`, {
                method: 'GET',
            });
        }
    }, [token])
    useEffect(() => {
        if(data) {
            setSubjects(data);
        }
    }, [data])
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
                        subjectSearcher && (
                            <Searcher {...subjectSearcher} />
                        )
                    }
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
                            <div className='flex flex-col justify-center items-center'>
                                {
                                    
                                    subjects?.map((subject) => (
                                        <Link href={`/subject/${subject._id}`} key={subject._id} className='mb-2 p-3 shadow-lg w-full'>
                                            <div className='flex justify-between items-center'>
                                                <div className="flex flex-col w-2/3">
                                                    <h3 className='text-md font-semibold text-gray-900 leading-none'>{subject.name}</h3>
                                                    <h3 className='text-md font-normal text-gray-500 truncate w-full'>{subject.description}</h3>
                                                    {
                                                        //If type of subject.teacher is teacher
                                                        typeof subject.teacher === 'object' ? (
                                                            <h3 className='text-md text-gray-400'>{subject.teacher.name}</h3>
                                                        ): (
                                                            <h3 className='text-md text-gray-400'>teacher {subject.teacher}</h3>
                                                        )
                                                    }
                                                </div>
                                                <div className="flex justify-center items-center w-1/3">
                                                    <IoIosPaper className='text-4xl' size={40} color={colors.gray700}/>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                    
                                }
                            </div>
                        )
                    }
                </div>
            </Screen>
        </>
    )
}
