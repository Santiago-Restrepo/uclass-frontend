import React from 'react'
//types
import { Review } from '@/types/review';
//components
import { PendingReviewCard } from './PendingReviewCard';
//Props
interface PendingReviewListProps {
    reviews: Review[],
    refresh?: () => void
}
export function PendingReviewCardList({
    reviews,
    refresh
}: PendingReviewListProps) {
    return (
        <div
            className='flex flex-wrap justify-center gap-5 mt-5 w-full'
        >
            {
                reviews.map((review, index) => (
                    <PendingReviewCard key={index} review={review} refresh={refresh}/>
                ))
            }
        </div>
    )   
}
