import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
//Props
interface CLineChartProps {
    data: any[],
    LineDataKeys: string[],
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
export default function CLineChart({
    data,
    LineDataKeys,
    XdataKey,
    label,
    fillOffset = 0
}: CLineChartProps) {
    return (
        <div className='relative w-full h-full bg-white pt-16'>
            <h1 className='z-50 absolute top-0 left-0 right-0 text-start text-lg font-bold text-gray-800 my-3 ml-10 leading-none'>{label}</h1>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={XdataKey} />
                <YAxis />
                <Tooltip />
                <Legend />
                {
                    LineDataKeys.map((dataKey, index) => (
                        <Line key={`${dataKey}-${index}`} type="monotone" dataKey={dataKey} stroke={fillColors[(index + fillOffset) % fillColors.length]} activeDot={{ r: 8 }} />
                    ))
                }
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
