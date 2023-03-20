import { colors } from '@/styles/colors';
import Image from 'next/image';
import React from 'react'
import { AiFillStar } from 'react-icons/ai';
interface BestCardProps {
    imgUrl: string;
    name: string;
    description?: string;
    rating: number;
}
export const BestCard = ({
    imgUrl,
    name,
    description,
    rating
}: BestCardProps) => {
    return (
        <div className="flex flex-col items-center justify-center w-1/2 max-w-sm h-full p-5 bg-white rounded-md shadow-md">
            <Image
                src={imgUrl}
                alt={name}
                width={100}
                height={100}
                className="rounded-full"
            />
            <div className="flex flex-col items-center justify-center w-full">
                <h1 className="text-xl text-center font-semibold text-gray-700 leading-none">{name}</h1>
                <p className="text-sm text-center text-gray-500 leading-none">{description}</p>
                <div className="flex items-center justify-center mt-4">
                    <AiFillStar color={colors.yellow500} size={30}/>
                    <span className="text-2xl font-semibold text-yellow-500">{rating}</span>
                </div>
            </div>      
        </div>
    )
}
