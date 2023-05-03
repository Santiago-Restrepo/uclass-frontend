import Head from 'next/head'
import { useAuthFetch } from '@/hooks/useAuthFetch'
//components
import { Screen } from '@/components/Screen';
import { NavBar } from '@/components/NavBar';
export default function Profile() {
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
            Profile
        </Screen>
        </>
    )
}
