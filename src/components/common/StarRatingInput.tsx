import React, {useState} from 'react'
//Props
interface StarRatingInputProps {
    label: string,
    name: string,
    register: any,
    errors: any
}
//Icons
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
export function StarRatingInput({
    label,
    name,
    register,
    errors
}: StarRatingInputProps) {
    const values = [1, 2, 3, 4, 5];
    const [rating, setRating] = useState(0);
    return (
        <div className='flex flex-col gap-2'>
            <label className='text-gray-400 font-medium' htmlFor={name}>{label}</label>
            <div className='flex gap-2'>
                {
                    values.map((value, index) => (
                        <div key={index} className='flex items-center gap-1'>
                            <input
                                className='hidden'
                                type='radio'
                                value={value}
                                {...register(name)}
                            />
                            <button
                                className='focus:outline-none'
                                onClick={() => setRating(value)}
                            >
                                {
                                    rating >= value ? (
                                        <AiFillStar className='text-yellow-500' size={25}/>
                                    ) : (
                                        <AiOutlineStar className='text-yellow-500' size={25}/>
                                    )
                                }
                            </button>
                        </div>
                    ))
                }
            </div>
            {
                errors[name] && (
                    <span className='text-red-500 text-sm font-semibold'>{errors[name].message}</span>
                )
            }
        </div>
    )

}
