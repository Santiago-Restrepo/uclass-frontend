import Head from 'next/head'
//Hooks
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useApi } from '@/hooks/useApi';
import { useNavigationPath } from '@/hooks/useNavigationPath';
//components
import { Screen } from '@/components/layout/Screen';
import { NavBar } from '@/components/layout/NavBar';
import { CreateResourceForm } from '@/components/subject/CreateResourceForm';
import { ResourceCardList } from '@/components/subject/ResourceCardList';
//Types
import { Subject as SubjectType } from '@/types/subject';
import {Resource} from '@/types/resource';
//Icons
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import { IoDocumentText } from 'react-icons/io5';
export default function Subject() {
    const router = useRouter()
    const { id } = router.query
    const {data: subject, error: subjectError, loading: subjectLoading, authFetch: subjectAuthFetch} = useApi<SubjectType>(null);
    const {data: resources, error: resourcesError, loading: resourcesLoading, authFetch: resourcesAuthFetch} = useApi<Resource[]>([]);
    const [createMode, setCreateMode] = useState(false);
    const resourcesCount = useMemo(() => {
        return resources?.length;
    }, [resources])
    useNavigationPath(['/home', '/subject']);
    const refreshResources = useCallback(async () => {
        setCreateMode(false);
        await resourcesAuthFetch(`/resources/subject/${id}`, {
            method: 'GET',
        });
    }, [id])
    useEffect(() => {
        if(!id) return;
        subjectAuthFetch(`/subjects/${id}`, {
            method: 'GET',
        });
        resourcesAuthFetch(`/resources/subject/${id}`, {
            method: 'GET',
        });
    }, [id])
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
                        subjectLoading || resourcesLoading && (
                            <div className='flex justify-center items-center'>
                                <AiOutlineLoading3Quarters className='animate-spin text-4xl' size={20} color='gray'/>
                            </div>
                        )
                    }
                    {
                        subjectError || resourcesError && (
                            <div className='flex justify-center items-center'>
                                <h1>Error</h1>
                            </div>
                        )
                    }
                    {
                        subject &&  (
                            <div className='flex flex-col'>
                                <h1 className='text-2xl text-start font-medium text-gray-700 leading-none'>{subject.name}</h1>
                                <p className='mt-3 text-sm text-start text-gray-500 leading-none'>{subject.description}</p>
                                <p className='mt-3 text-sm text-start text-gray-500 leading-none'>
                                    {
                                        typeof subject.teacher === 'object' ? (
                                            <h3 className='text-md text-gray-400'>{subject.teacher.name}</h3>
                                        ): (
                                            <h3 className='text-md text-gray-400'>teacher {subject.teacher}</h3>
                                        )
                                    }
                                </p>
                                <div className='flex justify-between items-center mt-5 border-b-2 border-gray-200 pb-5'>
                                    <div className='flex justify-between'>
                                        <IoDocumentText size={25} className='text-gray-700' />
                                        <p className='text-md text-gray-700 ml-2'>{resourcesCount} recursos</p>
                                    </div>
                                    <button
                                        className={`px-2 py-2 text-sm font-semibold text-white rounded-md sm:px-5 sm:py-3 ${createMode ? 'bg-gray-500' : 'bg-green-600'} hover:bg-opacity-90 transition-all duration-300`}
                                        onClick={() => setCreateMode(!createMode)}
                                    >
                                        {
                                            createMode ? 'Cancelar' : 'Crear recurso'
                                        }
                                    </button>
                                </div>
                            </div>
                        )
                    }
                    {
                        createMode ? (
                            <CreateResourceForm subjectId={id as string} refreshResources={refreshResources}/>
                        ) : (
                            <ResourceCardList resources={resources} />
                        )
                    }
                </div>
            </Screen>
        </>
    )
}
