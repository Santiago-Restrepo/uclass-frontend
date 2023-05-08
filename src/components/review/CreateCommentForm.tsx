import React from 'react'
//Components
import { Input } from '@/components/common/Input'
import { toast } from 'react-toastify';
//Types
import { Comment } from '@/types/comment';
//props
interface CreateCommentFormProps {
    reviewId?: string
    resourceId?: string
}
interface CreateCommentFormValues {
    content: string,
}
//Hooks
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useApi } from '@/hooks/useApi';
//React Hook Form
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { createCommentSchema } from '@/schemas/commentSchemas';

export function CreateCommentForm({
    reviewId,
    resourceId
}: CreateCommentFormProps) {
    const {id: userId} = useSelector((state: RootState) => state.user)
    const {authFetch} = useApi();
    const methods = useForm({
        resolver: yupResolver(createCommentSchema)
    });
    async function createComment (comment: Comment) {
        const response = await authFetch(`/comments`, {
            method: 'POST',
            body: JSON.stringify(comment)
        })
        return response
    }
    function onSubmit(data: CreateCommentFormValues) {
        if(!userId) return toast.error('Debes iniciar sesión para crear una reseña');
        const comment: Comment = {
            ...data,
            userId,
            reviewId,
            resourceId
        }
        toast.promise(createComment(comment), {
            pending: 'Creando comentario...',
            success: 'Comentario creado exitosamente',
            error: 'Error al crear el comentario',
        }).then(response =>{
            methods.reset();
        })
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
    return (
        <div className='w-full'>
            <FormProvider {...methods}>
                <form className='flex flex-col gap-5 mt-3' onSubmit={methods.handleSubmit(onSubmit as any, onError as any)}>
                    <div className='border-t border-gray-200 pt-3'>
                        <Input
                            label='Agrega un comentario'
                            name='content'
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