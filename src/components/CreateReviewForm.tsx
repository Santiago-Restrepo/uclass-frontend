import React from 'react'
//Components
import { Select } from '@/components/common/Select'
import { Input } from '@/components/common/Input'
import { StarRatingInput } from '@/components/common/StarRatingInput'
//Types
import { Subject } from '@/types/subject'
//props
interface CreateReviewFormProps {
    subjects: Subject[],
    teacherId: string
}
//React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { createReviewSchema } from '@/schemas/reviewSchemas';
export function CreateReviewForm({
    subjects,
    teacherId
}: CreateReviewFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(createReviewSchema)
    });
    function onSubmit(data: any) {
        console.log(data)
    }
    return (
        <div className='w-full'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                <div className='border-t border-gray-200 pt-3'>
                    <Select
                        label='Asignatura'
                        name='subject'
                        options={subjects.map((subject) => ({
                            label: subject.name,
                            value: subject._id
                        }))}
                        register={register}
                        errors={errors}
                    />
                    <Input
                        label='Comentario'
                        name='comment'
                        type='text'
                        register={register}
                        errors={errors}
                    />
                </div>
                <div className='ratingInputs border-t border-gray-200 pt-3'>
                    <h2 className='text-2xl text-gray-500 font-semibold mb-2'>
                        Puntuación
                    </h2>
                    <StarRatingInput
                        label='Claridad'
                        name='clarity'
                        register={register}
                        errors={errors}
                    />
                    <StarRatingInput
                        label='Exigencia'
                        name='demanding'
                        register={register}
                        errors={errors}
                    />
                    <StarRatingInput
                        label='Justicia'
                        name='fairness'
                        register={register}
                        errors={errors}
                    />
                </div>
                <button
                    className='bg-green-600 text-white font-semibold py-2 rounded-md'
                >
                    Publicar
                </button>
            </form>
        </div>
    )
}
