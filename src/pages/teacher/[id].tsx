import Head from 'next/head'
import { useUser } from '@/hooks/useUser'
import { useRouter } from 'next/router';
//components
import { Screen } from '@/components/Screen';
import { NavBar } from '@/components/NavBar';
export default function Teacher() {
    const router = useRouter()
    const { id } = router.query
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
                    <h1>{id}</h1>
                </div>
            </Screen>
        </>
    )
}
