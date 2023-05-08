import Head from 'next/head'
import Image from 'next/image';
//Hooks
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { useNavigationPath } from '@/hooks/useNavigationPath';
//Types
import { Teacher as TeacherType } from '@/types/teacher';
import { Review } from '@/types/review';
import { Subject } from '@/types/subject';
//components
import { Screen } from '@/components/layout/Screen';
import { NavBar } from '@/components/layout/NavBar';
import { ReviewCardList } from '@/components/ReviewCardList';
import { CreateReviewForm } from '@/components/CreateReviewForm';
//Icons
import {AiOutlineLoading3Quarters, AiFillStar} from 'react-icons/ai';
export default function Teacher() {
    const router = useRouter();
    const [createMode, setCreateMode] = useState(false);
    useNavigationPath(['/home', '/teacher' ]);
    //Call authFetch hook with a generic type
    const {data: teacher, error: teacherError, loading: teacherLoading, authFetch: teacherAuthFetch} = useApi<TeacherType>(null);
    const {data: reviews, error: reviewsError, loading: reviewsLoading, authFetch: reviewsAuthFetch} = useApi<Review[]>([]);
    const {data: subjects, error: subjectsError, loading: subjectsLoading, authFetch: subjectsAuthFetch} = useApi<Subject[]>([]);
    
    const { id } = router.query
    useEffect(() => {
        if(!id) return;
        teacherAuthFetch(`/teachers/${id}`, {
            method: 'GET',
        });
        reviewsAuthFetch(`/reviews/teacher/${id}`, {
            method: 'GET',
        });
        subjectsAuthFetch(`/subjects/teacher/${id}`, {
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
                        teacherLoading || reviewsLoading && (
                            <div className='flex justify-center items-center'>
                                <AiOutlineLoading3Quarters className='animate-spin text-4xl' size={20} color='gray'/>
                            </div>
                        )
                    }
                    {
                        teacherError || reviewsError && (
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
                                    <button
                                        className={`mt-5 px-2 py-2 text-sm font-semibold text-white rounded-md sm:px-5 ${createMode ? 'bg-gray-500' : 'bg-green-600'} hover:bg-opacity-90`}
                                        onClick={() => setCreateMode(!createMode)}
                                    >
                                        {
                                            createMode ? 'Cancelar' : 'Crear reseña'
                                        }
                                    </button>
                                </div>
                            </div>
                        )
                    }
                    {
                        createMode ? (
                            <CreateReviewForm  subjects={subjects} teacherId={id as string}/>
                        )
                        : (
                            <ReviewCardList reviews={reviews}/>
                        )
                    }
                </div>
            </Screen>
        </>
    )
}
