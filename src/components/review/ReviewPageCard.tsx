import React from 'react'
import { Review } from '@/types/review';
import Image from 'next/image';
//Icons
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
//Props
interface ReviewPageCardProps {
    review: Review
}
export function ReviewPageCard({
    review
}: ReviewPageCardProps) {
    const { user, subject, rating } = review;
    const ratingAverage = React.useMemo(() => {
        const rating = review.rating;
        if (!rating) return 0;
        const ratingAverage = Object.values(rating).reduce((acc, curr) => acc + curr, 0) / Object.values(rating).length;
        return Math.round(ratingAverage);
    }, [review.rating]);
    return (
        <div className='w-full mt-3'>
            <div className='flex gap-2 mb-2'>
                <div className="relative w-20 h-20 rounded-full overflow-hidden">
                    <Image
                        src={typeof user === 'string' ? '/user.png' : user ? user.photo || '/user.png': '/user.png'}
                        alt="Picture of the author"
                        fill={true}
                        sizes='100%'
                    />
                </div>
                <div className='flex flex-col items-start'>
                    <h2 className='text-md font-medium text-gray-800'>
                        {
                            typeof user === 'string' ? user : user ? user.name : 'Usuario elimiado'
                        }
                    </h2>
                    <p className='text-sm text-gray-400'>
                        {
                            subject ? (
                                typeof subject === 'string' ? subject : subject.name
                            ): 'Sin materia'
                        }
                    </p>
                    <div className="flex">
                        {
                            Array(5).fill(0).map((_, index) => {
                                if(index < ratingAverage){
                                    return <AiFillStar key={index} className='text-green-600' size={20}/>
                                }else{
                                    return <AiOutlineStar key={index} className='text-green-600' size={20}/>
                                }
                            })
                        }
                    </div>
                </div>
            </div> 
            <div className='flex flex-col gap-2'>
                <p className='text-md text-gray-500 leading-none'>
                    {review.content}
                </p>
            </div>
            <div className='flex flex-col gap-2 mt-5'>
                <div className='flex items-center gap-2'>
                    <div className="flex">
                        {
                            Array(5).fill(0).map((_, index) => {
                                if(index < rating.clarity){
                                    return <AiFillStar key={index} className='text-yellow-500 opacity-90' size={15}/>
                                }else{
                                    return <AiOutlineStar key={index} className='text-yellow-500 opacity-90' size={15}/>
                                }
                            })
                        }
                    </div>
                    <p className='text-sm text-gray-500 opacity-90'>Claridad</p>
                </div>
                <div className='flex items-center gap-2'>
                    <div className="flex">
                        {
                            Array(5).fill(0).map((_, index) => {
                                if(index < rating.demanding){
                                    return <AiFillStar key={index} className='text-yellow-500 opacity-90' size={15}/>
                                }else{
                                    return <AiOutlineStar key={index} className='text-yellow-500 opacity-90' size={15}/>
                                }
                            })
                        }
                    </div>
                    <p className='text-sm text-gray-500 opacity-90'>Exigencia</p>
                </div>
                <div className='flex items-center gap-2'>
                    <div className="flex">
                        {
                            Array(5).fill(0).map((_, index) => {
                                if(index < rating.fairness){
                                    return <AiFillStar key={index} className='text-yellow-500 opacity-90' size={15}/>
                                }else{
                                    return <AiOutlineStar key={index} className='text-yellow-500 opacity-90' size={15}/>
                                }
                            })
                        }
                    </div>
                    <p className='text-sm text-gray-500 opacity-90'>Justicia</p>
                </div>
            </div>
        </div>
    )
}
