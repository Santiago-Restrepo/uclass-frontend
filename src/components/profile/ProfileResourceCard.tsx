import React from 'react'
import Link from 'next/link';
//Types
import { Resource } from '@/types/resource';
//Icons
import { ImBook } from 'react-icons/im';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
//Props
interface ProfileResourceCardProps {
    resource: Resource
}
export function ProfileResourceCard({
    resource
}: ProfileResourceCardProps) {
    return (
        <Link 
            className='flex justify-between bg-white rounded-lg shadow-md px-3 py-2 w-full'
            href={`/resource/${resource._id}`}
        >
            <div className='flex flex-col'>
                <h1 className='text-md font-semibold text-gray-500 leading-none'>{resource.name}</h1>
                <p className='text-sm text-gray-400 leading-none'>{resource.description}</p>
                <div className='flex items-center mt-2'>
                    {
                        Array(5).fill(0).map((_, index) => {
                            if(index < resource.rating){
                                return <AiFillStar key={index} className='text-gray-600' size={15}/>
                            }else{

                                return <AiOutlineStar key={index} className='text-gray-600' size={15}/>
                            }
                        })
                    }
                </div>
                <p className='text-sm text-gray-400'>De {resource.ratingCount} calificaciones</p>
            </div>
            <div className='flex flex-col items-center justify-center ml-2'>
                <ImBook size={20} className='text-gray-500'/>
            </div>
        </Link>
    )
}
