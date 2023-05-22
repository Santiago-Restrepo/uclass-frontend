import React from 'react'
import { BarChart, Bar, Label, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
//Props
interface BarChartProps {
    data: any,
    YdataKeys: string[],
    XdataKey: string,
    label: string,
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
export default function CBarChart({
    data,
    YdataKeys,
    XdataKey,
    label,
    fillOffset = 0
}: BarChartProps) {
    return (
        <div className='relative w-full h-full bg-white pt-16'>
            <h1 className='z-50 absolute top-0 left-0 right-0 text-start text-lg font-bold text-gray-800 my-3 ml-10 leading-none'>{label}</h1>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    className='shadow-md bg-white'
                >
                    <XAxis dataKey={XdataKey} />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    {
                        YdataKeys.map((dataKey, index) => (
                            <Bar key={`${dataKey}-${index}`} dataKey={dataKey} fill={fillColors[(index + fillOffset) % fillColors.length]} />
                        ))
                    }
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
