import Head from 'next/head'
import { useAuthFetch } from '@/hooks/useAuthFetch'
//components
import { Screen } from '@/components/Screen';
import { NavBar } from '@/components/NavBar';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
export default function Profile() {
    const user = useSelector((state: RootState) => state.user);
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
            {
                JSON.stringify(user)
            }
        </Screen>
        </>
    )
}
