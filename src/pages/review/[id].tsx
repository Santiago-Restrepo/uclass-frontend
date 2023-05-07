import { useRouter } from 'next/router'
import React from 'react'
import Head from 'next/head'
//components
import { Screen } from '@/components/layout/Screen';
import { NavBar } from '@/components/layout/NavBar';

function Review() {
    const router = useRouter()
    const { id } = router.query
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
                <h1>Review: {id}</h1>
            </Screen>
        </>
    )
}

export default Review