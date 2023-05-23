import React, { useEffect, useMemo, useRef, useState } from 'react'
//Types
import { Subject } from '@/types/subject';
import { Teacher } from '@/types/teacher';
//Hooks
import { useApi } from '@/hooks/useApi';
import { useNavigationPath } from '@/hooks/useNavigationPath';
import { useRouter } from 'next/router';
//React-hook-form
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { createEditSubjectSchema } from '@/schemas/adminSchemas';
//Icons
import { BsFillPencilFill, BsFillTrash2Fill } from 'react-icons/bs'

//Components
import { Input } from '@/components/common/Input'
import { Select } from '@/components/common/Select';
//Others
import { toast } from 'react-toastify';
import swal from '@/utils/swal';
//Props
interface SubjectFormProps {
    subject: Subject | null,
    teachers: Teacher[],
    refresh?: () => Promise<void>
}
interface SubjectFormValues {
    name: string,
    description: string,
    email: string,
    photo: string,
}
export function SubjectForm({
    subject,
    teachers,
    refresh
}: SubjectFormProps) {
    const {authFetch, error} = useApi();
    const methods = useForm({
        resolver: yupResolver(createEditSubjectSchema)
    });
    const router = useRouter();
    async function updateSubject (subjectFormData: SubjectFormValues) {
        if (!subject) {
            return
        }
        const response = await authFetch(`/subjects/${subject._id}`, {
            method: 'PUT',
            data: subjectFormData
        })
        return response
    }
    async function createSubject (subjectFormData: SubjectFormValues) {
        const response = await authFetch(`/subjects`, {
            method: 'POST',
            data: subjectFormData
        })
        return response
    }
    async function deleteSubject() {
        if(!subject) return;
        const response = await authFetch(`/subjects/${subject._id}`, {
            method: 'DELETE'
        })
        return response
    }
    async function handleDelete() {
        if(!subject) return;
        const customSwal = swal.mixin({
            customClass: {
                confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded ml-3',
                cancelButton: 'bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded'
            },
            buttonsStyling: false
        })
        customSwal.fire({
            title: '¿Estás seguro?',
            text: "Esto eliminará la asignatura de la base de datos por completo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar asignatura',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if(!result.isConfirmed) return;
            toast.promise(deleteSubject(), {
                pending: 'Eliminando asignatura...',
                success: 'Asignatura eliminado exitosamente',
                error: 'Error al eliminar el asignatura',
            }).then(response =>{
                methods.reset();
            }).catch(error => {
                console.log(error)
            }).finally(() => { 
                router.push('/admin/subjects');
            });
        });
    }
    function onSubmit(data: SubjectFormValues) {
        //Check if data has changed
        if (subject) {
            const hasChanged = Object.keys(data).some((key) => {
                return data[key as keyof SubjectFormValues] !== subject[key as keyof Subject]
            })
            if (!hasChanged) {
                toast.info('No se han detectado cambios')
                return
            }
            const customSwal = swal.mixin({
                customClass: {
                    confirmButton: 'bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded ml-3',
                    cancelButton: 'bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded'
                },
                buttonsStyling: false
            })
            customSwal.fire({
                title: '¿Estás seguro?',
                text: "Esto actualizará la asignatura en la base de datos",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Actualizar asignatura',
                cancelButtonText: 'Cancelar',
                reverseButtons: true
            }).then((result) => {
                if(!result.isConfirmed) return;
                toast.promise(updateSubject(data), {
                    pending: 'Actualizando asignatura...',
                    success: 'Asignatura actualizado exitosamente',
                    error: 'Error al actualizar el asignatura',
                }).then(response =>{
                    methods.reset();
                }).catch(error => {
                    console.log(error)
                }).finally(() => { 
                    if (refresh) refresh();
                });
            });
        }else{
            toast.promise(createSubject(data), {
                pending: 'Creando asignatura...',
                success: 'Asignatura creado exitosamente',
                error: 'Error al crear el asignatura',
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
        if (subject) {
            methods.reset({
                name: subject.name,
                description: subject.description,
                teacher: typeof subject.teacher === 'string' ? subject.teacher : subject.teacher._id,
            })
        }
    }, [subject])
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
                            defaultValue={subject?.name || ''}
                        />
                        <Input
                            label='Descripción'
                            name='description'
                            type='text'
                            defaultValue={subject?.description || ''}
                        />
                        <Select
                            label='Profesor'
                            name='teacher'
                            options={teachers.map(teacher => {
                                return {
                                    label: teacher.name,
                                    value: teacher._id
                                }
                            })}
                            defaultValue={typeof subject?.teacher === 'string' ? subject.teacher : subject?.teacher._id}
                        />
                    </div>
                    <button
                        type='submit'
                        className='border-2 border-green-600 text-green-600 font-semibold py-2 rounded-md transition-colors hover:bg-green-600 hover:text-white'
                    >
                        <BsFillPencilFill className='inline-block mr-2' />
                        {
                            subject ? 'Actualizar' : 'Crear'
                        }
                    </button>
                    {
                        subject && (
                            <button 
                                className='border-2 border-red-600 text-red-600 font-semibold py-2 rounded-md transition-colors hover:bg-red-600 hover:text-white'
                                onClick={handleDelete}
                                type='button'
                            >
                                <BsFillTrash2Fill className='inline-block mr-2' />
                                Eliminar
                            </button>
                        )
                    }
                </form>
            </FormProvider>
        </div>
    )
}