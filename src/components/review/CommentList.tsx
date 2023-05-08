import React from 'react'
//Types
import { Comment } from '@/types/comment';
//Components
import { CommentCard } from '@/components/review/CommentCard';
//Props
interface CommentListProps {
    comments: Comment[]
}
export function CommentList({
    comments
}: CommentListProps) {
    return (
        <div className='flex flex-col gap-4 w-full mt-3'>
            <div className='flex flex-col gap-4'>
                {
                    comments.map(comment => (
                        <CommentCard key={comment._id} comment={comment}/>
                    ))
                }
            </div>
        </div>
    )
}
