import React, { useEffect, useMemo, useRef, useState } from 'react'
//Types
import { Teacher } from '@/types/teacher';
//Hooks
import { useApi } from '@/hooks/useApi';
import { useNavigationPath } from '@/hooks/useNavigationPath';
import { useRouter } from 'next/router';
//React-hook-form
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { editTeacherSchema } from '@/schemas/adminSchemas';
//Icons
import { BsFillPencilFill, BsFillTrash2Fill } from 'react-icons/bs'

//Components
import { Input } from '@/components/common/Input'
//Others
import { toast } from 'react-toastify';
import swal from '@/utils/swal';
//Props
interface TeacherFormProps {
    teacher: Teacher | null,
    refresh?: () => Promise<void>
}
interface TeacherFormValues {
    name: string,
    description: string,
    email: string,
    photo: string,
}
export function TeacherForm({
    teacher,
    refresh
}: TeacherFormProps) {
    const {authFetch, error} = useApi();
    const methods = useForm({
        resolver: yupResolver(editTeacherSchema)
    });
    const router = useRouter();
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
    async function createTeacher (teacherFormData: TeacherFormValues) {
        const response = await authFetch(`/teachers`, {
            method: 'POST',
            data: teacherFormData
        })
        return response
    }
    async function deleteTeacher() {
        if(!teacher) return;
        const response = await authFetch(`/teachers/${teacher._id}`, {
            method: 'DELETE'
        })
        return response
    }
    async function handleDelete() {
        if(!teacher) return;
        const customSwal = swal.mixin({
            customClass: {
                confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded ml-3',
                cancelButton: 'bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded'
            },
            buttonsStyling: false
        })
        customSwal.fire({
            title: '¿Estás seguro?',
            text: "Esto eliminará el profesor de la base de datos",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar profesor',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if(!result.isConfirmed) return;
            toast.promise(deleteTeacher(), {
                pending: 'Eliminando profesor...',
                success: 'Profesor eliminado exitosamente',
                error: 'Error al eliminar el profesor',
            }).then(response =>{
                methods.reset();
            }).catch(error => {
                console.log(error)
            }).finally(() => { 
                router.push('/admin/teachers');
            });
        });
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
            const customSwal = swal.mixin({
                customClass: {
                    confirmButton: 'bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded ml-3',
                    cancelButton: 'bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded'
                },
                buttonsStyling: false
            })
            customSwal.fire({
                title: '¿Estás seguro?',
                text: "Esto actualizará el profesor de la base de datos",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Actualizar profesor',
                cancelButtonText: 'Cancelar',
                reverseButtons: true
            }).then((result) => {
                if(!result.isConfirmed) return;
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
            });
        }else{
            toast.promise(createTeacher(data), {
                pending: 'Creando profesor...',
                success: 'Profesor creado exitosamente',
                error: 'Error al crear el profesor',
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
                photo: teacher.photo,
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
                        <Input
                            label='Url de la foto'
                            name='photo'
                            type='text'
                            defaultValue={teacher?.photo || ''}
                        />
                    </div>
                    <button
                        type='submit'
                        className='border-2 border-green-600 text-green-600 font-semibold py-2 rounded-md transition-colors hover:bg-green-600 hover:text-white'
                    >
                        <BsFillPencilFill className='inline-block mr-2' />
                        {
                            teacher ? 'Actualizar' : 'Crear'
                        }
                    </button>
                    {
                        teacher && (
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