import Head from 'next/head'
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
    IReviewsCount, 
    ITeacherReviewsCount,
    ITeachersReviewsRatingCount,
    ITeachersReviewsCommentsCount

} from '@/types/analytics';
import { User } from '@/types/user';
//Props
interface TeachersDashboardProps {
    user: User
}
export default function TeachersDashboard({
    user
}: TeachersDashboardProps) {
    const {
        data: reviewsCount,
        loading: reviewsCountLoading,
    } = useApi<IReviewsCount[]>([], '/analytics/reviews/count');
    const {
        data: teachersReviewsCount,
        loading: teachersReviewsCountLoading,
    } = useApi<ITeacherReviewsCount[]>([], '/analytics/teachers/reviews/count');
    const {
        data: teachersReviewsRatingCount,
        loading: teachersReviewsRatingCountLoading,
    } = useApi<ITeachersReviewsRatingCount[]>([], '/analytics/teachers/reviews/rating/count');
    const {
        data: teachersReviewsCommentsCount,
        loading: teachersReviewsCommentsCountLoading,
    } = useApi<ITeachersReviewsCommentsCount[]>([], '/analytics/teachers/reviews/comments/count');
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
                Dashboard de profesores y reseñas
            </h1>
            <p className='text-center text-gray-400 w-full mt-3 leading-none'>
                Los siguientes gráficos muestran información sobre las reseñas de los profesores y reseñas
            </p>
            {
                teachersReviewsCountLoading || teachersReviewsRatingCountLoading || teachersReviewsCommentsCountLoading && (
                    <div className='flex w-full h-full items-center justify-center'>
                        <AiOutlineLoading3Quarters className='animate-spin text-4xl text-gray-400'/>
                    </div>
                )
            }
            <div className='flex w-full h-full items-start justify-center flex-wrap gap-2'>
                <div className='w-full h-2/5 mt-5'>
                    <CLineChart 
                        data={reviewsCount} 
                        XdataKey='date'
                        LineDataKeys={["count"]}
                        label='Cantidad de reseñas por fecha'
                        fillOffset={5}
                    />
                </div>
                <div className='w-full h-2/4 mt-5 max-w-md'>
                    <CPieChart 
                        data={teachersReviewsCount.map((teacher) => ({...teacher, name: teacher.teacher.name}))} 
                        dataKey={"count"}
                        label='Cantidad de reseñas por profesor'
                    />
                </div>
                <div className='w-full h-2/4 mt-5 max-w-md'>
                    <CPieChart 
                        data={teachersReviewsCommentsCount.map((teacher) => ({...teacher, name: teacher.teacher.name}))} 
                        dataKey={"count"}
                        label='Cantidad de comentarios por reseñas por profesor'
                        fillOffset={3}
                    />
                </div>
                <div className='flex justify-between gap-2 w-full h-2/4 mt-5 max-w-4xl'>
                    <CCountChart
                        count={teachersReviewsCount.reduce((acc, teacher) => acc + teacher.count, 0)}
                        label='Cantidad total de reseñas'
                    />
                    <CCountChart
                        count={teachersReviewsCommentsCount.reduce((acc, teacher) => acc + teacher.count, 0)}
                        label='Cantidad total de comentarios'
                    />
                </div>
                <div className='w-full h-2/5 mt-5'>
                    <CBarChart 
                        data={teachersReviewsRatingCount} 
                        XdataKey='teacher.name'
                        YdataKeys={["clarity", "demanding", "fairness"]}
                        label='Promedio de calificación de claridad, exigencia y justicia por profesor'
                        fillOffset={5}
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

