import Image from 'next/image'
import { useCallback, useMemo } from 'react'
//Types
import { User } from '@/types/user'
import { Review } from '@/types/review'
import { Resource } from '@/types/resource'
//Hooks
import { useApi } from '@/hooks/useApi'
import { useDispatch } from 'react-redux'
//Components
import { ProfileReviewCardList } from '@/components/profile/ProfileReviewCardList'
import { ProfileResourceCardList } from '@/components/profile/ProfileResourceCardList'
//Icons
import {AiOutlineLoading} from 'react-icons/ai';

//Props
interface ProfileCardProps {
    user: User
}
export function ProfileCard({
    user
}: ProfileCardProps) {
    const { data: reviews, loading: reviewsLoading, authFetch: refetchReviews } = useApi<Review[]>([], `/reviews/user/${user.id}`);
    const { data: resources, loading: resourcesLoading, authFetch: refetchResources } = useApi<Resource[]>([], `/resources/user/${user.id}`);
    // const [aprovedReviews, setAprovedReviews] = useState<Review[]>([])
    // const [pendingReviews, setPendingReviews] = useState<Review[]>([])
    const aprovedReviews = useMemo(() => {
        if(reviews && reviews.length > 0) {
            return reviews.filter(review => review.isApproved)
        }else{
            return []
        }
    }, [reviews])
    const pendingReviews = useMemo(() => {
        if(reviews && reviews.length > 0) {
            return reviews.filter(review => !review.isApproved)
        }else{
            return []
        }
    }, [reviews])

    const logout = useCallback(() => {
        console.log('logout')
    }, [])
    return (
        <div className='flex flex-col justify-start items-center pt-5'>
            <div className='flex justify-center flex-wrap gap-1'>
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                        src={user.photo || '/user.png'}
                        alt="Picture of the author"
                        fill={true}
                        sizes='100%'
                    />
                </div>
                <div className='flex flex-col justify-center ml-5'>
                    <h2 className='text-xl font-medium text-gray-800'>{user.name}</h2>
                    <p className='text-sm font-normal text-gray-400 text-center leading-none'>
                        {user.email}
                    </p>
                </div>
            </div>
            {
                reviewsLoading || resourcesLoading ? (
                    <AiOutlineLoading className='animate-spin' size={20}/>
                ) : (
                    <div className='flex flex-col justify-center w-full mt-5'>
                        <div className='flex flex-col justify-center p-3 rounded-md shadow-lg bg-white'>
                            <h2 className='text-sm font-medium text-yellow-500'>Has realizado {reviews?.length} reseñas</h2>
                            <div className='mt-2'>
                                <h3 className='text-md font-medium text-gray-500'>Reseñas aprovadas ✔</h3>
                                <ProfileReviewCardList 
                                    reviews={aprovedReviews} 
                                    refresh={() => {
                                        refetchReviews(`/reviews/user/${user.id}`, {
                                            method: 'GET'
                                        })
                                    }}
                                />
                                <h3 className='text-md font-medium text-gray-500 mt-5'>Reseñas pendientes por aprovación ⏳</h3>
                                <ProfileReviewCardList 
                                    reviews={pendingReviews}
                                    refresh={() => {
                                        refetchReviews(`/reviews/user/${user.id}`, {
                                            method: 'GET'
                                        })
                                    }}
                                    
                                />
                            </div>
                        </div>
                        <div className='flex flex-col justify-center p-3 mt-3 rounded-md shadow-lg bg-white'>
                            <h2 className='text-sm font-medium text-green-600'>Has publicado {resources?.length} recursos</h2>
                            <h3 className='text-md font-medium text-gray-500 mt-5'>Recursos publicados 📚</h3>
                            <div className='mt-2'>
                                <ProfileResourceCardList 
                                    resources={resources} 
                                    refresh={() => {
                                        refetchResources(`/resources/user/${user.id}`, {
                                            method: 'GET'
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
            <div>
                <button className='px-3 py-2 mt-5 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600' onClick={logout}>
                    Cerrar sesión
                </button>
            </div>
        </div>
    )
}
