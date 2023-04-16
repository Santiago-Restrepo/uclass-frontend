import Link from 'next/link'
import React from 'react'
//Types
import { Subject } from '@/types/subject';
import { Teacher } from '@/types/teacher';
interface ResultsDropdownProps {
    appPath: string;
    iterableData: (Subject | Teacher)[]
}
export const ResultsDropdown = ({
    iterableData,
    appPath
}: ResultsDropdownProps) => {
    return (
        
        iterableData.length !== 0 ? (
            <div className='absolute top-0 left-0 right-0 m-auto w-11/12 p-3 bg-black bg-opacity-40'>
                {iterableData.map((data, i) => (
                    <Link key={i} href={`/${appPath}/${data._id}`} className='p-2 pb-3 block border-b w-full border-white transition-all duration-300 hover:bg-black hover:bg-opacity-50'>
                        <span className='text-md font-light leading-snug text-white cursor-pointer'>
                            {data.name}
                        </span>
                    </Link>
                ))}
            </div>
        ): null
    )
}
