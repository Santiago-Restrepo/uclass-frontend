import Head from 'next/head'
import { GetServerSidePropsContext } from 'next';
//components
import { Screen } from '@/components/layout/Screen';
import { NavBar } from '@/components/layout/NavBar';
//utils
import { userFromToken } from '@/utils/userFromToken';
//Props
import { User } from '@/types/user';
interface TeachersDashboardProps {
    user: User
}
export default function TeachersDashboard({
    user
}: TeachersDashboardProps) {
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
            Teachers dashboard
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

