import { useRouter } from 'next/router'
import React from 'react'
import Head from 'next/head'
//components
import { Screen } from '@/components/layout/Screen';
import { NavBar } from '@/components/layout/NavBar';
import { ReviewPageCard } from '@/components/review/ReviewPageCard';
import { CreateCommentForm } from '@/components/review/CreateCommentForm';
import { CommentList } from '@/components/review/CommentList';
//types
import { Review } from '@/types/review';
import { Comment } from '@/types/comment';
//Hooks
import { useApi } from '@/hooks/useApi';
function Review() {
    const router = useRouter()
    const { id } = router.query
    const { data: review } = useApi<Review>(null, `/reviews/${id}`)
    const { data: comments } = useApi<Comment[]>([], `/comments/review/${id}`)
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
                        <>
                            <ReviewPageCard review={review}/>
                            <CreateCommentForm reviewId={review._id}/>
                            <CommentList comments={comments}/>
                        </>
                    )
                }
            </Screen>
        </>
    )
}

export default Review