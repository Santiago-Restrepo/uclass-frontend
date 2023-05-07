import React from 'react'
import { Review } from '@/types/review';
import Image from 'next/image';
//Props
interface ReviewPageCardProps {
    review: Review
}
export function ReviewPageCard({
    review
}: ReviewPageCardProps) {
    const { user } = review
    return (
        <div>
            <div className='flex gap-2 mb-2'>
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                        src={typeof user === 'string' ? '/user.png' : user.photo || '/user.png'}
                        alt="Picture of the author"
                        fill={true}
                        sizes='100%'
                    />
                </div>
                <div className='flex flex-col justify-center items-start'>
                    <h2 className='text-md font-medium text-gray-800'>
                        {
                            typeof user === 'string' ? user : user.name
                        }
                    </h2>
                </div>
            </div>    
        </div>
    )
}
