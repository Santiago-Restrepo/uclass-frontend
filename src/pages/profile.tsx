import Head from 'next/head'
import { GetServerSidePropsContext } from 'next';
//components
import { Screen } from '@/components/layout/Screen';
import { NavBar } from '@/components/layout/NavBar';
import { ProfileCard } from '@/components/profile/ProfileCard';

//hooks
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useNavigationPath } from '@/hooks/useNavigationPath';
//Props
import { User } from '@/types/user';
import { userFromToken } from '@/utils/userFromToken';
interface ProfileProps {
    user: User
}
export default function Profile({
    user
}: ProfileProps) {
    // const user = useSelector((state: RootState) => state.user);
    useNavigationPath(['']);
    return (
        <>
        <Head>
            <title>Uclass</title>
            <meta name="description" content="Uclass app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Screen>
            <NavBar user={user}/>
            {
                user && user.id && <ProfileCard user={user}/>
            }
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
