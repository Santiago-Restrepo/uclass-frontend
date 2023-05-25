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
            <div className='ReviewCardList flex justify-start gap-5 mt-3 w-full overflow-x-scroll overflow-y-visible pb-3'>
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
                <style jsx>
                    {`
                        .ReviewCardList {
                            scroll-snap-type: x mandatory;
                        }
                        .ReviewCardList::-webkit-scrollbar {
                            height: .35rem;
                        }

                        .ReviewCardList::-webkit-scrollbar-track {
                            background: #e2e2e2;
                            border-radius: .3rem;
                        }

                        .ReviewCardList::-webkit-scrollbar-thumb {
                            border-radius: .3rem;
                            background: #afafaf;
                            color: #f1f1f1;
                        }
                    `}
                </style>
            </div>
        )
    )
}
