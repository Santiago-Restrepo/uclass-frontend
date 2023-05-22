import Head from 'next/head'
import { GetServerSidePropsContext } from 'next';
//components
import { Screen } from '@/components/layout/Screen';
import { NavBar } from '@/components/layout/NavBar';
//Dashboard components
import CBarChart from '@/components/dashboard/CBarChart';
//utils
import { userFromToken } from '@/utils/userFromToken';
//Hooks
import { useApi } from '@/hooks/useApi';
//types
import { ITeacherReviewsCount } from '@/types/analytics';
import { User } from '@/types/user';
//theme
import { colors } from '@/styles/colors';
//Props
interface TeachersDashboardProps {
    user: User
}
export default function TeachersDashboard({
    user
}: TeachersDashboardProps) {
    const {
        data: teachersReviewsCount,
    } = useApi<ITeacherReviewsCount>([], '/analytics/teachers/reviews/count');
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
            <div className='w-full h-1/4 mt-5'>
                <CBarChart 
                    data={teachersReviewsCount} 
                    dataKey="count" 
                    label='Cantidad de reseñas por profesor'
                    // fill={colors.yellow500}
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

