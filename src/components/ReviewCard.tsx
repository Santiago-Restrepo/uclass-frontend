import Image from 'next/image';
import { useMemo } from 'react';
//Types
import { Review } from '@/types/review';
//Props
interface ReviewCardProps {
    review: Review
}
//Icons
import {AiFillStar, AiOutlineStar} from 'react-icons/ai';
import {BiCommentDetail} from 'react-icons/bi';
export const ReviewCard = ({
    review,
}: ReviewCardProps) => {
    const ratingAverage = useMemo(() => {
        const rating = review.rating;
        const ratingAverage = Object.values(rating).reduce((acc, curr) => acc + curr, 0) / Object.values(rating).length;
        return ratingAverage;
    }, [review.rating]);
    
    return (
        <div 
            className='flex flex-col items-center justify-center w-full max-w-[12rem] shadow-sm rounded-md p-5 bg-white'
        >
            <div
                className='flex justify-center items-center w-full'
            >
                <div
                    className='relative w-16 h-16 rounded-full overflow-hidden'
                >
                    <Image
                        src={review.user?.photo || '/user.png'}
                        alt="Picture of the author"
                        fill={true}
                        sizes='100%'
                        style={{borderRadius: '100%', objectFit: 'contain', aspectRatio: '1/1'}}
                    />
                </div>
                <div className='flex flex-col justify-center items-start ml-3 w-1/2'>
                    <h2 className='text-md font-medium text-gray-800'>{review.user?.name}</h2>
                    <div className="flex">
                        {
                            Array(5).fill(0).map((_, index) => {
                                if(index < ratingAverage){
                                    return <AiFillStar key={index} className='text-yellow-500' size={15}/>
                                }else{
                                    return <AiOutlineStar key={index} className='text-yellow-500' size={15}/>
                                }
                            })
                        }
                    </div>
                </div>
            </div>
            <p className='text-sm font-normal text-gray-500 mt-3 text-center leading-tight'>
                {review.content}
            </p>
            <div className='flex justify-center'>
                <button className="group flex justify-center items-center gap-2 mt-5 px-2 py-1 text-sm font-semibold border-2 border-green-600 rounded-md text-green-600 hover:bg-green-600 hover:text-white">
                    Comentar
                    <BiCommentDetail size={20} className='text-green-600 group-hover:text-white'/>
                </button>
            </div>
        </div>
    )
}
