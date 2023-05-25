import React from 'react'
//Icons
import { HiOutlineInformationCircle } from 'react-icons/hi'
//Props
interface InformationDialogProps {
    content: string
}
export function InformationDialog({
    content
}: InformationDialogProps) {
    return (
        <div className='flex items-center gap-2 w-full'>
            <button className='relative w-full group flex items-center gap-2 hover:text-gray-500 focus:outline-none' type='button'>
                <HiOutlineInformationCircle className='z-20 text-gray-500 group-hover:text-gray-400' size={20}/>
                <p className='z-10 absolute left-0 top-0 w-full block bg-gray-200 opacity-75 p-2 max-w-sm text-sm text-gray-500 invisible translate-x-full scale-0 transition-all duration-300 group-hover:visible group-hover:translate-x-0 group-hover:scale-100 rounded-md'>
                    {content}
                </p>
            </button>
        </div>
    )
}
