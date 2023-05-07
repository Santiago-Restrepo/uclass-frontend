import Image from 'next/image';
import Link from 'next/link';
//Hooks
//Types
import { Resource } from '@/types/resource';
//Props
interface ResourceProps {
    resource: Resource
}
//Icons
import {AiFillStar, AiOutlineStar} from 'react-icons/ai';
export const ResourceCard = ({
    resource,
}: ResourceProps) => {
    return (
        <div className='flex flex-col items-center justify-center w-full max-w-[12rem] shadow-sm rounded-md p-5 bg-white'>
            <div className='flex justify-start items-start gap-4 w-full'>
                <div
                    className='relative w-10 h-10 rounded-full overflow-hidden'
                >
                    <Image
                        src={typeof resource.user === 'object' ? resource.user.photo || '/user.png' : '/user.png'}
                        alt="Picture of the author"
                        fill={true}
                        sizes='100%'
                    />
                </div>
                {
                    typeof resource.user === 'object' ? (
                        <h2 className='text-md font-medium text-gray-800'>{resource.user.name}</h2>
                    ) : (
                        <h2 className='text-md font-medium text-gray-800'>{resource.user}</h2>
                    )
                }
            </div>
            <p className='text-sm font-normal text-gray-400 mt-3 text-center leading-tight'>
                {resource.description}
            </p>
            <div className='flex justify-center mt-2'>
                {
                    Array(5).fill(0).map((_, index) => {
                        if(index < resource.rating){
                            return <AiFillStar key={index} className='text-yellow-500' size={20}/>
                        }else{
                            return <AiOutlineStar key={index} className='text-yellow-500' size={20}/>
                        }
                    })
                }
            </div>
            <div className='flex flex-col justify-center w-full'>
                <Link 
                    className='w-full mt-5 px-2 py-1 text-sm text-center font-semibold border-2 border-green-600 rounded-md text-green-600 hover:bg-green-600 hover:text-white'
                    href={resource.resourceUrl}
                >
                    Ver
                </Link>
                <button 
                    className='w-full mt-2 px-2 py-1 text-sm font-semibold border-2 border-yellow-500 rounded-md text-yellow-500 hover:bg-yellow-500 hover:text-white'
                >
                    Calificar
                </button>
                <div className='ratingInputs'>
                
                </div>
            </div>
        </div>
    )
}
