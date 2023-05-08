import { useRouter } from 'next/router'
import React from 'react'
import Head from 'next/head'
//components
import { Screen } from '@/components/layout/Screen';
import { NavBar } from '@/components/layout/NavBar';
import { ReviewPageCard } from '@/components/review/ReviewPageCard';
//types
import { Review } from '@/types/review';
//Hooks
import { useApi } from '@/hooks/useApi';
function Review() {
    const router = useRouter()
    const { id } = router.query
    const { data: review } = useApi<Review>(null, `/api/reviews/${id}`)
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
                    review && (
                        <ReviewPageCard review={review}/>
                    )
                }
            </Screen>
        </>
    )
}

export default Review