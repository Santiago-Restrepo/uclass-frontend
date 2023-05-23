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
import { SubjectCard } from '@/components/subject/SubjectCard';
//Types
import { Teacher } from '@/types/teacher';
import { Subject } from '@/types/subject';
import { User } from '@/types/user';
//Utils
import { userFromToken } from '@/utils/userFromToken';
//Icons
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';
//Props
interface SubjectProps {
    user: User
}
export default function AdminSubjects({
    user
}: SubjectProps) {
    const {data, error, loading, authFetch} = useApi<Subject[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const { searchers } = useSelector((state: RootState) => state.searcher);
    const subjectSearcher = searchers.find(searcher => searcher.appPath === '/subject') as typeof searchers[0];
    const {
        query
    } = subjectSearcher;
    useNavigationPath(['/home', '/admin' ]);
    useEffect(() => {
        authFetch(`/subjects`, {
            method: 'GET',
        });
    }, [])
    useEffect(() => {
        if (data) {
            setSubjects(data);
        }
    }, [data])
    useEffect(() => {
        if(query){
            const filteredSubjects = data.filter(subject => subject.name.toLowerCase().includes(query.toLowerCase()));
            setSubjects(filteredSubjects);
        }else{
            setSubjects(data);
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
                        subjectSearcher && (
                            <Searcher {...subjectSearcher} fetchOnQueryChange={false}/>
                        )
                    }
                    <Link
                        href='/admin/subjects/create'
                        className='mb-5 flex justify-center items-center w-full h-10 bg-blue-500 text-white rounded-md font-semibold text-md hover:bg-blue-600 transition duration-300 ease-in-out'
                    >   
                        <BsFillPencilFill className='mr-2' size={20} color='white'/>
                        Crear Asignatura
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
                        subjects && (
                            <div className='flex flex-col justify-center items-center'>
                                {
                                    subjects.map((subject) => (
                                        <SubjectCard 
                                            key={subject._id}  
                                            subject={subject}
                                            basePath='/admin/subjects'
                                        />
                                    ))
                                }
                                {
                                    subjects.length === 0 && (
                                        <div className='flex justify-center items-center'>
                                            <h1 className='text-md text-gray-400'>Asignaturas no encontradas</h1>
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
