import React from 'react'
//Types
import { Comment } from '@/types/comment';
//Props
interface CommentCardProps {
    comment: Comment
}
export function CommentCard({
    comment
}: CommentCardProps) {
    return (
        <div>
            <p>{comment.content}</p>
        </div>
    )
}
