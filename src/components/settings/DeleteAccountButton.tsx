import React from 'react'
//types
import { User } from '@/types/user';
//Components
import { toast } from 'react-toastify';
import swal from '@/utils/swal';
//Hooks
import { useApi } from '@/hooks/useApi';
//Icons
import { BsFillTrashFill } from 'react-icons/bs';
//Props
interface DeleteAccountButtonProps {
    user: User
}
export function DeleteAccountButton({
    user
}: DeleteAccountButtonProps) {
    const {authFetch, logout } = useApi();
    function handleDeleteAccount() {
        const customSwal = swal.mixin({
            customClass: {
                confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded ml-3',
                cancelButton: 'bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded'
            },
            buttonsStyling: false
        })

        customSwal.fire({
            title: 'Eliminarás tu cuenta',
            text: '¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar cuenta',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if(!result.isConfirmed) return;
            toast.promise(
                authFetch(`/users/${user.id}`, {
                    method: 'DELETE'
                })
                .then(() => {
                    logout();
                }
            ), {
                pending: 'Eliminando cuenta...',
                success: 'Cuenta eliminada exitosamente',
                error: {
                    render(props: any) {
                        const {data} = props
                        return data.message || 'Error al cambiar la contraseña'
                    }
                }
            })
        })
    }
    return (
        <button 
            className='mt-2 px-2 py-2 rounded-md border-2 border-red-600 text-red-600 font-semibold focus:outline-none focus:border-red-700 w-full hover:bg-red-600 transition-colors hover:text-white'
            onClick={handleDeleteAccount}
        >
            Eliminar cuenta
            <BsFillTrashFill className='inline ml-2' size={15}/>
        </button>
    )
}
