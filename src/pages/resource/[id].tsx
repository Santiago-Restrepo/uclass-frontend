
import React, { useEffect, useMemo } from 'react'
import Head from 'next/head'
import { GetServerSidePropsContext } from 'next';
//Hooks
import { useRouter } from 'next/router'
import { useNavigationPath } from '@/hooks/useNavigationPath';
import { useApi } from '@/hooks/useApi';
//Components
import { Screen } from '@/components/layout/Screen';
import { UserHeader } from '@/components/common/UserHeader';
import { NavBar } from '@/components/layout/NavBar';
import { ResourceHeader } from '@/components/resource/ResourceHeader';
import { CreateCommentForm } from '@/components/comment/CreateCommentForm';
import { CommentList } from '@/components/comment/CommentList';
//Icons
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
//Types
import { Resource } from '@/types/resource';
import { Comment } from '@/types/comment';
import { User } from '@/types/user';
//Functions
import { userFromToken } from '@/utils/userFromToken';

//Props
interface ResourceProps {
    user: User
}
function Resource({
    user
}: ResourceProps) {
    const router = useRouter()
    const { id } = router.query;
    const { data: resource, loading: resourceLoading, authFetch: resourceFetch } = useApi<Resource>()
    const { data: comments, loading: commentsLoading, authFetch: refreshComments } = useApi<Comment[]>()
    useNavigationPath(['/home', `/subject/${resource ? typeof resource.subject === 'string' ? resource.subject : resource.subject._id : ''}`])
    useEffect(() => {
        if (!id) return;
        resourceFetch(`/resources/${id}`, {})
        refreshComments(`/comments/resource/${id}`, {})
    }, [id])
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
                    resourceLoading || !resource ? (
                        <AiOutlineLoading3Quarters className='animate-spin text-4xl' size={20} color='gray'/>
                    ): (
                        <div className='w-full h-full py-5'>
                            <UserHeader user={resource.user} />
                            <ResourceHeader resource={resource}/>
                            <CreateCommentForm resourceId={resource._id} refreshComments={()=>refreshComments(`/comments/resource/${id}`,{})} userId={user ? user.id : ''}/>
                            <CommentList comments={comments} loading={commentsLoading}/>
                        </div>
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

export default Resource