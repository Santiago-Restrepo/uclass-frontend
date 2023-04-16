import Head from 'next/head'
import { useUser } from '@/hooks/useUser'

//components
import { Screen } from '@/components/Screen';
import { NavBar } from '@/components/NavBar';
export default function Home() {
    useUser();

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
                    subjects
                </div>
            </Screen>
        </>
    )
}
