import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { AiFillStar } from 'react-icons/ai';
import { HiDocumentText } from 'react-icons/hi';
interface BestCardProps {
    imgUrl?: string;
    name: string;
    description?: string;
    rating: number;
    url: string;
}
export const BestCard = ({
    imgUrl,
    name,
    description,
    rating,
    url
}: BestCardProps) => {
    return (
        <Link 
            className="flex flex-col items-center justify-center w-1/2 max-w-sm h-full p-5 bg-white rounded-md shadow-md"
            href={url}
        >
            {
                imgUrl ? (
                    <Image
                        src={imgUrl}
                        alt={name}
                        width={100}
                        height={100}
                        className="rounded-full"
                    />
                ) : (
                    <HiDocumentText className="text-green-600" size={50} />
                )
            }
            <div className="flex flex-col items-center justify-center w-full">
                <h1 className="mt-2 text-xl text-center font-semibold text-gray-700 leading-none">{name}</h1>
                <p className="mt-2 text-sm text-center text-gray-500 leading-none">{description}</p>
                <div className="flex items-center justify-center mt-4">
                    <AiFillStar className='text-green-600' size={30}/>
                    <span className="text-2xl font-semibold text-green-600">{rating}</span>
                </div>
            </div>      
        </Link>
    )
}
