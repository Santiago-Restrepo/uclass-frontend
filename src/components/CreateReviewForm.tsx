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
                <div className='ratingInputs'>
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
            </form>
        </div>
    )
}
