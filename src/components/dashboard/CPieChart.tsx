import React from 'react'
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
//Props
interface CPieChartProps {
    data: any[],
    dataKey: string,
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
export default function CPieChart({
    data,
    dataKey,
    label,
    fill = '#8884d8',
    fillOffset = 0
}: CPieChartProps) {
    return (
        <div className='relative w-full h-full bg-white pt-3'>
            <h1 className='z-50 absolute top-0 left-0 right-0 text-start text-lg font-bold text-gray-800 my-3 ml-10 leading-none'>{label}</h1>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart
                    className='shadow-md bg-white'
                    >
                    <Tooltip />
                    <Legend />
                    <Pie 
                        data={data}
                        dataKey={dataKey} 
                        label
                        labelLine
                    >
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={fillColors[(index + fillOffset) % fillColors.length]} />
                            ))
                        }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
