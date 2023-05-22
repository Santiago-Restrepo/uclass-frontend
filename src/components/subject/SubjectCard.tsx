import React from 'react'
import Link from 'next/link';
//Icons
import {IoIosPaper} from 'react-icons/io';
//types
import { Subject } from '@/types/subject';
//Theme
import { colors } from '@/styles/colors';
//Props
interface SubjectCardProps {
    subject: Subject
}

export function SubjectCard({
    subject
}: SubjectCardProps) {
    return (
        <Link href={`/subject/${subject._id}`} key={subject._id} className='mb-2 p-3 shadow-lg w-full'>
            <div className='flex justify-between items-center'>
                <div className="flex flex-col w-2/3">
                    <h3 className='text-md font-semibold text-gray-900 leading-none'>{subject.name}</h3>
                    <h3 className='text-md font-normal text-gray-500 truncate w-full'>{subject.description}</h3>
                    {
                        //If type of subject.teacher is teacher
                        typeof subject.teacher === 'object' ? (
                            <h3 className='text-md text-gray-400'>{subject.teacher.name}</h3>
                        ): (
                            <h3 className='text-md text-gray-400'>teacher {subject.teacher}</h3>
                        )
                    }
                </div>
                <div className="flex justify-center items-center w-1/3">
                    <IoIosPaper className='text-4xl' size={40} color={colors.gray700}/>
                </div>
            </div>
        </Link>
    )
}
