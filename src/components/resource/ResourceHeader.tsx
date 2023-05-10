import React, { useMemo } from 'react'
import Link from 'next/link';
//Types
import { Resource } from '@/types/resource';
//Props
interface resourceHeaderProps {
    resource: Resource
}
export function ResourceHeader({
    resource
}: resourceHeaderProps) {
    const subjectName = useMemo(() => {
        if (!resource.subject) return ''
        return typeof resource.subject === 'string' ? resource.subject : resource.subject.name
    }, [resource.subject])
    return (
        <div className='flex flex-col w-full mt-3'>
                <h1 className='text-2xl font-semibold'>{resource.name}</h1>
                <span className='text-sm text-gray-400'>{subjectName}</span>
                <h2 className='mt-2 text-md font-normal text-gray-500'>{resource.description}</h2>
            <div>
            </div>
            <Link 
                href={resource.resourceUrl}
                className='w-full text-center font-medium bg-blue-500 text-white px-2 py-1 mt-3 rounded-md '
            >
                Link al recurso
            </Link>
        </div>
    )
}
