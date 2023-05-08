import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

//Types
import { Teacher } from '@/types/teacher';
//Icons
import {AiFillStar} from 'react-icons/ai';
interface TeacherCardProps {
    teacher: Teacher
}
export const TeacherCard = ({
    teacher
}:TeacherCardProps) => {
    return (
        <Link key={teacher._id} href={`/teacher/${teacher._id}`} className='w-full'>
            <div className='flex justify-between items-center gap-2 w-full border-t-2 border-gray-200 py-4'>
                <div className='flex gap-4'>
                    <div className="flex justify-center items-center image__wrapper w-20 h-20 rounded-full overflow-hidden">
                        <Image
                            src={teacher.photo || '/jhon.jpg'}
                            alt="Picture of the author"
                            width={70}
                            height={70}
                            className='w-full rounded-full object-cover'
                        />
                    </div>
                    <div className='flex flex-col justify-center items-start'>
                        <h2 className='pb-1 text-lg font-semibold text-gray-800 leading-none'>{teacher.name}</h2>
                        <h3 className='pb-1 text-lg font-normal text-gray-500 leading-none'>{teacher.description}</h3>
                        <h4 className='text-md font-thin text-gray-400 break-all leading-none'>{teacher.email}</h4>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <AiFillStar className='text-green-600' size={35}/>
                    <span className='text-2xl font-semibold text-green-600'>{teacher.rating}</span>
                </div>
            </div>
        </Link>
    )
}
