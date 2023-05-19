import React from 'react'
//Hooks
import { useApi } from '@/hooks/useApi';
//React-hook-form
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { changePasswordSchema } from '@/schemas/authSchemas';
//Components
import { Input } from '@/components/common/Input';
import { toast } from 'react-toastify';
import swal from '@/utils/swal';
//Icons
import { BsFillPencilFill } from 'react-icons/bs';
//Utils
import { getErrorMessage } from '@/utils/formUtils';
//types
import { User } from '@/types/user';
//Props
interface ChangePasswordFormProps {
    user: User
}
export function ChangePasswordForm({
    user
}: ChangePasswordFormProps) {
    const methods = useForm({
        resolver: yupResolver(changePasswordSchema)
    });
    const {authFetch} = useApi();

    function onSubmit(data: any) {
        const customSwal = swal.mixin({
            customClass: {
                confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded ml-3',
                cancelButton: 'bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded'
            },
            buttonsStyling: false
        })
        customSwal.fire({
            title: '¿Estás seguro?',
            text: '¿Estás seguro de que quieres cambiar tu contraseña?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Cambiar contraseña',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if(!result.isConfirmed) return;
            toast.promise(
                authFetch(`/users/changePassword`, {
                    method: 'PUT',
                    data: {
                        userId: user.id,
                        currentPassword: data.currentPassword,
                        newPassword: data.newPassword
                    }
                }).then(),
                {
                    pending: 'Cambiando contraseña...',
                    success: 'Contraseña cambiada exitosamente',
                    error: {
                        render(props: any) {
                            const {data} = props
                            return data.message || 'Error al cambiar la contraseña'
                        }
                    }
                }
            )
        })
    }
    function onError(errors: any) {
        const firstError = getErrorMessage(errors[Object.keys(errors)[0]])
        toast.error(firstError)
    }
    return (
        <div className='w-full'>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit, onError)} className='w-full'>
                    <div className='flex flex-col gap-2 my-2'>
                        <Input
                            label='Contraseña actual'
                            name='currentPassword'
                            type='password'
                        />
                        <Input
                            label='Nueva contraseña'
                            name='newPassword'
                            type='password'
                        />
                        <Input
                            label='Confirmar contraseña'
                            name='repeatNewPassword'
                            type='password'
                        />
                        <button
                            className='mt-2 px-2 py-2 rounded-md bg-green-600 text-white font-semibold'
                            type='submit'
                        >
                            Cambiar contraseña
                            <BsFillPencilFill className='inline ml-2' size={15}/>
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
