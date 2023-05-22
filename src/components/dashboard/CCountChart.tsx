import React from 'react'
//Props
interface CCountChartProps {
    count: number,
    label: string,
    fill?: string,
    fillOffset?: number
}

const fillColors = [
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#ff7c43',
    '#665191',
    '#a05195',
    '#f95d6a',
    '#ffa600',
    '#00ffff',
]
export default function CCountChart({
    count,
    label,
    fill = '#8884d8',
    fillOffset = 0
}: CCountChartProps) {
    return (
        <div className='flex flex-col justify-center items-center w-full h-full bg-white pt-2 shadow-md'>
            <h1 className='text-start text-lg font-bold text-gray-800 my-3 ml-10 leading-none'>{label}</h1>
            <div className='flex justify-center items-center'>
                <div className='flex justify-center items-center w-24 h-24'>
                    <h1 className='text-4xl font-bold text-gray-800'>{count}</h1>
                </div>  
            </div>
        </div>
    )
}
