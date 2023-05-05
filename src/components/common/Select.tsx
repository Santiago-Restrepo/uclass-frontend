import React from 'react'
//props
interface SelectProps {
    label: string,
    name: string,
    options: any[],
    register: any,
    errors: any
}
export function Select({
    label,
    name,
    options,
    register,
    errors
}: SelectProps) {
    return (
        <div className='flex flex-col gap-2'>
            <label className='text-gray-500 font-semibold' htmlFor={name}>{label}</label>
            <select
                className='px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-none focus:border-green-600'
                {...register(name)}
            >
                {
                    options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))
                }
            </select>
            {
                errors[name] && (
                    <span className='text-red-500 text-sm font-semibold'>{errors[name].message}</span>
                )
            }
        </div>
    )
}
