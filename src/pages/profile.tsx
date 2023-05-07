import Head from 'next/head'
//components
import { Screen } from '@/components/layout/Screen';
import { NavBar } from '@/components/layout/NavBar';
import { ProfileCard } from '@/components/profile/ProfileCard';
//hooks
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useNavigationPath } from '@/hooks/useNavigationPath';
export default function Profile() {
    const user = useSelector((state: RootState) => state.user);
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
            <NavBar />
            <ProfileCard user={user}/>
        </Screen>
        </>
    )
}
