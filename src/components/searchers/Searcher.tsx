import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import { IconName, Searcher as SearcherProps } from '@/types/searcher';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, setActiveSearcher } from '@/features/searcherSlice';
import { RootState } from '../../app/store';
import {FaChalkboardTeacher} from 'react-icons/fa';
import {BsBook} from 'react-icons/bs';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
//Services
import { useApi } from '@/hooks/useApi';
import { config } from '@/config';
//Components
import { ResultsDropdown } from '../ResultsDropdown';
//Types
import { Teacher } from '@/types/teacher';
import { Subject } from '@/types/subject';
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
    apiPath,
    appPath
}: SearcherProps) => {
    const dispatch = useDispatch();
    const {authFetch, data, error, loading: fetchLoading} = useApi();
    const [loading, setLoading] = useState<boolean>(fetchLoading);
    //Define iterable data
    const [iterableData, setIterableData] = useState<(Subject | Teacher)[]>([]);
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setQuery({
            query: e.target.value,
            searcher: title
        }))
        dispatch(setActiveSearcher(e.target.value ? title : null))
    }
    const Icon = iconName === IconName.teacher ? icons.teacher : icons.course;
    useEffect(() => {
        setLoading(true);
        if (query) {
            //TODO: Fetch results
            const delayDebounceFn = setTimeout(() => {
                authFetch(`/${apiPath}`, {
                    method: 'POST',
                    data: {
                        query
                    }
                })
            }, 300)
            return () => clearTimeout(delayDebounceFn)
        }
    }, [query])

    useEffect(() => {
        if(query === ''){
            setIterableData([]);
        }else if (data) {
            setIterableData(data as (Subject | Teacher)[])
        }
    }, [data, query])
    useEffect(() => {
        if(query===''){
            setLoading(false);
        }else{
            setLoading(fetchLoading);
        }

    }, [fetchLoading, query])
    return (
        <div className={`flex flex-col w-full mb-5`}>
            <div className='flex justify-center items-end'>
                <Icon className={`text-4xl text-${iconColor}-500`} color={iconColor}/>
                <h1 className='ml-5 text-3xl text-gray-600 font-normal'>{title}</h1>
                <Link href={appPath}>
                    <span className='text-sm text-end leading-none ml-5 text-gray-500 hover:text-gray-600 underline'>Ver todos</span>
                </Link>
            </div>
            <input 
                type="text" 
                placeholder={placeholder} 
                value={query} 
                onChange={handleSearch}
                className='mt-3 px-5 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-gray-500'
            />
            {
                loading && <AiOutlineLoading3Quarters className='animate-spin text-3xl text-gray-500 mx-auto mt-5' size={20}/>
            }
            {
                error && <p>{error}</p>
            }
            <div className="results relative justify-center opacity-0 transition-all duration-300 scale-0">
                <ResultsDropdown iterableData={iterableData} appPath={appPath}/>
            </div>
            <style jsx>
                {`                
                    input:focus + .results{
                        opacity: 1;
                        transform: scale(1);
                    }
                `}
            </style>
        </div>
    )
}
