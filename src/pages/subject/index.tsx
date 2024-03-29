import { GetServerSidePropsContext } from 'next';
import { useEffect, useState} from 'react';
import Head from 'next/head'
//Redux
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';
//components
import { Screen } from '@/components/layout/Screen';
import { NavBar } from '@/components/layout/NavBar';
import { Searcher } from '@/components/searchers/Searcher';
import { SubjectCard } from '@/components/subject/SubjectCard';
//Hooks
import { useApi } from '@/hooks/useApi';
import { useNavigationPath } from '@/hooks/useNavigationPath';
//Types
import { Subject } from '@/types/subject';
import { User } from '@/types/user';
//Utils
import { userFromToken } from '@/utils/userFromToken';
//Icons
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
//Props
interface SubjectsProps {
    user: User
}
export default function Subjects({
    user
}: SubjectsProps) {
    const { searchers } = useSelector((state: RootState) => state.searcher);
    const subjectSearcher = searchers.find(searcher => searcher.appPath === '/subject') as typeof searchers[0];
    const {
        query
    } = subjectSearcher;
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const {data, error, loading, authFetch} = useApi<Subject[]>([]);
    useNavigationPath(['/home' ]);
    useEffect(() => {
            authFetch(`/subjects/populated`, {
                method: 'GET',
            });
    }, []);
    useEffect(()=>{
        if(data){
            setSubjects(data);
        }
    }, [data])
    useEffect(()=>{
        if(query){
            const filteredSubjects = data.filter(subject => subject.name.toLowerCase().includes(query.toLowerCase()));
            setSubjects(filteredSubjects);
        }else{
            setSubjects(data);
        }
    }, [query])
    if(error){
        return (
            <div className='flex justify-center items-center'>
                <h1>Error</h1>
            </div>
        )
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
                        subjectSearcher && (
                            <Searcher {...subjectSearcher} fetchOnQueryChange={false}/>
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
                        subjects && (
                            <div className='flex flex-col justify-center items-center'>
                                {
                                    
                                    subjects.map((subject: Subject) => (
                                        <SubjectCard key={subject._id} subject={subject}/>
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
export async function getServerSideProps(context: GetServerSidePropsContext) {
    const token = context.req.cookies.token;
    const user = await userFromToken(token);
    if (!user) return { props: {} };
    return {
        props: { user }
    };
}
