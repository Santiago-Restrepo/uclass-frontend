import React from 'react'
import { BarChart, Bar, Label, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
//Props
interface BarChartProps {
    data: any,
    dataKey: string,
    label: string,
    fill?: string
}
export default function CBarChart({
    data,
    dataKey,
    label,
    fill = '#8884d8'
}: BarChartProps) {
    return (
        <div className='w-full h-full bg-white pt-2'>
            <h1 className='text-start text-lg font-bold text-gray-800 my-3 ml-10 leading-none'>{label}</h1>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    className='shadow-sm bg-white'
                >
                    <XAxis dataKey="teacher.name"/>
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={dataKey} fill={fill} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
