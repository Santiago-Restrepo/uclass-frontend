import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import swal from '@/utils/swal';
//types
import { Review } from '@/types/review';
//Hooks
import { useApi } from '@/hooks/useApi';
//Icons
import { AiOutlineCheckSquare, AiOutlineCloseSquare } from 'react-icons/ai';

//Props
interface PendingReviewListProps {
    review: Review,
    refresh?: () => void
}
export function PendingReviewCard({
    review,
    refresh
}: PendingReviewListProps) {
    const {authFetch} = useApi();

    function handleApproveReview(){
        const reviewId = review._id;
        const customSwal = swal.mixin({
            customClass: {
                confirmButton: 'bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded ml-3',
                cancelButton: 'bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded'
            },
            buttonsStyling: false
        })
        customSwal.fire({
            title: '¿Estás seguro?',
            text: "Esto aprovará la reseña y se mostrará en la aplicación para todos los usuarios",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aprovar reseña',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if(!result.isConfirmed) return;
            toast.promise(
                authFetch(`/reviews/approve/${reviewId}`, {
                    method: 'PUT'
                }).then((response) => {
                    if(refresh){
                        refresh();
                    }
                    return response;
                }), 
                {
                    pending: 'Aprovando reseña...',
                    success: 'Reseña aprovada exitosamente',
                    error: 'Error al aprovar reseña',
                }
            )
            .catch(error =>{
                console.log(error)
            })
            .then(response =>{
                console.log(response)
            })
        })
    }
    function handleRejectReview(){
        const reviewId = review._id;
        const customSwal = swal.mixin({
            customClass: {
                confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded ml-3',
                cancelButton: 'bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded'
            },
            buttonsStyling: false
        })
        customSwal.fire({
            title: '¿Estás seguro?',
            text: "Esto rechazará la reseña y nunca será mostrada en la aplicación",
            icon: 'warning',
            input: 'textarea',
            inputPlaceholder: 'Escribe la razón del rechazo',
            showCancelButton: true,
            confirmButtonText: 'Rechazar reseña',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if(!result.isConfirmed || !result.value) return;
            toast.promise(
                authFetch(`/reviews/reject/${reviewId}`, {
                    method: 'PUT',
                    data: {
                        reason: result.value
                    }
                }).then((response) => {
                    if(refresh){
                        refresh();
                    }
                    return response;
                }), 
                {
                    pending: 'Rechazando reseña...',
                    success: 'Reseña rechazada exitosamente',
                    error: 'Error al rechazar reseña',
                }
            )
            .catch(error =>{
                console.log(error)
            })
            .then(response =>{
                console.log(response)
            })
        })
    }
    return (
        <div className='w-full border-b border-gray-200 py-2'>
            <Link
                href={`/review/${review._id}`}
            >
                <div className='flex gap-2'>
                    <Image
                        src={typeof review.user === 'string' ? '/user.png' : review.user ? review.user.photo || '/user.png' : '/user.png'}
                        alt="Picture of the author"
                        width={30}
                        height={30}
                        style={{borderRadius: '100%', objectFit: 'contain', aspectRatio: '1/1'}}
                    />
                    <div>
                        <h2 className='text-md font-medium text-gray-800 leading-none'>
                            {
                                typeof review.user === 'string' ? review.user : review.user ? review.user.name : 'Usuario elimiado'
                            }
                        </h2>
                        <span className='text-sm text-gray-400 leading-none'>{review.createdAt}</span>
                    </div>
                </div>
                <p className='text-md text-gray-500'>{review.content}</p>
            </Link>
            <div className='flex justify-center gap-3 my-2 w-full'>
                <button 
                    className='flex items-center gap-1 p-2 text-green-600 text-sm font-semibold border-2 border-green-600 transition-colors hover:text-white hover:bg-green-600'
                    onClick={handleApproveReview}
                >
                    <AiOutlineCheckSquare size={20}/>
                    Aprobar
                </button>
                <button 
                    className='flex items-center gap-1 p-2 text-red-600 text-sm font-semibold border-2 border-red-600 transition-colors hover:text-white hover:bg-red-600'
                    onClick={handleRejectReview}
                >
                    <AiOutlineCloseSquare size={20}/>
                    Rechazar
                </button>
            </div>
        </div>
    )
}
