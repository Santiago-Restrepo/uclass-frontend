import React from 'react'
//React-hook-form
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { reportIssueSchema } from '@/schemas/settingsSchema';
//Components
import { Input } from '@/components/common/Input';
import { toast } from 'react-toastify';
//Icons
import { RiSendPlaneFill } from 'react-icons/ri';
//Utils
import { getErrorMessage } from '@/utils/formUtils';
//types
import { User } from '@/types/user';
//Props
interface ChangePasswordFormProps {
    user: User
}
export function ReportIssueForm({
    user
}: ChangePasswordFormProps) {
    const methods = useForm({
        resolver: yupResolver(reportIssueSchema)
    });
    function onSubmit(data: any) {
        //Redirect to whatsapp
        const message = `Hola, mi nombre es ${user.name} y tengo un problema con la aplicación. Reporte: *${data.content}*`
        window.open(`https://wa.me/573104052315?text=${message}`, '_blank')
    }
    function onError(errors: any) {
        const firstError = getErrorMessage(errors[Object.keys(errors)[0]])
        toast.error(firstError)
    }
    return (
        <div className='w-full'>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit, onError)} className='w-full'>
                    <div className='relative flex flex-col gap-2 my-2'>
                        <Input
                            label='Reportar un problema'
                            name='content'
                            type='text'
                            className='h-32 text-gray-500'
                        />
                        <button
                            className='absolute flex justify-center items-center -right-2 -bottom-2 bg-green-600 text-white rounded-full p-2 hover:bg-green-500 transition-all duration-300'
                            type='submit'
                        >
                            <RiSendPlaneFill size={20}/>
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
