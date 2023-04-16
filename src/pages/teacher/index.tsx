import { useEffect, useState } from 'react';
import Head from 'next/head'
import { useUser } from '@/hooks/useUser'
import { RootState } from '@/app/store';
//components
import { Screen } from '@/components/Screen';
import { NavBar } from '@/components/NavBar';
import { Searcher } from '@/components/Searcher';
//Others
import { config } from '@/config';
import { useAuthFetch } from '@/hooks/useAuthFetch';
const { API_URL } = config;
//Types
import { Teacher } from '@/types/teacher';
//Icons
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import { useSelector } from 'react-redux';
export default function Teachers() {
    useUser();
    const {data, error, loading, authFetch} = useAuthFetch();
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const { searchers } = useSelector((state: RootState) => state.searcher);
    const teacherSearcher = searchers.find(searcher => searcher.appPath === '/teacher');

    useEffect(() => {
        authFetch(`${API_URL}/teachers`, {
            method: 'GET',
        });
    }, [])
    useEffect(() => {
        if(data) {
            setTeachers(data);
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
                        teacherSearcher && (
                            <Searcher {...teacherSearcher} />
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
                            <div className='flex justify-center items-center'>
                                {
                                    teachers.map((teacher) => (
                                        <h1 key={teacher._id}>{teacher.name}</h1>
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
