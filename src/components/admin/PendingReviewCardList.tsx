import React from 'react'
//types
import { Review } from '@/types/review';
//components
import { PendingReviewCard } from './PendingReviewCard';
//Props
interface PendingReviewListProps {
    reviews: Review[]
}
export function PendingReviewCardList({
    reviews
}: PendingReviewListProps) {
    return (
        <div
            className='flex flex-wrap justify-center gap-5 mt-5 w-full'
        >
            {
                reviews.map((review, index) => (
                    <PendingReviewCard key={index} review={review}/>
                ))
            }
        </div>
    )   
}
