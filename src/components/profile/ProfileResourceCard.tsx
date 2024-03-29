import React from 'react'
import Link from 'next/link';
//Hooks
import { useApi } from '@/hooks/useApi';
//Types
import { Resource } from '@/types/resource';
//Icons
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import {BsFillTrashFill} from 'react-icons/bs';
//Components
import swal from '@/utils/swal';
import { toast } from 'react-toastify';
//Props
interface ProfileResourceCardProps {
    resource: Resource,
    canBeDeleted?: boolean,
    refresh?: () => void
}
export function ProfileResourceCard({
    resource,
    canBeDeleted,
    refresh
}: ProfileResourceCardProps) {
    const {authFetch} = useApi();
    function handleDeleteResource(){
        const resourceId = resource._id;
        const customSwal = swal.mixin({
            customClass: {
                confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded ml-3',
                cancelButton: 'bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded'
            },
            buttonsStyling: false
        })

        customSwal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar recurso',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if(!result.isConfirmed) return;
            toast.promise(
                authFetch(`/resources/${resourceId}`, {
                    method: 'DELETE'
                }).then(response => response),
                {
                    pending: 'Eliminando recurso...',
                    success: 'Recurso eliminado exitosamente',
                    error: 'Error al eliminar el recurso',
                }
            )
            .catch(error =>{
                console.error(error)
            })
            .then(() =>{
                if(refresh) refresh()
            })
        })

    }
    return (
        <div
            className='relative flex justify-between bg-white rounded-lg shadow-md px-3 py-2 w-full'
        >
            <Link 
                className='flex justify-between w-full'
                href={`/resource/${resource._id}`}
            >
                <div className='flex flex-col'>
                    <h1 className='text-md font-semibold text-gray-500 leading-none'>{resource.name}</h1>
                    <p className='mt-2 text-sm text-gray-400 leading-none'>{resource.description}</p>
                    <div className='flex justify-start items-center mt-2'>
                        <div className='flex items-center'>
                            {
                                Array(5).fill(0).map((_, index) => {
                                    if(index < resource.rating){
                                        return <AiFillStar key={index} className='text-green-600' size={15}/>
                                    }else{

                                        return <AiOutlineStar key={index} className='text-green-600' size={15}/>
                                    }
                                })
                            }
                        </div>
                        <p className='ml-2 text-sm text-green-600'>De {resource.ratingCount} calificaciones</p>
                    </div>
                </div>
                {/* <div className='flex flex-col items-center justify-center ml-2'>
                    <ImBook size={20} className='text-gray-500'/>
                </div> */}
            </Link>
            {
                canBeDeleted && (
                    <div className='absolute -top-2 -right-2 flex flex-col items-center justify-center'>
                        <button 
                            className="group ml-2 gap-2 px-2 py-1 text-sm font-semibold border-2 border-gray-600 rounded-md text-gray-600 hover:bg-red-600 hover:border-red-600 hover:text-white"
                            onClick={handleDeleteResource}
                        >
                            <BsFillTrashFill size={15} className='text-gray-600 group-hover:text-white'/>
                        </button>
                    </div>
                )
            }
        </div>
    )
}
