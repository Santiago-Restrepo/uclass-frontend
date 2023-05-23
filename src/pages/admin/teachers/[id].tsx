import Head from 'next/head'
import Image from 'next/image';
import { GetServerSidePropsContext } from 'next';
//Hooks
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { useNavigationPath } from '@/hooks/useNavigationPath';
//Types
import { Teacher as TeacherType } from '@/types/teacher';
import { Review } from '@/types/review';
import { Subject } from '@/types/subject';
import { User } from '@/types/user';
//Utils
import { userFromToken } from '@/utils/userFromToken';
//components
import { Screen } from '@/components/layout/Screen';
import { NavBar } from '@/components/layout/NavBar';
import { TeacherForm } from '@/components/admin/TeacherForm';
//Icons
import {AiOutlineLoading3Quarters, AiFillStar} from 'react-icons/ai';
//props
interface TeacherProps {
    user: User
}
export default function AdminTeacher({
    user
}: TeacherProps) {
    const router = useRouter();
    useNavigationPath(['/home', '/admin/teachers' ]);
    //Call authFetch hook with a generic type
    const {data: teacher, error: teacherError, loading: teacherLoading, authFetch: teacherAuthFetch} = useApi<TeacherType>(null);
    const { id } = router.query
    useEffect(() => {
        if(!id) return;
        if(id === 'create'){
        }else{
            teacherAuthFetch(`/teachers/${id}`, {
                method: 'GET',
            });
        }
    }, [id])
    const refresh = async () => {
        await teacherAuthFetch(`/teachers/${id}`, {
            method: 'GET',
        });
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
                        teacherLoading && (
                            <div className='flex justify-center items-center'>
                                <AiOutlineLoading3Quarters className='animate-spin text-4xl' size={20} color='gray'/>
                            </div>
                        )
                    }
                    {
                        teacherError && (
                            <div className='flex justify-center items-center'>
                                <h1>Error</h1>
                            </div>
                        )
                    }
                    {
                        teacher &&  (
                            <div className='flex flex-col justify-center items-center border-b-2 border-gray-200 rounded-md p-5'>
                                <div className='flex gap-4'>
                                    <div className="imageWrapper w-24 h-24 aspect-square relative">
                                        <Image
                                            src={teacher.photo || '/images/teacher.png'}
                                            alt="Picture of the author"
                                            fill={true}
                                            sizes='100%'
                                            style={{borderRadius: '100%', objectFit: 'cover', aspectRatio: '1/1'}}
                                        />
                                    </div>
                                    <div className='flex flex-col justify-center'>
                                        <h2 className='pb-1 text-xl font-semibold text-gray-800 leading-none'>{teacher.name}</h2>
                                        <h3 className='pb-1 text-xl font-normal text-gray-500 leading-none'>{teacher.description}</h3>
                                        <h4 className='text-lg font-thin text-gray-400 break-all leading-none'>{teacher.email}</h4>
                                    </div>
                                </div>
                                <div className='flex justify-between items-end w-full'>
                                    <div className='flex justify-center items-center'>
                                        <AiFillStar className='text-yellow-500' size={30}/>
                                        <h1 className='text-2xl font-semibold text-yellow-500 ml-2'>{teacher.rating}</h1>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <TeacherForm 
                        teacher={teacher} 
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