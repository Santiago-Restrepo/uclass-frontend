import Head from 'next/head'
import Image from 'next/image';
import { GetServerSidePropsContext } from 'next';
//Hooks
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { useNavigationPath } from '@/hooks/useNavigationPath';
//Types
import { Teacher } from '@/types/teacher';
import { Subject } from '@/types/subject';
import { User } from '@/types/user';
//Utils
import { userFromToken } from '@/utils/userFromToken';
//components
import { Screen } from '@/components/layout/Screen';
import { NavBar } from '@/components/layout/NavBar';
import { SubjectForm } from '@/components/admin/SubjectForm';
//Icons
import {AiOutlineLoading3Quarters, AiFillStar} from 'react-icons/ai';
import { ImBooks } from 'react-icons/im';
//props
interface SubjectProps {
    user: User
}
export default function AdminSubject({
    user
}: SubjectProps) {
    const router = useRouter();
    useNavigationPath(['/home', '/admin/subjects' ]);
    //Call authFetch hook with a generic type
    const {
        data: subject, 
        error: subjectError, 
        loading: subjectLoading, 
        authFetch: subjectAuthFetch
    } = useApi<Subject>(null);
    const {
        data: teachers,
        error: teachersError,
        loading: teachersLoading,
        authFetch: teachersAuthFetch
    } = useApi<Teacher[]>([], `/teachers`)
    const { id } = router.query
    useEffect(() => {
        if(!id) return;
        if(id === 'create'){
        }else{
            subjectAuthFetch(`/subjects/${id}`, {
                method: 'GET',
            });
        }
    }, [id])
    const refresh = async () => {
        if(id && id !== 'create'){
            await subjectAuthFetch(`/subjects/${id}`, {
                method: 'GET',
            });
        }else{
            router.push('/admin/subjects');
        }
    }

    return (
        <>
            <Head>
                <title>Uclass</title>
                <meta name="description" content="Uclass app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Screen>
                <NavBar user={user} />
                <div className='w-full h-full py-5'>
                    {
                        subjectLoading || teachersLoading && (
                            <div className='flex justify-center items-center'>
                                <AiOutlineLoading3Quarters className='animate-spin text-4xl' size={20} color='gray'/>
                            </div>
                        )
                    }
                    {
                        subjectError || teachersError && (
                            <div className='flex justify-center items-center'>
                                <h1>Error</h1>
                            </div>
                        )
                    }
                    {
                        subject &&  (
                            <div className='flex flex-col justify-center items-center border-b-2 border-gray-200 rounded-md p-5'>
                                <h1 className='text-2xl text-start font-medium text-gray-700 leading-none'>{subject.name}</h1>
                                <p className='mt-3 text-sm text-start text-gray-500 leading-none'>{subject.description}</p>
                                <div className='mt-3 text-sm text-start text-gray-500 leading-none'>
                                    
                                    {
                                        typeof subject.teacher === 'object' ? (
                                            <h3 className='text-md text-gray-400'>{subject.teacher.name}</h3>
                                        ): (
                                            <h3 className='text-md text-gray-400'>teacher {subject.teacher}</h3>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                    {
                        id === 'create' && (
                            <div className='flex justify-center items-center'>
                                <h1 className='text-2xl font-semibold text-gray-800 leading-none mb-5'>
                                    <ImBooks className='inline-block mr-2' size={30}/> Crea una nueva asignatura
                                </h1>
                            </div>
                        )
                    }
                    <SubjectForm 
                        subject={subject}
                        teachers={teachers} 
                        refresh={refresh}
                    />
                </div>
            </Screen>
        </>
    )
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
    const token = context.req.cookies.token;
    const user = await userFromToken(token);
    if (!user) return { props: {} };
    return {
        props: { user }
    };
}