import React, { useEffect, useState } from 'react'
import Image from 'next/image';
//Types
import { User } from '@/types/user';
//Props
interface userHeaderProps {
    user: User | string
}
//Icons
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
//Hooks
import { useApi } from '@/hooks/useApi';
export function UserHeader({
    user
}: userHeaderProps) {
    const { data, loading: userLoading, authFetch } = useApi<User>()
    const [userData, setUserData] = useState<User | null>(typeof user === 'string' ? null : user);
    useEffect(() => {
        if(typeof user === 'string'){
            authFetch(`/users/${user}`, {
                method: 'GET'
            })
        }
    }, [user])
    useEffect(() => {
        if(data){
            setUserData(data);
        }
    }, [data])
    return (
        <div className='flex justify-start items-end'>
            {
                !userData ? (
                    <AiOutlineLoading3Quarters className='animate-spin text-4xl' size={20} color='gray'/>
                ) : (
                    <>
                        <Image
                            src={userData.photo || '/user.png'}
                            alt={userData.name || 'user'}
                            width={50}
                            height={50}
                            className='rounded-full'
                        />
                        <div className='flex flex-col'>
                            <h2 className='ml-2 text-lg font-semibold'>{userData.name}</h2>
                            <h3 className='text-sm text-gray-500 ml-2'>{userData.email}</h3>
                        </div>
                    </>
                )
            }
        </div>
    )
}
