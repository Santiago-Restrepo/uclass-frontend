import React from 'react'
//Types
import { Review } from '@/types/review';
//Components
import { ReviewCard } from '@/components/common/ReviewCard';
//Props
interface ReviewCardListProps {
    reviews: Review[]
}

export function ReviewCardList({
    reviews
}: ReviewCardListProps){
    return (
        reviews && (
            <div className='flex flex-wrap justify-center gap-5 mt-5 w-full'>
                {
                    reviews.length === 0 && (
                        <div className='flex justify-center items-center'>
                            <h1 className='text-xl font-semibold text-gray-500'>
                                No hay reseñas
                            </h1>
                        </div>
                    )
                }
                {
                    reviews.map((review, index) => (
                        <ReviewCard key={index} review={review} comment={true}/>
                    ))
                }
            </div>
        )
    )
}
