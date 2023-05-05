import React from 'react'
//Props
interface InputProps {
    label: string,
    name: string,
    type: string,
    register: any,
    errors: any
}
export function Input({
    label,
    name,
    type,
    register,
    errors
}: InputProps) {
    return (
        <div className='flex flex-col gap-2'>
            <label className='text-gray-500 font-semibold' htmlFor={name}>{label}</label>
            <input
                className='px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-none focus:border-green-600'
                type={type}
                {...register(name)}
            />
            {
                errors[name] && (
                    <span className='text-red-500 text-sm font-semibold'>{errors[name].message}</span>
                )
            }
        </div>
    )
}
