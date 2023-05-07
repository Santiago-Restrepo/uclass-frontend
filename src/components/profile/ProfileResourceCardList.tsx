import React from 'react'
//Types
import { Resource } from '@/types/resource';
//Components
import { ProfileResourceCard } from '@/components/profile/ProfileResourceCard';
//Props
interface ProfileResourceCardListProps {
    resources: Resource[]
}

export function ProfileResourceCardList({
    resources
}: ProfileResourceCardListProps){
    return (
        resources && (
            <div className='flex flex-wrap gap-5 mt-3 w-full'>
                {
                    resources.map((review, index) => (
                        <ProfileResourceCard key={index} resource={review} />
                    ))
                }
            </div>
        )
    )
}
