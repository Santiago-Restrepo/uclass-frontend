import { use, useEffect, useState } from 'react';
import Head from 'next/head'
import { RootState } from '@/app/store';
//Hooks
import { useSelector } from 'react-redux';
import { useApi } from '@/hooks/useApi';
import { useNavigationPath } from '@/hooks/useNavigationPath';
//components
import { Screen } from '@/components/layout/Screen';
import { NavBar } from '@/components/layout/NavBar';
import { Searcher } from '@/components/searchers/Searcher';
import { TeacherCard } from '@/components/teacher/TeacherCard';
//Types
import { Teacher as TeacherType } from '@/types/teacher';
//Icons
import {AiOutlineLoading3Quarters, AiFillStar} from 'react-icons/ai';

export default function Teachers() {
    const {data, error, loading, authFetch} = useApi<TeacherType[]>([]);
    const { searchers } = useSelector((state: RootState) => state.searcher);
    const teacherSearcher = searchers.find(searcher => searcher.appPath === '/teacher');
    useNavigationPath(['/home' ]);
    useEffect(() => {
        authFetch(`/teachers`, {
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
                            <div className='flex flex-col justify-center items-center'>
                                {
                                    data.map((teacher: TeacherType) => (
                                        <TeacherCard key={teacher._id}  teacher={teacher}/>
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
