import React, { useEffect } from 'react'

//Types
import { ResourceInput } from '@/types/resource';
//Hooks
import { useApi } from '@/hooks/useApi';
import { useNavigationPath } from '@/hooks/useNavigationPath';
//React-hook-form
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { createResourceSchema } from '@/schemas/resourceSchemas';
//Redux
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
//Components
import { Input } from '@/components/common/Input'
//Others
import { toast } from 'react-toastify';
//Props
interface CreateResourceFormProps {
    subjectId: string,
    refreshResources: () => Promise<void>
}
interface CreateResourceFormValues {
    name: string,
    description: string,
    resourceUrl: string
}
export function CreateResourceForm({
    subjectId,
    refreshResources
}: CreateResourceFormProps) {
    const {authFetch, error} = useApi();
    const methods = useForm({
        resolver: yupResolver(createResourceSchema)
    });
    async function createResource (resource: ResourceInput) {
        const response = await authFetch(`/resources`, {
            method: 'POST',
            data: resource
        })
        return response
    }
    function onSubmit(data: CreateResourceFormValues) {
        const resource: ResourceInput = {
            ...data,
            subject: subjectId
        }
        toast.promise(createResource(resource), {
            pending: 'Creando recurso...',
            success: 'Recurso creado exitosamente',
            error: 'Error al crear el recurso',
        }).then(response =>{
            methods.reset();
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            refreshResources();
        });

    }
    function onError(errors: any) {
        const firstError = getErrorMessage(errors[Object.keys(errors)[0]])
        toast.error(firstError)
    }
    function getErrorMessage(error: any): string | null {
        //Error can be nested so we need to check if it has a message property on any level
        if (error.message) {
            return error.message
        }
        //If not, we need to loop through the object and find the first message
        for (const key in error) {
            if (error.hasOwnProperty(key)) {
                const message = getErrorMessage(error[key])
                if (message) {
                    return message
                }
            }
        }
        return null
    }
    useEffect(()=>{
        if(error) toast.error(error)
    }, [error])

    return (
        <div className='w-full'>
            <FormProvider {...methods}>
                <form className='flex flex-col gap-5' onSubmit={methods.handleSubmit(onSubmit as any, onError as any)}>
                    <div className='border-t border-gray-200 pt-3'>
                        <Input
                            label='Título'
                            name='name'
                            type='text'
                        />
                        <Input
                            label='Descripción'
                            name='description'
                            type='text'
                        />
                        <Input
                            label='Link al recurso'
                            name='resourceUrl'
                            type='text'
                        />
                    </div>
                    <button
                        type='submit'
                        className='bg-green-600 text-white font-semibold py-2 rounded-md'
                    >
                        Publicar
                    </button>
                </form>
            </FormProvider>
        </div>
    )
}
