import React, {useState, useEffect} from 'react'
import { IconName, Searcher as SearcherProps } from '@/types/searcher';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, setActiveSearcher } from '@/features/searcherSlice';
import { RootState } from '../app/store';
import {FaChalkboardTeacher} from 'react-icons/fa';
import {BsBook} from 'react-icons/bs';
//Services
import { useAuthFetch } from '@/hooks/useAuthFetch';
import { config } from '@/config';
const { API_URL } = config;
const icons = {
    teacher: FaChalkboardTeacher,
    course: BsBook
}
export const Searcher = ({
    title,
    iconName,
    iconColor,
    placeholder,
    query,
    path
}: SearcherProps) => {
    const dispatch = useDispatch();
    const {activeSearcher} = useSelector((state: RootState) => state.searcher);
    const {authFetch, data, error, loading} = useAuthFetch();
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setQuery({
            query: e.target.value,
            searcher: title
        }))
        dispatch(setActiveSearcher(e.target.value ? title : null))
    }
    const Icon = iconName === IconName.teacher ? icons.teacher : icons.course;
    useEffect(() => {
        if (query) {
            //TODO: Fetch results
            const delayDebounceFn = setTimeout(() => {
                authFetch(`${API_URL}/${path}`, {
                    method: 'POST',
                    body: JSON.stringify({query})
                })
            }, 1500)
            return () => clearTimeout(delayDebounceFn)
        }
    }, [query])
    return (
        <div className={`flex flex-col w-full mb-5 ${activeSearcher && activeSearcher !== title ? 'hidden' : ''}`}>
            <div className='flex justify-center items-center'>
                <Icon className={`text-4xl text-${iconColor}-500`} color={iconColor}/>
                <h1 className='ml-5 text-3xl text-gray-600 font-normal'>{title}</h1>
            </div>
            <input 
                type="text" 
                placeholder={placeholder} 
                value={query} 
                onChange={handleSearch}
                className='mt-3 px-5 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-gray-500'
            />
            {
                loading && <p>Loading...</p>                
            }
            {
                error && <p>{error}</p>
            }
            {
                data && <p>{JSON.stringify(data)}</p>
            }
        </div>
    )
}