import React from 'react'
//Components
import { Select } from '@/components/common/Select'
import { Input } from '@/components/common/Input'
import { StarRatingInput } from '@/components/common/StarRatingInput'
import { toast } from 'react-toastify';
import { InformationDialog } from '@/components/common/InformationDialog'
//Types
import { Subject } from '@/types/subject'
import { ApiReview } from '@/types/review'
//props
interface CreateReviewFormProps {
    subjects: Subject[],
    teacherId: string,
    refresh: () => void
}
interface CreateReviewFormValues {
    subject: string,
    content: string,
    rating: {
        fairness: number,
        clarity: number,
        demanding: number
    }
}
//Hooks
import { useApi } from '@/hooks/useApi';
//React Hook Form
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { createReviewSchema } from '@/schemas/reviewSchemas';

export function CreateReviewForm({
    subjects,
    teacherId,
    refresh
}: CreateReviewFormProps) {
    const {authFetch} = useApi();
    const methods = useForm({
        resolver: yupResolver(createReviewSchema)
    });
    async function createReview (review: ApiReview) {
        const response = await authFetch(`/reviews`, {
            method: 'POST',
            data: review
        })
        return response
    }
    function onSubmit(data: CreateReviewFormValues) {
        const review: ApiReview = {
            ...data,
            teacherId,
            subject: data.subject,
            // user: userId,
        }
        toast.promise(createReview(review), {
            pending: 'Creando reseña...',
            success: 'Reseña creada exitosamente, pronto será revisada por un administrador',
            error: 'Error al crear la reseña',
        }).then(response =>{
            methods.reset();
        }).catch(err => {
            console.error(err)
        }).finally(() => {
            refresh();
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
    return (
        <div className='w-full'>
            <FormProvider {...methods}>
                <form className='flex flex-col gap-5' onSubmit={methods.handleSubmit(onSubmit as any, onError as any)}>
                    <div className='border-t border-gray-200 pt-3'>
                        <Select
                            label='Asignatura'
                            name='subject'
                            options={subjects.map((subject) => ({
                                label: subject.name,
                                value: subject._id
                            }))}
                        />
                        <Input
                            label='Comentario'
                            name='content'
                            type='text'
                        />
                    </div>
                    <div className='ratingInputs border-t border-gray-200 pt-3'>
                        <h2 className='text-2xl text-gray-500 font-semibold mb-2'>
                            Puntuación
                        </h2>
                        <div className='flex items-center '>
                            <StarRatingInput
                                label='Claridad'
                                name='rating.clarity'
                            />
                            <InformationDialog
                                content='Se refiere a la claridad de las explicaciones del profesor, donde 1 es poco claro y 5 es muy claro'
                            />
                        </div>
                        <div className='flex items-center '>
                            <StarRatingInput
                                label='Exigencia'
                                name='rating.demanding'
                            />
                            <InformationDialog
                                content='Se refiere a la exigencia del profesor, donde 1 es poco exigente y 5 es muy exigente'
                            />
                        </div>
                        <div className='flex items-center'>
                            <StarRatingInput
                                label='Justicia'
                                name='rating.fairness'
                            />
                            <InformationDialog
                                content='Se refiere a la justicia del profesor, donde 1 es poco justo y 5 es muy justo'
                            />
                        </div>

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
