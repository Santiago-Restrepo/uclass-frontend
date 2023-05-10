
import React from 'react'
import Head from 'next/head'
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
function Resource() {
    const router = useRouter()
    const { id } = router.query
    if(!id) return null
    const { data: resource, loading: resourceLoading } = useApi<Resource>(null, `/resources/${id}`)
    const { data: comments, loading: commentsLoading, authFetch: refreshComments } = useApi<Comment[]>(null, `/comments/resource/${id}`)
    useNavigationPath(['/home', `/subject/${resource ? resource.subject : ''}`])
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
                    resourceLoading || !resource ? (
                        <AiOutlineLoading3Quarters className='animate-spin text-4xl' size={20} color='gray'/>
                    ): (
                        <div className='w-full h-full py-5'>
                            <UserHeader user={resource.user} />
                            <ResourceHeader resource={resource}/>
                            <CreateCommentForm resourceId={resource._id} refreshComments={()=>refreshComments(`/comments/resource/${id}`,{})}/>
                            <CommentList comments={comments} loading={commentsLoading}/>
                        </div>
                    )
                }
            </Screen>
        </>
    )
}

export default Resource