import React from 'react'
import { Searcher as SearcherProps } from '@/types/searcher';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, setActiveSearcher } from '@/features/searcherSlice';
import { RootState } from '../app/store';
export const Searcher = ({
    title,
    Icon,
    iconColor,
    placeholder,
    query
}: SearcherProps) => {
    const dispatch = useDispatch();
    const {activeSearcher} = useSelector((state: RootState) => state.searcher );
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setQuery({
            query: e.target.value,
            searcher: title
        }))
        dispatch(setActiveSearcher(e.target.value ? title : null))
    }
    return (
        <div className={`flex flex-col w-full mb-5 ${activeSearcher && activeSearcher !== title ? 'hidden' : ''}`}>
            <div className='flex justify-center items-center'>
                <Icon color={iconColor} size={50}/>
                <h1 className='ml-5 text-3xl text-gray-600 font-normal'>{title}</h1>
            </div>
            <input 
                type="text" 
                placeholder={placeholder} 
                value={query} 
                onChange={handleSearch}
                className='mt-3 px-5 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-gray-500'
            />
        </div>
    )
}
