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
                reviews.length === 0 && (
                    <span
                        className='text-sm text-gray-400'
                    >
                        No tienes reseñas pendientes por aprobar
                    </span>
                )
            }
            {
                reviews.map((review, index) => (
                    <PendingReviewCard key={index} review={review} refresh={refresh}/>
                ))
            }
        </div>
    )   
}
