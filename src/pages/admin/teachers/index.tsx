import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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
import { User } from '@/types/user';
//Utils
import { userFromToken } from '@/utils/userFromToken';
//Icons
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
//Props
interface TeachersProps {
    user: User
}
export default function AdminTeachers({
    user
}: TeachersProps) {
    const {data, error, loading, authFetch} = useApi<TeacherType[]>([]);
    const [teachers, setTeachers] = useState<TeacherType[]>([]);
    const { searchers } = useSelector((state: RootState) => state.searcher);
    const teacherSearcher = searchers.find(searcher => searcher.appPath === '/teacher') as typeof searchers[0];
    const {
        query
    } = teacherSearcher;
    useNavigationPath(['/home', '/admin' ]);
    useEffect(() => {
        authFetch(`/teachers`, {
            method: 'GET',
        });
    }, [])
    useEffect(() => {
        if (data) {
            setTeachers(data);
        }
    }, [data])
    useEffect(() => {
        if(query){
            const filteredTeachers = data.filter(teacher => teacher.name.toLowerCase().includes(query.toLowerCase()));
            setTeachers(filteredTeachers);
        }else{
            setTeachers(data);
        }
    }, [query])
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
                        teacherSearcher && (
                            <Searcher {...teacherSearcher} fetchOnQueryChange={false}/>
                        )
                    }
                    <Link
                        href='/admin/teachers/create'
                        className='flex justify-center items-center w-full h-10 bg-blue-500 text-white rounded-md font-semibold text-md hover:bg-blue-600 transition duration-300 ease-in-out'
                    >
                        Crear profesor
                    </Link>
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
                        teachers && (
                            <div className='flex flex-col justify-center items-center'>
                                {
                                    teachers.map((teacher) => (
                                        <TeacherCard 
                                            key={teacher._id}  
                                            teacher={teacher}
                                            basePath='/admin/teachers'
                                        />
                                    ))
                                }
                                {
                                    teachers.length === 0 && (
                                        <div className='flex justify-center items-center'>
                                            <h1 className='text-md text-gray-400'>Profesores no encontrados</h1>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
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
