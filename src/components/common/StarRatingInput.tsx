import React, {useEffect, useState} from 'react'
import { useFormContext  } from 'react-hook-form'
//Props
interface StarRatingInputProps {
    label: string,
    name: string
}
//Icons
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
export function StarRatingInput({
    label,
    name
}: StarRatingInputProps) {
    const values = [1, 2, 3, 4, 5];
    const [rating, setRating] = useState(0);
    const { register, unregister } = useFormContext();
    const handleChange = (value: number) => {
        setRating(value);
        unregister(name);
        register(name, { value });
    }

    return (
        <div className='flex flex-col gap-2'>
            <label className='text-gray-400 font-medium' htmlFor={name}>{label}</label>
            <div className='flex gap-2'>
                {
                    values.map((value, index) => (
                        <div key={index} className='flex items-center gap-1'>
                            <input
                                id={`${name}-${value}`}
                                className='hidden'
                                type='radio'
                                value={value}
                                onChange={() => handleChange(value)}
                            />
                            <label 
                                htmlFor={`${name}-${value}`}
                                className='cursor-pointer'
                            >
                                {
                                    rating >= value ? (
                                        <AiFillStar className='text-yellow-500' size={25}/>
                                    ) : (
                                        <AiOutlineStar className='text-yellow-500' size={25}/>
                                    )
                                }
                            </label>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}
