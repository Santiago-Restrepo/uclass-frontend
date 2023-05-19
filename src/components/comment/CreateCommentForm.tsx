import React from 'react'
//Components
import { Input } from '@/components/common/Input'
import { toast } from 'react-toastify';
import { StarRatingInput } from '../common/StarRatingInput';
//Types
import { Comment } from '@/types/comment';
//Utils
import { getErrorMessage } from '@/utils/formUtils';
//Icons
import { FaPaperPlane } from 'react-icons/fa';
//props
interface CreateCommentFormProps {
    reviewId?: string
    resourceId?: string,
    refreshComments: () => Promise<void>,
    userId?: string
}
interface CreateCommentFormValues {
    content: string,
}
//Hooks
import { useApi } from '@/hooks/useApi';
//React Hook Form
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { createReviewCommentSchema, createResourceCommentSchema } from '@/schemas/commentSchemas';

export function CreateCommentForm({
    reviewId,
    resourceId,
    refreshComments,
    userId
}: CreateCommentFormProps) {
    const {authFetch} = useApi();
    const methods = useForm({
        resolver: yupResolver(resourceId ? createResourceCommentSchema : createReviewCommentSchema)
    });
    async function createComment (comment: Comment) {
        const response = await authFetch(`/comments`, {
            method: 'POST',
            data: comment
        })
        return response
    }
    function onSubmit(data: CreateCommentFormValues) {
        const comment: Comment = {
            ...data,
            user: userId || "",
            reviewId,
            resourceId
        }
        toast.promise(createComment(comment), {
            pending: 'Creando comentario...',
            success: 'Comentario creado exitosamente',
            error: 'Error al crear el comentario',
        }).catch(error =>{
            console.log(error)
        }).then(response =>{
            console.log(response)
            methods.reset();
            refreshComments();
        })
    }
    function onError(errors: any) {
        const firstError = getErrorMessage(errors[Object.keys(errors)[0]])
        toast.error(firstError)
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
                        {
                            resourceId && (
                                <StarRatingInput 
                                    label='Calificación'
                                    name='rating'
                                />
                            )
                        }
                    </div>
                    <button
                        type='submit'
                        className='bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition duration-300'
                    >
                        Publicar
                        <FaPaperPlane className='inline ml-2' />
                    </button>
                </form>
            </FormProvider>
        </div>
    )
}
