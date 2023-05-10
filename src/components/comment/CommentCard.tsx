import React from 'react'
import Image from 'next/image';
//Types
import { Comment } from '@/types/comment';
//Components
import { StarRating } from '../common/StarRating';
import { colors } from '@/styles/colors';
//Props
interface CommentCardProps {
    comment: Comment
}
export function CommentCard({
    comment
}: CommentCardProps) {
    return (
        <div className='flex flex-col border-t border-gray-200 pt-2'>
            <div className='flex items-end gap-2 mb-2'>
                <Image
                    src={typeof comment.user === 'string' ? '/user.png' : comment.user.photo || '/user.png'}
                    alt="Picture of the author"
                    width={30}
                    height={30}
                />
                <div className='flex items-end gap-2'>
                    <div className='flex flex-col'>
                        <span className='text-sm font-medium text-gray-700'>{typeof comment.user === 'string' ? comment.user : comment.user.name}</span>
                        {
                            comment.rating && (
                                <StarRating rating={comment.rating} color={colors.green600} size={15}/>
                            )
                        }
                    </div>
                    {
                        comment.createdAt && (
                            <span className='text-xs text-gray-400'>{new Date(comment.createdAt).toLocaleDateString()}</span>
                        )
                    }
                </div>
            </div>
            <p className='text-sm text-gray-500 leading-none'>
                {comment.content}
            </p>

        </div>
    )
}
