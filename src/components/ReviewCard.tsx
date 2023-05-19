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
export const ReviewCard = ({
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
        <div className='flex flex-col items-center justify-center w-full max-w-[11rem] shadow-sm rounded-md p-2 bg-white'>
            <Link 
                href={`/review/${review._id}`}
            >
                <div
                    className='flex justify-center items-center w-full'
                >
                    <div
                        className='relative w-10 h-10 rounded-full overflow-hidden'
                    >
                        <Image
                            src={typeof review.user === 'string' ? '/user.png' : review.user ? review.user.photo || '/user.png' : '/user.png'}
                            alt="Picture of the author"
                            fill={true}
                            sizes='100%'
                            style={{borderRadius: '100%', objectFit: 'contain', aspectRatio: '1/1'}}
                        />
                    </div>
                    <div className='flex flex-col justify-center items-start ml-3 w-1/2'>
                        <h2 className='text-md font-medium text-gray-800'>
                            {
                                typeof review.user === 'string' ? review.user : review.user ? review.user.name : 'Anónimo'
                            }
                        </h2>
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
                </div>
                <p className='text-sm font-normal text-gray-500 mt-3 text-center leading-tight'>
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
            </Link>
            {
                canBeDeleted && (
                    <div className='flex justify-center'>
                        <button 
                            className="group flex justify-center items-center gap-2 mt-5 px-2 py-1 text-sm font-semibold border-2 border-red-600 rounded-md text-red-600 hover:bg-red-600 hover:text-white"
                            onClick={handleDeleteReview}
                        >
                            Eliminar
                            <BsFillTrash2Fill size={20} className='text-red-600 group-hover:text-white'/>
                        </button>
                    </div>
                )
            }
        </div>
    )
}
