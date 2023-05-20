import Image from 'next/image';
import { useMemo } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import swal from '@/utils/swal';

//Types
import { Review } from '@/types/review';
//Props
interface ReviewCardProps {
    review: Review,
    comment?: boolean
    canBeDeleted?: boolean,
    refresh?: () => void
}
//Icons
import {AiFillStar, AiOutlineStar} from 'react-icons/ai';
import {BiCommentDetail} from 'react-icons/bi';
import {BsFillTrash2Fill} from 'react-icons/bs';
import { useApi } from '@/hooks/useApi';
export const ProfileReviewCard = ({
    review,
    comment = false,
    canBeDeleted = false,
    refresh
}: ReviewCardProps) => {
    const {authFetch} = useApi();
    const ratingAverage = useMemo(() => {
        const rating = review.rating;
        if(!rating) return 0;
        const ratingAverage = Object.values(rating).reduce((acc, curr) => acc + curr, 0) / Object.values(rating).length;
        return ratingAverage;
    }, [review.rating]);
    function handleDeleteReview(){
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
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar reseña',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if(!result.isConfirmed) return;
            toast.promise(
                authFetch(`/reviews/${reviewId}`, {
                    method: 'DELETE'
                }).then((response) => {
                    if(refresh){
                        refresh();
                    }
                    return response;
                }), 
                {
                    pending: 'Eliminando reseña...',
                    success: 'Reseña eliminada exitosamente',
                    error: 'Error al eliminar la reseña',
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
        <div className='relative flex w-full shadow-sm rounded-md p-3 bg-white'>
            <Link 
                href={`/review/${review._id}`}
            >
                <div
                    className='flex flex-col justify-start w-full'
                >
                    <span className='text-sm text-gray-400'>{new Date(review.createdAt).toLocaleDateString()}</span>
                    <div className="flex">
                        {
                            Array(5).fill(0).map((_, index) => {
                                if(index < ratingAverage){
                                    return <AiFillStar key={index} className='text-green-600' size={15}/>
                                }else{
                                    return <AiOutlineStar key={index} className='text-green-600' size={15}/>
                                }
                            })
                        }
                    </div>
                </div>
                <p className='block text-sm font-normal text-gray-400 bg-gray-200 p-2 mt-3 w-full leading-tight'>
                    {review.content}
                </p>
                {
                    comment && (
                        <div className='flex justify-center'>
                            <button className="group flex justify-center items-center gap-2 mt-5 px-2 py-1 text-sm font-semibold border-2 border-green-600 rounded-md text-green-600 hover:bg-green-600 hover:text-white">
                                Comentar
                                <BiCommentDetail size={20} className='text-green-600 group-hover:text-white'/>
                            </button>
                        </div>
                    )
                }
                {
                    review.rejectedReason && (
                        <p className='text-sm font-normal text-gray-500 mt-3 leading-tight'><b>Razón del rechazo: </b> {review.rejectedReason}</p>
                    )
                }
            </Link>
            
            {
                canBeDeleted && (
                    <div className='absolute flex justify-center items-center gap-2 -top-2 -right-2'>
                        <button 
                            className="group flex justify-center items-center gap-2 px-2 py-1 text-sm font-semibold border-2 border-gray-600 rounded-md text-gray-600 hover:bg-gray-600 hover:text-white"
                            onClick={handleDeleteReview}
                        >
                            <BsFillTrash2Fill size={15} className='text-gray-600 group-hover:text-white'/>
                        </button>
                    </div>
                )
            }
        </div>
    )
}
