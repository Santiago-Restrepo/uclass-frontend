import React from 'react'
//Types
import { Resource } from '@/types/resource';
//Components
import { ResourceCard } from '@/components/subject/ResourceCard';
//Props
interface ResourceCardListProps {
    resources: Resource[]
}
export function ResourceCardList({
    resources
}: ResourceCardListProps) {
    return (
        resources && (
            <div className='flex flex-wrap justify-center gap-5 mt-5 w-full'>
                {
                    resources.length === 0 && (
                        <div className='flex justify-center items-center'>
                            <h1 className='text-xl font-semibold text-gray-500'>
                                No hay recursos
                            </h1>
                        </div>
                    )
                }
                {
                    resources.map(resource => (
                        <ResourceCard key={resource._id} resource={resource} />
                    ))
                }
            </div>
        )
    )
}
