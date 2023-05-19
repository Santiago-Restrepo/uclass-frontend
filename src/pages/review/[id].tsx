import { useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next'
import React, { useEffect } from 'react'
import Head from 'next/head'
//components
import { Screen } from '@/components/layout/Screen';
import { NavBar } from '@/components/layout/NavBar';
import { ReviewPageCard } from '@/components/review/ReviewPageCard';
import { CreateCommentForm } from '@/components/comment/CreateCommentForm';
import { CommentList } from '@/components/comment/CommentList';
//Icons
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
//types
import { Review } from '@/types/review';
import { Comment } from '@/types/comment';
import { User } from '@/types/user';
//Hooks
import { useApi } from '@/hooks/useApi';
import { useNavigationPath } from '@/hooks/useNavigationPath';
//Functions
import { userFromToken } from '@/utils/userFromToken';

//Props
interface ReviewProps {
    user: User
}
function Review({
    user
}: ReviewProps) {
    const router = useRouter()
    const { id } = router.query
    const { data: review, loading: reviewLoading, authFetch: reviewFetch } = useApi<Review>()
    const { data: comments, loading: commentsLoading, authFetch: refreshComments } = useApi<Comment[]>([])
    useNavigationPath(['/home', `/teacher/${review ? review.teacherId: ''}`])
    useEffect(() => {
        if (!id) return;
        reviewFetch(`/reviews/${id}`, {})
        refreshComments(`/comments/review/${id}`, {})
    }, [id]);

    return (
        <>
            <Head>
                <title>Uclass</title>
                <meta name="description" content="Uclass app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Screen>
                <NavBar user={user} />
                {
                    reviewLoading || !review ? (
                        <AiOutlineLoading3Quarters className='animate-spin text-4xl' size={20} color='gray'/>
                    ) : (
                        <>
                            <ReviewPageCard review={review}/>
                            <CreateCommentForm reviewId={review._id} refreshComments={()=>refreshComments(`/comments/review/${id}`,{})}/>
                            <CommentList comments={comments} loading={commentsLoading}/>
                        </>
                    )
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

export default Review