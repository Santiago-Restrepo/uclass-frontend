import React from 'react'
//types
import { User } from '@/types/user';
//Icons
import { BsFillTrashFill } from 'react-icons/bs';
//Props
interface DeleteAccountButtonProps {
    user: User
}

export function DeleteAccountButton({
    user
}: DeleteAccountButtonProps) {
    function handleDeleteAccount() {
        
        
    }
    return (
        <button 
            className='px-2 py-2 rounded-md border-2 border-red-600 text-red-600 font-semibold focus:outline-none focus:border-red-700 w-full hover:bg-red-600 transition-colors hover:text-white'
            onClick={handleDeleteAccount}
        >
            Eliminar cuenta
            <BsFillTrashFill className='inline ml-2' size={15}/>
        </button>
    )
}
