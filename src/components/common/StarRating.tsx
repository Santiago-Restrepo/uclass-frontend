import React from 'react'

//Props
interface StarRatingProps {
    rating: number,
    color: string,
    size: number
}
//Icons
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
export function StarRating({
    rating,
    color,
    size
}: StarRatingProps) {
    return (
        <div className="flex">
            {
                Array(5).fill(0).map((_, index) => {
                    if(index < rating){
                        return <AiFillStar key={index} color={color} size={size}/>
                    }else{
                        return <AiOutlineStar key={index} color={color} size={size}/>
                    }
                })
            }
        </div>
    )
}
