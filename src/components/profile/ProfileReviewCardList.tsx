import React from 'react'
//Types
import { Review } from '@/types/review';
//Components
import { ProfileReviewCard } from '@/components/profile/ProfileReviewCard';
//Props
interface ProfileReviewCardListProps {
    reviews: Review[],
    refresh: () => void
}

export function ProfileReviewCardList({
    reviews,
    refresh
}: ProfileReviewCardListProps){
    return (
        reviews && (
            <div className='flex flex-wrap justify-start gap-5 mt-3 w-full'>
                {
                    reviews.map((review, index) => (
                        <ProfileReviewCard 
                            key={index} 
                            review={review} 
                            canBeDeleted={true}
                            refresh={refresh}
                        />
                    ))
                }
            </div>
        )
    )
}
