import { use, useEffect, useState } from 'react';
import Head from 'next/head'
import { RootState } from '@/app/store';
import Link from 'next/link';
import Image from 'next/image';
//Hooks
import { useSelector } from 'react-redux';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import { useNavigationPath } from '@/hooks/useNavigationPath';
//components
import { Screen } from '@/components/Screen';
import { NavBar } from '@/components/NavBar';
import { Searcher } from '@/components/Searcher';
//Others
import { config } from '@/config';
const { API_URL } = config;
//Types
import { Teacher as TeacherType } from '@/types/teacher';
//Icons
import {AiOutlineLoading3Quarters, AiFillStar} from 'react-icons/ai';

export default function Teachers() {
    const {data, error, loading, authFetch} = useAuthFetch<TeacherType[]>([]);
    const { searchers } = useSelector((state: RootState) => state.searcher);
    const teacherSearcher = searchers.find(searcher => searcher.appPath === '/teacher');
    useNavigationPath(['/home' ]);
    useEffect(() => {
        authFetch(`${API_URL}/teachers`, {
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
                                    data.map((teacher:TeacherType) => (
                                        <Link key={teacher._id} href={`/teacher/${teacher._id}`} className='w-full'>
                                            <div className='flex justify-between items-center gap-2 w-full border-t-2 border-gray-200 py-4'>
                                                <div className='flex gap-4'>
                                                    <div className="flex justify-center items-center image__wrapper w-20 h-20 rounded-full overflow-hidden">
                                                        <Image
                                                            src={teacher.photo || '/jhon.jpg'}
                                                            alt="Picture of the author"
                                                            width={70}
                                                            height={70}
                                                            className='w-full rounded-full object-cover'
                                                        />
                                                    </div>
                                                    <div className='flex flex-col justify-center items-start'>
                                                        <h2 className='pb-1 text-lg font-semibold text-gray-800 leading-none'>{teacher.name}</h2>
                                                        <h3 className='pb-1 text-lg font-normal text-gray-500 leading-none'>{teacher.description}</h3>
                                                        <h4 className='text-md font-thin text-gray-400 break-all leading-none'>{teacher.email}</h4>
                                                    </div>
                                                </div>
                                                <div className='flex flex-col justify-center items-center'>
                                                    <AiFillStar className='text-yellow-500' size={50}/>
                                                    <span className='text-2xl font-semibold text-yellow-500'>{teacher.rating}</span>
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
