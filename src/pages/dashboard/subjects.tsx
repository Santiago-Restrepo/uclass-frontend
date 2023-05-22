import Head from 'next/head'
import { useMemo } from 'react';
import { GetServerSidePropsContext } from 'next';
//components
import { Screen } from '@/components/layout/Screen';
import { NavBar } from '@/components/layout/NavBar';
//Dashboard components
import CBarChart from '@/components/dashboard/CBarChart';
import CPieChart from '@/components/dashboard/CPieChart';
import CCountChart from '@/components/dashboard/CCountChart';
import CLineChart from '@/components/dashboard/CLineChart';
//utils
import { userFromToken } from '@/utils/userFromToken';
//Hooks
import { useApi } from '@/hooks/useApi';
import { useNavigationPath } from '@/hooks/useNavigationPath';
//Icons
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
//types
import { 
    IResourcesCount, 
    ISubjectResourcesCount ,
    ISubjectResourcesRatingCount
} from '@/types/analytics';
import { User } from '@/types/user';

interface SubjectsDashboardProps {
    user: User
}
export default function SubjectsDashboard({
    user
}: SubjectsDashboardProps) {
    const {
        data: resourcesCount,
        loading: reviewsCountLoading,
    } = useApi<IResourcesCount[]>([], '/analytics/resources/count');
    const {
        data: subjectResourcesCount,
        loading: subjectResourcesCountLoading,
    } = useApi<ISubjectResourcesCount[]>([], '/analytics/subjects/resources/count');
    const {
        data: subjectResourceCommentsCount,
        loading: subjectResourceCommentsCountLoading,
    } = useApi<ISubjectResourcesCount[]>([], '/analytics/subjects/resources/comments/count');
    const {
        data: subjectResourceRatingCount,
        loading: subjectResourceRatingCountLoading,
    } = useApi<ISubjectResourcesRatingCount[]>([], '/analytics/subjects/resources/rating/count');

    const resourcesCountFilled = useMemo(() => {
        if (resourcesCount.length > 0) {
            const minDate = new Date(resourcesCount[0].date);
            const maxDate = new Date(resourcesCount[resourcesCount.length - 1].date);
            const diffTime = Math.abs(maxDate.getTime() - minDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const emptyDates : IResourcesCount[] = [];
            for (let i = 0; i < diffDays; i++) {
                const date = new Date(minDate);
                date.setDate(date.getDate() + i);
                const dateExist = resourcesCount.find((review) => new Date(review.date).toDateString() === date.toDateString());
                if (!dateExist) {
                    emptyDates.push({
                        date: date.toISOString(),
                        count: 0
                    });

                }
            }
            const allReviewsCount = [...resourcesCount, ...emptyDates].map(review => ({
                ...review,
                date: new Date(review.date).getTime()
            }))
            allReviewsCount.sort((a, b) => a.date - b.date);
            return allReviewsCount.map(review => ({
                ...review,
                date: new Date(review.date).toLocaleDateString()
            }));
        }else{
            return [];
        }
    }, [resourcesCount]);
    useNavigationPath([]);
    return (
        <>
        <Head>
            <title>Uclass</title>
            <meta name="description" content="Uclass app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Screen contentClassname={`max-w-none`}>
            <NavBar user={user}/>
            <h1 className='text-2xl text-center text-gray-500 font-bold w-full mt-5 leading-none border-t-2 border-gray-200 pt-5'>
                Dashboard de asignaturas y recursos
            </h1>
            <p className='text-center text-gray-400 w-full mt-3 leading-none'>
                Los siguientes gráficos muestran información sobre las asignaturas y recursos de la plataforma
            </p>
            {
                reviewsCountLoading && (
                    <div className='flex w-full h-full items-center justify-center'>
                        <AiOutlineLoading3Quarters className='animate-spin text-4xl text-gray-400'/>
                    </div>
                )
            }
            <div className='flex w-full h-full items-start justify-center flex-wrap gap-2'>
                <div className='w-full h-2/5 mt-5'>
                    <CLineChart 
                        data={resourcesCountFilled} 
                        XdataKey='date'
                        LineDataKeys={["count"]}
                        label='Cantidad de recursos por fecha'
                        fillOffset={4}
                    />
                </div>
                <div className='flex w-full h-2/4 mt-5 max-w-4xl gap-5'>
                    <CPieChart 
                        data={subjectResourcesCount.map((resource) => ({...resource, name: resource.subject.name}))} 
                        dataKey={"count"}
                        label='Cantidad de recursos por asignatura'
                        fillOffset={3}
                    />
                    <CCountChart
                        count={subjectResourcesCount.reduce((acc, resource) => acc + resource.count, 0)}
                        label='Cantidad total de recursos hasta la fecha'
                    />
                </div>
                <div className='flex w-full h-2/4 mt-5 max-w-4xl gap-5'>
                    <CPieChart 
                        data={subjectResourceCommentsCount.map((resource) => ({...resource, name: resource.subject.name}))} 
                        dataKey={"count"}
                        label='Cantidad de comentarios por recursos de asignatura'
                        fillOffset={6}
                    />
                    <CCountChart
                        count={subjectResourceCommentsCount.reduce((acc, resource) => acc + resource.count, 0)}
                        label='Cantidad total de comentarios hasta la fecha'
                    />
                </div>
                <div className='w-full h-2/5 mt-5'>
                    <CBarChart 
                        data={subjectResourceRatingCount} 
                        XdataKey='subject.name'
                        YdataKeys={["rating"]}
                        label='Promedio de calificaciones de recursos por asignatura'
                        fillOffset={6}
                    />
                </div>
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

