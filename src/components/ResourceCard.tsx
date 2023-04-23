import Image from 'next/image';
import { useMemo } from 'react';
//Types
import { Resource } from '@/types/resource';
//Props
interface ResourceProps {
    resource: Resource
}
//Icons
import {AiFillStar, AiOutlineStar} from 'react-icons/ai';
import {BiCommentDetail} from 'react-icons/bi';
export const ResourceCard = ({
    resource,
}: ResourceProps) => {
    return (
        <div 
            className='flex flex-col items-center justify-center w-full max-w-[12rem] shadow-sm rounded-md p-5 bg-white'
        >
            {
                resource.name
            }
        </div>
    )
}
