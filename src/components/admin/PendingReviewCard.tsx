import React from 'react'
//types
import { Review } from '@/types/review';
//Props
interface PendingReviewListProps {
    review: Review
}
export function PendingReviewCard({
    review
}: PendingReviewListProps) {
    return (
        <div>
            {
                review.content
            }
        </div>
    )
}
