import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store';
import { Searcher } from './Searcher';
export const Searchers = () => {
    const {searchers} = useSelector((state: RootState) => state.searcher );
    return (
        <div className='flex flex-col items-start w-full'>
            {searchers.map((searcher, i) => (
                <Searcher key={i} {...searcher}/>
            ))}
        </div>
    )
}
