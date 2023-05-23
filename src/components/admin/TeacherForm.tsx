import React, { useEffect, useMemo, useRef, useState } from 'react'
//Types
import { Teacher } from '@/types/teacher';
//Hooks
import { useApi } from '@/hooks/useApi';
import { useNavigationPath } from '@/hooks/useNavigationPath';
//React-hook-form
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { editTeacherSchema } from '@/schemas/adminSchemas';
//Redux
//Components
import { Input } from '@/components/common/Input'
//Others
import { toast } from 'react-toastify';
//Props
interface TeacherFormProps {
    teacher: Teacher | null,
    refresh?: () => Promise<void>
}
interface TeacherFormValues {
    name: string,
    description: string,
    email: string
}
export function TeacherForm({
    teacher,
    refresh
}: TeacherFormProps) {
    const {authFetch, error} = useApi();
    const methods = useForm({
        resolver: yupResolver(editTeacherSchema)
    });

    async function updateTeacher (teacherFormData: TeacherFormValues) {
        if (!teacher) {
            return
        }
        const response = await authFetch(`/teachers/${teacher._id}`, {
            method: 'PUT',
            data: teacherFormData
        })
        return response
    }

    function onSubmit(data: TeacherFormValues) {
        //Check if data has changed
        if (teacher) {
            const hasChanged = Object.keys(data).some((key) => {
                return data[key as keyof TeacherFormValues] !== teacher[key as keyof Teacher]
            })
            if (!hasChanged) {
                toast.info('No se han detectado cambios')
                return
            }
            toast.promise(updateTeacher(data), {
                pending: 'Actualizando profesor...',
                success: 'Profesor actualizado exitosamente',
                error: 'Error al actualizar el profesor',
            }).then(response =>{
                methods.reset();
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                if (refresh) refresh();
            });
        }
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
    useEffect(() => {
        //Set default values
        if (teacher) {
            methods.reset({
                name: teacher.name,
                description: teacher.description,
                email: teacher.email,
            })
        }
    }, [teacher])
    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])
    return (
        <div className='w-full'>
            <FormProvider {...methods}>
                <form className='flex flex-col gap-5' onSubmit={methods.handleSubmit(onSubmit as any, onError as any)}>
                    <div className='border-t border-gray-200 pt-3'>
                        <Input
                            label='Nombre'
                            name='name'
                            type='text'
                            defaultValue={teacher?.name || ''}
                        />
                        <Input
                            label='Descripción'
                            name='description'
                            type='text'
                            defaultValue={teacher?.description || ''}
                        />
                        <Input
                            label='Correo electrónico'
                            name='email'
                            type='text'
                            defaultValue={teacher?.email || ''}
                        />
                    </div>
                    <button
                        type='submit'
                        className='bg-green-600 text-white font-semibold py-2 rounded-md disabled:opacity-50'
                    >
                        Confirmar cambios
                    </button>
                </form>
            </FormProvider>
        </div>
    )
}