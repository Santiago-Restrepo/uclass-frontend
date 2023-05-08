import React, { useMemo } from 'react'
//Types
import { Comment } from '@/types/comment';
//Components
import { CommentCard } from '@/components/review/CommentCard';
//Icons
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
//Props
interface CommentListProps {
    comments: Comment[],
    loading?: boolean
}
export function CommentList({
    comments,
    loading
}: CommentListProps) {
    const sortedComments =  useMemo(() => {
        return comments.sort((a, b) => {
            if (a.createdAt && b.createdAt) {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            }
            return 0
        })
    }, [comments])
    if (loading) {
        return (
            <div className='flex justify-center gap-4 w-full mt-3'>
                <AiOutlineLoading3Quarters className='animate-spin text-green-600' size={30} />
            </div>
        )
    }
    return (
        <div className='flex flex-col gap-4 w-full mt-3'>
            <div className='flex flex-col gap-4'>
                {
                    sortedComments.map(comment => (
                        <CommentCard key={comment._id} comment={comment}/>
                    ))
                }
            </div>
        </div>
    )
}
